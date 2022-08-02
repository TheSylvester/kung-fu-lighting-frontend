import { useEffect, useState } from "react";
import { profilesService } from "../services/profiles";

function useQueryProfileDB(query_object) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await profilesService.get(query_object);
      if (response && Array.isArray(response)) setProfiles(response);
    })();
  }, [query_object]);

  return profiles;
}

export default useQueryProfileDB;
