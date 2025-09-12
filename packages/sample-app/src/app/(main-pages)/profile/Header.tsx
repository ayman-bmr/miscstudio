"use client";

import React from "react";
import { Avatar, Typography, Stack } from "@mui/material";

interface HeadersProps {
  profilePictureUrl?: string;
  username: string;
}

const Headers: React.FC<HeadersProps> = ({ profilePictureUrl, username }) => {
  return (
    <Stack direction="column" sx={{ alignItems: "center", mt: 3 }}>
      <Avatar
        src={profilePictureUrl}
        alt="avatar"
        sx={{ cursor: "pointer", width: 150, height: 150, bgcolor: "grey.600" }}
      />
      <Typography variant="h5" marginTop={2}>
        {username}
      </Typography>
    </Stack>
  );
};

export default Headers;
