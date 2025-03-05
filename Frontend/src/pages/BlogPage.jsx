import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPage() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState(null);
  const [isError, SetIsError] = useState(null);

  async function fetchBlog() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blog/taken/${id}`
      );
      SetIsError(null);
      setBlogs(response.data.user);
    } catch (error) {
      setBlogs(error);
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="total" >
      <div className="one_blog">
        <div>
          {isError && <p>{isError}</p>}
          {blogs ? (
            <div className="One_title">
              <h1>Blog Page - {blogs.id}</h1>
              <h2>{blogs.title}</h2>
              <p>Created at: <span className="Created_at" > {new Date(blogs.created_at).toLocaleDateString()}</span> </p>
              <h3>{blogs.content}</h3>
            </div>
          ) : (
            <p>No blog found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
