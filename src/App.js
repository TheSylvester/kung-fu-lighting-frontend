// noinspection HtmlUnknownAnchorTarget

import React, { useState } from "react";
import "./App.css";
import "https://kit.fontawesome.com/ddca20bf1d.js";
// import { SearchProvider, useSearchContext } from "./contexts/SearchContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { ProfilesGallery } from "./components/Profiles";
import { ProfilesSearch, SearchBars } from "./components/ProfilesSearch";

const Divider = () => <div className="divider-gap"></div>;

function SearchAndGallery() {
  const [query, setQuery] = useState({});

  return (
    <>
      <ProfilesSearch />
      <SearchBars setQuery={setQuery} />
      <ProfilesGallery query={query} />
    </>
  );
}

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Divider />
      <SearchAndGallery />
      <Footer />
    </>
  );
};

export default App;
