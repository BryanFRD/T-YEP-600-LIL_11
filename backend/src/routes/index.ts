import express from 'express';

import authRouter from './auth.route';
import playerRouter from './player.route';

export const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/players', playerRouter);
