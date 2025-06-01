'use client'

import { Typography, Box, Stack } from '@mui/material';

export default function HomePage() {
	return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
		<Stack direction="column" alignItems='center' spacing={3}>
			<Typography variant='h3'>Welcome to my Website</Typography>
			<Typography maxWidth='50%'>
				This is the homepage. There is nothing here for now. If you came here from my Instagram account, you may be interested in the Request Albums page or the listening data.
			</Typography>
		</Stack>
	</Box>;
}
