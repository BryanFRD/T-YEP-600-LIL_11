enum ServerEvent {
  ROOMS = 'rooms',
  JOIN_ROOM = 'join-room',
  LEAVE_ROOM = 'leave-room',
  CREATE_ROOM = 'create-room',
  DELETE_ROOM = 'delete-room',
  PING = 'ping',
  PONG = 'pong',
  PLAYER_MOVE = 'player-move',
  PLAYER_MOVED = 'player-moved',
  PLAYER_ATTACK = 'player-attack',
  PLAYER_ATTACKED = 'player-attacked'
}

export default ServerEvent
