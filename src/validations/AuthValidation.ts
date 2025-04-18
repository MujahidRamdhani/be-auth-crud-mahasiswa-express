import Joi from 'joi';

const registerValidation = Joi.object({
  namaLengkap: Joi.string().max(200).required(),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().max(200).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().max(200).required(),
  password: Joi.string().max(200).required(),
});

export { registerValidation, loginValidation };
