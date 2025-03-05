import express from "express";
import {
  allBlogs,
  CreateBlog,
  deleteBlog,
  ownBlogs,
  singleBlog,
  updateBlog,
} from "../controller/blogController.js";
import { verifyToken } from "../middleware.js/verifying.js";

const router = express.Router();

router.get("/", allBlogs);
router.get("/blogs", verifyToken, ownBlogs);
router.post("/", verifyToken, CreateBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);
router.get("/taken/:id", singleBlog);
router.get("/check", verifyToken, (req, res) => {
  res.json({ success: true, username: req.user.username });
});

export default router;
