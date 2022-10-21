import axios from "axios";

const userUrl = "/oauth/user";
const logoutUrl = "/oauth/logout";

/**
 * Queries /oauth/user to check for an httpOnly token and give us a user if exists
 * @returns { {id: String, name: String, snoovatar_img: String} } user object, items are empty if no user found
 */
const getKflUser = async () => {
  try {
    const response = await axios.get(userUrl);
    return response.data;
  } catch (e) {
    console.log(
      "userListService.getKflUser() error: ",
      Object.keys(e),
      e.response.status,
      e.message
    );
    return { id: "", name: "", snoovatar_img: "" };
  }
};

const logout = async () => {
  await axios.post(logoutUrl);
};

export const userListService = { getKflUser, logout };
