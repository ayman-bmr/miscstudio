"use client";
import React from "react";
import {
  Stack,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
  ListItemButton,
  ListItem,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Bookmark from "@mui/icons-material/Bookmark";
import { useRouter } from "next/navigation";
import { StoryType } from "@repo/providers/intefaces/StoryType";
import { useModalContext } from "../context/ModalContext";
import { getTranslateProperty } from "../../utils";

interface GenericItemProps {
  story: StoryType | null;
  showDelete?: boolean;
  onDelete?: (storyId: number) => void;
  onFilterCategory?: (category: string) => void;
}

function convertToMinSec(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.round((durationInSeconds % 60) / 5) * 5;

  if (durationInSeconds === 0) return "";
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 60) return `${minutes + 1}min`;
  if (seconds === 0) return `${minutes}min`;

  return `${minutes}min ${seconds}s`;
}

const getSecondaryContent = (story: StoryType) => {
  if (story.current_position) {
    return `${story.current_position + 1}/${story.total_pages}`;
  }
  if (story.isFavorite) return <Bookmark sx={{ color: "secondary.main", mt: 1 }} />;
  if (story.audio_duration) return convertToMinSec(story.audio_duration);
  return "";
};

const ItemDisplay: React.FC<GenericItemProps> = ({
  story,
  showDelete,
  onDelete,
  onFilterCategory,
}) => {
  const { push } = useRouter();
  const { openModal } = useModalContext();

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: string
  ) => {
    e.stopPropagation();
    if (onFilterCategory) {
      onFilterCategory(category);
    } else {
      push(`/books?categories=${encodeURIComponent(category)}`);
    }
  };

  const onDeleteCallback = (storyId: number) => {
    if (onDelete) onDelete(storyId);
  };

  if (!story) {
    return null;
  }
  return (
    <ListItem
      secondaryAction={
        showDelete && (
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteCallback(story.id)}
          >
            <DeleteIcon />
          </IconButton>
        )
      }
      disablePadding
    >
      <ListItemButton
        sx={{ gap: 1 }}
        onClick={() =>
          openModal({
            id: story?.id,
            title: story?.title,
            description: story?.description,
            coverImgUrl: story?.cover_img_url,
          })
        }
        disableGutters
        divider
      >
        <ListItemAvatar>
          <Avatar
            variant="square"
            src={story.cover_img_url || "no image found"}
            alt={story.title}
            sx={{
              width: 48,
              height: 48,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="subtitle2"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              dir="auto"
            >
              {story.title}
            </Typography>
          }
          secondaryTypographyProps={{
            component: "div",
          }}
          secondary={
            <Stack direction="row" gap={0.5} flexWrap="wrap" mt={1}>
              {story.categories.map(({ category }) => (
                <Chip
                  key={category.id}
                  label={getTranslateProperty(category, "name")}
                  onClick={(e: any) => handleCategoryClick(e, category.id + "")}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          }
        />
        <Typography variant="subtitle2" sx={{textAlign: "end"}}>
          {getSecondaryContent(story)}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

export default ItemDisplay;
