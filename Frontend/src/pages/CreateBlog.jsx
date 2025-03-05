import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_HOST

  async function checkLoggedIn() {
    try {
      const response = await axios.get(`${API_URL}/blog/check`, {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.success);
      if (!response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error checking login status:", error);
      }
      navigate("/login");
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  async function handleCreateBlog(e){
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/blog`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Blog created successfully");
        navigate("/user-blog");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div>
      <div className="Create_form_header">
        <div className="create_form_container">
          <h2 className="create_h1">CreateBlog</h2>
          <form onSubmit={handleCreateBlog} className="Own_form_container">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="own_title"
                maxLength="25"
                placeholder="Within 25 Words !"
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="Own_Content"
              />
            </div>
            <div className="Create_Cancel">
              <button type="submit" className="create_action">
                Create Blog
              </button>
              <Link to="/">
                <button type="submit" className="cancel_action">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
