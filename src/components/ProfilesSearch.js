import useLightingEffectsList from "../hooks/LightingEffectsList";
import { useEffect, useMemo, useState } from "react";
import { FilterFrame } from "./FilterFrame";
import debounce from "lodash/debounce";

const ProfilesSearch = () => {
  return (
    <section id="profiles" className="profiles-search image-background">
      <h2 className="profiles-title animate-entrance pop delay-4">
        RAZER LIGHTING PROFILES
      </h2>
    </section>
  );
};

const Checkbox = ({ id, type, className, boxes, setBoxes }) => {
  const handleCheck = () => {
    setBoxes((b) => {
      if (b.includes(id)) {
        return b.filter((v) => v !== id);
      } else {
        return [...b, id];
      }
    });
  };
  return (
    <>
      <input
        type={type}
        id={id}
        className={className}
        onChange={handleCheck}
        checked={boxes.includes(id)}
      />
    </>
  );
};

const DevicesDropdownList = ({
  devices,
  devicesBoxes,
  devicesInput,
  setDevicesBoxes
}) => {
  return (
    <ul>
      {devices.map((device) => {
        const formattedName = device.replace(/razer /gi, "");
        const formattedNameDash = device.replace(/ /g, "-");
        return (
          <li
            key={formattedNameDash}
            style={
              device.toLowerCase().includes(devicesInput.toLowerCase())
                ? {}
                : { display: "none" } // hide this <li> if device inputbox doesn't match
            }
          >
            <Checkbox
              id={formattedNameDash}
              type="checkbox"
              className="hidden-checkbox dropdown-menu-item"
              boxes={devicesBoxes}
              setBoxes={setDevicesBoxes}
            />
            <label htmlFor={formattedNameDash} className="dropdown-menu-label">
              {formattedName.toLowerCase()}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const EffectsDropdownList = ({ effects, effectsBoxes, setEffectsBoxes }) => {
  return (
    <ul>
      {effects.map((effect) => {
        const formattedName = effect;
        const formattedNameDash = formattedName.replace(" ", "-");

        return (
          <li key={formattedNameDash}>
            <Checkbox
              type="checkbox"
              id={formattedNameDash}
              className="hidden-checkbox dropdown-menu-item"
              boxes={effectsBoxes}
              setBoxes={setEffectsBoxes}
            />
            <label htmlFor={formattedNameDash} className="dropdown-menu-label">
              {formattedName}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const SearchByDropdownList = ({ byList, bySelected, setBySelected }) => {
  const handleCheck = (value) => {
    setBySelected(value);
  };
  return (
    <ul>
      {byList.map((name) => {
        const dashName = name.replace(" ", "-");
        return (
          <li key={dashName}>
            <input
              type="radio"
              name="search-by-radio"
              id={dashName}
              className="hidden-checkbox dropdown-menu-item"
              value={dashName}
              onChange={() => handleCheck(dashName)}
              checked={bySelected === dashName}
            />
            <label htmlFor={dashName} className="dropdown-menu-label">
              {name}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const SearchBars = ({ setQuery }) => {
  const { devices, effects } = useLightingEffectsList();

  const byList = ["...all", "profile name", "author", "description"];
  const [searchInput, setSearchInput] = useState("");
  const [devicesInput, setDevicesInput] = useState("");

  const [bySelected, setBySelected] = useState("...all");
  const [devicesBoxes, setDevicesBoxes] = useState(
    new Array(devices.length).fill(false)
  );
  const [effectsBoxes, setEffectsBoxes] = useState(
    new Array(effects.length).fill(false)
  );

  const debounce_setQuery = useMemo(
    () =>
      debounce(
        (newQuery) =>
          setQuery({
            [{
              "...all": "all",
              "profile-name": "profileName",
              author: "author",
              description: "title"
            }[newQuery.bySelected]]: newQuery.searchInput,
            devices: newQuery.devicesBoxes.map((x) => x.replace(/-/gi, " ")),
            effects: newQuery.effectsBoxes
          }),
        1000
      ),
    [setQuery]
  );

  // update setQuery in a useEffect so any changes to any states will be detected
  useEffect(
    () =>
      debounce_setQuery({
        searchInput,
        bySelected,
        devicesBoxes,
        effectsBoxes
      }),
    [debounce_setQuery, searchInput, bySelected, devicesBoxes, effectsBoxes]
  );

  const handleDevicesInput = (e) => {
    setDevicesInput(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <section className="search-bars image-background">
      <div className="search-bars animate-entrance delay-8">
        <form className="search-bars">
          <div className="input frame left">
            <div className="input search">
              <input
                className="dropdown-button"
                name="search"
                type="text"
                autoComplete="off"
                placeholder="search"
                onChange={handleSearchInput}
                value={searchInput}
              />
              <span className="icon-anchor search"></span>
            </div>
          </div>
          <div className="input frame right">
            <div className="input tab filter">
              <label htmlFor="filter-by-toggle" className="dropdown-button">
                {bySelected.replace("-", " ")}
              </label>
              <input
                type="checkbox"
                id="filter-by-toggle"
                className="hidden-checkbox"
              />
              <div className="dropdown-menu filter">
                <SearchByDropdownList
                  byList={byList}
                  bySelected={bySelected}
                  setBySelected={setBySelected}
                />
              </div>
              <span id="filter" className="icon-anchor filter"></span>
            </div>
            <div className="input tab devices">
              <input
                name="devices"
                type="text"
                placeholder="devices"
                value={devicesInput}
                onChange={handleDevicesInput}
              />
              <div className="dropdown-menu devices">
                <DevicesDropdownList
                  devices={devices}
                  devicesInput={devicesInput}
                  devicesBoxes={devicesBoxes}
                  setDevicesBoxes={setDevicesBoxes}
                />
              </div>
              <span className="icon-anchor devices"></span>
            </div>
            <div className="input tab effects">
              <input
                type="checkbox"
                id="filter-effects-toggle"
                className="hidden-checkbox"
              />
              <label
                className="dropdown-button"
                htmlFor="filter-effects-toggle"
              >
                effects
              </label>
              <div className="dropdown-menu effects">
                <EffectsDropdownList
                  effects={effects}
                  effectsBoxes={effectsBoxes}
                  setEffectsBoxes={setEffectsBoxes}
                />
              </div>
              <span className="icon-anchor effects"></span>
            </div>
          </div>
        </form>
        <FilterFrame
          searchInput={searchInput}
          devicesBoxes={devicesBoxes}
          effectsBoxes={effectsBoxes}
          bySelected={bySelected}
          setSearchInput={setSearchInput}
          setDevicesBoxes={setDevicesBoxes}
          setEffectsBoxes={setEffectsBoxes}
        />
      </div>
    </section>
  );
};

export { ProfilesSearch, SearchBars };
