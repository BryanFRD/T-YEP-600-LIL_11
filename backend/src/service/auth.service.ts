import { LoginDTO, RegisterDTO } from '../@types/auth.type';
import { getPlayerDTO } from '../@types/player.type';

interface AuthService {
  registerUser(user: RegisterDTO): Promise<Partial<getPlayerDTO>>;
  loginUser(user: LoginDTO): Promise<Partial<getPlayerDTO>>;
  logoutUser(): Promise<void>;
}

export default AuthService;
