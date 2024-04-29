import * as Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  color: Joi.string().required().messages({
    'string.empty': 'Color is required',
    'any.required': 'Color is required',
  }),
});

const update = Joi.object({
  name: Joi.string().messages({
    'string.empty': 'Name should not be an empty string',
  }),
  color: Joi.string().messages({
    'string.empty': 'Color should not be an empty string',
  }),
}).min(1);

export default { create, update };
