// noinspection HtmlUnknownAnchorTarget

import React, { useState } from "react";
import "./App.css";
import "https://kit.fontawesome.com/ddca20bf1d.js";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ProfilesGallery } from "./components/Profiles";
import { ProfilesSearch, SearchBars } from "./components/ProfilesSearch";

const Divider = () => <div className="divider-gap"></div>;

const Footer = () => {
  return (
    <section className="footer">
      <a href="#profiles">
        <i className="fa-solid fa-angle-up footer-arrow"></i>see other profiles
        <i className="fa-solid fa-angle-up footer-arrow"></i>
      </a>
    </section>
  );
};

export const SearchItemsContext = React.createContext({});

const App = () => {
  const [searchItems, SetSearchItems] = useState({});

  const changeSearchItems = (newSearchItems) => {
    SetSearchItems(newSearchItems);
  };

  return (
    <SearchItemsContext.Provider value={{ searchItems, changeSearchItems }}>
      <Navbar />
      <Hero />
      <Divider />
      <ProfilesSearch />
      <SearchBars />
      <ProfilesGallery />
      <Footer />
    </SearchItemsContext.Provider>
  );
};

export default App;
