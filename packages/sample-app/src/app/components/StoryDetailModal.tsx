import React, { memo } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Alert,
  Dialog,
  Box,
  Skeleton,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import { useModalContext } from "../context/ModalContext";
import { useStoryDetail } from "@repo/providers/queryHooks/useStoryDetail";
import { Cancel } from "@mui/icons-material";

const StoryDetailModal: React.FC = memo(() => {
  const { isOpen, closeModal, storyData } = useModalContext();
  const { t } = useTranslation();

  const storyId = storyData?.id ?? null;
  const { data: story, isLoading, isError, error } = useStoryDetail(storyId);

  if (isError) return <Alert severity="error">{error?.message}</Alert>;

  if (!isOpen || !storyData) return null;

  const categories = story?.categories ?? [];
  const audio_duration = story?.audio_duration ?? 0;
  const total_pages = story?.total_pages ?? 0;

  const { title, coverImgUrl, description } = storyData;

  return (
    <Dialog
      onClose={closeModal}
      open={isOpen}
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: "80%",
        },
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack
          sx={{
            position: "relative",
            width: "100%",
            height: "50%",
            minHeight: "220px",
            backgroundImage: `url(${coverImgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            justifyContent: "end",
          }}
        >
          <Stack
            sx={{
              color: "white",
              textAlign: "center",
              pb: 3,
              zIndex: 1,
            }}
          >
            <Typography variant="h4" color="inherit">{title}</Typography>
            {isLoading ? (
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("loading")}
              </Typography>
            ) : (
              <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
                {categories.map((cat) => cat.category.name).join(", ")} |{" "}
                {audio_duration} {t("minutes")} | {total_pages} {t("Pages")}
              </Typography>
            )}
          </Stack>
          <Box
            sx={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
              width: "100%",
              height: "150px",
              position: "absolute",
              bottom: 0,
            }}
          />
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: 1,
              right: 1,
              color: "black",
              zIndex: 10,
            }}
          >
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
        </Stack>

        <Stack sx={{ textAlign: "center", mt: "-25px" }}>
          <Link
            href={{ pathname: "/books/read", query: { id: storyId } }}
            passHref
          >
            <IconButton
              component="a"
              sx={{
                width: 60,
                height: 60,
                bgcolor: "primary.main",
                borderRadius: "45px",
              }}
              onClick={closeModal}
            >
              <PlayArrow
                sx={{
                  fontSize: 60,
                  color: "white",
                }}
              />
            </IconButton>
          </Link>
        </Stack>

        <Box
          sx={{
            p: 2,
            maxHeight: "150px",
            overflowY: "auto",
            width: "100%",
          }}
        >
          <Typography color="textPrimary">
            {description ? (
              description
            ) : isLoading ? (
              <>
                <Skeleton width="100%" />
                <Skeleton width="90%" />
                <Skeleton width="95%" />
              </>
            ) : (
              story?.description
            )}
          </Typography>
        </Box>
      </Stack>
    </Dialog>
  );
});

export default StoryDetailModal;
StoryDetailModal.displayName = "StoryDetailModal";
