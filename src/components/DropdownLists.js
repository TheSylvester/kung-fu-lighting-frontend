import { Checkbox } from "./Checkbox";

export const DevicesDropdownList = ({
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

export const EffectsDropdownList = ({
  effects,
  effectsBoxes,
  setEffectsBoxes
}) => {
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

export const SearchByDropdownList = ({ byList, bySelected, setBySelected }) => {
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
