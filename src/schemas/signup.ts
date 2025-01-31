import Joi, { ObjectSchema } from 'joi';

const signupSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Name must be of type string',
    'string.min': 'Invalid name',
    'string.max': 'Invalid name',
    'string.empty': 'Name is a required field'
  }),
  password: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Invalid email',
    'string.empty': 'Email is a required field'
  }),
  role: Joi.string()
    .valid('admin', 'cashier', 'warehouse_manager', 'sales_team', 'inventory_manager')
    .default('sales_team')
    .messages({
      'any.only': 'Invalid role provided'
    }),
 
});

export { signupSchema };
