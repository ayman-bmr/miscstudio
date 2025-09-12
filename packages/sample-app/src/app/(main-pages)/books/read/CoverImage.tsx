"use client";
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface CoverImageProps {
  src: string;
  alt: string;
}

const CoverImage: React.FC<CoverImageProps> = ({ src, alt }) => {
  return (
    <Box
      sx={{
        width: "40%",
        position: "relative",
      }}
    >
      <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} priority />
    </Box>
  );
};

export default CoverImage;
