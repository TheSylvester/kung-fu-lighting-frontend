// noinspection HtmlUnknownAnchorTarget

import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Help } from "./components/Help";
import { About } from "./components/About";
import { Lightbox } from "./components/Lightbox";
import { LoginProvider } from "./contexts/LoginContext";
import { LightboxProvider } from "./contexts/LightboxContext";

import useLightbox from "./hooks/Lightbox";
import useAuthenticatedUser from "./hooks/AuthenticatedUser";

const App = () => {
  const { lightboxON, lightboxURL, openLightbox, closeLightbox } =
    useLightbox();

  const { isAuthenticated, user, logout } = useAuthenticatedUser();

  return (
    <Router>
      <LoginProvider value={{ isAuthenticated, user, logout }}>
        <LightboxProvider value={{ openLightbox }}>
          <Lightbox
            lightboxON={lightboxON}
            lightboxURL={lightboxURL}
            closeLightbox={closeLightbox}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </LightboxProvider>
      </LoginProvider>
    </Router>
  );
};

export default App;
