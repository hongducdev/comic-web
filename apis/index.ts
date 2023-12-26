import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSearchSuggestions = async (query: string) => {
  const response = await axios.get(`${baseUrl}/search-suggest?q=${query}`);

  return response.data;
};
