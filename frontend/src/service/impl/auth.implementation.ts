import axios from 'axios'

import api from '../../api/axios.config'
import AuthService from '../auth.service'
import { AuthLogin, AuthRegister } from '../../types/auth.type'
import logger from '../../logger/logger'
import { User } from '../../types/user.type'

class AuthImplementation implements AuthService {
  async login(user: AuthLogin): Promise<boolean> {
    try {
      const response = await api.post('/auth/login', user)
      if (response.status === axios.HttpStatusCode.Ok) {
        localStorage.setItem('access_token', response.data.content.access_token)
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
  
  async refreshToken(): Promise<boolean> {
    try {
      const response = await api.post('/auth/refresh-token')
      
      logger.info('Refresh token response:', response)
      
      if (response.status === axios.HttpStatusCode.Ok) {
        localStorage.setItem('access_token', response.data.content.access_token)
        return true
      }
      
      localStorage.removeItem('access_token')
      return false
    } catch (error) {
      return false;
    }
  }
  
  me(): User | null {
    const token = localStorage.getItem('access_token')
    
    if (!token) {
      return null
    }
    
    const payload = token.split('.')[1]
    const data = JSON.parse(atob(payload))
    
    return data.user
  }
  
}

export default AuthImplementation
