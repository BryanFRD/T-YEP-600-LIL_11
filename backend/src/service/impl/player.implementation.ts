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
  async getPlayerById(id: string): Promise<getPlayerDTO> {
    const user = await db.player.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserNotFoundById(id);
    }

    return toPlayerDTO(user);
  }

  async updatePlayer(id: string, Player: Partial<Player>): Promise<getPlayerDTO> {

    const user = await db.player.update({
      where: {
        id,
      },
      data: Player,
    });

    if (!user) {
      throw new UserNotFoundById(id);
    }

    return toPlayerDTO(user);
  }


  deletePlayer(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getPlayers(): Promise<getPlayerDTO[]> {
    const users = await db.player.findMany();

    return users.map((user) => toPlayerDTO(user));
  }
}

export default PlayerImplementation;
