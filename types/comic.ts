export interface Comic {
  id: string;
  title: string;
  thumbnail: string;
  updatedAt: string;
  isTrending: boolean;
  genres: Genre[];
  short_description: string;
  other_names: string[];
  status: string;
  total_views: number;
  followers: number;
  last_chapter: Chapter;
}

interface Genre {
  id: string;
  name: string;
}

interface Chapter {
  id: number;
  name: string;
}