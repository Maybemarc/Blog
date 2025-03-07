import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sql } from "../config/db.js";

dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const emailResponse = await sql`
    SELECT * FROM users WHERE email=${email}
    `
    ;

    const Existing = await sql`
    SELECT * FROM users WHERE username=${username}
    `
    ;
    
    if (emailResponse && emailResponse.length > 0) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    if (Existing && Existing.length > 0) {
      return res.status(400).json({ success: false, message: "Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updated = await sql
      `
        INSERT INTO users(username,email,password_hash)
        VALUES(${username},${email},${hashedPassword}) RETURNING id, username, email, created_at
        `
        ;   

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: updated[0],
    });
  } catch (error) {
    console.log(`Error in register`, error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await sql
      `
      SELECT * FROM users 
      WHERE email=${email}
      `
      ;

      if (!response || response.length === 0) {
        return res.status(400).json({ success: false, message: "User  not found" });
      }

    const compare = await bcrypt.compare(
      password,
      response[0].password_hash
    );
    if (!compare)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: response[0].id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    res.status(200).json({ success: true, message: "Logged in" });
  } catch (error) {
    console.log(`Error in logging in`, error.message);
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
