import mongoose from "mongoose"
import * as todoRepository from "../repositories/todo.repository.js"
import * as userRepository from "../repositories/user.repository.js"

const checkTodoId = (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("Invalid todo ID format")
		error.statusCode = 400
		throw error
	}
}

const checkUserId = (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("Invalid user ID format")
		error.statusCode = 400
		throw error
	}
}

export const getAllTodos = async (currentUser, query) => {
	const filters = {}

	if (currentUser.role === "admin") {
		if (query.assignedTo) {
			checkUserId(query.assignedTo)
			filters.assignedTo = query.assignedTo
		}
	} else {
		filters.assignedTo = currentUser._id
	}

	return todoRepository.findAllTodos(filters)
}

export const getTodoById = async (id, currentUser) => {
	checkTodoId(id)

	const todo = await todoRepository.findTodoById(id)

	if (!todo) {
		const error = new Error("Todo not found")
		error.statusCode = 404
		throw error
	}

	if (
		currentUser.role !== "admin" &&
		todo.assignedTo &&
		todo.assignedTo._id.toString() !== currentUser._id.toString()
	) {
		const error = new Error("Siz bu todo ni ko'ra olmaysiz")
		error.statusCode = 403
		throw error
	}

	return todo
}

export const createTodo = async (data, currentUser, adminUserId) => {
	checkUserId(adminUserId)

	if (currentUser._id.toString() !== adminUserId) {
		const error = new Error("URL dagi user bilan token user mos emas")
		error.statusCode = 403
		throw error
	}

	if (currentUser.role !== "admin") {
		const error = new Error("Userlar todo yarata olmaydi!")
		error.statusCode = 403
		throw error
	}

	checkUserId(data.assignedTo)

	const assignedUser = await userRepository.findUserById(data.assignedTo)

	if (!assignedUser) {
		const error = new Error("Biriktiriladigan user topilmadi")
		error.statusCode = 404
		throw error
	}

	if (assignedUser.role !== "user") {
		const error = new Error("Todo faqat oddiy user ga biriktiriladi")
		error.statusCode = 400
		throw error
	}

	return todoRepository.createTodo({
		title: data.title,
		description: data.description,
		isCompleted: data.isCompleted,
		assignedTo: data.assignedTo,
		createdBy: currentUser._id,
	})
}

export const updateTodo = async (id, data, currentUser) => {
	if (currentUser.role !== "admin") {
		const error = new Error("Faqat admin todo ni o'zgartira oladi")
		error.statusCode = 403
		throw error
	}

	checkTodoId(id)

	if (data.assignedTo) {
		checkUserId(data.assignedTo)

		const assignedUser = await userRepository.findUserById(data.assignedTo)

		if (!assignedUser) {
			const error = new Error("Biriktiriladigan user topilmadi")
			error.statusCode = 404
			throw error
		}

		if (assignedUser.role !== "user") {
			const error = new Error("Todo faqat oddiy user ga biriktiriladi")
			error.statusCode = 400
			throw error
		}
	}

	const todo = await todoRepository.updateTodoById(id, data)

	if (!todo) {
		const error = new Error("Todo not found")
		error.statusCode = 404
		throw error
	}

	return todo
}

export const deleteTodo = async (id, currentUser) => {
	if (currentUser.role !== "admin") {
		const error = new Error("Faqat admin todo ni o'chira oladi")
		error.statusCode = 403
		throw error
	}

	checkTodoId(id)

	const todo = await todoRepository.deleteTodoById(id)

	if (!todo) {
		const error = new Error("Todo not found")
		error.statusCode = 404
		throw error
	}

	return todo
}
