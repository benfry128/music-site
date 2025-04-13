import React, { useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';

function index() {
   return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Stack direction="column" alignItems='center' spacing={3}>
        <Typography variant='h3'>
          Albums
        </Typography>
        <Typography maxWidth='50%'>
          Here you can request albums for me to try. 
        </Typography>
      </Stack>
    </Box>
  );
}

export default index;
