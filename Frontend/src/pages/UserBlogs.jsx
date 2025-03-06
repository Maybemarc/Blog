import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Newspaper, PackagePlus, PlusIcon, TrashIcon, UnplugIcon } from "lucide-react";

function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_HOST;

  async function checkLoggedIn() {
    try {
      const response = await axios.get(`${API_URL}/api/blog/check`, {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.success);
      if (!response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      navigate("/login");
    }
  }

  async function fetchUserBlogs() {
    try {
      const response = await axios.get(`${API_URL}/api/blog/blogs`, {
        withCredentials: true,
      });
      setUserBlogs(response.data.user);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch user blogs");
    }
  }

  useEffect(() => {
    checkLoggedIn();
    fetchUserBlogs();
  }, []);

  async function handleDelete(blogId) {
    try {
      await axios.delete(`${API_URL}/api/blog/${blogId}`, {
        withCredentials: true,
      });
      setUserBlogs(userBlogs.filter((blog) => blog.id !== blogId));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  }

  async function handleEdit(blogId) {
    navigate(`/edit-blog/${blogId}`);
  }

  const limiter = (content) => {
    const words = content.split(" ");
    if (words.length > 30) {
      return words.slice(0, 100).join(" ") + "...";
    }
    return content;
  };

  return (
    <div>
      <div className="User_header_container">
        <div className="User_page">
          <h1> Create Your Own Blogs</h1>
        </div>

        {userBlogs.length === 0 ? (
          <div className="Home_noBlog">
            <PackagePlus className="unplug" size={300} />
            <p className="Home_Icon">Create a blog</p>
          </div>
        ) : (
          <div className="User_Container">
            {userBlogs.map((blog) => (
              <div key={blog.id} className="blog-item">
                <div className="blog_title">
                  <h1>Title</h1>
                  <h2 className="blog_h2">{blog.title}</h2>
                  <p>Created at:</p>
                  <p className="blog_span">
                    {new Date(blog.created_at).toLocaleString()}
                  </p>
                </div>
                <Link to={`/blog/${blog.id}`}>
                  <div className="blog_content">
                    <h1>Content</h1>
                    <p>{limiter(blog.content)}</p>
                    <span>Read More...</span>
                  </div>
                </Link>
                <div className="blog_btn">
                  <button
                    className="btn_Edit"
                    onClick={() => handleEdit(blog.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn_Delete"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <Link to="/create-blog">
            <button className="Create_btn">
              <PlusIcon />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserBlogs;
