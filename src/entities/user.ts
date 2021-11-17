export interface IUserConstructor {
  id: number;
  login: string;
  password: string;
  age: number;
}

export class DalUser {
  public login: string;
  public password: string;
  public age: number;

  constructor({ login = '', password = '', age = 0 }) {
    this.login = login;
    this.password = password;
    this.age = age;
  }
}

export class User {
  readonly id: number;
  public login: string;
  public password: string;
  public age: number;

  constructor({ id, login = '', password = '', age = 0 }: IUserConstructor) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
  }
}
