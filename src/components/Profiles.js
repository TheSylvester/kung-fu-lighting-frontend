import { useMemo, useState } from "react";
import VideoJS from "./VideoJS";
import useQueryProfileDB from "../hooks/QueryProfileDB";
import colourSort from "color-sorter";

const ProfilesSearch = () => {
  return (
    <section id="profiles" className="profiles-search image-background">
      <h2 className="profiles-title animate-entrance pop delay-4">
        RAZER LIGHTING PROFILES
      </h2>
    </section>
  );
};

const SearchBars = () => {
  return (
    <section className="search-bars image-background">
      <div className="search-bars animate-entrance delay-8">
        <form className="search-bars">
          <div className="input devices">
            <input
              name="devices"
              type="text"
              placeholder="search for devices"
            />
            <i className="fa-solid fa-magnifying-glass icon-search"></i>
          </div>
          <div className="input frame">
            <div className="input effects">
              <input
                name="effects"
                type="text"
                placeholder="filter for effects"
              />
              <i className="fa-solid fa-bars icon-search"></i>
            </div>
            <div className="input colours">
              <input name="colours" type="text" placeholder="match colours" />
              <i className="fa-solid fa-palette icon-search"></i>
            </div>
          </div>
        </form>
        <div className="filter-frame">
          <div className="filter-label">Showing Profiles For</div>
          <div className="filter-tags">
            <div>BLACKWIDOW CHROMA</div>
            <div>NAGA TRINITY</div>
            <div>BLACKWIDOW CHROMA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Profile = ({
  thumbnail = "",
  videoURL = "",
  title = "",
  link = "",
  OP = "",
  colours = [],
  likes = 0,
  downloads = 0,
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
          type: "video/mp4"
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
      <div className="infopanel small">
        <div className="info-titlebox">
          <h5 className="info-title">
            <a href={link} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h5>
          <div className="info-author">
            <span className="info-author-by">by</span>
            <span className="info-author-name">{OP}</span>
          </div>
        </div>
        <div className="colour-palette-section">
          {colours.sort(colourSort.sortFn).map((x) => (
            <div key={x} style={{ backgroundColor: String(x) }}></div>
          ))}
        </div>
        <div className="like-and-download">
          <span>
            <i className="fa-regular fa-thumbs-up icon-button"></i>
            <span>{likes}</span>
          </span>
          <a
            className="icon-button"
            href={downloadURL}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <i className="fa-solid fa-download icon-button"></i>
              <span>{downloads}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProfilesGallery = () => {
  const query = useMemo(() => ({}), []);
  const profiles = useQueryProfileDB(query);

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
        videoURL={profile.videoURL}
        title={profile.title}
        link={profile.link}
        OP={profile.OP}
        colours={profile.lightingeffects[0].colours}
        likes={profile.score + profile.local_likes}
        downloads={profile.score}
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

export { ProfilesSearch, SearchBars, ProfilesGallery };
