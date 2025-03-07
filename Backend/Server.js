import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.BACKEND;


const allowedOrigins =process.env.FRONTEND_URL

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 

    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);


app.use(cors());
app.use(express.json());
app.use(cookieParser());

async function initDB() {
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      reset_password_token VARCHAR(255),
      reset_password_expires_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `);
    console.log("Database Connected: Users");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

async function inBlogDB() {
  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS blogs(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `);
    console.log("Database connected: blogs");
  } catch (error) {
    console.log("Error initDB", error);
  }
}

await initDB();
await inBlogDB();

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
