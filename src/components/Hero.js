import { useMemo, useState } from "react";
import useQueryProfileDB from "../hooks/QueryProfileDB";
import useIndexCount from "../hooks/IndexCount";
import { ProfileCard } from "./ProfileCard";

const populateProfile = (rawProfile) => {
  const id36 = rawProfile.id36;
  const featured_description = rawProfile.tags.find(
    (x) => x.tag === "featured"
  ).description;
  const videoURL = rawProfile.hlsURL;
  const thumbnail = rawProfile.thumbnail;
  const title = rawProfile.title;
  const link = rawProfile.link;
  const downloadURL = rawProfile.download_link;
  const OP = rawProfile.OP;
  const lightingeffects = rawProfile.lightingeffects; // provide all profiles
  const score = rawProfile.score + rawProfile.local_likes;
  const likes = rawProfile.likes;

  return {
    id36,
    featured_description,
    videoURL,
    thumbnail,
    title,
    link,
    downloadURL,
    OP,
    lightingeffects,
    score,
    likes
  };
};

const Hero = ({ openLightbox }) => {
  const [carouselNextMoving, setCarouselNextMoving] = useState(false);
  const [carouselPrevMoving, setCarouselPrevMoving] = useState(false);

  const query = useMemo(() => ({ tag: "featured", limit: 20 }), []);
  const { profiles: featuredProfiles, setLikes } = useQueryProfileDB(query);

  // const [index, moveIndex, nextIndex, prevIndex] = useIndexCount(
  const [index, moveIndex, getIndex] = useIndexCount(featuredProfiles.length);

  // guard clause for featuredProfiles not loaded / not loadable
  if (featuredProfiles === [] || featuredProfiles.length < 1) return null;

  // populate profiles data
  const middleProfile = populateProfile(featuredProfiles[index]);
  const leftProfile = populateProfile(featuredProfiles[getIndex(-1)]);
  const rightProfile = populateProfile(featuredProfiles[getIndex(1)]);
  let backProfile = populateProfile(
    featuredProfiles[getIndex(carouselPrevMoving ? -2 : 2)]
  );

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
        <h1
          className="hero-heading float-shadow-text animate-entrance delay-1"
          onClick={() =>
            openLightbox(
              "https://v.redd.it/8ohl4jf53ql91/HLSPlaylist.m3u8?a=1665370173%2CNzE0OGIxMGQ2ZGFmYmU1NGYxODcyYzUxMzkzNzUxMjJjZTMxMGY2NjczNmQ2N2I5NGNmMGNiODU3OWFiNjkyYg%3D%3D&amp;v=1&amp;f=sd"
            )
          }
        >
          FEATURED PROFILE
        </h1>
        <h3 className="hero-subheading float-shadow-text chroma-gradient animate-entrance delay-2">
          {middleProfile.featured_description}
        </h3>
      </div>
      <div className="hero-banner-frame animate-entrance delay-4 float-shadow">
        <ProfileCard
          {...leftProfile}
          position="left"
          setLikes={setLikes}
          onClick={carouselPrev}
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
        />
        <ProfileCard
          {...middleProfile}
          position="middle"
          setLikes={setLikes}
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
          openLightbox={openLightbox}
        />
        <ProfileCard
          {...rightProfile}
          position="right"
          setLikes={setLikes}
          onClick={carouselNext}
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
        />
        <ProfileCard
          {...backProfile}
          position="back"
          setLikes={setLikes}
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
        />
      </div>
    </section>
  );
};

export default Hero;
