"use client";

import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUserBooks } from "@repo/providers/queryHooks/useUserBooks";


const Stats: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { data: books} = useUserBooks();
  const { inProgressBooks = [], favoriteBooks = [] } = books || {};

  return (
    <Stack direction="row" gap={2} sx={{ justifyContent: "space-around" }}>
      <Box textAlign="center">
        <Typography variant="h6">{inProgressBooks.length}</Typography>
        <Typography variant="body2" color="textSecondary">
          {t("in_progress_books")}
        </Typography>
      </Box>

      <Box textAlign="center">
        <Typography variant="h6">{favoriteBooks.length}</Typography>
        <Typography variant="body2" color="textSecondary">
          {t("profile_favorites")}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Stats;
