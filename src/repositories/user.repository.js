import User from "../models/user.model.js"

export const findAllUsers = async (filters, page, limit) => {
	const skip = (page - 1) * limit

	return User.find(filters).skip(skip).limit(limit)
}

export const findUserById = async (id) => {
	return User.findById(id)
}

export const findUserByEmail = async (email) => {
	return User.findOne({ email })
}

export const createUser = async (data) => {
	return User.create(data)
}

export const deleteUserById = async (id) => {
	return User.findByIdAndDelete(id)
}