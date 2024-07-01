import express, { Express, Request, Response } from 'express';
import logger from './logger/logger';
import * as dotenv from 'dotenv';
import * as sequelize from './db/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

logger.info('🚀 Server is starting...');

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});