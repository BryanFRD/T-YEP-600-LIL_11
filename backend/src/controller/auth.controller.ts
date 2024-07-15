import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import { ErrorResponse, SuccessResponse } from '../@types/api.response.type';
import { LoginDTO, RegisterDTO } from '../@types/auth.type';
import { cookieOptions } from '../config/cookie.config';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../config/jwt.config';
import { toPlayerDTO } from '../mapper/player.mapper';
import { loginSchema, registerSchema } from '../schema/player.schema';
import AuthImplementation from '../service/impl/auth.implementation';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../utils/api.response';
import HttpCode from '../utils/http.code';
import { handleJoiValidationError } from '../utils/joi';

class AuthController {
  private authService: AuthImplementation;

  constructor() {
    this.authService = new AuthImplementation();
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.login = this.login.bind(this);
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

      return res.send(response);
    } catch (error: any) {
      {
        return res.json(
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
        sameSite: true,
      });

      return res.json(
        createSuccessResponse(
          { access_token: access_token },
          HttpCode.OK,
          'User logged in successfully',
        ),
      );
    } catch (error: any) {
      return res.json(
        createErrorResponse(HttpCode.UNAUTHORIZED, error.message),
      );
    }
  }

  async refreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return res.sendStatus(HttpCode.UNAUTHORIZED);
    }

    jwt.verify(
      refresh_token,
      process.env.JWT_TOKEN as Secret,
      (err: any, player: any) => {
        if (err) {
          return res.sendStatus(HttpCode.FORBIDDEN);
        }

        const access_token = generateAccessToken({
          id: player.id,
          username: player.username,
        });

        return res.json(
          createSuccessResponse(
            { access_token: access_token },
            HttpCode.OK,
            'Token refreshed successfully',
          ),
        );
      },
    );
  }
}

export default AuthController;
