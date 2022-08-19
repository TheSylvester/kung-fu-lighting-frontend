import { useState } from "react";
import VideoJS from "./VideoJS";
import useQueryProfileDB from "../hooks/QueryProfileDB";
import { CardInfopanel } from "./CardInfopanel";

const Profile = ({
  thumbnail = "",
  videoURL = "",
  title = "",
  link = "",
  OP = "",
  lightingeffects = [],
  likes = 0,
  downloadURL = ""
}) => {
  const [active, setActive] = useState(false);

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

    const img = <img alt="profile video" src={thumbnail} />;
    const video = <VideoJS options={videoJsOptions} />;

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
        title={title}
        link={link}
        OP={OP}
        lightingeffects={lightingeffects}
        likes={likes}
        downloadURL={downloadURL}
        infopanelSize={"small"}
      />
    </div>
  );
};

const ProfilesGallery = ({ query }) => {
  const profiles = useQueryProfileDB(query);

  // the page that contains all the profiles
  const ProfilesList = () => {
    // guard clause for empty gallery list
    if (!Array.isArray(profiles) || profiles.length === 0)
      return (
        <div
          style={{
            margin: "auto auto",
            color: "var(--green)",
            border: "1px solid var(--green)"
          }}
        >
          no profiles to display
        </div>
      );

    return profiles.map((profile) => (
      <Profile
        key={profile.id36}
        thumbnail={profile.thumbnail}
        videoURL={profile.hlsURL}
        title={profile.title}
        link={profile.link}
        OP={profile.OP}
        lightingeffects={profile.lightingeffects}
        likes={profile.score + profile.local_likes}
        downloadURL={profile.download_link}
      />
    ));
  };

  return (
    <section className="profiles-gallery">
      <div className="profiles-frame animate-entrance delay-0">
        <ProfilesList />
      </div>
    </section>
  );
};

export { ProfilesGallery };
