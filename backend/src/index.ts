import express from 'express';
import cors from 'cors';

import logger from './logger/logger';
import getEnvValue from './utils/environment';

const PORT_STRING: string | undefined = getEnvValue('API_PORT');

if (!PORT_STRING) {
  process.exit(1);
}

const PORT: number = parseInt(PORT_STRING, 10);

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
