import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowUp, UnplugIcon } from "lucide-react";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_HOST;

  async function fetchBlogs() {
    try {
      const response = await axios.get(`${API_URL}/api/blog`, {
        withCredentials: true,
      });
      setBlogs(response.data.user);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch blogs");
    }
  }

  async function checkLoggedIn() {
    try {
      const response = await axios.get(`${API_URL}/api/blog/check`, {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.success);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    checkLoggedIn();
    fetchBlogs();
  }, []);


  const limiter = (content) => {
    const words = content.split(" ");
    if (words.length > 30) {
      return words.slice(0, 20).join(" ") + "...";
    }
    return content;
  };

  return (
    <div>
      <div className="Home_header" id="Top_heading">
        <div className="Arrow">
          <a href="#Top_heading" className="Arrow_content">
            <ArrowUp />
          </a>
        </div>
        <div className="Home_page">
          <h1>Create Your Own Blog Here</h1>
        </div>
        <div className="description">
          <div className="description_items">
            <p>
              Welcome to Our Blogging Platform!** Blogs are more than just words
              on a screen—they are a gateway to ideas, experiences, and stories
              that inspire, educate, and connect people across the world..
              That's why we offer seamless navigation, secure authentication,
              and an interactive experience where users can like, comment, and
              share their favorite blogs. Start your blogging journey
              today—write, express, and make your voice heard. Because every
              story deserves to be told, and every perspective adds value to the
              conversation.
            </p>
          </div>
          <div className="description_items Blog1 ">
            <img
              src="/pexels-pixabay-262508.jpg"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
          <div className="description_items">
            <img
              src="/pexels-padrinan-1591056.jpg"
              alt=""
              width="100%"
              height="100%"
            />
          </div>
          <div className="description_items">
            <p>
              Our passionate writers are dedicated to providing insightful
              articles, tips, and personal stories that inspire and inform.
              Whether you're seeking practical advice, the latest trends, or
              simply a good read, our blogs are designed to engage and enrich
              your experience. Join our community of readers and discover a
              world of information. Dive in and let the exploration begin!
            </p>
          </div>
        </div>
        <div className="Home_page">
          <h1>List of Blogs of the Users</h1>
        </div>
        {blogs.length === 0 ? (
          <div className="Home_noBlog">
            <UnplugIcon className="unplug" size={300} />
            <p className="Home_Icon">No blogs available</p>
          </div>
        ) : (
          <div className="Component">
            {blogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <div className="collection">
                  <div className="title">
                    <h3>{blog.title}</h3>
                  </div>
                  <div className="content">
                    <p>{limiter(blog.content)}</p>
                    <span>Read more...</span>
                    <p>Post: {blog.id}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
