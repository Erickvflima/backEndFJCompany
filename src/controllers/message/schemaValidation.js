import Joi from 'joi';

export const listMessageSchema = Joi.object({
  teamId: Joi.number(),
  status: Joi.string().valid('Ativo', 'Inativo').trim(),
});
export const deleteMessageSchema = Joi.object({
  id: Joi.number().required(),
});
export const changeMessageSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Ativo', 'Inativo').trim().required(),
});
export const newMessageSchema = Joi.object({
  teamId: Joi.number().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Ativo', 'Inativo').trim().required(),
});
