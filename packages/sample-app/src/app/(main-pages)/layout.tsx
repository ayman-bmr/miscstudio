"use client";
import Box from "@mui/material/Box";

import { usePathname } from "next/navigation";
import BottomNav from "../components/BottomNav";
import { routes } from "../routes";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const mainPages = routes.map((route) => route.path);
  const isMainPage = mainPages.includes(pathname);


  return (
    <Box
      sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      className="ios-padding ios-remove-padding"
    >
      <Box
        sx={{
          mb: isMainPage ? 10 : 0,
        }}
      >
        {children}
      </Box>
      {isMainPage && <BottomNav />}
    </Box>
  );
}
