import { Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UsersServiceInstance as UsersService } from '../../services/users';
import {
  IGetAutoSuggestUsersRequest,
  IUserRequestSchema,
  UserDTO,
} from '../../types/users';

export const getAllUsers = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const users = await UsersService.getAllUsers();

  response.json(users);
};

export const getUser = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const userId = request.params.user_id;

  try {
    const user = await UsersService.getUserById(userId);

    response.contentType('json').json(user);
  } catch (error) {
    const { message } = error as Error;

    response.status(404).json({ message });
  }
};

export const deleteUser = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const userId = request.params.user_id;

  try {
    await UsersService.deleteUserById(userId);

    response.status(204).json({ message: 'Success!' });
  } catch (error) {
    const { message } = error as Error;

    response.status(404).json({ message });
  }
};

export const createUser = async (
  request: ValidatedRequest<IUserRequestSchema>,
  response: Response,
): Promise<void> => {
  const userInfo: UserDTO = request.body;

  try {
    const user = await UsersService.createUser(userInfo);

    response.status(200).json({ message: 'User was created', user });
  } catch (error) {
    const { message } = error as Error;

    response.status(404).json({ message });
  }
};

export const updateUser = async (
  request: ValidatedRequest<IUserRequestSchema>,
  response: Response,
): Promise<void> => {
  const userInfo: UserDTO = request.body;
  const userId: string = request.params.user_id;

  try {
    await UsersService.updateUser(userId, userInfo);

    response.status(200).json({ message: 'User was updated', user: userInfo });
  } catch (error) {
    const { message } = error as Error;

    response.status(404).json({ message });
  }
};

export const getAutoSuggestUsers = async (
  request: IGetAutoSuggestUsersRequest,
  response: Response,
): Promise<void> => {
  const { loginSubstring, limit } = request.query;
  const formattedLimit = Number(limit) || undefined;

  try {
    const users = await UsersService.getAutoSuggestUsers(
      loginSubstring,
      formattedLimit,
    );

    response.json(users);
  } catch (error) {
    const { message } = error as Error;

    response.status(404).json({ message });
  }
};
