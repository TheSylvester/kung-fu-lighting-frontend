import { useCallback, useEffect, useRef, useState } from "react";
import { profilesService } from "../services/profiles";

const LIMIT = 8; // number of elements to retrieve at a time

// function timeout(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

function useQueryProfileDB(query, page = 1) {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastQuery = useRef();

  const getProfiles = useCallback(
    async function () {
      setIsLoading(true);
      try {
        const queryHasReset = lastQuery.current !== query;
        const response = await profilesService.get({
          ...query,
          limit: query.limit ?? LIMIT,
          skip: (query.limit ?? LIMIT) * ((queryHasReset ? 1 : page) - 1)
        });
        // await timeout(5000); // ARTIFICIAL TIMEOUT
        lastQuery.current = query; // memoize the last query sent
        if (response && Array.isArray(response)) {
          setProfiles((prev) =>
            queryHasReset ? [...response] : [...prev, ...response]
          );
          setHasMore(response.length === LIMIT);
        }
        setIsLoading(false);
      } catch (error) {
        alert(`error in loader: ${error}`);
      }
    },

    [query, page]
  );

  useEffect(() => {
    getProfiles().then();
  }, [query, page, getProfiles]);

  return { profiles, hasMore, isLoading };
}

export default useQueryProfileDB;
