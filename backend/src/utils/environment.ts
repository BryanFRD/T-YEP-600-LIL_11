import * as dotenv from 'dotenv';

dotenv.config();

type ConfigKey =
  | 'NODE_ENV'
  | 'API_PORT'
  | 'POSTGRES_HOST'
  | 'POSTGRES_PORT'
  | 'POSTGRES_USER'
  | 'POSTGRES_PASSWORD'
  | 'POSTGRES_DB'
  | 'DATABASE_URL'
  | 'JWT_TOKEN';

const getEnvValue = (
  key: ConfigKey,
  defaultValue?: string,
): string | undefined => {
  const value = process.env[key];
  return value ?? defaultValue;
};

export default getEnvValue;
