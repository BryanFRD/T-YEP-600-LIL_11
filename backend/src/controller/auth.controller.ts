import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { ErrorResponse, SuccessResponse } from '../@types/api.response.type';
import { LoginDTO, RegisterDTO } from '../@types/auth.type';
import { cookieOptions } from '../config/cookie.config';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../config/jwt.config';
import InvalidPassword from '../error/InvalidPassword';
import InvalidToken from '../error/InvalidToken';
import UserNotFoundByIdentifier from '../error/UserNotFoundByIdentifier';
import logger from '../logger/logger';
import RedisService from '../redis/redis';
import { loginSchema, registerSchema } from '../schema/player.schema';
import AuthImplementation from '../service/impl/auth.implementation';
import PlayerImplementation from '../service/impl/player.implementation';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../utils/api.response';
import HttpCode from '../utils/http.code';
import { handleJoiValidationError } from '../utils/joi';

class AuthController {
  private authService: AuthImplementation;
  private playerService: PlayerImplementation;
  private redisService: RedisService;

  constructor() {
    this.authService = new AuthImplementation();
    this.playerService = new PlayerImplementation();
    this.redisService = new RedisService();
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return handleJoiValidationError(error.message, res);
      }

      const result = await this.authService.registerUser(value as RegisterDTO);
      const response: SuccessResponse<Object> = createSuccessResponse(
        result,
        HttpCode.CREATED,
        'User registered successfully',
      );

      return res.status(HttpCode.OK).send(response);
    } catch (error: any) {
      {
        return res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json(
            createErrorResponse(HttpCode.INTERNAL_SERVER_ERROR, error.message),
          );
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return handleJoiValidationError(error.message, res);
      }

      const user = await this.authService.loginUser(value as LoginDTO);

      if (!user) {
        return res
          .status(HttpCode.UNAUTHORIZED)
          .json(
            createErrorResponse(HttpCode.UNAUTHORIZED, 'Invalid credentials'),
          );
      }

      // update last login
      await this.playerService.updatePlayer(user.id!, {
        lastConnection: new Date(),
      });

      const access_token = generateAccessToken({
        user,
      });
      const refresh_token = generateRefreshToken({
        id: user.id,
      });

      res.cookie('refresh_token', refresh_token, {
        ...cookieOptions,
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: 'strict',
      });

      logger.info(`User ${user.id} logged in successfully`);

      return res
        .status(HttpCode.OK)
        .json(
          createSuccessResponse(
            { access_token: access_token },
            HttpCode.OK,
            'User logged in successfully',
          ),
        );
    } catch (error: any) {
      switch (error.constructor) {
        case InvalidPassword:
          return res
            .status(HttpCode.BAD_REQUEST)
            .json(
              createErrorResponse(HttpCode.BAD_REQUEST, 'Invalid password'),
            );
        case UserNotFoundByIdentifier:
          return res
            .status(HttpCode.NOT_FOUND)
            .json(createErrorResponse(HttpCode.NOT_FOUND, 'User not found'));
        default:
          return res.json(
            createErrorResponse(HttpCode.INTERNAL_SERVER_ERROR, error.message),
          );
      }
    }
  }

  async refreshToken(req: Request, res: Response) {
    const refresh_token = req.signedCookies.refresh_token;

    if (!refresh_token) {
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }

    const isRevoked = await this.redisService.isTokenRevoked(refresh_token);
    if (isRevoked) {
      return res.sendStatus(HttpCode.FORBIDDEN);
    }

    try {
      jwt.verify(
        refresh_token,
        process.env.JWT_TOKEN as Secret,
        async (err: any, player: any) => {
          if (err) {
            return res.sendStatus(HttpCode.FORBIDDEN);
          }

          const playerDb = await this.playerService.getPlayerById(player.id);

          const new_access_token = generateAccessToken({
            user: playerDb,
          });
          const new_refresh_token = generateRefreshToken({
            id: player.id,
          });

          await this.redisService.revokeToken(refresh_token);
          res.cookie('refresh_token', new_refresh_token, {
            ...cookieOptions,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: 'strict',
          });

          logger.info(`Token refreshed for user ${player.id}`);
          return res
            .status(HttpCode.OK)
            .json({ access_token: new_access_token });
        },
      );
    } catch (error: any) {
      switch (error.constructor) {
        case InvalidToken:
          return res.sendStatus(HttpCode.UNAUTHORIZED);
        case UserNotFoundById:
          return res.status(HttpCode.NOT_FOUND).json(createErrorResponse(HttpCode.NOT_FOUND, error.message));
        default:
          return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(createErrorResponse(HttpCode.INTERNAL_SERVER_ERROR, error.message));
      }
    }
  }

  async logout(req: Request, res: Response) {
    const refresh_token = req.signedCookies.refresh_token;

    if (!refresh_token) {
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }

    try {
      const player = jwt.verify(refresh_token, process.env.JWT_TOKEN as Secret);

      if (typeof player !== 'string' && 'id' in player) {
        await this.redisService.revokeToken(refresh_token);
        res.clearCookie('refresh_token');
        logger.info(`User ${player.id} logged out successfully`);

        return res.json({ message: 'User logged out successfully' });
      } else {
        throw new InvalidToken();
      }
    } catch (error: any) {
      logger.error(`Logout error: ${error.message}`);
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }
  }

  async getMe(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }

    const decoded = jwt.decode(token) as any;

    if (!decoded) {
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }

    const user = await this.playerService.getPlayerById(decoded.user.id);

    if (!user) {
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }

    return res.json(user);
  }
}

export default AuthController;
