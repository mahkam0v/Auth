import Todo from "../models/todo.model.js"

const todoPopulate = [
	{ path: "assignedTo", select: "name email role" },
	{ path: "createdBy", select: "name email role" },
]

export const findAllTodos = async (filters) => {
	return Todo.find(filters).populate(todoPopulate).sort({ createdAt: -1 })
}

export const findTodoById = async (id) => {
	return Todo.findById(id).populate(todoPopulate)
}

export const createTodo = async (data) => {
	const todo = await Todo.create(data)

	return Todo.findById(todo._id).populate(todoPopulate)
}

export const updateTodoById = async (id, data) => {
	return Todo.findByIdAndUpdate(id, data, { new: true }).populate(todoPopulate)
}

export const deleteTodoById = async (id) => {
	return Todo.findByIdAndDelete(id).populate(todoPopulate)
}
