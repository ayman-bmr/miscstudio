"use client";

import React, { useState } from "react";
import {
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { useWelcomeUser } from "@repo/providers/queryHooks/useWelcomeUser";
import { routes } from "../routes";
import authHelpers from "@repo/providers/helpers/authHelpers";
import { useDeleteGuest } from "@repo/providers/queryHooks/useAuth";
import GuestLogoutDialog from "../components/GuestLogoutDialog";
import { useQueryClient } from "@tanstack/react-query";

const WelcomeUser = () => {
  const { data: user, isLoading, error } = useWelcomeUser();
  const queryClient = useQueryClient();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mutate: deleteGuestUser, isPending } = useDeleteGuest();
  const { push } = useRouter();
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOptionClick = () => {
    push(routes[3].path);
    handleClose();
  };

  const handleLogout = () => {
    if (user.isGuest) {
      setOpenLogoutDialog(true);
    } else {
      authHelpers.handleLogout({
        isGuest: user.isGuest,
        deleteGuestUser,
        push,
        queryClient,
      });
    }
  };

  if (error) return <Typography>Error: {error.message}</Typography>;

  if (isLoading) {
    return (
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          p: 2,
          pt: 7,
        }}
      >
        <Stack>
          <Skeleton variant="text" width={150} height={32} />
          <Skeleton variant="text" width={200} height={32} />
        </Stack>
        <Skeleton variant="circular" width={40} height={40} />
      </Stack>
    );
  }
  const welcomeMessage = t("welcome_message");

  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          p: 2,
          pt: 7,
        }}
      >
        <Stack>
          <Typography
            variant="h5"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {user?.first_name}
          </Typography>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            {welcomeMessage}
          </Typography>
        </Stack>
        <Avatar
          src={user?.profile_picture_url}
          alt={`avatar`}
          onClick={handleClick}
          sx={{ cursor: "pointer", width: 42, height: 42, bgcolor: "grey.600" }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleProfileOptionClick}>
            <Person sx={{ mr: 1 }} />
            <Typography>{t("profile_menu_item_text")}</Typography>
          </MenuItem>
          {/* <MenuItem onClick={handleClose}>
            <Settings sx={{ mr: 1 }} />
            <Typography>{t("settings_menu_item_text")}</Typography>
          </MenuItem> */}
          <MenuItem onClick={handleLogout} disabled={isPending}>
            <Logout sx={{ mr: 0.7, ml: 0.3 }} />
            <Typography>{t("logout_menu_item_text")}</Typography>
            {isPending && <CircularProgress size="20px" />}
          </MenuItem>
        </Menu>
      </Stack>
      <GuestLogoutDialog
        openDialog={openLogoutDialog}
        setOpenDialog={setOpenLogoutDialog}
        onLogout={() =>
          authHelpers.handleLogout({
            isGuest: user.isGuest,
            deleteGuestUser,
            push,
            queryClient,
          })
        }
      />
    </>
  );
};

export default WelcomeUser;
