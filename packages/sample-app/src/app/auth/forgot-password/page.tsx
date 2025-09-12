'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@repo/providers/common-ui/LoadingButton';
import useForgotPassword from "@repo/providers/queryHooks/useForgotPassword";

interface MailSentPopupProps {
    open: boolean;
    onClose: () => void;
    message?: string;
}

const MailSentPopup: React.FC<MailSentPopupProps> = ({
    open,
    onClose,
    message = "This is a simple message.",
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    position: 'relative'
                }
            }}
        >
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: 150,
                    padding: 3
                }}
            >
                <Typography variant="body1">
                    {message}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default function ForgotPassword() {
    const { t } = useTranslation('auth');
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false)
    const { mutate: forgotPassword, isPending } = useForgotPassword();
    const sendVerificationCode = () => {
        forgotPassword(email, {
            onSuccess: () => {
                setIsEmailSent(true);
                handleOpen()
            }
        });
    };
    const backToSignin = () => router.push('/auth/signin')

    return (
        <Stack sx={{ minHeight: '100vh', justifyContent: 'center', p: 3 }}>
            <Stack
                alignItems="center"
                spacing={4}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.20)",
                }}
            >
                <Typography variant="h5" fontWeight='bold' sx={{ mb: 3, color: "primary.main" }}>
                    {t("signIn.forgotPasswordTitle")}
                </Typography>
                <Stack spacing={1}>
                    <Typography variant='body2' color='gray'>{t('signIn.forgotPasswordMessage')}</Typography>
                    <TextField
                        id="email"
                        label="email"
                        placeholder='m@exampl.com'
                        type='email'
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                        fullWidth
                    />
                    <LoadingButton loading={isPending} onClick={sendVerificationCode}>
                        <Typography color='white'>
                            {t(`forgotPassword.${isEmailSent ? "resendResetLink" : "sendResetLink"}`)}
                        </Typography>
                    </LoadingButton>
                    {isEmailSent &&
                        <Button onClick={backToSignin} sx={{ bgcolor: 'black' }}>
                            <Typography color='white'>{t("signIn.title")}</Typography>
                        </Button>
                    }
                    <Stack direction='row' spacing={1} justifyContent='center'>
                        <Typography variant='body2'> {t('signIn.rememberPassword')} </Typography>
                        <Link variant='body2' href="/auth/signin"> {t('signIn.title')} </Link>
                    </Stack>
                </Stack>
            </Stack>
            <MailSentPopup
                open={open}
                onClose={handleClose}
                message={t('forgotPassword.resetLinkMessage')}
            />
        </Stack>
    );
}
