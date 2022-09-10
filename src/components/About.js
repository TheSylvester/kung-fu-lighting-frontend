import React from "react";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import VideoJS from "./VideoJS";

import ABOUT_VIDEO_URL from "../assets/silver-setup.mp4";

export const About = () => {
  const videoJsOptions = {
    controls: false,
    loop: true,
    autoplay: true,
    muted: true,
    fluid: true,
    sources: [
      {
        src: ABOUT_VIDEO_URL,
        type: "video/mp4"
      }
    ]
  };

  return (
    <>
      <section className="relative-parent">
        <ScrollToTopOnMount />
        <div className="about hero-frame">
          <div className="about title-frame flex-rows">
            <div className="about">
              <h1 className="animate-entrance pop delay-1">about:</h1>
            </div>
            <div>
              <div className="logo-chroma logo-large chroma-gradient animate-entrance pop delay-3">
                CHROMA
              </div>
              <div className="logo-gallery logo-large animate-entrance pop delay-4">
                GALLERY
              </div>
            </div>
          </div>
          <div className="about-video">
            <VideoJS id="about-video" tinted="55%" options={videoJsOptions} />
          </div>
        </div>
      </section>
      <section className="about-content">
        <div className="about-content-foreground">
          <h3 className="about-content-header">WHAT IS CHROMA GALLERY?</h3>
          <p>
            Just post a video of your{" "}
            <a href="https://www.razer.com" target="_blank" rel="noreferrer">
              Razer
            </a>{" "}
            gear and RGB lighting profile on the{" "}
            <a
              href="https://www.reddit.com/r/ChromaProfiles/"
              target="_blank"
              rel="noreferrer"
            >
              /r/ChromaProfiles
            </a>{" "}
            sub-reddit and drop a{" "}
            <a href="https://drive.google.com" target="_blank" rel="noreferrer">
              Google Drive
            </a>{" "}
            download link to the .ChromaEffects file in the comments, and your
            profile will automatically be showcased on Chroma Gallery. How
            simple is that?
          </p>
          <p>
            Chroma Gallery is a permanent showroom for RGB profile artists on
            Reddit and Discord to exhibit and share their Synapse 3 profiles
            with other{" "}
            <a href="https://www.razer.com" target="_blank" rel="noreferrer">
              Razer
            </a>{" "}
            keyboard users as frictionlessly as possible. Our NodeJS backend
            queries{" "}
            <a href="https://pushshift.io/" target="_blank" rel="noreferrer">
              Pushshift.io
            </a>{" "}
            and{" "}
            <a href="https://www.reddit.com/" target="_blank" rel="noreferrer">
              Reddit
            </a>{" "}
            through their REST APIs periodically for video posts on the
            sub-reddit with a{" "}
            <a href="https://drive.google.com" target="_blank" rel="noreferrer">
              Google Drive
            </a>{" "}
            download link, then analyzes the downloaded profiles to gather data
            on devices, effects, and colours used in each profile. This site
            aims to be a first-stop for gamers looking to customize their
            brand-new{" "}
            <a href="https://www.razer.com" target="_blank" rel="noreferrer">
              Razer
            </a>{" "}
            gear, and a focus of inspiration for profile makers to create and
            share their profiles with the community.
          </p>
          <p>
            Chroma Gallery is an archive of{" "}
            <a href="https://www.razer.com/" target="_blank" rel="noreferrer">
              Razer
            </a>{" "}
            RGB Lighting Profiles for Synapse 3 from{" "}
            <a
              href="https://www.reddit.com/r/ChromaProfiles/"
              target="_blank"
              rel="noreferrer"
            >
              /r/ChromaProfiles
            </a>{" "}
            on{" "}
            <a href="https://www.reddit.com/" target="_blank" rel="noreferrer">
              Reddit
            </a>
            .
          </p>
        </div>
        <div className="about-content-foreground">
          <h3 className="about-content-header">WHO MADE THIS, AND WHY?</h3>
          <p>
            I'm Sylvester Wong, and I made Chroma Gallery as my first full-stack
            web development project using MongoDB, Express, React, and NodeJS on
            the journey to land my first job as a front-end, back-end, or
            full-stack developer.
          </p>
          <p>
            I'm a mostly self-taught web developer with some college experience
            in the LAMP stack many years ago. I recently updated my knowledge by
            taking the{" "}
            <a href={"https://fullstackopen.com/en/"}>Full Stack Open</a> course
            offered by the University of Helsinki, then started building this
            site to practice and demonstrate my development and design
            abilities. I am proficient in Javascript and have years of hobbyist
            experience writing in C# for Unity Game Development and VR game
            prototyping.
          </p>
          <p>
            It is my dream to become a web developer. If you are a hiring
            manager from Toronto, Canada who happens to have an opening for a
            Junior Full Stack, Front-End, or Back-End Developer, or perhaps have
            a remote opening, please{" "}
            <a href="mailto:sylvester@thesylvester.ca">contact me</a>, I would
            love to hear from you.
          </p>
        </div>
      </section>
    </>
  );
};
