// noinspection HtmlUnknownAnchorTarget

import React, { useState } from "react";
import "./testpage.css";
import "https://kit.fontawesome.com/ddca20bf1d.js";
// import redditscrapeService from "./services/redditscrapes";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {
  ProfilesSearch,
  SearchBars,
  ProfilesGallery
} from "./components/Profiles";
// import { profilesService } from "./services/profiles";

/* eslint-disable */

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
  const [searchItems, SetSearchItems] = useState(null);

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
