import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default async function Page() {
    return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
		<Stack direction="column" alignItems='center' spacing={3}>
			<Typography variant='h3'>Welcome to my Website</Typography>
			<Typography maxWidth='50%'>
				This is the homepage. There is nothing here for now. If you came here from my Instagram account, you may be interested in the Request Albums page or the listening data.
			</Typography>
		</Stack>
	</Box>;
}