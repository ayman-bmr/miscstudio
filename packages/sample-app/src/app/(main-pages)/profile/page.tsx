"use client";

import GreenBean from "../../components/GreenBean";
import GuestLogoutDialog from "../../components/GuestLogoutDialog";
import { useDeleteGuest } from "@repo/providers/queryHooks/useAuth";
import { useWelcomeUser } from "@repo/providers/queryHooks/useWelcomeUser";
import { useLanguage } from "@repo/providers/i18n/useLanguage";

import {
  Container,
  Divider,
  MenuItem,
  Select,
  Stack
} from "@mui/material";
import authHelpers from "@repo/providers/helpers/authHelpers";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Headers from "./Header";
import MenuList from "./MenuList";
import Stats from "./Stats";

const ProfilePage = () => {
  const { data: user } = useWelcomeUser();
  const queryClient = useQueryClient();
  const { language, handleLanguageChange } = useLanguage();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { mutate: deleteGuestUser, isPending } = useDeleteGuest();
  const { push } = useRouter();

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

  return (
    <Container>
      <GreenBean />
      <Stack
        spacing={1}
        flexDirection="column"
        alignItems="center"
        sx={{ mt: 5 }}
      >
        <Headers
          profilePictureUrl={user?.profile_picture_url}
          username={user?.first_name}
        />
        <Stats />
        <Divider flexItem variant="middle" />
        <Stack direction="row" alignItems="center" spacing={2} sx={{ pt: 2 }}>
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ width: 150 }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>
        </Stack>
        <MenuList onLogout={handleLogout} />
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
    </Container>
  );
};

export default ProfilePage;
