import { NextFunction, Response, Request } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import HttpCode from '../utils/http.code';

interface CustomRequest extends Request {
  player?: any; 
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.sendStatus(HttpCode.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(HttpCode.UNAUTHORIZED);
  }

  jwt.verify(
    token,
    process.env.JWT_TOKEN as Secret,
    (err: any, player: any) => {
      if (err) {
        return res.sendStatus(HttpCode.FORBIDDEN);
      }

      if (!player) {
        return res.sendStatus(HttpCode.UNAUTHORIZED);
      }

      req.player = player;

      next();
    },
  );
};
