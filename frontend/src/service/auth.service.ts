import { AxiosResponse } from 'axios'
import { User } from '../context/UserContext'

interface AuthService {
  login(user: Partial<User>): Promise<AxiosResponse | undefined>
  logout(): Promise<boolean>
  register(user: Partial<User>): Promise<boolean>
  getMe(): Promise<AxiosResponse | undefined>
}

export default AuthService
