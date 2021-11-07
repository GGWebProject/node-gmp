import { RequiredUserInfoType, User } from '../entities/user';
import { GET_MOCK_USERS } from '../mock/mock_users';
import { UniqueIdType } from '../entities/uniqueId';

class UserService {
  private users: User[];

  constructor() {
    this.users = GET_MOCK_USERS() || [];
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: UniqueIdType): User {
    return this.users.find((user) => user.id === id) || this.getFakeUser();
  }

  deleteUserById(id: UniqueIdType): boolean {
    const user = this.getUserById(id);

    if (user.isFake) {
      return false;
    }

    user.remove();

    return true;
  }

  createUser(userInfo: RequiredUserInfoType): boolean {
    const user = new User(userInfo);

    this.users.push(user);

    return true;
  }

  updateUser(userId: UniqueIdType, userInfo: RequiredUserInfoType): boolean {
    const foundedUser = this.getUserById(userId);

    if (foundedUser.isFake) {
      return false;
    }

    Object.assign(foundedUser, userInfo);

    return true;
  }

  getAutoSuggestUsers(loginSubstring: string = '', limit: number = 10): User[] {
    const foundedUsers = this.users.filter((user) => (
      user.login.toLowerCase().includes(loginSubstring)
    ));

    if (foundedUsers.length === 0) {
      return [];
    }

    const sortedUsers = foundedUsers.sort((userA, userB) => (
      userA.login.localeCompare(userB.login, 'en', { ignorePunctuation: true })
    ));

    return sortedUsers.slice(0, limit);
  }

  getFakeUser(): User {
    return new User({
      login: 'Guest',
      password: '',
      age: 0,
      isFake: true,
    });
  }
}

export default new UserService();
