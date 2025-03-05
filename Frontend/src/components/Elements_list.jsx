import { Github, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Elements_list() {
  const mail=  import.meta.env.VITE_MAIL
  const git = import.meta.env.VITE_GITHUB
  const SocialMedia = import.meta.env.VITE_INSTAGRAM

  return (
    <div>
      <div className="Details">
        <div className="MyBlog_down">
          <h1>MyBlog</h1>
        </div>
        <div className="Detailed_content only">
          <ul className="Detail_list">
            <h4 className="header_down">Contact</h4>
            <li className="Detail_full">
              <a href={git} target="blank">
                <Github className="icon" />
              </a>
            </li>
            <li className="Detail_full">
              <a href={mail} >
                <Mail className="icon" />
              </a>
            </li>
            <li className="Detail_full">
              <a href={SocialMedia} target="blank">
                <Instagram className="icon" />
              </a>
            </li>
          </ul>
        </div>
        <div className="Detailed_content">
          <ul className="Detail_list">
            <h4 className="header_down">BLOG</h4>
            <li className="Detail_full ">
              <Link to="/">
                <p className="Route_down">Home</p>
              </Link>
            </li>
            <li className="Detail_full">
              <Link to="/login">
                <p className="Route_down">Login</p>
              </Link>
            </li>
            <li className="Detail_full">
              <Link to="/register">
                <p className="Route_down">Signup</p>
              </Link>
            </li>
            <li className="Detail_full">
              <Link to="/create-blog">
                <p className="Route_down">Create a Blog</p>
              </Link>
            </li>
            <li className="Detail_full">
              <Link to="/user-blog">
                <p className="Route_down">OwnBlog</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="CopyRight">
          <div>
            <h2 className="Copy_text">CopyRight @2025</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Elements_list;
