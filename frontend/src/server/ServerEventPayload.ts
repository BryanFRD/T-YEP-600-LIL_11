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
  [ServerEvent.PLAYER_ATTACK]: { 
    attackerId: string
    targetId: string
    damage: number 
  }
  [ServerEvent.PLAYER_ATTACKED]: {
    attackerId: string
    targetId: string
    damage: number
  },
  [ServerEvent.PLAYER_JOIN]: { playerId: string, firstname: string, name: string, playerX: number, playerY: number }
  [ServerEvent.PLAYER_JOINED]: { playerId: string, firstname: string, name: string, playerX: number, playerY: number }
  [ServerEvent.PLAYER_LEAVE]: { playerId: string }
  [ServerEvent.PLAYER_LEFT]: { playerId: string }
  [ServerEvent.PLAYER_DIED]: { playerId: string }
  [ServerEvent.PLAYER_RESPAWN]: { playerId: string }
  [ServerEvent.PLAYER_HIT]: { playerId: string; attackerId: string }
  [ServerEvent.PLAYER_HEALED]: { playerId: string; healerId: string }
  [ServerEvent.PLAYER_UPDATE]: { playerId: string }
  [ServerEvent.PLAYER_UPDATED]: { playerId: string }
  [ServerEvent.PLAYER_REFRESH]: { playerId: string, firstname: string, name: string, playerX: number, playerY: number }
  [ServerEvent.PLAYER_REFRESHED]: { playerId: string, firstname: string, name: string, playerX: number, playerY: number }
}

export default ServerEventPayloads