import { Typography, Box, Stack } from '@mui/material';

export default function DB() {
	return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
		<Stack direction="column" alignItems='center' spacing={3}>
			<Typography variant='h3'>DB</Typography>
			<Typography maxWidth='50%'>Here you can check out the stuff that I&apos;ve listened to since I started recording it all in January 2024.</Typography>
		</Stack>
	</Box>;
}
