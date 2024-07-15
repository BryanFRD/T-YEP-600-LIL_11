import * as dotenv from 'dotenv';

dotenv.config();

const getEnvValue = (
  key,
  defaultValue
) => {
  const value = get(key)
  if (!value) {
    return defaultValue ?? undefined
  }
  return value
}

const get = (key) => {
  return process.env[key];
}

export default getEnvValue
