import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerOutput from './docs/swagger_output.json';
import logger from './logger/logger';
import { routes } from './routes';
import getEnvValue from './utils/environment';

const PORT_STRING: string | undefined = getEnvValue('API_PORT');

if (!PORT_STRING) {
  process.exit(1);
}

const PORT: number = parseInt(PORT_STRING, 10);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static('public'));

logger.info('🚀 Server is starting');

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
