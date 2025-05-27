import { useState } from 'react';
import { Typography, Box, Stack, TextField } from '@mui/material';

function Index() {
    const [_password, setPassword] = useState('');

    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Stack direction="column" alignItems='center' spacing={3}>
            <Typography variant='h3'>
                Admin
            </Typography>
            <TextField
                label='Enter password'
                value={_password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            {_password === process.env.NEXT_PUBLIC_ADMIN_PW &&
                <Typography>
                    Nice
                </Typography>
            }
        </Stack>
    </Box>;
}

export default Index;
