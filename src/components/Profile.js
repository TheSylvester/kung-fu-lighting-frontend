import { useState } from "react";
import VideoJS from "./VideoJS";
import { CardInfopanel } from "./CardInfopanel";
// import useCheckMobileScreen from "../hooks/CheckMobileScreen";

export const Profile = ({
  id36 = "",
  thumbnail = "",
  videoURL = "",
  title = "",
  link = "",
  OP = "",
  lightingeffects = [],
  score = 0,
  likes,
  setLikes,
  downloadURL = "",
  openLightbox
}) => {
  const [active, setActive] = useState(false);
  // const isMobile = useCheckMobileScreen();

  const handleHoverEnter = () => setActive(true);
  const handleHoverLeave = () => setActive(false);

  const CardMedia = () => {
    const videoJsOptions = {
      controls: false,
      poster: thumbnail,
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
          src: videoURL,
          // type: "video/mp4"
          type: "application/vnd.apple.mpegurl"
        }
      ]
    };

    const img = (
      <img
        alt="profile video"
        src={thumbnail}
        onClick={() => openLightbox(videoURL)}
      />
    );
    const video = (
      <VideoJS
        options={videoJsOptions}
        style={{ cursor: "pointer" }}
        onClick={() => openLightbox(videoURL)}
      />
    );

    return active ? video : img;
  };

  return (
    <div
      className="profile"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      <div className="video-box">
        <CardMedia />
      </div>
      <CardInfopanel
        id36={id36}
        title={title}
        link={link}
        OP={OP}
        lightingeffects={lightingeffects}
        score={score}
        likes={likes}
        setLikes={setLikes}
        downloadURL={downloadURL}
        infopanelSize={"small"}
      />
    </div>
  );
};
