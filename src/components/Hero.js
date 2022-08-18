import { useMemo, useState } from "react";
import useQueryProfileDB from "../hooks/QueryProfileDB";
import useIndexCount from "../hooks/IndexCount";
import { ProfileCard } from "./ProfileCard";

const populateProfile = (rawProfile) => {
  const featured_description = rawProfile.tags.find(
    (x) => x.tag === "featured"
  ).description;
  const videoURL = rawProfile.videoURL;
  const thumbnail = rawProfile.thumbnail;
  const title = rawProfile.title;
  const link = rawProfile.link;
  const downloadURL = rawProfile.download_link;
  const OP = rawProfile.OP;
  const lightingeffects = rawProfile.lightingeffects; // provide all profiles
  const likes = rawProfile.score + rawProfile.local_likes;

  return {
    featured_description,
    videoURL,
    thumbnail,
    title,
    link,
    downloadURL,
    OP,
    lightingeffects,
    likes
  };
};

const Hero = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselNextMoving, setCarouselNextMoving] = useState(false);
  const [carouselPrevMoving, setCarouselPrevMoving] = useState(false);

  const query = useMemo(() => ({ tag: "featured" }), []);
  const featuredProfiles = useQueryProfileDB(query);

  const [index, moveIndex, nextIndex, prevIndex] = useIndexCount(
    featuredProfiles.length
  );

  // guard clause for featuredProfiles not loaded / not loadable
  if (featuredProfiles === [] || featuredProfiles.length < 1) return null;

  // populate profiles data
  const middleProfile = populateProfile(featuredProfiles[index]);
  const leftProfile = populateProfile(featuredProfiles[prevIndex()]);
  const rightProfile = populateProfile(featuredProfiles[nextIndex()]);
  const backProfile = populateProfile(featuredProfiles[nextIndex()]);

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
        <h1 className="hero-heading float-shadow-text animate-entrance pop">
          FEATURED PROFILE
        </h1>
        <h3 className="hero-subheading float-shadow-text chroma-gradient animate-entrance pop delay-1">
          {middleProfile.featured_description}
        </h3>
      </div>
      <div className="hero-banner-frame animate-entrance delay-7 float-shadow">
        <ProfileCard
          profile={leftProfile}
          position="left"
          onClick={carouselPrev}
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
        />
        <ProfileCard
          profile={middleProfile}
          position="middle"
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
        />
        <ProfileCard
          profile={rightProfile}
          position="right"
          onClick={carouselNext}
          carouselNextMoving={carouselNextMoving}
          setCarouselNextMoving={setCarouselNextMoving}
          carouselPrevMoving={carouselPrevMoving}
          setCarouselPrevMoving={setCarouselPrevMoving}
          moveIndex={moveIndex}
        />
        <ProfileCard
          profile={backProfile}
          position="back"
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
