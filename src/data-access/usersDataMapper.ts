import { User, DalUser } from '../entities/user';

export interface IUsersDataMapper {
  toDomain: (id: number, login: string, password: string, age: number) => User;
  toDalEntity: (login: string, password: string, age: number) => DalUser;
}

class UsersDataMapper implements IUsersDataMapper {
  // for app
  toDomain(id: number, login: string, password: string, age: number): User {
    return new User({ id, login, password, age });
  }

  // for server
  toDalEntity(login: string, password: string, age: number): DalUser {
    return new DalUser({ login, password, age });
  }
}

export const UsersDataMapperInstance = new UsersDataMapper();
