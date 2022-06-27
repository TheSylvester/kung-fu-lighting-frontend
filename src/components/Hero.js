import { useState, useEffect, useRef } from "react";
import { profilesService } from "../services/profiles";
import VideoJS from "./VideoJS";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

const prevIndex = (i, max) => (i - 1 >= 0 ? i - 1 : max);
const nextIndex = (i, max) => (i + 1 <= max ? i + 1 : 0);

const populateProfile = (rawProfile) => {
  const videoURL = rawProfile.videoURL;
  const thumbnail = rawProfile.thumbnail;
  const title = rawProfile.title;
  const OP = rawProfile.OP;
  const colours = rawProfile.profiles[0].colours;
  const devices = rawProfile.profiles[0].devices;
  const effects = rawProfile.profiles[0].effects;
  const likes = rawProfile.score;
  const downloads = rawProfile.score;

  return {
    videoURL,
    thumbnail,
    title,
    OP,
    colours,
    devices,
    effects,
    likes,
    downloads
  };
};

const Hero = () => {
  const [featuredProfiles, setFeaturedProfiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselNextMoving, setCarouselNextMoving] = useState(false);
  const [carouselPrevMoving, setCarouselPrevMoving] = useState(false);

  useEffect(() => {
    const fetchFeaturedProfiles = async () => {
      const response = await profilesService.get(); // alter this call for featured profiles
      if (response && Array.isArray(response)) setFeaturedProfiles(response);
    };

    fetchFeaturedProfiles().then();
  }, []);

  // guard clause for featuredProfiles not loaded / not loadable
  if (featuredProfiles === [] || featuredProfiles.length < 1) return null;

  // maxIndex from the total # of profiles on the list
  const maxIndex = featuredProfiles.length - 1;

  // populate profiles data
  const middleProfile = populateProfile(featuredProfiles[selectedIndex]);
  const leftProfile = populateProfile(
    featuredProfiles[prevIndex(selectedIndex, maxIndex)]
  );
  const rightProfile = populateProfile(
    featuredProfiles[nextIndex(selectedIndex, maxIndex)]
  );
  const backProfile = populateProfile(
    featuredProfiles[nextIndex(nextIndex(selectedIndex, maxIndex), maxIndex)]
  );

  const ProfileCard = ({ profile, position, onClick }) => {
    // CardMedia in the middle is a video, but everywhere else is Thumbnail only

    const playerRef = useRef(null); // ref to the Video.js player

    useEffect(() => {}, []);

    const ColourPalettes = ({ colours }) =>
      colours.map((x) => (
        <div key={String(x)} style={{ backgroundColor: String(x) }}></div>
      ));
    const MapArrayToDivs = ({ array }) =>
      array.map((x) => <div key={x}>{x}</div>);

    const handlePlayerReady = (player) => {
      playerRef.current = player;
      // You can handle player events here, for example:
      player.on("waiting", () => {
        // videojs.log("player is waiting");
      });

      player.on("dispose", () => {
        // videojs.log("player will dispose");
      });
    };

    const videoJsOptions = {
      controls: true,
      poster: profile.thumbnail,
      loop: true,
      autoplay: true,
      muted: true,
      fluid: true,
      sources: [
        // {
        //   // ** sample HLS url **
        //   src: `https://v.redd.it/vvc6qvdm7ob51/HLSPlaylist.m3u8?a=1658786138%2CMzRhNGUxMTg2OGFmMjc3Y2U1YWM2NTk3MTcyZDdhOTQ2OGYyOWE4MmFjZWMwMTgxZDUyNDY3MTRkMDQ1NjJiNA%3D%3D&amp;v=1&amp;f=sd`,
        //   type: "application/vnd.apple.mpegurl"
        // },
        {
          src: profile.videoURL,
          type: "video/mp4"
        }
      ]
    };

    const CardMedia = () =>
      position === "middle" ? (
        <VideoJS
          className="card-media middle videojs-hero-banner"
          style={animMediaOnCarousel()}
          options={videoJsOptions}
          onReady={handlePlayerReady}
        />
      ) : (
        <img
          className={["card-media", position].join(" ")}
          style={animMediaOnCarousel()}
          src={profile.thumbnail}
          alt={`${position} pic`}
        />
      );

    /**
     * returns dynamic style for animation for slide
     */
    const animMediaOnCarousel = () => {
      const animImgRightToLeft = {
        animation:
          "img-right-to-left var(--carouselDuration) var(--slide-in) 1 forwards"
      };
      const animImgLeftToRight = {
        animation:
          "img-left-to-right var(--carouselDuration) var(--slide-in) 1 forwards"
      };

      if (position === "right" && carouselNextMoving) {
        return animImgRightToLeft;
      }
      if (position === "middle" && carouselPrevMoving) {
        return animImgLeftToRight;
      }
      if (position === "back" && carouselNextMoving) {
        return animImgLeftToRight;
      }
      if (position === "back" && carouselPrevMoving) {
        return animImgRightToLeft;
      }

      return {};
    };

    /**
     * returns dynamic style with or without animation depending on
     * position and whether everything is currently moving
     * @returns
     */
    const animCardOnCarousel = () => {
      // guard clause if nothing is moving don't animate
      if (!carouselNextMoving && !carouselPrevMoving) return {};

      const animationOptions = `var(--carouselDuration) var(--slide-in) 1 forwards`;

      const animations = {
        next: {
          right: {
            animation: `right-to-mid ${animationOptions}, side-to-front ${animationOptions}`
          },
          middle: {
            animation: `mid-to-left ${animationOptions}, front-to-side ${animationOptions}`
          },
          left: {
            animation: `left-to-mid ${animationOptions}, side-to-back ${animationOptions}`
          },
          back: {
            animation: `mid-to-right ${animationOptions}, back-to-side ${animationOptions}`
          }
        },
        prev: {
          left: {
            animation: `left-to-mid ${animationOptions}, side-to-front ${animationOptions}`
          },
          middle: {
            animation: `mid-to-right ${animationOptions}, front-to-side ${animationOptions}`
          },
          right: {
            animation: `right-to-mid ${animationOptions}, side-to-back ${animationOptions}`
          },
          back: {
            animation: `mid-to-left ${animationOptions}, back-to-side ${animationOptions}`
          }
        }
      };

      return animations[carouselNextMoving ? "next" : "prev"][position];
    };

    const animEnd = () => {
      // guard clause
      if (!carouselNextMoving && !carouselPrevMoving) return;

      /* finally change the banner after animation is over */
      if (carouselNextMoving)
        setSelectedIndex(nextIndex(selectedIndex, maxIndex));
      if (carouselPrevMoving)
        setSelectedIndex(prevIndex(selectedIndex, maxIndex));

      /* remove animated states */
      setCarouselNextMoving(false);
      setCarouselPrevMoving(false);
    };

    return (
      <div
        className={["profile-card", position].join(" ")}
        onClick={onClick}
        style={animCardOnCarousel()}
        onAnimationEnd={animEnd}
      >
        <CardMedia profile={leftProfile} position={position} />
        <div className="infopanel large">
          <div className="info-titlebox">
            <h5 className="info-title">{profile.title}</h5>
            <div className="info-author">
              <span className="info-author-by">by</span>
              <span className="info-author-name">{profile.OP}</span>
            </div>
          </div>
          <div className="colour-palette-section">
            <ColourPalettes colours={profile.colours} />
          </div>
          <div className="all-tags-frame">
            <div className="tags-frame">
              <MapArrayToDivs array={profile.devices} />
            </div>
            <div className="tags-frame">
              <MapArrayToDivs array={profile.effects} />
            </div>
          </div>
          <div className="like-and-download">
            <span>
              <i className="fa-regular fa-thumbs-up icon-button"></i>
              <span>{profile.likes}</span>
            </span>
            <span>
              <i className="fa-solid fa-download icon-button"></i>
              <span>{profile.downloads}</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // * Sets carouselPrevMoving = true so that the render() will
  // * add css animation and onanimationend=carouselPrevEnd
  const carouselPrev = () => {
    setCarouselPrevMoving(true);
  };
  const carouselNext = () => {
    setCarouselNextMoving(true);
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
      <div className="hero-banner-frame animate-entrance delay-7 float-shadow">
        <ProfileCard
          profile={leftProfile}
          position="left"
          onClick={carouselPrev}
        />
        <ProfileCard profile={middleProfile} position="middle" />
        <ProfileCard
          profile={rightProfile}
          position="right"
          onClick={carouselNext}
        />
        <ProfileCard profile={backProfile} position="back" />
      </div>
    </section>
  );
};

export default Hero;
