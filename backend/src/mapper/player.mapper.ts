import { Player } from '../@types/player.type';

export const toPlayerDTO = (player: Player) => {
  return {
    id: player.id,
    name: player.name,
    email: player.email,
    username: player.username,
    firstname: player.firstname,
    lastConnection: player.lastConnection,
  };
};
