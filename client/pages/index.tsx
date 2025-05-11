import React, { useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';

function Index() {
  useEffect(() => {
    // fetch('http://localhost:8080/tracks/200')
    //   .then(
    //   data => {
    //     console.log(data.json());
    //   }
    // );
  }, []);
  
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Stack direction="column" alignItems='center' spacing={3}>
        <Typography variant='h3'>
          Welcome to my Wobsite
        </Typography>
        <Typography maxWidth='50%'>
          This is the homepage. There is nothing here for now. If you came here from my Instagram account, you may be interested in the Request Albums page or the listening data.
        </Typography>
      </Stack>
    </Box>
  );
}

export default Index;
