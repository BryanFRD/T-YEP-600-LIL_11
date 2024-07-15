import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import logger from './logger/logger';
import authRouter from './routes/auth.route';
import playerRouter from './routes/player.route';
import getEnvValue from './utils/environment';

const PORT_STRING: string | undefined = getEnvValue('API_PORT');

if (!PORT_STRING) {
  process.exit(1);
}

const PORT: number = parseInt(PORT_STRING, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

logger.info('🚀 Server is starting');

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.use('/auth', authRouter);
app.use('/players', playerRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
