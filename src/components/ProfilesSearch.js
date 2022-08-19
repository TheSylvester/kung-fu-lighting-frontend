import useLightingEffectsList from "../hooks/LightingEffectsList";
import { useEffect, useMemo, useState } from "react";
import { FilterFrame } from "./FilterFrame";
import debounce from "lodash/debounce";
import {
  DevicesDropdownList,
  EffectsDropdownList,
  SearchByDropdownList
} from "./DropdownLists";

const ProfilesSearch = () => {
  return (
    <section id="profiles" className="profiles-search image-background">
      <h2 className="profiles-title animate-entrance pop delay-4">
        RAZER LIGHTING PROFILES
      </h2>
    </section>
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

  // addEventListener to uncheck dropdown-button on outside clicks
  // useEffect(() => {
  //   document.addEventListener("click", (e) => {
  //     // if you click anywhere on a screen other than an active box, deselect all boxes
  //     const isDropdownButton = e.target.matches("[data-dropdown-button]");
  //     if (!isDropdownButton) {
  //       document
  //         .querySelectorAll("[data-dropdown-checkbox]")
  //         .forEach((b) => (b.checked = false));
  //     }
  //   });
  // }, []);

  const handleDevicesInput = (e) => {
    setDevicesInput(e.target.value);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const toggleClickListener = (e) => {
    // addEventListener when target.checked === true
    // the listener self removes when you first click outside,
    // or when the checkbox is manually unchecked

    const handleClick = (f) => {
      const clickIsOutside =
        f.target.closest("[data-dropdown-root]") !==
        e.target.closest("[data-dropdown-root]");

      if (clickIsOutside) {
        // uncheck the associated checkbox
        e.target.closest("[data-dropdown-checkbox]").checked = false;
        document.removeEventListener("click", handleClick, { capture: true });
      }
    };

    if (e.target.checked === true) {
      document.addEventListener("click", handleClick, { capture: true });
    } else {
      // turn off listener on any unchecking
      document.removeEventListener("click", handleClick, { capture: true });
    }
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
            <div className="input tab filter" data-dropdown-root="filter">
              <label
                htmlFor="filter-by-toggle"
                className="dropdown-button"
                data-dropdown-button="data-dropdown-button"
              >
                {bySelected.replace("-", " ")}
              </label>
              <input
                type="checkbox"
                id="filter-by-toggle"
                className="hidden-checkbox"
                onChange={toggleClickListener}
                data-dropdown-checkbox="data-dropdown-checkbox"
              />
              <div
                className="dropdown-menu filter"
                data-dropdown="data-dropdown"
              >
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
            <div className="input tab effects" data-dropdown-root="effects">
              <input
                type="checkbox"
                id="filter-effects-toggle"
                className="hidden-checkbox"
                onChange={toggleClickListener}
                data-dropdown-checkbox="data-dropdown-checkbox"
              />
              <label
                className="dropdown-button"
                htmlFor="filter-effects-toggle"
                data-dropdown-button="data-dropdown-button"
              >
                effects
              </label>
              <div
                className="dropdown-menu effects"
                data-dropdown="data-dropdown"
              >
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
