import {
  IUsersRepository,
  UsersRepositoryInstance as UsersRepository,
} from '../data-access/users';
import { User } from '../entities/user';
import { UserDTO } from '../types/users';

class UsersService {
  private repository;

  constructor(usersRepository: IUsersRepository) {
    this.repository = usersRepository;
  }

  async getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers();
  }

  async getUserById(id: string): Promise<User> {
    return this.repository.getUserById(id);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.repository.deleteUser(id);
  }

  async createUser(userInfo: UserDTO): Promise<User> {
    return this.repository.createUser(userInfo);
  }

  async updateUser(userId: string, userInfo: UserDTO): Promise<void> {
    await this.repository.updateUser(userId, userInfo);
  }

  async getAutoSuggestUsers(
    loginSubstring: string = '',
    limit: number = 10,
  ): Promise<User[]> {
    return this.repository.getUsersByLoginSubstring(loginSubstring, limit);
  }
}

export const UsersServiceInstance = new UsersService(UsersRepository);
