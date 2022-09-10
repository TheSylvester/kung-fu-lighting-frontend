import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navcontents">
        <div className="nav-hamburger">
          <i className="fa-solid fa-bars icon-hamburger"></i>
        </div>
        <HashLink to="/#top" className="logo">
          <div className="logo-chroma logo-small chroma-gradient animate-entrance pop delay-1">
            CHROMA
          </div>
          <div className="logo-gallery logo-small animate-entrance pop delay-2">
            GALLERY
          </div>
        </HashLink>
        <HashLink
          to="/#top"
          className="nav-element animate-entrance pop delay-3"
        >
          Home
        </HashLink>
        <HashLink
          to="/#profiles"
          className="nav-element animate-entrance pop delay-4"
        >
          Profiles
        </HashLink>
        <Link className="nav-element animate-entrance pop delay-5" to="/help">
          Help
        </Link>
        <Link className="nav-element animate-entrance pop delay-6" to="/about">
          About
        </Link>
        <div className="login">
          <div className="login-username animate-entrance pop delay-7">
            Log in
          </div>
          <i className="fa-brands fa-reddit-square login-icon animate-entrance pop delay-8"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
