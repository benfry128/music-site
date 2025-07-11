import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default async function Page() {
    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
		<Stack direction="column" alignItems='center' spacing={3}>
			<Typography variant='h3'>DB</Typography>
			<Typography maxWidth='50%'>Here you can check out the stuff that I&apos;ve listened to since I started recording it all in January 2024.</Typography>
		</Stack>
	</Box>;
}