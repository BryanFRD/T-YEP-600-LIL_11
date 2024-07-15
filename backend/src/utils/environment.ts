import * as dotenv from 'dotenv';

dotenv.config();

type ConfigKey =
  'NODE_ENV'
  | 'API_PORT'
  | 'POSTGRES_HOST'
  | 'POSTGRES_PORT'
  | 'POSTGRES_USER'
  | 'POSTGRES_PASSWORD'
  | 'POSTGRES_DB'
  

const getEnvValue = (
  key: ConfigKey,
  defaultValue?: string
): string | undefined => {
  const value = get(key)
  if (!value) {
    return defaultValue ?? undefined
  }
  return value
}

const get = (key: string): string | undefined => {
  return process.env[key];
}

export default getEnvValue
