import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_HOST

  async function checkLoggedIn() {
    try {
      const response = await axios.get(`${API_URL}/api/blog/check`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsLoggedIn(response.data.success);
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.log("Error checking login status:", error);
    }
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div>
      <div className="login_form_header">
        <div className="login_form_container">
          <h1 className="login_h1">Login</h1>
          <form onSubmit={handleLogin} className="form_container">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Type your email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Type your Password"
              />
            </div>
            <button type="submit" className="login_action">
              Login
            </button>
          </form>
          <div className="login_card">
            <p className="form_sign">Or Signup</p>
            <Link to="/register">
              <button className="sign_button">SIGN UP</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
