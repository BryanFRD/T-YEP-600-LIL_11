import { ClientChannel, geckos } from '@geckos.io/client'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import ServerEvent from '../enum/ServerEvent'
import getEnvValue from '../utils/environment'
import logger from '../utils/logger'

export interface ServerContextValue {
  channel: ClientChannel | null
  addEventHandler: <T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ) => void
  removeEventHandler: <T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ) => void
  emit: <T extends ServerEvent>(
    event: T,
    payload: ServerEventPayloads[T]
  ) => void
}

const initialContextValue: ServerContextValue = {
  channel: null,
  addEventHandler: () => {},
  removeEventHandler: () => {},
  emit: () => {}
}

type ServerEventHandlers = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in ServerEvent]?: ((payload: any) => void)[]
}

type ServerEventPayloads = {
  [ServerEvent.ROOMS]: void // Exemple: pas de payload pour l'événement 'rooms'
  [ServerEvent.JOIN_ROOM]: { roomId: string }
  [ServerEvent.LEAVE_ROOM]: { roomId: string }
  [ServerEvent.CREATE_ROOM]: { roomName: string }
  [ServerEvent.DELETE_ROOM]: { roomId: string }
  [ServerEvent.PING]: { date: number }
  [ServerEvent.PONG]: { date: number }
  [ServerEvent.PLAYER_MOVE]: {
    playerId: string
    newPosition: { x: number; y: number }
  }
  [ServerEvent.PLAYER_MOVED]: {
    playerId: string
    newPosition: { x: number; y: number }
  }
  [ServerEvent.PLAYER_ATTACK]: { playerId: string; targetId: string }
  [ServerEvent.PLAYER_ATTACKED]: {
    playerId: string
    attackerId: string
    damage: number
  }
}

const ServerContext = createContext<ServerContextValue>(initialContextValue)

export const ServerContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [channel, setChannel] = useState<ClientChannel | null>(null)
  // const { user } = useContext(UserContext);
  const eventHandlers: ServerEventHandlers = {}

  const addEventHandler = <T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ) => {
    if (!eventHandlers[event]) {
      eventHandlers[event] = []
    }
    eventHandlers[event]?.push(handler)
  }

  const removeEventHandler = <T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ) => {
    if (eventHandlers[event]) {
      eventHandlers[event] = eventHandlers[event]?.filter(h => h !== handler)
    }
  }

  const emit = <T extends ServerEvent>(
    event: T,
    payload: ServerEventPayloads[T]
  ) => {
    if (channel) {
      channel.emit(event, payload as never)
    }
  }

  const handleEvent = <T extends ServerEvent>(
    event: T,
    payload: ServerEventPayloads[T]
  ) => {
    if (eventHandlers[event]) {
      eventHandlers[event]?.forEach(handler => handler(payload))
    }
  }

  useEffect(() => {
    const client = geckos({
      url: getEnvValue('SERVER_URL'),
      iceServers: [
        {
          urls: getEnvValue('STUN_URL')!
        },
        {
          urls: getEnvValue('TURN_URL')!,
          username: getEnvValue('TURN_USERNAME')!,
          credential: getEnvValue('TURN_CREDENTIAL')!
        }
      ]
    })

    client.onConnect(error => {
      if (error) {
        logger.error('Failed to connect to the server:', error)
        return
      }

      setChannel(client)

      logger.info('Connected to the server')

      emit(ServerEvent.PING, { date: Date.now() })

      Object.values(ServerEvent).forEach(event => {
        client.on(event, payload => {
          handleEvent(event, payload as never)
        })
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ServerContext.Provider
      value={{ channel, addEventHandler, removeEventHandler, emit }}
    >
      {children}
    </ServerContext.Provider>
  )
}

export default ServerContext
