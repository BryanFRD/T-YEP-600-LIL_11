import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { ErrorResponse, SuccessResponse } from '../@types/api.response.type';
import { LoginDTO, RegisterDTO } from '../@types/auth.type';
import { cookieOptions } from '../config/cookie.config';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../config/jwt.config';
import InvalidToken from '../error/InvalidToken';
import logger from '../logger/logger';
import RedisService from '../redis/redis';
import { loginSchema, registerSchema } from '../schema/player.schema';
import AuthImplementation from '../service/impl/auth.implementation';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../utils/api.response';
import HttpCode from '../utils/http.code';
import { handleJoiValidationError } from '../utils/joi';
import { Controller, Post, Route } from 'tsoa';

@Route('auth')
class AuthController extends Controller {
  private authService: AuthImplementation;
  private redisService: RedisService;

  constructor() {
    super();
    this.authService = new AuthImplementation();
    this.redisService = new RedisService();
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);  
  }

  @Post('register')
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

      return res.send(response);
    } catch (error: any) {
      return res.json(
        createErrorResponse(HttpCode.INTERNAL_SERVER_ERROR, error.message),
      );
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
        return res.json(
          createErrorResponse(HttpCode.UNAUTHORIZED, 'Invalid credentials'),
        );
      }

      const access_token = generateAccessToken({
        id: user.id,
        username: user.username,
      });
      const refresh_token = generateRefreshToken({
        id: user.id,
        username: user.username,
      });

      res.cookie('refresh_token', refresh_token, {
        ...cookieOptions,
        httpOnly: true,
        signed: true,
        secure: true,
        sameSite: 'strict',
      });

      logger.info(`User ${user.id} logged in successfully`);
      return res.json({ access_token: access_token });
    } catch (error: any) {
      logger.error(`Error occurred while logging in: ${error.message}`);
      return res.json(
        createErrorResponse(HttpCode.UNAUTHORIZED, error.message),
      );
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

    jwt.verify(
      refresh_token,
      process.env.JWT_TOKEN as Secret,
      async (err: any, player: any) => {
        if (err) {
          return res.sendStatus(HttpCode.FORBIDDEN);
        }

        const new_access_token = generateAccessToken({
          id: player.id,
          username: player.username,
        });
        const new_refresh_token = generateRefreshToken({
          id: player.id,
          username: player.username,
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
        return res.json({ access_token: new_access_token });
      },
    );
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
}

export default AuthController;
