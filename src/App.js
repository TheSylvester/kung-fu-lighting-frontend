import React, { useState, useEffect } from "react";
import redditscrapeService from "./services/redditscrapes";

const App = () => {
  return (
    <div>
      <h1>Everybody is Kung-Fu Lighting</h1>
      <ScrapedProfiles />
    </div>
  );
};
/* eslint-disable */
const ScrapedProfiles = () => {
  const [profilesArray, setProfilesArray] = useState([]);
  const [last, setLast] = useState("");
  const [nonvideoPosts, setNonvideoPosts] = useState([]);

  useEffect(() => {
    const getRedditScrape = async () => {
      const response = await redditscrapeService.get();
      setProfilesArray(response.profilesArray);
      setLast(response.last);
      setNonvideoPosts(response.nonvideoPosts);
    };

    getRedditScrape();
  }, []);

  return (
    <div>
      {profilesArray.map((post) => (
        <ProfileFrame id={post.id36} {...post} />
      ))}
    </div>
  );
};

const ProfileFrame = ({
  link,
  title,
  reddit_likes,
  OP,
  videoURL,
  audioURL
}) => {
  const cssStyle = {
    border: "1px solid grey",
    borderRadius: "5px",
    margin: "5px",
    padding: "10px",
    boxShadow: "3px 3px 5px #aaaaaa"
  };

  return (
    <div style={cssStyle}>
      <div>
        <a href={link}>{title}</a> - {reddit_likes} likes
      </div>
      <div>by {OP}</div>
      <div>
        <video controls width="480" height="270" muted loop autoplay="autoplay">
          <source type="video/mp4" src={videoURL} />
        </video>
      </div>
      <div>
        <video controls width="480" height="30" muted loop autoplay="autoplay">
          <source type="video/mp4" src={audioURL} />
        </video>
      </div>
    </div>
  );
};

export default App;
