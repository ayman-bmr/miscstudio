"use client";
import React from "react";
import TruncateMarkup from "react-truncate-markup";
import {
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { useModalContext } from "../context/ModalContext";

interface StoryCardProps {
  title: string;
  description: string;
  id: number;
  coverImgUrl: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  description,
  coverImgUrl,
  id,
}) => {
  const { openModal } = useModalContext();
  return (
    <ButtonBase
      onClick={() =>
        openModal({
          id,
          title,
          description,
          coverImgUrl,
        })
      }
      sx={{ width: "100%", display: "block", textAlign: "initial" }}
      disableRipple
    >
      <Card
        sx={{
          width: 280,
          height: 300,
          borderRadius: 6,
          backgroundImage: `url(${coverImgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CardContent
          sx={{
            color: "white",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
          }}
        >
          <Stack
            sx={{
              height: "100%",
              justifyContent: "flex-end",
              marginTop: 1,
              marginRight: 1,
            }}
          >
            <CardHeader
              title={title}
              titleTypographyProps={{ color: "white" }}
              subheader={
                <TruncateMarkup lines={2}>
                  <div dir="auto">{description}</div>
                </TruncateMarkup>
              }
              subheaderTypographyProps={{ color: "white", sx: {} }}
            />
          </Stack>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default StoryCard;
