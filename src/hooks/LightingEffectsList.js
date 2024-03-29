import { useEffect, useState } from "react";
import { lightingEffectsListService } from "../services/lightingEffectsList";

function useDevicesAndEffectsList() {
  const [rDevices, setDevices] = useState([]);
  const [rEffects, setEffects] = useState([]);

  useEffect(() => {
    (async function () {
      const { devices, effects } = await lightingEffectsListService.get();
      setDevices(devices);
      setEffects(effects);
    })();
  }, []);

  return { devices: rDevices, effects: rEffects };
}

export default useDevicesAndEffectsList;
