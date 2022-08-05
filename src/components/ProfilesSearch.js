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

export { ProfilesSearch, SearchBars };