"use client";

import React from "react";
import { Stack, Typography, Skeleton, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import ItemDisplay from "./ItemDisplay";
import { useUserBooks } from "@repo/providers/queryHooks/useUserBooks";
import { StoryType } from "@repo/providers/intefaces/StoryType";
import Link from "next/link";

const BooksBloc = ({
  books,
  title,
  isFavorite,
}: {
  books: StoryType[];
  title: string;
  isFavorite?: boolean;
}) => {
  const { t } = useTranslation();

  if (!books.length) return null;
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: 2 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Link href={"/libraries" + (isFavorite ? "?tab=1" : "")} passHref>
          <Button variant="text" size="small">
            {t("View_All")}
          </Button>
        </Link>
      </Stack>

      {books.map((item: StoryType) => (
        <React.Fragment key={item.id}>
          <ItemDisplay story={item} />
        </React.Fragment>
      ))}
    </>
  );
};

const ContinueReading = () => {
  const { t } = useTranslation(["", "auth"]);
  const { data: books, isLoading, isError } = useUserBooks(3);

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={60} />;
  }

  const { inProgressBooks = [], favoriteBooks = [] } = books || {};
  return (inProgressBooks.length || favoriteBooks.length) && !isError ? (
    <Stack spacing={1} sx={{ px: 2, pb: 4 }}>
      <BooksBloc books={inProgressBooks} title={t("Continue_Reading")} />
      <BooksBloc
        books={favoriteBooks}
        title={t("favorites_icon_label")}
        isFavorite
      />
    </Stack>
  ) : (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" component="h1" fontWeight="bold" align="center">
        {t("connexionPage.title.discover", { ns: "auth" })}{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          {t("connexionPage.title.stories", { ns: "auth" })}
        </Box>
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        paragraph
        align="center"
      >
        {t("connexionPage.description", { ns: "auth" })}
      </Typography>
      <Box>
        <Button
          variant="contained"
          component={Link}
          href="/books"
          fullWidth
          size="large"
          color="primary"
        >
          {t("search_books")}
        </Button>
      </Box>
    </Stack>
  );
};

export default ContinueReading;
