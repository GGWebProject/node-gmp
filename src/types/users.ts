import { Request } from 'express';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import * as core from 'express-serve-static-core';

export type UserDTO = {
  login: string;
  password: string;
  age: number;
};

export interface IGetAutoSuggestUsersQuery {
  loginSubstring: string;
  limit: string;
}

export interface IGetAutoSuggestUsersRequest<
  ReqBody = any,
  ReqQuery = IGetAutoSuggestUsersQuery,
  URLParams = core.ParamsDictionary,
> extends Request<URLParams, any, ReqBody, ReqQuery> {}

export interface IUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserDTO;
}
