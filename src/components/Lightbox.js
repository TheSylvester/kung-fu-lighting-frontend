import React, { useRef } from "react";
import VideoJS from "./VideoJS";

export const Lightbox = ({ lightboxON, lightboxURL, closeLightbox }) => {
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
  const videoJsOptions = {
    controls: false,
    // poster: thumbnail,
    loop: true,
    autoplay: true,
    muted: false,
    fluid: true,
    sources: [
      {
        // src: "https://v.redd.it/8ohl4jf53ql91/HLSPlaylist.m3u8?a=1665370173%2CNzE0OGIxMGQ2ZGFmYmU1NGYxODcyYzUxMzkzNzUxMjJjZTMxMGY2NjczNmQ2N2I5NGNmMGNiODU3OWFiNjkyYg%3D%3D&amp;v=1&amp;f=sd",
        src: lightboxURL,
        // type: "video/mp4"
        type: "application/vnd.apple.mpegurl"
      }
    ]
  };

  return (
    <>
      {lightboxON && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-background animate-entrance pop"></div>
          <div className="lightbox-container animate-entrance pop">
            <VideoJS
              options={videoJsOptions}
              onReady={handlePlayerReady}
              className="lightbox-video"
            />
          </div>
        </div>
      )}
    </>
  );
};
