type Player = {
    id: string;
    email: string;
    name: string | null;
    firstname: string | null;
    password: string | null;
    username: string | null;
    lastConnection: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

type getPlayerDTO = {
    id: string;
    name: string | null;
    email: string;
    username: string | null;
    firstname: string | null;
    lastConnection: Date | null;
}

type createPlayerDTO = {
    name: string;
    email: string;
    username: string;
    firstname: string;
    password: string;
}

export type { Player, getPlayerDTO, createPlayerDTO };





