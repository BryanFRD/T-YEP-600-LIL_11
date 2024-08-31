import axios from 'axios'

import api from '../../api/axios.config'
import AuthService from '../auth.service'
import { AuthLogin, AuthRegister } from '../../types/auth.type'
import logger from '../../logger/logger'
import { User } from '../../types/user.type'

class AuthImplementation implements AuthService {
  login(user: AuthLogin): Promise<boolean> {
    return api.post('/auth/login', user).then(response => {
      if (response.status === axios.HttpStatusCode.Ok) {
        localStorage.setItem('access_token', response.data.content.access_token)
        return true
      }
      
      logger.error('Error while logging in:', response)
      
      throw new Error('Error while logging in');
    });
  }

  logout(): Promise<boolean> {
    return api.post('/auth/logout').then(response => {
      if (response.status === axios.HttpStatusCode.Ok) {
        localStorage.removeItem('access_token')
        return true
      }
      
      logger.error('Error while logging out:', response)
      
      throw new Error('Error while logging out');
    });
  }
  
  register(user: AuthRegister): Promise<boolean> {
    return api.post('/auth/register', user).then(response => {
      if (response.status === axios.HttpStatusCode.Created) {
        return true
      }
      
      logger.error('Error while registering user:', response)
      
      throw new Error('Error while registering user');
    });
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
