import Joi from "joi"

export const createTodoSchema = Joi.object({
	title: Joi.string().min(2).max(150).required(),
	description: Joi.string().allow("").optional(),
	isCompleted: Joi.boolean().optional(),
	assignedTo: Joi.string().required(),
})

export const updateTodoSchema = Joi.object({
	title: Joi.string().min(2).max(150).optional(),
	description: Joi.string().allow("").optional(),
	isCompleted: Joi.boolean().optional(),
	assignedTo: Joi.string().optional(),
}).min(1)
