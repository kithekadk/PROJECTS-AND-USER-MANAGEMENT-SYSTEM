import Joi from 'joi';

export const userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()

})

export const userLoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()

})