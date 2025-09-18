"use client";

import React, { useEffect, useState } from "react";
import {
  Box, Container, Grid, Typography, Card, CardMedia,
  CardContent, Link as MUILink, CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import NextLink from "next/link";

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string | null;
  language?: string;
}

const OurGamesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);

        
        const res = await fetch(`/api/games/${i18n.language}`);
        if (!res.ok) throw new Error("Failed to fetch games");

        const data: Game[] = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error fetching games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [i18n.language]);

  return (
    <Box id="applications_section" component="section" sx={{ py: 12, backgroundColor: "background.default" }}>
      <Container dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <Typography variant="h2" align="center" sx={{ mb: 10, fontWeight: "bold", fontSize: { xs: "2rem", md: "3rem" }, color: (theme) => theme.palette.text.primary,  }}>
          {t("our_games")}
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={6}>
            {games.map((game, index) => (
              <Grid item xs={12} sm={6} md={4} key={game.id}>
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: index * 0.15 }} viewport={{ once: true }}>
                  <Card sx={{ borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 12px 28px rgba(0,0,0,0.15)", transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-8px) scale(1.02)", boxShadow: "0 20px 40px rgba(0,0,0,0.25)" } }}>
                    <CardMedia component="img" height="220" image={game.image} alt={game.title} />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>{game.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>{game.description}</Typography>

                      {game.link && (game.link.startsWith("http") ? (
                        <MUILink href={game.link} target="_blank" rel="noopener" sx={{ color: "primary.main", fontWeight: "bold" }}>{i18n.language === "ar" ? "عرض المزيد" : "Learn More"}</MUILink>
                      ) : (
                        <NextLink href={game.link} passHref legacyBehavior>
                          <MUILink sx={{ color: "primary.main", fontWeight: "bold" }}>{i18n.language === "ar" ? "عرض المزيد" : "Learn More"}</MUILink>
                        </NextLink>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default OurGamesSection;
