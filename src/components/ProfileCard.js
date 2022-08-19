import { useRef } from "react";
import VideoJS from "./VideoJS";
import { CardInfopanel } from "./CardInfopanel";

export const ProfileCard = ({
  videoURL,
  thumbnail,
  title,
  link,
  downloadURL,
  OP,
  lightingeffects,
  likes,
  position,
  onClick,
  carouselNextMoving,
  setCarouselNextMoving,
  carouselPrevMoving,
  setCarouselPrevMoving,
  moveIndex
}) => {
  const CardMedia = ({ pos, thumbnail, videoURL, next, prev }) => {
    // CardMedia in the middle is a video, but everywhere else is Thumbnail only
    const playerRef = useRef(null); // ref to the Video.js player
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
    // control VideoJS source and format here
    const videoJsOptions = {
      controls: false,
      poster: thumbnail,
      loop: true,
      autoplay: true,
      muted: true,
      fluid: true,
      sources: [
        {
          src: videoURL,
          // type: "video/mp4"
          type: "application/vnd.apple.mpegurl"
        }
      ]
    };

    /**
     * returns dynamic style for animating the position of the card based on
     * the carouselNext / carouselPrev state passed by its parent, tracking
     * whether animation is at rest or in motion
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

      if (pos === "right" && next) {
        return animImgRightToLeft;
      }
      if (pos === "middle" && prev) {
        return animImgLeftToRight;
      }
      if (pos === "back" && next) {
        return animImgLeftToRight;
      }
      if (pos === "back" && prev) {
        return animImgRightToLeft;
      }

      return {};
    };

    return pos === "middle" ? (
      <VideoJS
        className="card-media middle videojs-hero-banner"
        style={animMediaOnCarousel()}
        options={videoJsOptions}
        onReady={handlePlayerReady}
      />
    ) : (
      <img
        className={["card-media", pos].join(" ")}
        style={animMediaOnCarousel()}
        src={thumbnail}
        alt={`${pos} pic`}
      />
    );
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

  /**
   * cleanup function for when the animations really end
   */
  const animEnd = () => {
    // guard clause
    if (!carouselNextMoving && !carouselPrevMoving) return;

    /* finally change the banner after animation is over */
    if (carouselNextMoving) {
      moveIndex(1);
    }
    if (carouselPrevMoving) {
      moveIndex(-1);
    }

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
      <CardMedia
        pos={position}
        thumbnail={thumbnail}
        videoURL={videoURL}
        next={carouselNextMoving}
        prev={carouselPrevMoving}
      />
      <CardInfopanel
        title={title}
        link={link}
        OP={OP}
        lightingeffects={lightingeffects}
        likes={likes}
        downloadURL={downloadURL}
        infopanelSize={"large"}
      />
    </div>
  );
};
