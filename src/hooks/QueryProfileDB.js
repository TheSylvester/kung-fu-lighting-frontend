import { useCallback, useEffect, useRef, useState } from "react";
import { profilesService } from "../services/profiles";

const LIMIT = 8; // number of elements to retrieve at a time

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

  const setLikes = (id, likes) => {
    setProfiles((profiles) =>
      profiles.map((p) => ({
        ...p,
        likes: p.id36 === id ? likes : p.likes
      }))
    );
  };

  useEffect(() => {
    getProfiles().then();
  }, [query, page, getProfiles]);

  return { profiles, hasMore, isLoading, setLikes };
}

export default useQueryProfileDB;
