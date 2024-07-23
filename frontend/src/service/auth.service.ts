import { User } from '../context/UserContext'

interface AuthService {
  login(user: Partial<User>): Promise<boolean>
  logout(): Promise<boolean>
  register(user: Partial<User>): Promise<boolean>
}

export default AuthService
