enum ServerEvent {
  ROOMS = 'rooms',
  JOIN_ROOM = 'join-room',
  LEAVE_ROOM = 'leave-room',
  CREATE_ROOM = 'create-room',
  DELETE_ROOM = 'delete-room',
  PING = 'ping',
  PLAYER_MOVE = 'player-move',
  PLAYER_ATTACK = 'player-attack',
  REGISTER = 'register',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  
  // RESPONSE
  PONG = 'pong',
  REGISTERED_RESPONSE = 'registered_response',
  CONNECTED_RESPONSE = 'connected_response',
  DISCONNECTED_RESPONSE = 'disconnected_response',
  ROOM_CREATED_RESPONSE = 'room-created_response',
  ROOM_DELETED_RESPONSE = 'room-deleted_response',
  ROOM_JOINED_RESPONSE = 'room-joined_response',
  ROOM_LEFT_RESPONSE = 'room-left_response',
  PLAYER_MOVED_RESPONSE = 'player-moved_response',
  PLAYER_ATTACKED_RESPONSE = 'player-attacked_response',
}

export default ServerEvent