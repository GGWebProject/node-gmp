import * as Joi from 'joi';
import { Request } from 'express';
import * as core from 'express-serve-static-core';
import {
  ContainerTypes,
  ValidatedRequestSchema,
} from 'express-joi-validation';
import { RequiredUserInfoType } from './user';

export interface IGetAutoSuggestUsersQuery {
  loginSubstring: string;
  limit: string;
}

export interface IGetAutoSuggestUsersRequest<ReqBody = any, ReqQuery = IGetAutoSuggestUsersQuery, URLParams = core.ParamsDictionary> extends Request<URLParams, any, ReqBody, ReqQuery> {}

export const userValidationSchema = Joi.object({
  login: Joi
    .string()
    .alphanum()
    .min(2)
    .required(),
  password: Joi
    .string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'))
    .required(),
  age: Joi
    .number()
    .integer()
    .min(4)
    .max(130)
    .required(),
});

export interface IUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: RequiredUserInfoType,
}
