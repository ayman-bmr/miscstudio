import React from "react";
import { Typography, CircularProgress, Stack, Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import ItemDisplay from "../../components/ItemDisplay";
import { StoryType } from "@repo/providers/intefaces/StoryType";

export interface Story {
  id: number;
  title: string;
  categories: string[];
  cover_img_url: string | null;
  audio_duration?: number;
  displayValue?: React.ReactNode;
}

interface StoryListProps {
  data: any;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  status: string;
  onFilterCategory?: (category: string) => void;
}

const StoriesResult: React.FC<StoryListProps> = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  onFilterCategory,
}) => {
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (status === "pending") return <CircularProgress />;
  if (status === "error")
    return <Typography color="error">{t("Failed_to_load_books")}</Typography>;

  return (
    <Stack spacing={2} sx={{ px: 3, width: "100%" }}>
      {data?.pages.map((page: any, pageIndex: number) => (
        <Box key={pageIndex}>
          {pageIndex === 0 && (
            <Typography>
              {page.pagination.totalCount} {t("stories")}
            </Typography>
          )}
          {page.stories.length ? (
            page.stories.map((story: StoryType) => {
              // const displayValue = story.audio_duration
              //   ? `${story.audio_duration}min`
              //   : "Unknown duration";

              return (
                <ItemDisplay
                  key={story.id}
                  story={story}
                  onFilterCategory={onFilterCategory}
                />
              );
            })
          ) : (
            <Typography>{t("no_books_display")}</Typography>
          )}
        </Box>
      ))}
      {isFetchingNextPage && <CircularProgress />}
      <div ref={ref} />
    </Stack>
  );
};

export default StoriesResult;
