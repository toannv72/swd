export type RouteItem = {
  link: string;
  name: string;
};
export type RoutDef = "/signIn" | "/reissue";

export const routs_en: Record<RoutDef, RouteItem> = {
  "/signIn": { link: "/signIn", name: "signIn" },
  "/reissue": { link: "/reissue", name: "reissue" },
};

export const routs_vn: Record<RoutDef, RouteItem> = {
    "/signIn": { link: "/signIn", name: "Đăng Nhập" },
    "/reissue": { link: "/reissue", name: "Đăng Ký" },
  };