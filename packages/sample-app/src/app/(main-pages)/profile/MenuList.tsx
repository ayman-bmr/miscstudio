// components/MenuList.tsx
"use client";

import React, { useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogTitle,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useThemeContext, ColorMode } from "@repo/providers/mui/ThemeContext";

interface MenuListProps {
  onLogout: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const { mode, effectiveMode, setMode } = useThemeContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<ColorMode>(mode);

  const menuItems = [
    {
      href: "/libraries",
      icon: <BookmarkIcon sx={{ color: "#3f51b5" }} />,
      label: t("my_library"),
      isLogout: false,
    },
    {
      href: "/libraries?tab=1",
      icon: <FavoriteIcon sx={{ color: "#e91e63" }} />,
      label: t("my_favorites"),
      isLogout: false,
    },
    // Uncomment and adjust settings if needed
    // {
    //   href: "/profile/settings",
    //   icon: <SettingsIcon sx={{ color: "#4caf50" }} />,
    //   label: t("settings_menu_item_text"),
    //   isLogout: false,
    // },
    {
      href: "/logout",
      icon: <LogoutIcon sx={{ color: "#f44336" }} />,
      label: t("logout_menu_item_text"),
      isLogout: true,
    },
  ];

  const openThemeDialog = () => {
    setSelectedMode(mode);
    setDialogOpen(true);
  };

  const closeThemeDialog = () => {
    setDialogOpen(false);
  };

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const newMode = value as ColorMode;
    setSelectedMode(newMode);
    setMode(newMode);
    closeThemeDialog();
  };

  return (
    <>
      <List component="nav" sx={{ width: "100%" }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              component={item.isLogout ? "button" : Link}
              href={!item.isLogout ? item.href : undefined}
              onClick={item.isLogout ? onLogout : undefined}
              sx={{ width: "100%" }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
        <ListItemButton onClick={openThemeDialog} sx={{ width: "100%" }}>
          <ListItemIcon>
            {effectiveMode === "dark" ? (
              <Brightness7Icon sx={{ color: "#4caf50" }} />
            ) : (
              <Brightness4Icon sx={{ color: "#4caf50" }} />
            )}
          </ListItemIcon>
          <ListItemText primary={t("theme")} secondary={t(mode)} />
          <ListItemSecondaryAction />
        </ListItemButton>
        <Divider />
      </List>

      <Dialog open={dialogOpen} onClose={closeThemeDialog}>
        <DialogTitle>{t("select_theme")}</DialogTitle>
        <RadioGroup
          value={selectedMode}
          onChange={handleThemeChange}
          sx={{ padding: "16px" }}
        >
          <FormControlLabel
            value="light"
            control={<Radio />}
            label={t("light")}
          />
          <FormControlLabel
            value="dark"
            control={<Radio />}
            label={t("dark")}
          />
          <FormControlLabel
            value="system"
            control={<Radio />}
            label={t("system_default")}
          />
        </RadioGroup>
      </Dialog>
    </>
  );
};

export default MenuList;