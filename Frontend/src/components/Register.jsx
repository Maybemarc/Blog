import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3000";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_HOST

  async function checkLoggedIn(){
    try {
      const response = await axios.get(
        `${API_URL}/blog/check`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsLoggedIn(response.data.success);
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Error checking login status:", error);
      }
    }
  };

  useEffect(() => {

    checkLoggedIn();
  }, [checkLoggedIn]);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div>
      <div className="register_form_header">
        <div className="register_form_container">
          <h1 className="register_h1">Register</h1>
          <form onSubmit={handleRegister} className="form_container">
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Type your Username"
              />
            </div>
            <div>
              <label >Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Type your email"
              />
            </div>
            <div>
              <label >Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Type your Password"
              />
            </div>
            <button type="submit" className="register_action">
              Register
            </button>
          </form>
          <div className="register_card">
            <p className="form_sign">Already a User?</p>
            <Link to="/login">
              <button className="register_button">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
