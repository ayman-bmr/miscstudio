'use client';

import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface StepProps {
  step: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  };
  index: number;
  totalSteps: number;
}

const AnimatedStep = ({ step, index, totalSteps }: StepProps) => (
  <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ width: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'visible',
          boxShadow: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 20,
            left: index < totalSteps - 1 ? '60%' : '50%',
            width: index < totalSteps - 1 ? '100%' : 0,
            height: '2px',
            backgroundColor: '#e0e0e0',
            transform: 'translateY(40px)',
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: step.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            my: 2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {step.icon}
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom>
            {step.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            {step.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  </Grid>
);

export default AnimatedStep;