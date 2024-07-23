import instance from '../../api/axios.config'
import { User } from '../../context/UserContext'
import UserService from '../user.service'

class UserImplementation implements UserService {
  async getUsers(): Promise<User[]> {
    try {
      const response = await instance.get('/players')
      return response.data
    } catch (error) {
      throw new Error('Method not implemented.')
    }
  }

  getUserById(_id: number): Promise<User> {
    throw new Error('Method not implemented.')
  }
  createUser(_user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
  updateUser(_user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
  deleteUser(_id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default UserImplementation
