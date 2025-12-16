const DEFAULT_ROUTE = "/";

const DEFAULT_COLORS = {
  fg: "text-teal-100",
  bg: "bg-teal-500",
  capsule: "text-white bg-teal-600",
};

export const MENU_ITEMS = [
  {
    route: DEFAULT_ROUTE,
    label: "Home",
    colors: DEFAULT_COLORS,
  },
  { route: "/work", label: "Work" },
  {
    route: "/about",
    label: "About",
    // colors: {
    //   fg: "text-sky-200",
    //   bg: "bg-sky-900",
    //   capsule: "text-white bg-sky-950",
    // },
  },
];

export const getMenuItem = (pathName: string) =>
  MENU_ITEMS.find(({ route }) => isUnderRoute(pathName, route));

export const isUnderRoute = (pathName: string, route: string) =>
  route === pathName || (route !== DEFAULT_ROUTE && pathName.startsWith(route));

export const getColorsForPath = (pathName: string) =>
  getMenuItem(pathName)?.colors || DEFAULT_COLORS;
