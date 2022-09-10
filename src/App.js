// noinspection HtmlUnknownAnchorTarget

import React, { useState } from "react";
import "./App.css";
// import "https://kit.fontawesome.com/ddca20bf1d.js";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Footer } from "./components/Footer";
import { SearchAndGallery } from "./SearchAndGallery";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Help } from "./components/Help";
import { About } from "./components/About";
import { Lightbox } from "./components/Lightbox";

const Divider = () => <div className="divider-gap"></div>;

const App = () => {
  const [lightboxON, setLightboxON] = useState(false);
  const [lightboxURL, setLightboxURL] = useState("");

  const openLightbox = (url) => {
    setLightboxURL(url);
    setLightboxON(true);
    console.log("OPEN: ", url);
  };

  const closeLightbox = () => {
    setLightboxURL("");
    setLightboxON(false);
  };

  return (
    <Router>
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
