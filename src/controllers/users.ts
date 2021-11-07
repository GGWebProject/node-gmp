import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import UserService from '../services/userService';
import { IGetAutoSuggestUsersRequest, IUserRequestSchema } from '../entities/crud';
import { RequiredUserInfoType } from '../entities/user';
import { UniqueIdType } from '../entities/uniqueId';

export const getAllUsers = (request: Request, response: Response): void => {
  response.json(UserService.getAllUsers());
};

export const getUser = (request: Request, response: Response): void => {
  const userId = request.params.user_id;
  const user = UserService.getUserById(userId);

  if (user.isFake) {
    response.status(404).json({ message: `Can't find a user with id: ${userId}` });
  }

  response.contentType('json');
  response.json(user);
};

export const deleteUser = (request: Request, response: Response): void => {
  const userId = request.params.user_id;
  const isDeletedUser = UserService.deleteUserById(userId);

  if (!isDeletedUser) {
    response.status(404).json({ message: `Can't find a user with id: ${userId}` });
  }

  response.status(204).json({ message: `User with id: ${userId} was deleted!` });
};

export const createUser = (request: ValidatedRequest<IUserRequestSchema>, response: Response): void => {
  const userInfo: RequiredUserInfoType = request.body;

  const isCreatedUser = UserService.createUser(userInfo);

  if (!isCreatedUser) {
    response.status(404).json({ message: 'Can\'t create a new user' });
  }

  response.status(200).json({ message: 'User was created', user: userInfo });
};

export const updateUser = (request: ValidatedRequest<IUserRequestSchema>, response: Response): void => {
  const userInfo: RequiredUserInfoType = request.body;
  const userId: UniqueIdType = request.params.user_id;

  const isUpdatedUser = UserService.updateUser(userId, userInfo);

  if (!isUpdatedUser) {
    response.status(404).json({ message: `Can't find a user with id: ${userId}` });
  }

  response.status(200).json({ message: 'User was updated', user: userInfo });
};

export const getAutoSuggestUsers = (request: IGetAutoSuggestUsersRequest, response: Response): void => {
  const { loginSubstring, limit } = request.query;
  const formattedLimit = Number(limit) || undefined;

  if (!loginSubstring) {
    response.status(404).json({ message: 'Login substing is empty.' });
  }

  const users = UserService.getAutoSuggestUsers(loginSubstring, formattedLimit);

  if (users.length === 0) {
    response.status(404).json({ message: `Can't find users with login substing: ${loginSubstring}` });
  }

  response.json(users);
};
