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
  title = "",
  OP = "",
  colours = [],
  likes = 0,
  downloads = 0
}) => {
  return (
    <div className="profile">
      <div className="video-box">
        <img alt="profile video" src={thumbnail} />
      </div>
      <div className="infopanel small">
        <div className="info-titlebox">
          <h5 className="info-title">{title}</h5>
          <div className="info-author">
            <span className="info-author-by">by</span>
            <span className="info-author-name">{OP}</span>
          </div>
        </div>
        <div className="colour-palette-section">
          {colours.map((x) => (
            <div key={x} style={{ backgroundColor: x }}></div>
          ))}
        </div>
        <div className="like-and-download">
          <span>
            <i className="fa-regular fa-thumbs-up icon-button"></i>
            <span>{likes}</span>
          </span>
          <span>
            <i className="fa-solid fa-download icon-button"></i>
            <span>{downloads}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const ProfilesGallery = () => {
  return (
    <section className="profiles-gallery">
      <div className="profiles-frame animate-entrance delay-0">
        <Profile
          thumbnail="https://b.thumbs.redditmedia.com/4WPi0Dr_RUj11vhuitdRNZpkZ9Bmh_5Iyk28wVEIXDg.jpg"
          title="My Remix of the popular Synthwave Sunset Chroma Profile"
          OP="Flamesilver"
          colours={["cyan", "purple", "fuchsia"]}
          likes="132"
          downloads="459"
        />
        <Profile
          thumbnail="https://b.thumbs.redditmedia.com/jbads6PirkeJbe4yx0DZcaEFOcefOO101l2XdjzsmHw.jpg"
          title="My Remix of the popular Synthwave Sunset Chroma Profile"
          OP="Flamesilver"
          colours={["red", "yellow", "green"]}
          likes="132"
          downloads="459"
        />
        <Profile
          thumbnail="https://b.thumbs.redditmedia.com/pfKZVheI_8RoW-aVGI6sAtY-rtEbZNKjQDmla6zXKuQ.jpg"
          title="My Remix of the popular Synthwave Sunset Chroma Profile"
          OP="Flamesilver"
          colours={["red", "yellow", "green", "cyan", "purple", "fuchsia"]}
          likes="132"
          downloads="459"
        />
        <Profile
          thumbnail="https://b.thumbs.redditmedia.com/jbads6PirkeJbe4yx0DZcaEFOcefOO101l2XdjzsmHw.jpg"
          title="My Remix of the popular Synthwave Sunset Chroma Profile"
          OP="Flamesilver"
          colours={["red", "yellow", "green", "cyan", "purple", "fuchsia"]}
          likes="132"
          downloads="459"
        />
        <Profile
          thumbnail="https://b.thumbs.redditmedia.com/nQKrMoz15vvoiPK2M_kXpk9E5xoOmj_eWQy9VQ_UV6c.jpg"
          title="My Remix of the popular Synthwave Sunset Chroma Profile"
          OP="Flamesilver"
          colours={["red", "yellow", "green", "cyan", "purple", "fuchsia"]}
          likes="132"
          downloads="459"
        />
      </div>
    </section>
  );
};

export { ProfilesSearch, SearchBars, ProfilesGallery };
