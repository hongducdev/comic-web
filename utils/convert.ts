export const status = [
  {
    value: "Updating",
    label: "Đang cập nhật",
  },
  {
    value: "Ongoing",
    label: "Đang câp nhật",
  },
  {
    value: "Completed",
    label: "Đã hoàn thành",
  },
  {
    value: "Cancelled",
    label: "Đã hủy",
  },
];

export const formatNumber = (number: number) => {
  const formatter = Intl.NumberFormat("vi-VN", {
    notation: "compact",
  });

  return formatter.format(number);
};
