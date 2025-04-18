import Joi from 'joi';

const getByNIM = Joi.object({
  NIM: Joi.string().max(200).required(),
});

const getByNAMA = Joi.object({
  NAMA: Joi.string().max(200).required(),
});

const getByYMD = Joi.object({
  YMD: Joi.string().max(200).required(),
});

export { getByNIM, getByNAMA, getByYMD };
