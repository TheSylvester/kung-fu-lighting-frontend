import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLoginContext } from "../contexts/LoginContext";
import config from "../config.json";

const CLIENT_ID = config.CLIENT_ID;
const RANDOM_STRING = Math.random().toString(36).slice(-5); // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const REDIRECT_URI = `${config.BACKEND_URL}/oauth/redirect`;
const DURATION = "permanent";
const SCOPE_STRING = "identity,vote,history,read";
const loginURL = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE_STRING}`;

const closeOnClick = (e) => {
  const handleClick = (f) => {
    console.log(f.target, e.target);
    document.removeEventListener("click", handleClick, {
      capture: true
    });
    if (!f.target.classList.contains("icon-hamburger")) {
      e.target.checked = false;
    }
  };

  if (e.target.checked === true) {
    document.addEventListener("click", handleClick, {
      capture: true
    });
  } else {
    // turn off listener on any unchecking
    document.removeEventListener("click", handleClick, { capture: true });
  }
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useLoginContext();

  return (
    <nav className="navbar">
      <div className="nav-contents">
        <div className="nav-hamburger">
          <label htmlFor="nav-dropdown-toggle" className="nav-dropdown-button">
            <i className="fa-solid fa-bars icon-hamburger"></i>
          </label>
          <input
            type="checkbox"
            id="nav-dropdown-toggle"
            className="hidden-checkbox"
            onChange={closeOnClick}
          />
          <div className="nav-dropdown-menu">
            <HashLink to="/#top" className="nav-dropdown-menu nav-link">
              Home
            </HashLink>
            <HashLink to="/#profiles" className="nav-dropdown-menu nav-link">
              Profiles
            </HashLink>
            <Link to="/help" className="nav-dropdown-menu nav-link">
              Help
            </Link>
            <Link to="/about" className="nav-dropdown-menu nav-link">
              About
            </Link>
          </div>
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

        {isAuthenticated && user?.name ? (
          <div className="login">
            <button onClick={logout}>
              <div className="login-username animate-entrance pop delay-7">
                {user.name}
              </div>
            </button>
            {user.snoovatar_img && (
              <img
                className={"animate-entrance delay-8"}
                src={user.snoovatar_img}
                width="25"
                alt="snoovatar"
              />
            )}
          </div>
        ) : (
          <div className="login">
            <a href={loginURL} target="_blank" rel="noreferrer">
              <div className="login-username animate-entrance pop delay-7">
                Log in
              </div>
            </a>
            <a href={loginURL} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-reddit-square login-icon animate-entrance pop delay-8"></i>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
