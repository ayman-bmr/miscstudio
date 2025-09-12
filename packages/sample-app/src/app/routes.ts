import { Home, LocalLibrary, MenuBook, Person } from "@mui/icons-material";

export const routes = [
  {
    name: "home",
    path: "/",
    label: "home_icon_label",
    icon: Home,
  },
  {
    name: "books",
    path: "/books",
    label: "books_icon_label",
    icon: MenuBook,
  },
  {
    name: "libraries",
    path: "/libraries",
    label: "libraries_icon_label",
    icon: LocalLibrary,
  },
  {
    name: "profile",
    path: "/profile",
    label: "profile_icon_label",
    icon: Person,
  },
];
