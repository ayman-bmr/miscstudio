"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Switch,
  LinearProgress,
  Box,
} from "@mui/material";
import {
  Bookmark,
  BookmarkBorderOutlined,
  FastForwardOutlined,
  FastRewindOutlined,
  LogoutOutlined,
  PauseOutlined,
  PlayArrowOutlined,
  TuneOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { App } from "@capacitor/app";
import { StoryType } from "@repo/providers/intefaces/StoryType";

interface StoryControlBarProps {
  story: StoryType;
  toggleFavorite: () => void;
  isFavorite: boolean;
  onNextChapter?: () => void;
  onPreviousChapter?: () => void;
  currentChapterIndex?: number;
}


const StoryControlBar: React.FC<StoryControlBarProps> = ({
  story,
  toggleFavorite,
  isFavorite,
  onNextChapter,
  onPreviousChapter,
  currentChapterIndex = 0,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sound, setSound] = useState(() => {
    const savedSound = localStorage.getItem("storySound");
    return savedSound ? JSON.parse(savedSound) : true;
  });

  const [autoplay, setAutoplay] = useState(() => {
    const savedAutoplay = localStorage.getItem("storyAutoplay");
    return savedAutoplay ? JSON.parse(savedAutoplay) : true;
  });

  const [progress, setProgress] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("storySound", JSON.stringify(sound));
  }, [sound]);

  useEffect(() => {
    localStorage.setItem("storyAutoplay", JSON.stringify(autoplay));
  }, [autoplay]);

  // Update audio URL when chapter changes
  useEffect(() => {
    const currentChapter = story.chapters?.[currentChapterIndex];
    setAudioUrl(
      currentChapter?.audio_url ||
        `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${
          Math.floor(Math.random() * 10) + 1
        }.mp3`
    );
  }, [currentChapterIndex, story.chapters]);

  // Load and autoplay audio when URL changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = audioUrl;
      audio.preload = "auto";

      if (autoplay) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Audio autoplay error:", error));
      }
    }
  }, [audioUrl, autoplay]);
  // Stop audio when app goes to background
  useEffect(() => {
    const audio = audioRef.current;

    const handleAppStateChange = (state: { isActive: boolean }) => {
      if (!state.isActive && audio) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    App.addListener("appStateChange", handleAppStateChange);

    return () => {
      App.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleTimeUpdate = () => {
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      };

      const handleDurationChange = () => {
        setDuration(audio.duration || 0);
      };

      const handleAudioEnd = () => {
        if (autoplay && onNextChapter) {
          onNextChapter(); // Move to the next chapter
        } else {
          setIsPlaying(false);
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("durationchange", handleDurationChange);
      audio.addEventListener("ended", handleAudioEnd);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("durationchange", handleDurationChange);
        audio.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, [autoplay, onNextChapter]);

  const togglePlayPause = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        await audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Audio playback error", error);
    }
  };

  const handleNextChapter = () => {
    if (onNextChapter) {
      onNextChapter();
      setIsPlaying(false); // Reset playback state before switching chapters
    }
  };

  const handlePreviousChapter = () => {
    if (onPreviousChapter) {
      onPreviousChapter();
      setIsPlaying(false); // Reset playback state before switching chapters
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSoundToggle = () => {
    const newSound = !sound;
    setSound(newSound);
    if (isPlaying && !newSound) {
      togglePlayPause();
    }
  };

  const handleAutoplayToggle = () => {
    setAutoplay(!autoplay);
  };

  // Determine if we can navigate to previous/next chapters
  const canGoPrevious = currentChapterIndex > 0;
  const canGoNext =
    story.chapters && currentChapterIndex < story.chapters.length - 1;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Stack
        dir="ltr"
        sx={{
          flexDirection: "row",
          height: "60px",
          backgroundColor: "primary.main",
          borderTopLeftRadius: "50% 100%",
          borderTopRightRadius: "50% 100%",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
          <TuneOutlined />
        </IconButton>

        <IconButton
          sx={{ color: "black" }}
          onClick={handlePreviousChapter}
          disabled={!canGoPrevious}
        >
          <FastRewindOutlined />
        </IconButton>

        <IconButton
          onClick={togglePlayPause}
          sx={{ color: "black" }}
          disabled={!sound}
        >
          {isPlaying ? <PauseOutlined /> : <PlayArrowOutlined />}
        </IconButton>

        <IconButton
          sx={{ color: "black" }}
          onClick={handleNextChapter}
          disabled={!canGoNext}
        >
          <FastForwardOutlined />
        </IconButton>

        <IconButton
          sx={{ color: isFavorite ? "secondary.main" : "black" }}
          onClick={toggleFavorite}
        >
          {isFavorite ? <Bookmark /> : <BookmarkBorderOutlined />}
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: { width: 230 },
            },
          }}
        >
          <MenuItem
            onClick={handleSoundToggle}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {t("sound_menu_item_text")}
            <Switch checked={sound} sx={{ ml: 1 }} />
          </MenuItem>
          <MenuItem
            onClick={handleAutoplayToggle}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {t("autoplay_menu_item_text")}
            <Switch checked={autoplay} sx={{ ml: 1 }} />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <LogoutOutlined sx={{ mr: 1 }} />
            {t("back_menu_item_text")}
          </MenuItem>
        </Menu>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            bgcolor: "primary.light",
            "& .MuiLinearProgress-bar": {
              bgcolor: "secondary.main",
            },
          }}
        />
      </Stack>
      <audio ref={audioRef} />
    </Box>
  );
};

export default StoryControlBar;