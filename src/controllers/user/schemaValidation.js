import validateCpfSchema from '../../helper/schema.js';
import Joi from 'joi';

export const signinSchema = Joi.object({
  cpf: Joi.string()
    .max(11)
    .required()
    .custom((value, helpers) => {
      return validateCpfSchema(value, helpers.message);
    }),
});
export const listUsersSchema = Joi.object({
  cpf: Joi.string().allow('null'),
  status: Joi.string().valid('Ativo', 'Inativo').trim().allow('null'),
});
