import i18n from "@repo/providers/i18n/i18n";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

const GreenBean = () => {
  const isRTL = i18n.language === "ar";
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        // zIndex: -1,
        insetInlineEnd: -20,
        width: "100%",
      }}
    >
      <Box
        sx={{
          marginInlineStart: "auto",
          transform: isRTL ? "scaleX(-1)" : "scaleX(1)",
        }}
      >
        <Image src="/motif.svg" alt="motif" height={150} width={150} priority />
      </Box>
    </Stack>
  );
};

export default GreenBean;
