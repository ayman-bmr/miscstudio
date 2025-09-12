"use client";

import { Box, Paper, Avatar, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

interface Props {
  testimonials: Testimonial[];
}

const AnimatedTestimonial = ({ testimonials }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Box sx={{ position: "relative", px: { xs: 0, md: 8 } }}>
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            position: "relative",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <FormatQuoteIcon
            sx={{
              fontSize: 60,
              color: "primary.main",
              opacity: 0.2,
              position: "absolute",
              top: 20,
              left: 20,
            }}
          />
          <Avatar
            src={testimonials[currentIndex].avatar}
            alt={testimonials[currentIndex].name}
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              mb: 2,
              border: 3,
              borderColor: "primary.main",
            }}
          />
          <Typography variant="body1" sx={{ mb: 2, fontSize: "1.2rem" }}>
            {testimonials[currentIndex].quote}
          </Typography>
          <Typography variant="h6" component="p" color="primary.main">
            {testimonials[currentIndex].name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {testimonials[currentIndex].role}
          </Typography>
        </Paper>
      </motion.div>

      <IconButton
        onClick={handlePrevious}
        sx={{
          position: "absolute",
          left: { xs: -16, md: 0 },
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "background.paper",
          boxShadow: 1,
          "&:hover": { backgroundColor: "background.paper" },
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: { xs: -16, md: 0 },
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "background.paper",
          boxShadow: 1,
          "&:hover": { backgroundColor: "background.paper" },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default AnimatedTestimonial;
