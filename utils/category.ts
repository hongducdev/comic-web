export interface ICategory {
  id: string;
  name: string;
}

export const categoryList: ICategory[] = [
  {
    id: "trending-comics",
    name: "Đang phổ biến",
  },
  {
    id: "completed-comics",
    name: "Đã hoàn thành",
  },
  {
    id: "boy-comics",
    name: "Dành cho nam",
  },
  {
    id: "girl-comics",
    name: "Dành cho nữ",
  },
];
