"use client";

import React from "react";
import { Stack, Typography, Button, Box, ButtonBase } from "@mui/material";
import Image from "next/image";

import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import { useCategory } from "@repo/providers/queryHooks/useCategory";
import { useModalContext } from "../context/ModalContext";

interface BookSliderProps {
  categoryId: number;
  categoryName: string;
  setCategories: (categories: Array<number>) => void;
}

const BookSlider: React.FC<BookSliderProps> = ({
  categoryId,
  categoryName,
  setCategories,
}) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useCategory(categoryId);
  const theme = useTheme();
  const { openModal } = useModalContext();

  if (isLoading || error || !data || !data.books.length) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2 }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {categoryName}
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={() => setCategories([categoryId])}
        >
          {t("View_All")}
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          px: 2,
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {data.books.map((book) => (
          <ButtonBase
            onClick={() =>
              openModal({
                id: book?.id,
                title: book?.title,
                coverImgUrl: book?.cover_img_url || "",
              })
            }
            disableRipple
            key={book.id}
            sx={{
              flex: '0 0 auto',
              width: `calc((100% - 32px) / 3)`,
              scrollSnapAlign: 'center',
            }}
          >
            <Stack spacing={1} sx={{ width: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  borderRadius: 6,
                  position: 'relative',
                }}
              >
                <Image
                  src={
                    book.cover_img_url ||
                    "https://via.placeholder.com/200x250?text=No+Image"
                  }
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Typography
                variant="subtitle2"
                dir="auto"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: '100%',
                  px: 0.5
                }}
              >
                {book.title}
              </Typography>
            </Stack>
          </ButtonBase>
        ))}
      </Box>
    </Stack>
  );
};

export default BookSlider;