const axios = require("axios");
// const queryString = require("query-string");

const baseUrl = "http://localhost:3001/api/profiles";

// const paramsSerializer = (params) => queryString.stringify(params);

const get = async (props) => {
  const response = await axios.get(baseUrl, {
    params: props
  });
  return response.data;
};

export const profilesService = { get };
