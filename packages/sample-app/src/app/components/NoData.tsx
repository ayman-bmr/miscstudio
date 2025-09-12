import { Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const NoData = ({ message }: { message?: string }) => {
  const { t } = useTranslation();
  return (
    <Stack gap={2} alignItems="center">
      <Image
        src="/no-data.png"
        alt="no-data"
        height={150}
        width={150}
        priority
      />
      <Typography>{message || t("no_books_display")}</Typography>
      <Link href={"/books"} passHref>
        <Button variant="contained">{t("search_books")}</Button>
      </Link>
    </Stack>
  );
};

export default NoData;
