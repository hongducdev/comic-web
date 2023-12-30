export interface Comic {
  id: string;
  title: string;
  thumbnail: string;
  updatedAt: string;
  is_trending: boolean;
  genres: Genre[];
  short_description: string;
  other_names: string[];
  status: string;
  total_views: number;
  followers: number;
  last_chapter: Chapter;
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
}

export interface Chapter {
  id: number;
  name: string;
}
