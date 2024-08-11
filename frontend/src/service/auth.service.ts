import { AuthLogin, AuthRegister } from '../types/auth.type'

interface AuthService {
  login(user: AuthLogin): Promise<boolean>
  logout(): Promise<boolean>
  register(user: AuthRegister): Promise<boolean>
}

export default AuthService
