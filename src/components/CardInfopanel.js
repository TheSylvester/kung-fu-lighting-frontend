import useIndexCount from "../hooks/IndexCount";
import colourSort from "color-sorter";

export const CardInfopanel = ({
  title = "",
  link = "",
  OP = "",
  lightingeffects = [],
  likes = 0,
  downloadURL = "",
  infopanelSize = "large"
}) => {
  const [profileIndex, moveProfileIndex] = useIndexCount(
    lightingeffects.length
  );

  // make sure the index < lightingeffects.length
  const guarded_profileIndex =
    profileIndex < lightingeffects.length ? profileIndex : 0;
  // set it to 0
  if (profileIndex >= lightingeffects.length) moveProfileIndex(0);

  return (
    <div className={`infopanel ${infopanelSize}`}>
      <div className="info-page-button" onClick={() => moveProfileIndex(-1)}>
        {lightingeffects.length > 1 ? "<" : ""}
      </div>
      <div className="info-frame">
        <div className="info-titlebox">
          <div className="info-author">
            <span className="profile-name">
              {lightingeffects[guarded_profileIndex].name}
            </span>
            <span className="info-author-by">by</span>
            <span className="info-author-name">{OP}</span>
          </div>
          <div className="colour-palette-section">
            <ColourPalettes
              colours={lightingeffects[guarded_profileIndex].colours.sort(
                colourSort.sortFn
              )}
            />
          </div>
          <h5 className="info-title">
            <a href={link} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h5>
        </div>
        <div className="all-tags-frame">
          <div className="tags-frame devices">
            <MapArrayToDivs
              array={lightingeffects[guarded_profileIndex].devices.map((x) =>
                x.replace("RAZER ", "")
              )}
            />
          </div>
          <div className="tags-frame">
            <MapArrayToDivs
              array={lightingeffects[guarded_profileIndex].effects}
            />
          </div>
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
              <span>download</span>
            </span>
          </a>
        </div>
      </div>
      <div className="info-page-button" onClick={() => moveProfileIndex(1)}>
        {lightingeffects.length > 1 ? ">" : ""}
      </div>
    </div>
  );
};
const ColourPalettes = ({ colours }) =>
  colours.map((x) => (
    <div key={String(x)} style={{ backgroundColor: String(x) }}></div>
  ));
const MapArrayToDivs = ({ array }) => array.map((x) => <div key={x}>{x}</div>);
