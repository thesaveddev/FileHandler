import * as Joi from 'joi';

const categorySchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const create = Joi.object({
  note: Joi.string().required().messages({
    'string.empty': 'Note is required',
    'any.required': 'Note is required',
  }),
  category: Joi.alternatives().try(
    Joi.string(),
    categorySchema
  ),
  bg_color: Joi.string(),
  images: Joi.array().items(Joi.string()),
});

const update = Joi.object({
  note: Joi.string().messages({
    'string.empty': 'Note should not be an empty string',
  }),
  category: Joi.alternatives().try(
    Joi.string(),
    categorySchema
  ),
  bg_color: Joi.string(),
  images: Joi.array().items(Joi.string()),
}).min(1);

export { create, update };