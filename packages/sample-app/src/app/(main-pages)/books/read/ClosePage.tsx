"use client";
import React from "react";
import { Box, IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";

interface ClosePageProps {
  onClose: () => void;
}

const ClosePage: React.FC<ClosePageProps> = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 2,
      }}
    >
      <IconButton onClick={onClose} aria-label="close">
        <Cancel
          sx={{
            cursor: "pointer",
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.5))",
            color: "#fff",
            stroke: "#ccc",
            strokeWidth: 0.5,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ClosePage;
