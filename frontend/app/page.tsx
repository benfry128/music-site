import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import styles from './app.module.css';

export default async function Page() {
    return <Stack direction="column" alignItems='center' spacing={3}>
        <Typography maxWidth='90%' variant='h3' align='center' sx={{pt: 3}}>Welcome to my Website</Typography>
        <Typography align='center' className={styles.text}>This is the homepage. There is nothing here for now. Check out the menu above to see the rest of the page!</Typography>
    </Stack>;
}