import React from 'react';
import { Box, Container, Divider, Skeleton, Stack } from '@mui/material';

const ProfileSkeleton: React.FC = () => {

  return (
    <Container maxWidth="sm">
      <Stack direction="column" sx={{ mt: 3, alignItems: "center" }}>
        <Skeleton variant="circular" sx={{ width: 150, height: 150 }} />
        <Skeleton variant="text" sx={{ width: 100, height: 30, mt: 2 }} />
        <Skeleton variant="text" sx={{ width: 200, height: 20, mt: 1 }} />
        <Skeleton variant="circular" sx={{ width: 30, height: 30, mt: 2 }} />
      </Stack>

      <Stack direction="row" sx={{ mt: 3, justifyContent: "space-around" }}>
        <Skeleton variant="text" sx={{ width: 100, height: 30 }} />
        <Skeleton variant="text" sx={{ width: 100, height: 30, ml: 2 }} />
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 30, mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 30, mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 30, mb: 3 }} />
        <Skeleton variant="rectangular" sx={{ width: '100%', height: 30, mb: 3 }} />
      </Box>
    </Container>
  );
};

export default ProfileSkeleton;
