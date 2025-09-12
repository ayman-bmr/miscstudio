"use client";

import TranslateIcon from "@mui/icons-material/Translate";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  IconButton,
  Tooltip,
  useTheme,
  Button,
  Paper,
  Popper,
  Grow,
  MenuList,
  ClickAwayListener,
  useMediaQuery,
} from "@mui/material";
import { useLanguage } from "../../../packages/providers/i18n/useLanguage";
import { useThemeContext } from "../../../packages/providers/mui/ThemeContext";
import logoMiscForDark from "../../../public/logo-for-dark.webp";
import logoMiscForLight from "../../../public/logo-for-light.webp";
import Image from "next/image";
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
//import { useDbTranslation } from "../../../hooks/useDbTranslation";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { language, handleLanguageChange } = useLanguage();
  const { effectiveMode, setMode } = useThemeContext();
  const { t } = useTranslation(); // ✅ use hook here
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();
  const router = useRouter();

  const [appsOpen, setAppsOpen] = useState(false);
  const appsButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleThemeToggle = () =>
    setMode(effectiveMode === "light" ? "dark" : "light");

  const handleAppsOpen = () => setAppsOpen(true);
  const handleAppsClose = () => setAppsOpen(false);
  const handleAppsToggle = () => setAppsOpen((prev) => !prev);

  const logoMisc = effectiveMode === "light" ? logoMiscForLight : logoMiscForDark;

  const scrollOrNavigate = (id: string) => {
    if (pathname === "/") {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor:
          theme.palette.glassyHeader?.background ?? "rgba(255,255,255,0.8)",
        borderBottom: `1px solid ${
          theme.palette.glassyHeader?.border ?? "rgba(0,0,0,0.05)"
        }`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.glassyHeader?.gradient ??
            "linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0))",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Logo */}
          <Stack alignItems="center" direction="row" gap={2}>
            <Image src={logoMisc} alt="Hikaya" width={67} height={50} priority />
          </Stack>

          {/* Navigation */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Button color="inherit" onClick={() => scrollOrNavigate("home")}>
              {t("home_icon_label")}
            </Button>

            {/* Applications dropdown */}
            <Box
              sx={{ position: "relative" }}
              onMouseEnter={!isMobile ? handleAppsOpen : undefined}
              onMouseLeave={!isMobile ? handleAppsClose : undefined}
            >
              <Button
                color="inherit"
                ref={appsButtonRef}
                onClick={() => {
                  if (isMobile) handleAppsToggle();
                  scrollOrNavigate("applications_section");
                }}
              >
                {t("applications")}
              </Button>

              <Popper
                open={appsOpen}
                anchorEl={appsButtonRef.current}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper elevation={3}>
                      <ClickAwayListener onClickAway={handleAppsClose}>
                        <MenuList
                          onMouseEnter={!isMobile ? handleAppsOpen : undefined}
                          onMouseLeave={!isMobile ? handleAppsClose : undefined}
                        >
                          <MenuItem
                            onClick={() => {
                              scrollOrNavigate("applications_section");
                              handleAppsClose();
                            }}
                          >
                            {t("hikaya_title")}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              scrollOrNavigate("applications_section");
                              handleAppsClose();
                            }}
                          >
                            {t("Coup_board_game_title")}
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              scrollOrNavigate("applications_section");
                              handleAppsClose();
                            }}
                          >
                            {t("sketchIt_title")}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>

            <Button color="inherit" onClick={() => scrollOrNavigate("about_us")}>
              {t("about_us")}
            </Button>
          </Stack>

          {/* Language & Theme */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip
              title={effectiveMode === "light" ? t("dark_mode") : t("light_mode")}
            >
              <IconButton
                onClick={handleThemeToggle}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255,0.2)" },
                }}
              >
                {effectiveMode === "light" ? (
                  <DarkModeIcon sx={{ color: "text.secondary" }} />
                ) : (
                  <LightModeIcon sx={{ color: "text.secondary" }} />
                )}
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 2,
                padding: "4px 8px",
              }}
            >
              <TranslateIcon sx={{ color: "text.secondary", fontSize: 20 }} />
              <Select
                value={language || "en"}
                onChange={handleLanguageChange}
                variant="standard"
                sx={{
                  ".MuiSelect-select": { py: 0.5, pr: 2 },
                  "&:before, &:after": { display: "none" },
                }}
                disableUnderline
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ar">العربية</MenuItem>
              </Select>
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
