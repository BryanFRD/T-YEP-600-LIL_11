import ServerEvent from './ServerEvent';

interface ServerEventPayloads {
  [ServerEvent.ROOMS]: { limit: number; search?: string }
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

export default ServerEventPayloads