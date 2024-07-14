import jwt from 'jsonwebtoken';

import { getPlayerDTO } from '../@types/player.type';

export const generateAccessToken = (player: getPlayerDTO) => {
  return jwt.sign(
    { id: player.id, email: player.email },
    process.env.ACCESS_TOKEN_SECRET as BufferEncoding,
    {
      expiresIn: 60 * 60,
    },
  );
};

export const generateRefreshToken = (player: getPlayerDTO) => {
  return jwt.sign(
    { id: player.id, email: player.email },
    process.env.REFRESH_TOKEN_SECRET as BufferEncoding,
    {
      expiresIn: 60 * 60 * 24,
    },
  );
};
