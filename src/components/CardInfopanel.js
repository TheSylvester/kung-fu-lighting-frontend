import useIndexCount from "../hooks/IndexCount";
import colourSort from "color-sorter";
import {
  faDownload,
  faThumbsUp as faThumbsUpSolid
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoginContext } from "../contexts/LoginContext";
import { profilesService } from "../services/profiles";

const UpvoteLikes = ({ id36, score, likes, setLikes }) => {
  const { isAuthenticated } = useLoginContext();
  // const [upvote, setUpvote] = useState(Boolean(likes));
  const upvote = likes;

  const createVote = async (vote, id) => {
    return await profilesService.vote({
      dir: Number(Boolean(vote)),
      id: `t3_${id}`
    });
  };

  // useEffect(() => {
  //   setUpvote(Boolean(likes));
  // }, [likes]);

  const handleVote = async () => {
    // if locked
    try {
      const response = await createVote(!upvote, id36);
      if (response.status === 200) {
        console.log(`Vote ${!upvote}`);
        // setUpvote((v) => !v);
        setLikes(id36, !upvote);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { voteButton, thumbsUpIcon } = isAuthenticated
    ? {
        voteButton: { className: "icon-button", onClick: handleVote },
        thumbsUpIcon: upvote ? faThumbsUpSolid : faThumbsUp
      }
    : {
        voteButton: {},
        thumbsUpIcon: faThumbsUp
      };

  return (
    <span {...voteButton}>
      <FontAwesomeIcon icon={thumbsUpIcon} className="icon-button-icon" />
      <span>{score}</span>
    </span>
  );
};

export const CardInfopanel = ({
  id36 = "",
  title = "",
  link = "",
  OP = "",
  lightingeffects = [],
  score = 0,
  likes = null,
  setLikes,
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
          <UpvoteLikes
            id36={id36}
            score={score}
            likes={likes}
            setLikes={setLikes}
          />
          <a
            className="icon-button"
            href={downloadURL}
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <FontAwesomeIcon icon={faDownload} className="icon-button-icon" />
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
