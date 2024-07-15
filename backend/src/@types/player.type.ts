type Player = {
  id: string;
  email: string;
  name: string;
  firstname: string;
  password: string;
  username: string;
  lastConnection: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type getPlayerDTO = {
  id: string;
  name: string;
  email: string;
  username: string;
  firstname: string;
  lastConnection: Date | null;
};

type createPlayerDTO = {
  name: string;
  email: string;
  username: string;
  firstname: string;
  password: string;
};

export type { Player, getPlayerDTO, createPlayerDTO };
