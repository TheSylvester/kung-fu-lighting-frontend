import axios from "axios";

const baseUrl = "/api/profiles";
const voteUrl = "/oauth/vote";

const get = async (props) => {
  const response = await axios.get(baseUrl, {
    params: props
  });
  return response.data;
};

const vote = async (props) => {
  const response = await axios.post(voteUrl, props);
  console.log(
    `profilesService.vote status: ${response.status} - ${response.data}`
  );
  return response;
};

export const profilesService = { get, vote };
