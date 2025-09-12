'use client';
import { Box, Container } from '@mui/material';
import AnimatedCta from './animatedCta';
import { useTheme } from '@mui/material/styles';

const CtaSection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        mb: 0,
        // Light/dark mode background for the whole section
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.background.default // dark mode background
            : theme.palette.background.paper,  // light mode background
      }}
      dir="auto"
    >
      <Container maxWidth="md">
        <AnimatedCta />
      </Container>
    </Box>
  );
};

export default CtaSection;
