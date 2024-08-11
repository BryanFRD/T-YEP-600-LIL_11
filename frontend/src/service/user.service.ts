import { User } from '../types/user.type';

interface UserService {
  getUsers(): Promise<User[]>
  getUserById(id: number): Promise<User>
  createUser(user: User): Promise<User>
  updateUser(user: User): Promise<User>
  deleteUser(id: number): Promise<void>
  getCurrentUser(): Promise<User>
}

export default UserService
