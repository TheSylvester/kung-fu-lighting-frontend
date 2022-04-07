import axios from "axios";
const baseUrl = "http://localhost:3001/api/redditscraper";

const get = async (limit = null, after = null) => {
  const response = await axios.get(baseUrl, { params: { limit, after } });
  console.log("redditscraper.get() ", response);
  return response.data;
};

const redditscrapeService = { get };

export default redditscrapeService;
