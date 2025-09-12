"use client";

import * as React from "react";
import { Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../routes";

export default function BottomNav() {
  const { t } = useTranslation();
  const [value, setValue] = React.useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const currentRouteIndex = routes.findIndex(
      (route) => route.path === pathname
    );
    setValue(currentRouteIndex !== -1 ? currentRouteIndex : null);
  }, [pathname]);

  const handleNavigationChange = (event: any, newValue: number) => {
    setValue(newValue);
    const route = routes[newValue];
    route && router.push(route.path);
  };

  return (
    value !== null && (
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <BottomNavigation
          sx={{
            height: 70,
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
          }}
          showLabels
          value={value}
          onChange={handleNavigationChange}
        >
          {routes.slice(0, 4).map((route, index) => (
            <BottomNavigationAction
              key={index}
              label={t(route.label)}
              icon={<route.icon />}
            />
          ))}
        </BottomNavigation>
      </Paper>
    )
  );
}
