import jwt from 'jsonwebtoken';
import { createClient, RedisClientType } from 'redis';
import InvalidToken from '../error/InvalidToken';
import logger from '../logger/logger';

class RedisService {
  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      url: process.env.REDIS_URL
    });
    this.redisClient.on('error', (err) => logger.error('Redis Client Error', err));
    this.redisClient.connect();
    this.isTokenRevoked = this.isTokenRevoked.bind(this);
    this.revokeToken = this.revokeToken.bind(this);
  }

  async revokeToken(token: string): Promise<void> {
    const decodedToken: any = jwt.decode(token);
    if (!decodedToken) {
      throw new InvalidToken();
    }
    const expirationTime = decodedToken.exp * 1000 - Date.now();
    await this.redisClient.set(token, 'revoked');
    await this.redisClient.expire(token, Math.floor(expirationTime / 1000));
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const value = await this.redisClient.get(token);
    return value === 'revoked';
  }
}

export default RedisService;
