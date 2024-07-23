import express from 'express';

import AuthController from '../controller/auth.controller';

const authRouter = express.Router();

const authController = new AuthController();

// POST

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refresh-token', authController.refreshToken);

authRouter.post('/refresh-token', authController.refreshToken);

export default authRouter;
