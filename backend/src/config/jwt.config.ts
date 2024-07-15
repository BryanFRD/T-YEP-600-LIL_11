import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_TOKEN || 'jwtsecret';
const accessTokenExpiry = '15m';
const refreshTokenExpiry = '7d';

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: accessTokenExpiry });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: refreshTokenExpiry });
};

export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, jwtSecret) as object;
  } catch (e) {
    return null;
  }
};
