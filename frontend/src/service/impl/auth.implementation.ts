import axios from 'axios'

import api from '../../api/axios.config'
import AuthService from '../auth.service'
import { AuthLogin, AuthRegister } from '../../types/auth.type'
import logger from '../../logger/logger'

class AuthImplementation implements AuthService {
  async login(user: AuthLogin): Promise<boolean> {
    try {
      const response = await api.post('/auth/login', user)
      if (response.status === axios.HttpStatusCode.Ok) {
        localStorage.setItem('access_token', response.data.access_token)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  logout(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  register(user: AuthRegister): Promise<boolean> {
    logger.info(user);
    throw new Error('Method not implemented.')
  }
}

export default AuthImplementation
