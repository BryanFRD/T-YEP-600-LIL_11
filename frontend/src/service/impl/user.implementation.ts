import { HttpStatusCode } from 'axios'
import api from '../../api/axios.config'
import logger from '../../logger/logger'
import { User } from '../../types/user.type'
import UserService from '../user.service'

class UserImplementation implements UserService {
  getUsers(): Promise<User[]> {
    return api.get('/players')
      .then(response => {
        if(response.status === HttpStatusCode.Ok) {
          return response.data
        }
        throw new Error('No users found')
      });
  }

  getUserById(id: number): Promise<User> {
    return api.get(`/players/${id}`)
      .then(response => {
        if(response.status === HttpStatusCode.Ok) {
          return response.data
        }
        throw new Error('No user found')
      });
  }
  
  createUser(user: User): Promise<User> {
    logger.info(user)
    throw new Error('Method not implemented.')
  }
  
  updateUser(user: User): Promise<User> {
    logger.info(user)
    throw new Error('Method not implemented.')
  }
  
  deleteUser(id: number): Promise<void> {
    logger.info(id)
    throw new Error('Method not implemented.')
  }
  
  getCurrentUser(): Promise<User> {
    return api.get('/players/me')
      .then(response => {
        if(response.status === HttpStatusCode.Ok) {
          return response.data as User
        }
        throw new Error('No user found')
        }
      );
  }
}

export default UserImplementation
