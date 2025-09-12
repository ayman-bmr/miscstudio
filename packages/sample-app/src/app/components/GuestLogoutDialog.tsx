import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

interface GuestLogoutDialogProps {
    openDialog: boolean;
    setOpenDialog: (value: boolean) => void;
    onLogout: () => void;
}

const GuestLogoutDialog: React.FC<GuestLogoutDialogProps> = ({ openDialog, setOpenDialog, onLogout }) => {
    const { t } = useTranslation();

    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="remove-dialog-confirmation"
            aria-describedby="remove-dialog-description"
        >
            <DialogTitle id="remove-dialog-confirmation">
                {t("guestLogoutConfirmation")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="remove-dialog-description">
                    {t("guestLogoutDescription")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="inherit">
                    {t("cancel")}
                </Button>
                <Button onClick={onLogout} color="error">
                    {t("logout_menu_item_text")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GuestLogoutDialog;