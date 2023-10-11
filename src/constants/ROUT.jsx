
export const routs = {
  "/": { link: "/", name: "Home" },
  "/login": { link: "/login", name: "Đăng nhập" },
  "/reissue": { link: "/reissue", name: "Tạo tài khoản" },
  "/createProduct": { name: 'Tạo sản phẩm', name2: 'ADMIN', link: '/admin/product/create', },
  "/tableProduct": { name: 'Quản lý sản phẩm', link: '/admin/product/table', },
  "/tableOrder": { name: 'Đơn Hàng', link: '/admin/order', },
  "/logout": { name: 'Đăng Xuất', link: '/logout', },
  "/order": { name: 'Đơn hàng', link: '/order', },
};
