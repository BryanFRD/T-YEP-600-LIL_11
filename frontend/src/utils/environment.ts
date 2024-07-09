import logger from '../logger/logger'

type ConfigKey =
  | 'BASE URL'
  | 'MODE'
  | 'PROD'
  | 'DEV'
  | 'SSR'
  | 'LOG_LEVEL'
  | 'API_URL'
  | 'SERVER_URL'
  | 'STUN_URL'
  | 'TURN_URL'
  | 'TURN_USERNAME'
  | 'TURN_CREDENTIAL'

const getEnvValue = (
  key: ConfigKey,
  defaultValue?: string
): string | undefined => {
  const value = get(`VITE_${key}`) ?? get(key)
  if (!value) {
    logger.error(
      `Missing environment variable VITE_${key}, please check your .env file`
    )
    return defaultValue ?? undefined
  }
  return value
}

const get = (key: string): string | undefined => {
  return import.meta.env[key]
}

export default getEnvValue
