import axios from "axios";

const baseUrl = "/api/get-devices-and-effects";

const get = async (props) => {
  const response = await axios.get(baseUrl, {
    params: props
  });
  return response.data;
};

export const lightingEffectsListService = { get };
