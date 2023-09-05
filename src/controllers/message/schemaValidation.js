import Joi from 'joi';

export const listMessageSchema = Joi.object({
  teamId: Joi.number().allow('null'),
  status: Joi.string().valid('Ativo', 'Inativo').trim().allow('null'),
});
export const deleteMessageSchema = Joi.object({
  id: Joi.number().required(),
});
export const changeMessageSchema = Joi.object({
  teamId: Joi.number().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Ativo', 'Inativo').trim().required(),
  id: Joi.number(),
});
export const newMessageSchema = Joi.object({
  teamId: Joi.number().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Ativo', 'Inativo').trim().required(),
  id: Joi.number().allow('null'),
});
