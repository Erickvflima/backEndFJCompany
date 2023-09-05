import Joi from 'joi';

export const signinSchema = Joi.object({
  cpf: Joi.string().required(),
});
export const listUsersSchema = Joi.object({
  cpf: Joi.string().allow('null'),
  status: Joi.string().valid('Ativo', 'Inativo').trim().allow('null'),
});
