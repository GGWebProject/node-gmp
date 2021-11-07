import UniqueIdService from '../services/uniqueIdService';
import { UniqueIdType } from './uniqueId';

export interface IUserInfo {
  login: string,
  password: string,
  age: number,
  isFake?: boolean,
}

export type RequiredUserInfoType = {
  login: string,
  password: string,
  age: number,
};

export class User {
  readonly id: UniqueIdType = UniqueIdService.generate();
  public login: string;
  public password: string;
  public age: number;
  public isDeleted: boolean = false;
  public isFake: boolean;

  constructor({
    login = '',
    password = '',
    age = 0,
    isFake = false,
  }: IUserInfo) {
    this.id = UniqueIdService.generate();
    this.login = login;
    this.password = password;
    this.age = age;
    this.isFake = isFake;
  }

  remove() {
    this.isDeleted = true;
  }
}
