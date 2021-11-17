import { Op } from 'sequelize';
import { User } from '../entities/user';
import { UserModel } from '../models/users';
import { UserDTO } from '../types/users';
import {
  IUsersDataMapper,
  UsersDataMapperInstance as UsersDataMapper,
} from './usersDataMapper';

export interface IUsersRepository {
  getAllUsers: () => Promise<User[]>;
  getUsersByLoginSubstring: (
    substring: string,
    limit: number,
  ) => Promise<User[]>;
  updateUser: (id: string, userData: UserDTO) => Promise<void>;
  getUserById: (id: string) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  createUser: (userData: UserDTO) => Promise<User>;
}

class UsersRepository implements IUsersRepository {
  constructor(
    private model: typeof UserModel,
    private mapper: IUsersDataMapper,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.model.findAll();

    return users.map((user) => {
      const { user_id: id, login, password, age } = user.get();

      return this.mapper.toDomain(id, login, password, age);
    });
  }

  async getUsersByLoginSubstring(substring: string, limit: number) {
    const users = await this.model.findAll({
      where: {
        login: {
          [Op.substring]: substring,
        },
      },
      order: ['login'],
      limit,
    });

    return users.map((user) => {
      const { user_id: id, login, password, age } = user.get();

      return this.mapper.toDomain(id, login, password, age);
    });
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.model.findByPk(userId);

    if (!user) {
      throw Error(`Can't find a user with id: ${userId}`);
    }

    const { user_id: id, login, password, age } = user.get();

    return this.mapper.toDomain(id, login, password, age);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      // model.destroy returns 0 if the user is not deleted, or 1 if the user is deleted
      const result = await this.model.destroy({
        where: {
          user_id: id,
        },
      });

      const transformedResult = Boolean(result);

      if (!transformedResult) {
        throw Error(`Can't delete the user with id: ${id}`);
      }
    } catch (error) {
      const { message } = error as Error;

      throw Error(message);
    }
  }

  async createUser(userData: UserDTO): Promise<User> {
    const { login, password, age } = userData;

    try {
      const dalUser = this.mapper.toDalEntity(login, password, age);
      const user = await this.model.create(dalUser);
      const userOptions = user.get();

      return this.mapper.toDomain(
        userOptions.user_id,
        userOptions.login,
        userOptions.password,
        userOptions.age,
      );
    } catch (error) {
      const { message } = error as Error;

      throw new Error(message);
    }
  }

  async updateUser(id: string, userData: UserDTO): Promise<void> {
    const { login, password, age } = userData;

    try {
      const dalUser = this.mapper.toDalEntity(login, password, age);
      // model.update returns 0 if the user is not updated, or 1 if the user is updated
      const [result] = await this.model.update(dalUser, {
        where: {
          user_id: id,
        },
      });

      const transformedResult = Boolean(result);

      if (!transformedResult) {
        throw Error(`Can't update the user with id: ${id}`);
      }
    } catch (error) {
      const { message } = error as Error;

      throw new Error(message);
    }
  }
}

export const UsersRepositoryInstance = new UsersRepository(
  UserModel,
  UsersDataMapper,
);
