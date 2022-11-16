import Hero from "./Hero";
import { SearchAndGallery } from "../SearchAndGallery";
import { Footer } from "./Footer";
import React from "react";

export const Home = () => {
  return (
    <>
      <Hero />
      <Divider />
      <SearchAndGallery />
      <Footer />
    </>
  );
};

const Divider = () => <div className="divider-gap"></div>;
