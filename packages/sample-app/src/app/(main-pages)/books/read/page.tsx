"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import StoryControlBar from "./StoryControlBar";
import ClosePage from "./ClosePage";
import StoryContent from "./StoryContent";
import CoverImage from "./CoverImage";
import { UseScreenOrientation } from "../../../../utils/useScreenOrientation";
import { useStoryDetail } from "@repo/providers/queryHooks/useStoryDetail";
import { useUserBooks } from "@repo/providers/queryHooks/useUserBooks";
import {
  useAddFavorite,
  useDeleteFavorite,
} from "@repo/providers/queryHooks/useFavorite";
import { useKeepAwake } from "../../../../utils/useKeepAwake";
import { useTranslation } from "react-i18next";
import {
  useSaveProgress,
  useProgress,
} from "@repo/providers/queryHooks/useProgress";
import { useMarkBookDone } from "@repo/providers/queryHooks/useMarkBookDone";
import { useWelcomeUser } from "@repo/providers/queryHooks/useWelcomeUser";

const BookPage = () => {
  // Screen orientation hook
  UseScreenOrientation("landscape");
  useKeepAwake();
  const { t } = useTranslation();

  // Hooks and state management
  const searchParams = useSearchParams();
  const { data: userBooks } = useUserBooks();
  const favoriteBooks = userBooks?.favoriteBooks || [];
  const { mutate: addFavorite, isPending: isAddFavoriteLoading } =
    useAddFavorite();
  const { mutate: deleteFavorite, isPending: isDeleteFavoriteLoading } =
    useDeleteFavorite();

  // State for current chapter and reading progress
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);

  // Extract story ID from search params
  const storyId = searchParams.get("id")
    ? parseInt(searchParams.get("id") as string, 10)
    : null;

  // Fetch story details
  const { data: story, isLoading, error } = useStoryDetail(storyId);

  // Navigation hook
  const { back } = useRouter();

  // Handle page close
  const handleClose = () => {
    back();
  };

  // Favorite toggle logic
  const isFavorite = !!favoriteBooks.find((i) => i.id === story?.id);
  const toggleFavorite = () => {
    if (!storyId || isAddFavoriteLoading || isDeleteFavoriteLoading) return;
    if (isFavorite) deleteFavorite(storyId);
    else addFavorite(storyId);
  };

  // Fetch user progress
  const { data: progress, isLoading: progressLoading } = useProgress(storyId);

  useEffect(() => {
    if (progress) {
      setCurrentChapterIndex(progress.current_position);
      setChapterProgress(0); // Reset progress for each chapter
    }
  }, [progress]);

  // Save and delete progress hooks
  const { mutate: saveProgress } = useSaveProgress();
  const { mutate: markAsDone } = useMarkBookDone();
  const { data: user } = useWelcomeUser();

  // Modify handleNextChapter to track progress
  const handleNextChapter = () => {
    if (story?.chapters) {
      const isLastChapter = currentChapterIndex === story.chapters.length - 1;

      if (!isLastChapter) {
        setCurrentChapterIndex((prev) => prev + 1);
        setChapterProgress(0);
        saveProgress({
          story_id: storyId,
          current_position: currentChapterIndex + 1,
        });
      } else {
        markAsDone({
          userId: user.id,
          bookId: story?.id,
        });
      }
    }
  };

  const handlePreviousChapter = () => {
    if (story?.chapters && currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
      setChapterProgress(0);
      saveProgress({
        story_id: storyId,
        current_position: currentChapterIndex - 1,
      });
    }
  };
  
  // Get current chapter
  const currentChapter = story ? story.chapters?.[currentChapterIndex] : false;

  return (
    <Stack
      sx={{
        height: "100svh",
        width: "100svw",
        m: 0
      }}
      className="ios-remove-padding ios-padding-left"
    >
      {/* Close page component */}
      <ClosePage onClose={handleClose} />

      {/* Main content area */}
      {story && currentChapter && !progressLoading && (
        <Stack
          sx={{
            flexDirection: "row",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Story Content */}
          <StoryContent
            pageNumber={currentChapterIndex + 1}
            totalPages={story.chapters?.length || 1}
            content={currentChapter?.content}
            chapterDetails={{
              chapterTitle: currentChapter?.title,
              chapterProgress: chapterProgress,
              onProgressChange: setChapterProgress,
            }}
          />

          {/* Cover Image */}
          <CoverImage
            src={currentChapter.story_url || story.cover_img_url || ""}
            alt={`${story.title} cover`}
          />
        </Stack>
      )}

      {/* Story Control Bar */}
      {story && !progressLoading && (
        <StoryControlBar
          story={story}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onNextChapter={handleNextChapter}
          onPreviousChapter={handlePreviousChapter}
          currentChapterIndex={currentChapterIndex}
        />
      )}

      <Modal open={isLoading || progressLoading}>
        <Stack
          sx={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" component="h2">
            {t("loading")}
          </Typography>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default BookPage;
