'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const LanguageSelection = () => {

  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label">Language</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={i18n.language}
        label="Language"
        onChange={(e) => changeLanguage(e.target.value as string)}
      >
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'ar'}>Arabic</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelection;
