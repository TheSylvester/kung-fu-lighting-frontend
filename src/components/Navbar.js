const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navcontents">
        <div className="nav-hamburger">
          <i className="fa-solid fa-bars icon-hamburger"></i>
        </div>
        <a href="#top" className="logo">
          <div className="logo-chroma chroma-gradient animate-entrance pop delay-1">
            CHROMA
          </div>
          <div className="logo-gallery animate-entrance pop delay-2">
            GALLERY
          </div>
        </a>
        <a href="#top" className="nav-element animate-entrance pop delay-3">
          Home
        </a>
        <a
          href="#profiles"
          className="nav-element animate-entrance pop delay-4"
        >
          Profiles
        </a>
        <div className="nav-element animate-entrance pop delay-5">How-To</div>
        <div className="nav-element animate-entrance pop delay-6">About</div>
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
