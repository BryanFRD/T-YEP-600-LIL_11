import { Player } from './player.type';

type RegisterDTO = {
  email: Player['email'];
  name: Player['name'];
  username: Player['username'];
  firstname: Player['firstname'];
  password: Player['password'];
};

type LoginDTO = {
  identifier: Player['email'] | Player['username'];
  password: Player['password'];
};

type AuthResponse = {
  token: string;
};

export type { RegisterDTO, LoginDTO, AuthResponse };
