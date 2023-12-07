import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export { fetchSearchResults };
