import Joi from "joi";

export const taskValidator = Joi.object({
    projectName: Joi.string().required(),
    description: Joi.string().required(),
    endDate:Joi.date(),
    userId:Joi.number()
})

export const projectUserSchema = Joi.object({
    projectId: Joi.number().required(),
    userId: Joi.number().required()    
})

export const projectUserSchema2 = Joi.object({
    projectId: Joi.number().required()    
})