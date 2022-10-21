import React, { useEffect, useRef, useState } from "react";
import useQueryProfileDB from "../hooks/QueryProfileDB";
import { Profile } from "./Profile";

const INTERSECTION_OBSERVER_MARGIN = "50px";

export const ProfilesGallery = ({ query, openLightbox }) => {
  // const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      await setPage(1);
    })();
  }, [query]);

  const { profiles, hasMore, isLoading, setLikes } = useQueryProfileDB(
    query,
    page
  );

  const loadMoreMarker = useRef(null); // load more profiles marker

  const handleObserver = (entries) => {
    if (entries[0].intersectionRatio <= 0 || isLoading || !hasMore) return;
    setPage((p) => p + 1);
  };

  // the page that contains all the profiles
  const ProfilesList = () => {
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: INTERSECTION_OBSERVER_MARGIN,
        threshold: 0
      };
      const observer = new IntersectionObserver(handleObserver, options);
      if (loadMoreMarker.current) observer.observe(loadMoreMarker.current);
    }, []);

    return (
      <>
        {profiles.map((profile, index) => (
          <Profile
            key={index}
            id36={profile.id36}
            thumbnail={profile.thumbnail}
            videoURL={profile.hlsURL}
            title={profile.title}
            link={profile.link}
            OP={profile.OP}
            lightingeffects={profile.lightingeffects}
            score={profile.score + profile.local_likes}
            likes={profile.likes}
            setLikes={setLikes}
            downloadURL={profile.download_link}
            openLightbox={openLightbox}
          />
        ))}
        {hasMore && !isLoading && <div ref={loadMoreMarker}></div>}
        {hasMore && isLoading && (
          <div className="grid-span loading">
            <i className="fas fa-sync fa-spin"></i>
            <div>loading</div>
          </div>
        )}
        {!hasMore && (
          <div className="grid-span gallery-footer">
            <a href={"#profiles"}>
              <i className="fa-solid fa-angle-up footer-arrow"></i>back to top
              <i className="fa-solid fa-angle-up footer-arrow"></i>
            </a>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="profiles-gallery">
      <div className="profiles-frame animate-entrance delay-7">
        <ProfilesList />
      </div>
    </section>
  );
};
