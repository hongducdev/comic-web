import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSearchSuggestions = async (query: string) => {
  const response = await axios.get(`${baseUrl}/search-suggest?q=${query}`);

  return response.data;
};

export const getRecommended = async () => {
  const response = await axios.get(`${baseUrl}/recommended-comics`);

  return response.data;
};

export const getRecentUpdates = async (
  page: number,
  status: "all" | "ongoing" | "completed"
) => {
  const response = await axios.get(
    `${baseUrl}/recent-update-comics?page=${page}&status=${status}`
  );

  return response.data;
};

export const getNewComics = async (page: number, status: string) => {
  const response = await axios.get(
    `${baseUrl}/new-comics?page=${page}&status=${status}`
  );

  return response.data;
};

export const getListComic = async (type: string, page: number) => {
  const response = await axios.get(`${baseUrl}/${type}?page=${page}`);

  return response.data;
};

export const getTop = async (type: string, page: number, status: string) => {
  const response = await axios.get(
    `${baseUrl}/top/${type}?page=${page}&status=${status}`
  );

  return response.data;
};

export const getDetailComic = async (comic_id: string) => {
  const response = await axios.get(`${baseUrl}/comics/${comic_id}`);

  return response.data;
};

export const getComicChapter = async (comic_id: string) => {
  const response = await axios.get(`${baseUrl}/comics/${comic_id}/chapters`);

  return response.data;
};

export const getChapterDetail = async (
  comic_id: string,
  chapter_id: number
) => {
  const response = await axios.get(
    `${baseUrl}/comics/${comic_id}/chapters/${chapter_id}`
  );

  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(`${baseUrl}/genres`);

  return response.data;
};

export const getComicByGenre = async (
  genre_id: string,
  page: number,
  status: string
) => {
  const response = await axios.get(
    `${baseUrl}/genres/${genre_id}?page=${page}&status=${status}`
  );

  return response.data;
};
