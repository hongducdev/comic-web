interface StatusComic {
  id: string;
  name: string;
}

export const statusComic: StatusComic[] = [
  {
    id: "all",
    name: "Tất cả"
  },
  {
    id: "ongoing",
    name: "Đang tiến hành"
  },
  {
    id: "completed",
    name: "Đã hoàn thành"
  }
]