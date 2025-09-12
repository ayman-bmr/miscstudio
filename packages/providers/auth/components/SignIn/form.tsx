import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LinkMUI from "@mui/material/Link";
import Link from "next/link";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import LoadingButton from "@repo/providers/common-ui/LoadingButton";
import { signInSchema, SignInFormFields } from "../../types";

interface SignInFormProps {
  onSubmit: (data: SignInFormFields) => Promise<void>;
  isPending: boolean;
  hideCreateAccount?: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, isPending, hideCreateAccount }) => {
  const { t } = useTranslation("auth");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label={t("signIn.usernameLabel")}
            autoComplete="username"
            autoFocus
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label={t("signIn.passwordLabel")}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
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
      <LoadingButton loading={isPending} color="primary">
        {t("signIn.signInButton")}
      </LoadingButton>
      <Stack
        direction="column"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          gap: 2,
        }}
      >
        {!hideCreateAccount && (
          <Typography variant="body2">
            {t("signIn.noAccount")}{" "}
            <LinkMUI component={Link} href="/signup" variant="inherit">
              {t("signIn.signUp")}
            </LinkMUI>
          </Typography>
        )}
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          component={Link}
          href="/welcome"

          color="primary"
        >
          {t("connexionPage.back")}
        </Button>
      </Stack>
    </Box>
  );
};

export default SignInForm;
