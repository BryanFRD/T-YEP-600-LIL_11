import log from 'loglevel'

const getCallerInfo = () => {
  const stack = new Error().stack
  const stackLines = stack?.split('\n')
  const callerLine = stackLines?.[3]
  const match =
    callerLine?.match(/at (.*?) \((.*?)\)/) || callerLine?.match(/at (.*?)$/)
  return match ? match[1] : 'unknown'
}

const logger = {
  debug: (...message: unknown[]) => {
    log.debug(`[${getCallerInfo()}]`, ...message)
  },
  info: (...message: unknown[]) => {
    log.info(`[${getCallerInfo()}]`, ...message)
  },
  warn: (...message: unknown[]) => {
    log.warn(`[${getCallerInfo()}]`, ...message)
  },
  error: (...message: unknown[]) => {
    log.error(`[${getCallerInfo()}]`, ...message)
  }
}

export default logger
