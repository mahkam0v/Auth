import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js"
import pool from './config/db.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/todos", todoRoutes)

app.use((err, _req, res, _next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({
		error: err.message || "Internal server error"
	})
})

await AppDataSource.initialize();
console.log("Postgres TypeORM orqali ulandi");

const PORT = process.env.PORT || 3002

const startServer = async () => {
	await connectDB()

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

const result = await pool.query("SELECT NOW() as now");
if (result) console.log("Postgress Connected");

startServer()