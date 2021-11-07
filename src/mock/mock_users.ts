import faker from 'faker';
import { User } from '../entities/user';

export const GET_MOCK_USERS = (usersCounts: number = 20): User[] => (
  new Array(usersCounts)
    .fill(null)
    .map((): User => (
      new User({
        login: faker.name.firstName(),
        password: faker.internet.password(8),
        age: faker.datatype.number({ min: 4, max: 130 }),
      })
    ))
);
