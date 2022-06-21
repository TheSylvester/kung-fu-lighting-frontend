import { useState, useEffect } from "react";
import { profilesService } from "../services/profiles";

const Hero = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedProfiles = async () => {
      const response = await profilesService.get(); // alter this call for featured profiles
      setFeaturedProfiles(response);
    };

    fetchFeaturedProfiles();
  }, []);

  // guard clause for featuredProfiles not loaded / not loadable
  if (featuredProfiles.length < 1) return null;

  const getPrevIndex = (i, max) => (i - 1 >= 0 ? i - 1 : max);
  const getNextIndex = (i, max) => (i + 1 <= max ? i + 1 : 0);

  // banner profile determined from useEffect and states
  const selectedProfile = featuredProfiles[selectedIndex];

  const videoURL = selectedProfile.videoURL;
  const title = selectedProfile.title;
  const OP = selectedProfile.OP;
  const colours = selectedProfile.profiles[0].colours;
  const devices = selectedProfile.profiles[0].devices;
  const effects = selectedProfile.profiles[0].effects;
  const likes = selectedProfile.score;
  const downloads = selectedProfile.score;

  const maxIndex = featuredProfiles.length - 1;

  const floatLeftURL =
    featuredProfiles[getPrevIndex(selectedIndex, maxIndex)].thumbnail;
  const floatRightURL =
    featuredProfiles[getNextIndex(selectedIndex, maxIndex)].thumbnail;

  const clickedLeftFloater = () => {
    setSelectedIndex(getPrevIndex(selectedIndex, maxIndex));
  };

  const clickedRightFloater = () => {
    setSelectedIndex(getNextIndex(selectedIndex, maxIndex));
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-title-frame">
        <h1 className="hero-heading float-shadow-text animate-entrance pop">
          FEATURED PROFILE
        </h1>
        <h3 className="hero-subheading float-shadow-text chroma-gradient animate-entrance pop delay-1">
          PROFILE OF THE MONTH
        </h3>
      </div>
      <div className="hero-banner-frame animate-entrance delay-7">
        {/* <!-- banner start --> */}
        <div onClick={clickedLeftFloater} className="floater left-floater">
          <img alt="" src={floatLeftURL} />
        </div>
        <div onClick={clickedRightFloater} className="floater right-floater">
          <img alt="" src={floatRightURL} />
        </div>
        <div className="hero-banner float-shadow">
          <div className="hero-profile">
            {/* <!-- video goes here --> */}
            <video key={videoURL} controls loop autoPlay>
              <source src={videoURL} />
            </video>
            {/* <!-- video goes above --> */}
          </div>
          {/* <!-- infobar --> */}
          <div className="infopanel large">
            <div className="info-titlebox">
              <h5 className="info-title">{title}</h5>
              <div className="info-author">
                <span className="info-author-by">by</span>
                <span className="info-author-name">{OP}</span>
              </div>
            </div>
            <div className="colour-palette-section">
              {colours.map((x) => (
                <div key={x} style={{ backgroundColor: x }}></div>
              ))}
            </div>
            <div className="all-tags-frame">
              <div className="tags-frame">
                {devices.map((x) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
              <div className="tags-frame">
                {effects.map((x) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
            </div>
            <div className="like-and-download">
              <span>
                <i className="fa-regular fa-thumbs-up icon-button"></i>
                <span>{likes}</span>
              </span>
              <span>
                <i className="fa-solid fa-download icon-button"></i>
                <span>{downloads}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
