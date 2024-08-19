import { AxiosResponse } from 'axios';
import instance from '../../api/axios.config'
import { User } from '../../context/UserContext'
import AuthService from '../auth.service'

class AuthImplementation implements AuthService {


  async getMe(): Promise<AxiosResponse | undefined> {
    try {
      const response = await instance.get('/auth/me');
      return response;
    }
    catch (error) {
      console.error(error)
    }

    return undefined;
  }


  async login(user: Partial<User>): Promise<AxiosResponse | undefined> {
    try {
      return await instance.post('/auth/login', user);
    } catch (error) {
      console.error(error)
    }
    
    return undefined;
  }

  logout(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  register(_user: Partial<User>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

export default AuthImplementation
