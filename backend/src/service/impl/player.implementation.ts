import { PaginatedResponse } from '../../@types/api.response.type';
import {
  createPlayerDTO,
  getPlayerDTO,
  Player,
} from '../../@types/player.type';
import { toPlayerDTO } from '../../mapper/player.mapper';
import { db } from '../../utils/db.server';
import PlayerService from '../player.service';

class PlayerImplementation implements PlayerService {
  getPlayerById(id: string): Promise<getPlayerDTO> {
    throw new Error('Method not implemented.');
  }
  updatePlayer(id: string, Player: Player): Promise<getPlayerDTO> {
    throw new Error('Method not implemented.');
  }
  deletePlayer(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getPlayers(): Promise<getPlayerDTO[]> {
    const users = await db.player.findMany();

    return users.map((user) => toPlayerDTO(user as Player));
  }
}

export default PlayerImplementation;
