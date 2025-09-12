"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { useSignIn } from "../../useAuth";
import CustomSnackBar from "@repo/providers/common-ui/CustomSnackBar";
import { SignInFormFields } from "../../types";
import SignInForm from "./form";
import Loader from "../../../common-ui/Loader";

const SignInPage: React.FC<{ href: string, hideCreateAccount?: boolean }> = ({ href, hideCreateAccount }) => {
  const { t } = useTranslation("auth");
  const { mutateAsync: signIn, isPending, isSuccess } = useSignIn();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const router = useRouter();

  const onSuccess = () => {
    setSnackbar({
      open: true,
      message: "Successful Sign In",
      severity: "success",
    });
    router.push(href);
  };

  const handleSubmit = async (formData: SignInFormFields) => {
    await signIn(formData, {
      onSuccess,
      onError: (error) => {
        if (error.message === "CredentialsSignin") {
          setSnackbar({
            open: true,
            message: "Username or Password incorrect",
            severity: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: "An unknown error occurred",
            severity: "error",
          });
        }
      },
    });
  };

  return (
    <Loader loading={isPending || isSuccess}>
      <Paper
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          bgcolor: 'transparent',
        }}
        elevation={0}
      >
        <Stack
          maxWidth="sm"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, color: "primary.main" }}
          >
            {t("signIn.title")}
          </Typography>
          <SignInForm onSubmit={handleSubmit} isPending={isPending} hideCreateAccount={hideCreateAccount} />
        </Stack>
        <CustomSnackBar
          open={snackbar.open}
          message={snackbar.message}
          severity={
            snackbar.severity as "error" | "warning" | "info" | "success"
          }
          onClose={handleSnackbarClose}
        />
      </Paper>
    </Loader>
  );
};

export default SignInPage;
