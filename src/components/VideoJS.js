/**
 * https://videojs.com/guides/react/#react-functional-component-and-useeffect-example
 */

import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // const player = (playerRef.current = videojs(videoElement, options, () => {
      //   // videojs.log("player is ready");
      //   onReady && onReady(player);
      // }));
      playerRef.current = videojs(videoElement, options);
      const player = playerRef.current;
      const playButton = player.getChild("bigPlayButton");
      playButton.hide();

      player.ready(() => {
        // videojs.log("player is ready");
        // try to play
        onReady && onReady(player);
        let promise = player.play();
        if (promise === undefined) {
          playButton.show(); // can't even play, then show the button
        } else {
          promise.then(
            () => {
              playButton.show(); // show button if play() runs
            },
            () => {
              playButton.show(); // show button if play() fails
            }
          );
        }
      });

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      id="videojs-banner"
      className={["videojs-container", "vjs-big-play-centered", props.className]
        .filter(Boolean)
        .join(" ")}
      style={props.style}
    >
      <video ref={videoRef} className="video-js vjs-16-9" />
    </div>
  );
};

export default VideoJS;
