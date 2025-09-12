import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LinkMUI from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LoadingButton from "@repo/providers/common-ui/LoadingButton";
import { signUpSchema, SignUpFormFields } from "../../types";

interface SignUpFormProps {
  onSubmit: SubmitHandler<SignUpFormFields>;
  isPending: boolean;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, isPending }) => {
  const { t } = useTranslation("auth");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: "User",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%" }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("signUp.emailLabel")}
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={
              errors.email && t(`signUp.errors.${errors.email?.message}`)
            }
            variant="outlined"
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="username"
            label={t("signUp.usernameLabel")}
            autoComplete="username"
            error={!!errors.username}
            helperText={
              errors.username && t(`signUp.errors.${errors.username?.message}`)
            }
            variant="outlined"
          />
        )}
      />
      <Stack direction="row" spacing={2} mt={2}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="firstName"
              label={t("signUp.firstNameLabel")}
              autoComplete="given-name"
              error={!!errors.firstName}
              helperText={
                errors.firstName &&
                t(`signUp.errors.${errors.firstName?.message}`)
              }
              variant="outlined"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="lastName"
              label={t("signUp.lastNameLabel")}
              autoComplete="family-name"
              error={!!errors.lastName}
              helperText={
                errors.lastName &&
                t(`signUp.errors.${errors.lastName?.message}`)
              }
              variant="outlined"
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={2} mt={2}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label={t("signUp.passwordLabel")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              error={!!errors.password}
              helperText={
                errors.password &&
                t(`signUp.errors.${errors.password?.message}`)
              }
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              label={t("signUp.confirmPasswordLabel")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              error={!!errors.confirmPassword || confirmPassword !== password}
              helperText={
                errors.confirmPassword &&
                t(`signUp.errors.${errors.confirmPassword?.message}`)
              }
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>
      <LoadingButton
        loading={isPending}
        sx={{ mt: 3 }}
        color="primary"
      >
        {t("signUp.signUpButton")}
      </LoadingButton>

      <Stack mt={2} alignItems="center">
        <Typography variant="body2">
          {t("signUp.haveAccount")}{" "}
          <LinkMUI component={Link} href="/auth/signin">
            {t("signUp.signIn")}
          </LinkMUI>
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          component={Link}
          href="/welcome"
          color="primary"
          sx={{ mt: 2 }}
        >
          {t("connexionPage.back")}
        </Button>
      </Stack>
    </Box>
  );
};

export default SignUpForm;