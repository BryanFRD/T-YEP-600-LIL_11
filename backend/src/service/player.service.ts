import { PaginatedResponse } from '../@types/api.response.type';
import { createPlayerDTO, getPlayerDTO, Player } from '../@types/player.type';

interface PlayerService {
  getPlayerById(id: string): Promise<getPlayerDTO>;
  updatePlayer(id: string, Player: Player): Promise<getPlayerDTO>;
  deletePlayer(id: string): Promise<void>;
  getPlayers(): Promise<getPlayerDTO[]>;
}

export default PlayerService;
