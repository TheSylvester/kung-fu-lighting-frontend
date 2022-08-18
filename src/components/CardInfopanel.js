import useIndexCount from "../hooks/IndexCount";
import colourSort from "color-sorter";

export const CardInfopanel = ({ profile }) => {
  const [profileIndex, moveProfileIndex] = useIndexCount(
    profile.lightingeffects.length
  );

  return (
    <div className="infopanel large">
      <div className="info-page-button" onClick={() => moveProfileIndex(-1)}>
        {profile.lightingeffects.length > 1 ? "<" : ""}
      </div>
      <div className="info-frame">
        <div className="info-titlebox">
          <div className="info-author">
            <span className="profile-name">
              {profile.lightingeffects[profileIndex].name}
            </span>
            <span className="info-author-by">by</span>
            <span className="info-author-name">{profile.OP}</span>
          </div>
          <div className="colour-palette-section">
            <ColourPalettes
              colours={profile.lightingeffects[profileIndex].colours.sort(
                colourSort.sortFn
              )}
            />
          </div>
          <h5 className="info-title">
            <a href={profile.link} target="_blank" rel="noreferrer">
              {profile.title}
            </a>
          </h5>
        </div>
        <div className="all-tags-frame">
          <div className="tags-frame devices">
            <MapArrayToDivs
              array={profile.lightingeffects[profileIndex].devices.map((x) =>
                x.replace("RAZER ", "")
              )}
            />
          </div>
          <div className="tags-frame">
            <MapArrayToDivs
              array={profile.lightingeffects[profileIndex].effects}
            />
          </div>
        </div>
        <div className="like-and-download">
          <span>
            <i className="fa-regular fa-thumbs-up icon-button"></i>
            <span>{profile.likes}</span>
          </span>
          <a
            className="icon-button"
            href={profile.downloadURL}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <i className="fa-solid fa-download icon-button"></i>
              <span>download</span>
            </span>
          </a>
        </div>
      </div>
      <div className="info-page-button" onClick={() => moveProfileIndex(1)}>
        {profile.lightingeffects.length > 1 ? ">" : ""}
      </div>
    </div>
  );
};
const ColourPalettes = ({ colours }) =>
  colours.map((x) => (
    <div key={String(x)} style={{ backgroundColor: String(x) }}></div>
  ));
const MapArrayToDivs = ({ array }) => array.map((x) => <div key={x}>{x}</div>);
