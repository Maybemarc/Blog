import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import RegisterPage from "./components/Register";
import LoginPage from "./components/Login";
import CreateBlog from "./pages/CreateBlog";
import { Toaster } from "react-hot-toast";
import EditBlog from "./pages/EditBlog";
import UserBlogs from "./pages/UserBlogs";
import BlogPage from "./pages/BlogPage";
import Elements_list from "./components/Elements_list";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/user-blog" element={<UserBlogs />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/blog/Element" element={<Elements_list />} />
      </Routes>
      <Elements_list />
      <Toaster />
    </div>
  );
}

export default App;
