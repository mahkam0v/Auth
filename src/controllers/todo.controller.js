import * as todoService from "../services/todo.service.js"

export const getTodos = async (req, res, next) => {
	try {
		const todos = await todoService.getAllTodos(req.user, req.query)
		res.json(todos)
	} catch (error) {
		next(error)
	}
}

export const getTodo = async (req, res, next) => {
	try {
		const todo = await todoService.getTodoById(req.params.id, req.user)
		res.json(todo)
	} catch (error) {
		next(error)
	}
}

export const createTodo = async (req, res, next) => {
	try {
		const todo = await todoService.createTodo(req.body, req.user, req.params.userId)
		res.status(201).json(todo)
	} catch (error) {
		next(error)
	}
}

export const updateTodo = async (req, res, next) => {
	try {
		const todo = await todoService.updateTodo(req.params.id, req.body, req.user)
		res.json(todo)
	} catch (error) {
		next(error)
	}
}

export const deleteTodo = async (req, res, next) => {
	try {
		const todo = await todoService.deleteTodo(req.params.id, req.user)
		res.json({
			message: "Todo deleted",
			todo,
		})
	} catch (error) {
		next(error)
	}
}
