import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import logger from './logger/logger';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

logger.info('🚀 Server is starting');

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
