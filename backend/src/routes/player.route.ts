import express from 'express';

import PlayerController from '../controller/player.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const playerRouter = express.Router();

const playerController = new PlayerController();

// GET

playerRouter.get('/', authenticateToken, playerController.getPlayers);

export default playerRouter;
