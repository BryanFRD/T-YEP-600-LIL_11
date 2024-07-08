import { SuccessResponse, PaginatedResponse } from "../@types/api.response.type";
import { Player, createPlayerDTO, getPlayerDTO } from "../@types/player.type";

interface PlayerService {
    createPlayer(Player: createPlayerDTO): Promise<SuccessResponse<Partial<getPlayerDTO>>>;
    getPlayerById(id: string): Promise<SuccessResponse<getPlayerDTO>>;
    updatePlayer(id: string, Player: Player): Promise<SuccessResponse<getPlayerDTO>>;
    deletePlayer(id: string): Promise<SuccessResponse<void>>;
    getPlayers(): Promise<PaginatedResponse<getPlayerDTO>>;
}

export default PlayerService;