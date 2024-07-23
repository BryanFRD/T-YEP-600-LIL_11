import axios from 'axios'

import instance from '../../api/axios.config'
import { User } from '../../context/UserContext'
import AuthService from '../auth.service'

class AuthImplementation implements AuthService {
  async login(user: Partial<User>): Promise<boolean> {
    try {
      const response = await instance.post('/auth/login', user)
      console.log(response)
      if (response.status === axios.HttpStatusCode.Ok) {
        localStorage.setItem('access_token', response.data.access_token)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  }

  logout(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  register(_user: Partial<User>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

export default AuthImplementation
