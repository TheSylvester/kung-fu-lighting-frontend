export const FilterFrame = ({
  searchInput,
  devicesBoxes,
  effectsBoxes,
  bySelected,
  setSearchInput,
  setDevicesBoxes,
  setEffectsBoxes
}) => {
  return (
    <div className="filter-frame">
      <div className="filter-label">Showing Profiles For</div>
      <div className="filter-tags">
        {searchInput ? (
          <div className="clickable-tag" onClick={() => setSearchInput("")}>
            {searchInput}
            {bySelected !== "...all"
              ? ` in ${bySelected.replace(/-/g, " ")}`
              : null}
          </div>
        ) : null}
        {devicesBoxes.length ? (
          devicesBoxes.map((x) => (
            <div
              key={x}
              className="clickable-tag"
              onClick={() => setDevicesBoxes((b) => b.filter((v) => v !== x))}
            >
              {x.toLowerCase().replace(/razer-/gi, "").replace(/-/g, " ")}
            </div>
          ))
        ) : (
          <div>all devices</div>
        )}
        {effectsBoxes.length ? (
          effectsBoxes.map((x) => (
            <div
              key={x}
              className="clickable-tag"
              onClick={() => setEffectsBoxes((b) => b.filter((v) => v !== x))}
            >
              {x.replace(/-/g, " ")}
            </div>
          ))
        ) : (
          <div>all effects</div>
        )}
      </div>
    </div>
  );
};
