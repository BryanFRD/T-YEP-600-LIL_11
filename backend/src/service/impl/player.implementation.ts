import { SuccessResponse, PaginatedResponse } from "../../@types/api.response.type";
import { createPlayerDTO, getPlayerDTO, Player } from "../../@types/player.type";
import PlayerService from "../player.service";
import { db } from "../../utils/db.server";
import { hashPassword } from "../../utils/password.utils";
import { createSuccessResponse } from "../../utils/api.response";
import HttpCode from "../../utils/http.code";
import { toPlayerDTO } from "../../mapper/player.mapper";

class PlayerImplementation implements PlayerService {

    async createPlayer(Player: createPlayerDTO): Promise<SuccessResponse<getPlayerDTO>> {
        const hashedPassword = await hashPassword(Player.password);
        
        const user = await db.player.create({
            data: {
                firstname: Player.firstname,
                name: Player.name,
                email: Player.email,
                password: hashedPassword,
                username: Player.username
            }
        });

        // transform user to getPlayerDTO
        const returnUser: getPlayerDTO = toPlayerDTO(user);

        return createSuccessResponse<getPlayerDTO>(returnUser, HttpCode.CREATED, 'Player created');
    }


    getPlayerById(id: string): Promise<SuccessResponse<getPlayerDTO>> {
        throw new Error("Method not implemented.");
    }
    updatePlayer(id: string, Player: Player): Promise<SuccessResponse<getPlayerDTO>> {
        throw new Error("Method not implemented.");
    }
    deletePlayer(id: string): Promise<SuccessResponse<void>> {
        throw new Error("Method not implemented.");
    }
    getPlayers(): Promise<PaginatedResponse<getPlayerDTO>> {
        throw new Error("Method not implemented.");
    }
}

export default PlayerImplementation;