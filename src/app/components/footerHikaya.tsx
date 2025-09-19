"use client"
import { Box, Container, Grid, Typography, Link, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTranslation } from 'react-i18next';

const FooterHikaya = () => {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("company"),
      links: [
        { name: t("about_us"), href: "#" },
        { name: t("careers"), href: "#" },
        { name: t("press"), href: "#" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { name: t("blog"), href: "#" },
        { name: t("help_center"), href: "#" },
        { name: t("contact"), href: "#" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { name: t("privacy_policy"), href: "/privacy-policy-hikaya" },
        { name: t("terms"), href: "#" },
        { name: t("cookies"), href: "#" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} dir="auto">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
                {t("companyName")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("hero_subtitle")}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton aria-label="Facebook" color='primary'>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color='primary'>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color='primary'>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="YouTube" color='primary'>
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
          {footerLinks.map((section) => (
            <Grid item xs={12} sm={4} md={2} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <Stack>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                    underline="hover"
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8 }}
        >
          {t("copyright", { year: new Date().getFullYear() })}
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterHikaya;