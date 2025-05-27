import React from 'react';
import { Typography, Box, Stack, TextField } from '@mui/material';

function index() {
    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Stack direction="column" alignItems='center' spacing={3}>
            <Typography variant='h3'>
                Admin
            </Typography>
            <Typography>
                Enter password:
            </Typography>
            <TextField>

            </TextField>
        </Stack>
    </Box>;
}

export default index;
