import { sql } from "../config/db.js";

export const allBlogs = async (req, res) => {
  try {
    const response = await sql`
            SELECT * FROM blogs
            ORDER BY created_at ASC
            `
            ;

    res.status(200).json({ success: true, user: response });
  } catch (error) {
    console.log(`Erron in fetching ALl :`, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const singleBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await sql
    `SELECT * FROM blogs WHERE id = ${id}`

    if (response.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, user: response[0] });
  } catch (error) {
    console.log('Error in fetching single blog:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const ownBlogs = async (req, res) => {
  try {
    const response = await sql
      `
      SELECT * FROM blogs 
      WHERE user_id=${req.user.id}
      ORDER BY created_at DESC
      `
      ;

    if (response.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found" });
    }

    res.status(200).json({ success: true, user: response });
  } catch (err) {
    console.log(`Error in getting ownBlogs :`, err.message);
    res.status(400).json({ success: false, message: "Server  error" });
  }
};

export const CreateBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const response = await sql
      `
            INSERT INTO blogs (user_id,title,content)
            VALUES(${req.user.id},${title},${content})
             RETURNING *
            `
            ;

    res.status(200).json({ success: true, user: response[0] });
  } catch (error) {
    console.log(`Erron in Creating a Blog:`, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const response = await sql
      `
        SELECT * FROM blogs WHERE id=${id}
        `
        ;

    if (response.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updateResponse = await sql
      `
            UPDATE blogs
            SET title=${title},content=${content}
            WHERE id=${id}
            RETURNING *
            `
            ;

    res.status(200).json({ success: true, user: updateResponse[0] });
  } catch (error) {
    console.log(`Erron in Updating a Blog:`, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await sql
      `
            SELECT * FROM blogs 
            WHERE id=${id}
            `
            ;
      

    if (response.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (response[0].user_id !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await sql
      `
                DELETE FROM blogs
                WHERE id=${id}
                `
                ;

    res
      .status(200)
      .json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    console.log(`Erron in Deleing a Blog:`, error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
