import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_HOST

  async function checkLoggedIn() {
    try {
      const response = await axios.get(`${API_URL}/blog`, {
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

  async function fetchBlog() {
    try {
      const response = await axios.get(
        `${API_URL}/blog/taken/${id}`,
        {
          withCredentials: true,
        }
      );
      setTitle(response.data.user.title);
      setContent(response.data.user.content);
    } catch (error) {
      console.log(`Error in fetching`, error);
    }
  }

  useEffect(() => {
    checkLoggedIn();
    fetchBlog();
  }, []);

  async function handleEditBlog(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/blog/${id}`,
        {
          title,
          content,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Blog updated successfully");
        navigate("/user-blog");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  }

  return (
    <div>
      <div className="Edit_form_header">
        <div className="create_form_container">
          <h2 className="create_h1">EditBlog</h2>
          <form onSubmit={handleEditBlog} className="Own_form_container">
            <div>
              <label htmlFor="title">Title</label>
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
              <button type="submit" className="Update_action">
                Update Blog
              </button>
              <Link to="/user-blog">
                <button type="submit" className="Update_Cancel_action">
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

export default EditBlog;
