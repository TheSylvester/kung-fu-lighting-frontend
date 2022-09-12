import React from "react";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import IMPORTING_PROFILES from "../assets/importing-profiles.gif";
import POST_TO_REDDIT from "../assets/post-to-reddit.jpg";

export const Help = () => {
  return (
    <section>
      <ScrollToTopOnMount />
      <div className="instructions-header-container">
        <h1 className="hero-heading float-shadow-text animate-entrance center-text">
          INSTRUCTIONS
        </h1>
      </div>
      <div className="instructions-container">
        <div className="instructions-panel">
          <h3 className="animate-entrance delay-2">
            IMPORTING DOWNLOADED PROFILES
          </h3>
          <img
            className="animate-entrance delay-3"
            src={IMPORTING_PROFILES}
            alt="importing profiles demo"
          />
          <ol className="animate-entrance delay-4">
            <li>
              In Razer Synapse, navigate to Chroma Studio via the top nav
              (sometimes hidden behind the 3 dots, see above)
            </li>
            <li>
              Inside Chroma Studio, click the 3 dots to see the options
              dropdown, and select IMPORT
            </li>
            <li>Locate and select your .ChromaEffects file</li>
            <li>
              Select the newly imported profile by name from the middle dropdown
              menu
            </li>
          </ol>
        </div>
        <div className="instructions-panel">
          <h3 className="animate-entrance delay-5">
            UPLOADING TO CHROMA GALLERY
          </h3>
          <ul className="animate-entrance delay-6">
            <li>
              Chroma Gallery is an archive of Synapse 3 Profiles from{" "}
              <a
                href="https://www.reddit.com/r/ChromaProfiles/"
                target="_blank"
                rel="noreferrer"
              >
                /r/ChromaProfiles
              </a>
            </li>
            <li>
              All video posts to the{" "}
              <a
                href="https://www.reddit.com/r/ChromaProfiles/"
                target="_blank"
                rel="noreferrer"
              >
                /r/ChromaProfiles
              </a>{" "}
              sub-reddit with a{" "}
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noreferrer"
              >
                Google Drive
              </a>{" "}
              download link for a .ChromaEffects file in the comments will
              automatically be archived every 15 minutes
            </li>
          </ul>
          <img
            className="animate-entrance delay-7"
            src={POST_TO_REDDIT}
            alt="post-to-reddit demo"
          />{" "}
          <h5 className="animate-entrance delay-8">
            To Get Your Profile Listed on Chroma Gallery:
          </h5>
          <ol className="animate-entrance delay-9">
            <li>
              Post a Video of your profile on{" "}
              <a
                href="https://www.reddit.com/r/ChromaProfiles/"
                target="_blank"
                rel="noreferrer"
              >
                /r/ChromaProfiles
              </a>
            </li>
            <li>
              Upload the .ChromaEffects file to a{" "}
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noreferrer"
              >
                Google Drive
              </a>{" "}
              and post the sharing link to the file in the comments
            </li>
            <li>
              Post must be a Video. The link must be from Google Drive, and must
              point to the file, not a folder. Link must be posted in the
              comments by the OP.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};
