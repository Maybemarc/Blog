import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username,SetUsername] = useState("")
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_HOST

  async function checkLoggedIn() {
    try {
      const response = await axios.get(`${API_URL}/api/blog/check`, {
        withCredentials: true,
      });  
      setIsLoggedIn(response.data.success);
      if (response.data.success) {
        SetUsername(response.data.username);
      }
      
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error checking login status:", error);
      }
    }
  }

  useEffect(() => {
    checkLoggedIn();

    const handleResize = () => {
      if (window.innerWidth > 800) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, [checkLoggedIn]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsLoggedIn(false);
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <button className="btn_nav logo_MyBLog">MyBlog</button>
        </Link>
        <button
          className="menu-icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu size={24} />}
        </button>
        <ul className={`navbar-menu ${isSidebarOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/">
                  <button className="btn_nav" onClick={closeSidebar}>
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/user-blog">
                  <button className="btn_nav" onClick={closeSidebar}>
                    Own Blogs
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/create-blog">
                  <button className="btn_nav" onClick={closeSidebar}>
                    Create Blog
                  </button>
                </Link>
              </li>
              <li onClick={closeSidebar}>
                <button onClick={handleLogout} className="btn_nav">
                  Logout
                </button>
              </li>
              <li>
              <Link to="/user-blog">
                  <button className="btn_nav" onClick={closeSidebar}>
                    {username}
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">
                  <button className="btn_nav" onClick={closeSidebar}>
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <button className="btn_nav" onClick={closeSidebar}>
                    Login
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button className="btn_nav" onClick={closeSidebar}>
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
