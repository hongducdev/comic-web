interface NavbarLink {
  label: string;
  path: string;
}

export const NavbarLinks: NavbarLink[] = [
  {
    label: "Trang chủ",
    path: "/",
  },
  {
    label: "Thể loại",
    path: "/genres",
  },
  {
    label: "Truyện mới",
    path: "/new",
  },
  {
    label: "Hàng đầu",
    path: "/top",
  },
];
