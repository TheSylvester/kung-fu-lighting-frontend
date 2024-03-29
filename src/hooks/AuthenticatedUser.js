import { useEffect, useState } from "react";
import { userListService } from "../services/userList";

/**
 * useAuthenticatedUser
 * Gets user from the local kfl-connect mongodb backend if we have a chroma_gallery_token cookie set
 * @returns {{logout: function(), isAuthenticated: boolean, user: {name: string, snoovatar_img: string, id: string}}} local user object
 */
function useAuthenticatedUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ id: "", name: "", snoovatar_img: "" });

  useEffect(() => {
    (async function () {
      const result = await userListService.getKflUser();
      const isUser = Boolean(result.id && result.name);

      setUser(result);
      setIsAuthenticated(isUser);
    })();
  }, []);

  const logout = async () => {
    setIsAuthenticated(false);
    setUser({ id: "", name: "", snoovatar_img: "" });
    await userListService.logout();
  };

  return { isAuthenticated, user, logout };
}

export default useAuthenticatedUser;
