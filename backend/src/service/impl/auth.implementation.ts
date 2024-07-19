import bcrypt from 'bcrypt';

import { LoginDTO, RegisterDTO } from '../../@types/auth.type';
import { getPlayerDTO } from '../../@types/player.type';
import InvalidPassword from '../../error/InvalidPassword';
import UserNotFoundByIdentifier from '../../error/UserNotFoundByIdentifier';
import { toPlayerDTO } from '../../mapper/player.mapper';
import { db } from '../../utils/db.server';
import { hashPassword } from '../../utils/password.utils';
import AuthService from '../auth.service';

class AuthImplementation implements AuthService {
  async loginUser(user: LoginDTO): Promise<Partial<getPlayerDTO>> {
    const userFound = await db.player.findFirst({
      where: {
        OR: [
          {
            email: user.identifier,
          },
          {
            username: user.identifier,
          },
        ],
      },
    });

    if (!userFound) {
      throw new UserNotFoundByIdentifier(user.identifier);
    }

    const isValidPassword = await bcrypt.compare(
      user.password,
      userFound.password,
    );

    if (!isValidPassword) {
      throw new InvalidPassword(user.password);
    }

    const userDTO: getPlayerDTO = toPlayerDTO(userFound);

    return userDTO;
  }

  logoutUser(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async registerUser(user: RegisterDTO): Promise<Partial<getPlayerDTO>> {
    const hashedPassword = await hashPassword(user.password);

    const userCreated = await db.player.create({
      data: {
        firstname: user.firstname,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        username: user.username,
      },
    });

    const userDTO: getPlayerDTO = toPlayerDTO(userCreated);

    return userDTO;
  }
}

export default AuthImplementation;
