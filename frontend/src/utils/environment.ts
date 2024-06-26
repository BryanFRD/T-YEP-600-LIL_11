import logger from './logger'

type ConfigKey =
  | 'MODE'
  | 'BASE_URL'
  | 'PROD'
  | 'DEV'
  | 'SSR'
  | 'LOG_LEVEL'
  | 'API_URL'
  | 'STUN_URL'
  | 'TURN_URL'
  | 'TURN_USERNAME'
  | 'TURN_PASSWORD'

const getEnvValue = (key: ConfigKey): string | undefined => {
  const value = get(`VITE_${key}`) ?? get(key)
  if (!value) {
    logger.error(
      `Missing environment variable VITE_${key}, please check your .env file`
    )
    return undefined
  }
  return value
}

const get = (key: string): string | undefined => {
  return import.meta.env[key]
}

export default getEnvValue
