import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../config/db.js";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const response = await sql(
      `SELECT username FROM users WHERE id=${decoded.id}`
    );

    if (response.length > 0) {
      req.user = { id: decoded.id, username: response[0].username };
      next();
    } else {
      return res.status(404).json({ message: "User  not found" });
    }
  } catch (error) {
    console.log(`error in verifying`,error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};
