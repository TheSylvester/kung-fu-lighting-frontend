const axios = require("axios");
const baseUrl = "http://localhost:3001/api/profiles";

const get = async (props) => {
  const response = await axios.get(baseUrl, {
    params: props
  });
  return response.data;
};

export const profilesService = { get };
