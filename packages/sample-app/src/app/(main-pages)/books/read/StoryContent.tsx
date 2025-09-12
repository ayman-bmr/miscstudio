import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { AutoTextSize } from "auto-text-size";

interface StoryContentProps {
  pageNumber: number;
  totalPages: number;
  content?: string;
  chapterDetails?: {
    chapterTitle?: string;
    chapterProgress?: number;
    onProgressChange?: (progress: number) => void;
  };
}

const StoryContent: React.FC<StoryContentProps> = ({
  pageNumber,
  totalPages,
  content,
  chapterDetails,
}) => {
  return (
    <Stack
      sx={{
        flex: 1,
        height: "100%",
      }}
    >
      {/* Page/Chapter Counter */}

      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        sx={{ px: 4, pt: 2 }}
      >
        {/* Chapter Title (if available) */}
        {chapterDetails?.chapterTitle && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {chapterDetails.chapterTitle}
          </Typography>
        )}
        <Typography>
          {pageNumber}/{totalPages}
        </Typography>
      </Stack>
      {/* Content Container */}
      <Box
        sx={{
          flex: 1,
          pt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
        }}
      >
        <Typography
          sx={{
            width: "90%",
            // maxHeight: "calc(100% - 75px)",
            height: "calc(100% - 75px)",
            overflow: "auto",
          }}
        >
          <AutoTextSize mode="box" maxFontSizePx={32}>
            {content?.split("\\n").map((line: string, index: number) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </AutoTextSize>
        </Typography>
      </Box>
    </Stack>
  );
};

export default StoryContent;
