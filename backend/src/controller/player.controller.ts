import { Request, Response } from 'express';

import PlayerImplementation from '../service/impl/player.implementation';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../utils/api.response';
import HttpCode from '../utils/http.code';

class PlayerController {
  private playerService: PlayerImplementation;

  constructor() {
    this.playerService = new PlayerImplementation();
    this.getPlayers = this.getPlayers.bind(this);
  }

  async getPlayers(req: Request, res: Response) {
    try {
      const players = await this.playerService.getPlayers();

      return res.json(
        createSuccessResponse(
          players,
          HttpCode.OK,
          'Players fetched successfully',
        ),
      );
    } catch (error: any) {
      return res.json(
        createErrorResponse(
          HttpCode.INTERNAL_SERVER_ERROR,
          'An error occurred while fetching players',
        ),
      );
    }
  }
}

export default PlayerController;
