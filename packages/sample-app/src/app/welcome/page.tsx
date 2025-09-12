"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkMui from "@mui/material/Link";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { usePostGuest } from "@repo/providers/queryHooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import authHelpers from "@repo/providers/helpers/authHelpers";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useSignIn } from "@repo/providers/auth/useAuth";
import { useLanguage } from "@repo/providers/i18n/useLanguage";

export default function HomePage() {
  const { t } = useTranslation("auth");
  const { language, handleLanguageChange } = useLanguage();
  const { push } = useRouter();
  const { mutateAsync: signIn, isPending: isPendingSignIn } = useSignIn();
  const { mutate: postGuest, isPending: isPendingPostGuest } = usePostGuest({
    onSuccess: signIn,
  });

  const [openGuestModal, setOpenGuestModal] = useState(false);

  useEffect(() => {
    if (authHelpers.isAuthenticated()) {
      push("/");
    }
  }, [push]);

  const handleGuestLogin = () => {
    postGuest();
  };

  const isPending = isPendingSignIn || isPendingPostGuest;
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "80%",
          width: "100%",
          position: "relative",
        }}
        className="ios-remove-padding"
      >
        <Image
          src="/background_main_image.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          dir="ltr"
          sx={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            margin: "auto",
            textAlign: "center",
            px: 2,
          }}
        >
          <Stack direction="row" gap={1} alignItems="center">
            <Image src="/logo.png" alt="Hikaya" width={40} height={40} />
            <Typography fontWeight="bold" color="black">Hikaya</Typography>
          </Stack>
          <Select
            value={language}
            onChange={handleLanguageChange}
            sx={{ bgcolor: "background.paper", px: 1 }}
            variant="standard"
          >
            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
          </Select>
        </Stack>
      </Box>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderTopLeftRadius: "42px",
          py: 4,
          px: 3,
          position: "fixed",
          bottom: 0,
          width: "100%",
          right: 0,
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            {t("connexionPage.title.discover")}{" "}
            <Box component="span" sx={{ color: "secondary.main" }}>
              {t("connexionPage.title.stories")}
            </Box>
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {t("connexionPage.description")}
          </Typography>
          <Box>
            <Button
              variant="contained"
              component={Link}
              href="/auth/signin"
              fullWidth
              size="large"
              color="primary"
            >
              {t("connexionPage.logIn")}
            </Button>
          </Box>

          <Stack alignItems="center" gap={2}>
            <Typography sx={{ mb: 2 }} align="center">
              {t("connexionPage.createAccount.question")}{" "}
              <LinkMui
                component={Link}
                href="/signup"
                sx={{ color: "primary.main" }}
              >
                {t("connexionPage.createAccount.answer")}
              </LinkMui>
            </Typography>
            <Typography align="center">
              <Button
                disabled={isPending}
                sx={{
                  color: "primary.main",
                }}
                onClick={() => setOpenGuestModal(true)}
                endIcon={isPending && <CircularProgress size="20px" />}
              >
                {t("connexionPage.continueAsGuest")}
                <CircularProgress size="30" />
              </Button>
            </Typography>
          </Stack>
        </Stack>
        <Dialog
          open={openGuestModal}
          onClose={() => setOpenGuestModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t("guest_warning.title")}</DialogTitle>
          <DialogContent>
            <Typography>{t("guest_warning.message")}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                push("/signup");
              }}
              color="primary"
            >
              {t("guest_warning.cancel")}
            </Button>
            <Button
              onClick={() => {
                setOpenGuestModal(false);
                handleGuestLogin();
              }}
              color="inherit"
              variant="outlined"
            >
              {t("guest_warning.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
