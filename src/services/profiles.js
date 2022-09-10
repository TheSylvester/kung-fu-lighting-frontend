import axios from "axios";

const baseUrl = "/api/profiles";

const get = async (props) => {
  const response = await axios.get(baseUrl, {
    params: props
  });
  return response.data;
};

export const profilesService = { get };
