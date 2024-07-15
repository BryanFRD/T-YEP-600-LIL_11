import { ClientChannel, geckos } from '@geckos.io/client'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

import ServerEvent from '../enum/ServerEvent'
import getEnvValue from '../utils/environment'
import logger from '../logger/logger'

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
  ) => void,
  ping: number
}

const initialContextValue: ServerContextValue = {
  channel: null,
  addEventHandler: () => {},
  removeEventHandler: () => {},
  emit: () => {},
  ping: -1
}

interface ServerEventPayloads {
  [ServerEvent.ROOMS]: { limit: number, search?: string }
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

type ServerEventHandlers = {
  [key in ServerEvent]?: ((payload: ServerEventPayloads[key]) => void)[]
}

const ServerContext = createContext<ServerContextValue>(initialContextValue)

export const ServerContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [channel, setChannel] = useState<ClientChannel | null>(null)
  // const { user } = useContext(UserContext);
  const [eventHandlers, setEventHandlers] = useState<ServerEventHandlers>({});
  const [ping, setPing] = useState<number>(-1);

  const addEventHandler = <T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ) => {
    setEventHandlers(previousEventHandlers => {
      if(!previousEventHandlers[event])
        previousEventHandlers[event] = [];
      
      previousEventHandlers[event]?.push(handler);
      
      return {...previousEventHandlers};
    });
  }
  
  const removeEventHandler = <T extends ServerEvent>(
    event: T,
    handler: (payload: ServerEventPayloads[T]) => void
  ) => {
    setEventHandlers(previousEventHandlers => {
      if(!previousEventHandlers[event])
        return previousEventHandlers;
      
      const index = previousEventHandlers[event]?.indexOf(handler);
      previousEventHandlers[event]?.splice(index!, 1);
      
      return {...previousEventHandlers}
    });
  }

  const emit = <T extends ServerEvent>(
    event: T,
    data: ServerEventPayloads[T]
  ) => {
    if (channel) {
      channel.emit(event, data)
    }
  }

  const handleEvent = <T extends ServerEvent>(
    event: T,
    data: ServerEventPayloads[T]
  ) => {
    if (eventHandlers[event]) {
      eventHandlers[event]?.forEach(handler => handler(data))
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
          handleEvent(event, payload as ServerEventPayloads[typeof event])
        })
      })
    })

    const pingIntervale = setInterval(() => {
      emit(ServerEvent.PING, { date: Date.now() })
    }, 1000)

    const pongHandler = (payload: ServerEventPayloads[ServerEvent.PONG]) => {
      const latency = Date.now() - payload.date

      setPing(latency)
    }

    addEventHandler(ServerEvent.PONG, pongHandler)

    return () => {
      if (channel) {
        channel?.close()
      }

      clearInterval(pingIntervale)
      removeEventHandler(ServerEvent.PONG, pongHandler)
      
      setChannel(null)
      setPing(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ServerContext.Provider
      value={{ channel, addEventHandler, removeEventHandler, emit, ping }}
    >
      {children}
    </ServerContext.Provider>
  )
}

export default ServerContext
