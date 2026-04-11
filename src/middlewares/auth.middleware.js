import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protect = async (req, res, next) => {
	try {
		const header = req.headers.authorization

		if (!header || !header.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Not authorized" })
		}

		const token = header.split(" ")[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findById(decoded.id)
		if (!user) {
			return res.status(401).json({ message: "User not found" })
		}

		req.user = user
		next()
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" })
	}
}

export const authorizeRoles = (roles, message = "Bu amalga ruxsat yo'q") => {
	return (req, res, next) => {
		if (!req.user || !roles.includes(req.user.role)) {
			return res.status(403).json({ message })
		}

		next()
	}
}
