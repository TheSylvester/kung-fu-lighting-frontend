// noinspection HtmlUnknownAnchorTarget

import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import { SearchAndGallery } from "./SearchAndGallery";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Help } from "./components/Help";
import { About } from "./components/About";
import { Lightbox } from "./components/Lightbox";
import useLightbox from "./hooks/Lightbox";
import useAuthenticatedUser from "./hooks/AuthenticatedUser";
import { LoginProvider } from "./contexts/LoginContext";

const Divider = () => <div className="divider-gap"></div>;

const App = () => {
  const { lightboxON, lightboxURL, openLightbox, closeLightbox } =
    useLightbox();

  const { isAuthenticated, user, logout } = useAuthenticatedUser();

  return (
    <Router>
      <LoginProvider value={{ isAuthenticated, user, logout }}>
        <Lightbox
          lightboxON={lightboxON}
          lightboxURL={lightboxURL}
          closeLightbox={closeLightbox}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home openLightbox={openLightbox} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </LoginProvider>
    </Router>
  );
};

const Home = ({ openLightbox }) => {
  return (
    <>
      <Hero openLightbox={openLightbox} />
      <Divider />
      <SearchAndGallery openLightbox={openLightbox} />
      <Footer />
    </>
  );
};

export default App;
