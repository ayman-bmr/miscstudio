'use client';

import React, { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Divider, Box, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const SettingsPage: React.FC = () => {

  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState(i18n.language); // i18n.language already uses localStorage
  const { back } = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedLanguage: string) => {
    if (selectedLanguage && selectedLanguage !== language) {
      setLanguage(selectedLanguage);
      i18n.changeLanguage(selectedLanguage); // Automatically updates localStorage via i18n
    }
    setAnchorEl(null);
  };

  const handleBackClick = () => {
    back();
  };

  return (
    <Box sx={{ padding: 2, margin: 'auto' }}>
      <IconButton onClick={handleBackClick} aria-label="back" sx={{ marginBottom: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom>
        {t('settings_menu_item_text')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('select_language')}
      </Typography>
      <Button
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        variant="contained"
        color="primary"
        fullWidth
        style={{ textTransform: 'capitalize', maxWidth: '200px' }}
      >
        {language === 'en' ? t('english') : t('arabic')}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '200px',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleClose('en')}>{t('english')}</MenuItem>
        <MenuItem onClick={() => handleClose('ar')}>{t('arabic')}</MenuItem>
      </Menu>
      <Divider sx={{ margin: '20px 0' }} />
      <Typography variant="body2" color="textSecondary" align="center">
        {t('selected_language_text')}
      </Typography>
    </Box>
  );
};

export default SettingsPage;
