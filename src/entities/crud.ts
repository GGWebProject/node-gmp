import * as Joi from 'joi';

export const userValidationSchema = Joi.object({
  login: Joi.string().alphanum().min(2).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'))
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});
