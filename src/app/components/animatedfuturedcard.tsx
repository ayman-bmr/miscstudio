'use client';

import { Grid, Paper, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

const AnimatedFeatureCard = ({ feature, index }: FeatureCardProps) => (
  <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ width: '100%' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "100%",
          display: 'flex',
          flexDirection: 'column',
          textAlign: "center",
          backgroundColor: "background.paper",
          borderRadius: 4,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Box
          sx={{
            mb: 2,
            color: "primary.main",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {feature.icon}
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>
          {feature.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {feature.description}
        </Typography>
      </Paper>
    </motion.div>
  </Grid>
);

export default AnimatedFeatureCard;