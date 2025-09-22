"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import {
    Avatar,
    Box,
    Container,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AnimatedTestimonial from "./animatedtesimonial";



const TestimonialsSection = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      id: 1,
      name: t("testimonial_1_name"),
      role: t("testimonial_1_role"),
      avatar: "/images/avatar1.jpg",
      quote: t("testimonial_1_quote"),
    },
    {
      id: 2,
      name: t("testimonial_2_name"),
      role: t("testimonial_2_role"),
      avatar: "/images/avatar2.jpg",
      quote: t("testimonial_2_quote"),
    },
    {
      id: 3,
      name: t("testimonial_3_name"),
      role: t("testimonial_3_role"),
      avatar: "/images/avatar3.jpg",
      quote: t("testimonial_3_quote"),
    },
  ];
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: "background.paper",
      }}
    >
      <Container>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6,color: (theme) => theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary }}
          >
            {t("what_parents_say")}
          </Typography>
        </motion.div>

        <AnimatedTestimonial testimonials={testimonials} />
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
