import { useState, useEffect } from "react";
import { profilesService } from "../services/profiles";

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
      // console.log(response);
      setFeaturedProfiles(response);
    };

    fetchFeaturedProfiles().then();
  }, []);

  // guard clause for featuredProfiles not loaded / not loadable
  if (featuredProfiles === [] || featuredProfiles.length < 1) return null;

  console.log(featuredProfiles);

  // banner and side profiles determined from useEffect and states
  const maxIndex = featuredProfiles.length - 1;

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

  const ColourPalettes = ({ colours }) =>
    colours.map((x) => (
      <div key={String(x)} style={{ backgroundColor: String(x) }}></div>
    ));
  const MapArrayToDivs = ({ array }) =>
    array.map((x) => <div key={x}>{x}</div>);

  const ProfileCard = ({ profile, position, onClick }) => {
    // CardMedia in the middle is a video, but everywhere else is Thumbnail only
    const CardMedia = () =>
      position === "middle" ? (
        <video
          className="card-media middle"
          style={animMediaOnCarousel()}
          poster={profile.thumbnail}
          controls
          loop
          autoPlay
        >
          <source src={profile.videoURL} />
        </video>
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
          "img-right-to-left var(--carouselDuration) var(--bounce) 1 forwards"
      };
      const animImgLeftToRight = {
        animation:
          "img-left-to-right var(--carouselDuration) var(--bounce) 1 forwards"
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

      const possibilities = carouselNextMoving
        ? {
            right: {
              animation:
                "right-to-mid var(--carouselDuration) var(--bounce) 1 forwards, side-to-front var(--carouselDuration) var(--bounce) 1 forwards"
            },
            middle: {
              animation:
                "mid-to-left var(--carouselDuration) var(--bounce) 1 forwards, front-to-side var(--carouselDuration) var(--bounce) 1 forwards"
            },
            left: {
              animation:
                "left-to-mid var(--carouselDuration) var(--bounce) 1 forwards, side-to-back var(--carouselDuration) var(--bounce) 1 forwards"
            },
            back: {
              animation:
                "mid-to-right var(--carouselDuration) var(--bounce) 1 forwards, back-to-side var(--carouselDuration) var(--bounce) 1 forwards"
            }
          }
        : /* carouselPrevMoving */
          {
            left: {
              animation:
                "left-to-mid var(--carouselDuration) var(--bounce) 1 forwards, side-to-front var(--carouselDuration) var(--bounce) 1 forwards"
            },
            middle: {
              animation:
                "mid-to-right var(--carouselDuration) var(--bounce) 1 forwards, front-to-side var(--carouselDuration) var(--bounce) 1 forwards"
            },
            right: {
              animation:
                "right-to-mid var(--carouselDuration) var(--bounce) 1 forwards, side-to-back var(--carouselDuration) var(--bounce) 1 forwards"
            },
            back: {
              animation:
                "mid-to-left var(--carouselDuration) var(--bounce) 1 forwards, back-to-side var(--carouselDuration) var(--bounce) 1 forwards"
            }
          };

      return possibilities[position];
    };

    const animEnd = () => {
      // guard clause
      if (!carouselNextMoving && !carouselPrevMoving) return {};

      return () => {
        /* finally change the banner after animation is over */
        if (carouselNextMoving)
          setSelectedIndex(nextIndex(selectedIndex, maxIndex));
        if (carouselPrevMoving)
          setSelectedIndex(prevIndex(selectedIndex, maxIndex));

        /* remove animated states */
        setCarouselNextMoving(false);
        setCarouselPrevMoving(false);
      };
    };

    return (
      <div
        className={["profile-card", position].join(" ")}
        onClick={onClick}
        style={animCardOnCarousel()}
        onAnimationEnd={animEnd()}
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
    console.log("clicked left");
    setCarouselPrevMoving(true);
  };
  const carouselNext = () => {
    console.log(`clicked right`);
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
