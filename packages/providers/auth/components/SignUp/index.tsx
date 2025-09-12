'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import SignUpForm from './form';
import { SignUpFormFields } from '../../types';
import { useSignUp } from '../../useAuth';
import CustomSnackBar from '@repo/providers/common-ui/CustomSnackBar'

const SignUpPage: React.FC = () => {

  const { t } = useTranslation("auth");

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const { mutateAsync: signUp, isPending } = useSignUp();

  const router = useRouter();

  const handleSubmit = async (formData: SignUpFormFields) => {

    await signUp(formData, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: t('signUp.successMessage'),
          severity: 'success'
        });

        setTimeout(() => {
          router.push("/auth/signin"); 
        }, 2000);        
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          setSnackbar({
            open: true,
            message: t(`signUp.errors.${error.response.data.error}`),
            severity: 'error'
          });
        } else {
          setSnackbar({
            open: true,
            message: 'An unknown error occurred',
            severity: 'error'
          });
        }
      }
    });
  };

  return (
    <Paper 
      sx={{ 
        minHeight: '100vh',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        bgcolor: 'transparent'
      }}
      elevation={0}
    >
      <Stack
        maxWidth="sm" 
        justifyContent='center'
        alignItems='center'
        spacing={5}
        px={4}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
          {t('signUp.title')}
        </Typography>
        <SignUpForm onSubmit={handleSubmit} isPending={isPending} />
      </Stack>
      <CustomSnackBar 
        onClose={handleSnackbarClose} 
        open={snackbar.open} 
        message={snackbar.message} 
        severity={snackbar.severity as 'error' | 'warning' | 'info' | 'success'} 
      />
    </Paper>
  );
};

export default SignUpPage;