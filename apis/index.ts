import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSearchSuggestions = async (query: string) => {
  const response = await axios.get(`${baseUrl}/search-suggest?q=${query}`);

  return response.data;
};

export const getTrending = async (page: number) => {
  const response = await axios.get(`${baseUrl}/trending-comics/?page=${page}`);

  return response.data;
};
