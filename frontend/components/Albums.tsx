'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SiSpotify, SiSpotifyHex } from '@icons-pack/react-simple-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import { Album } from '@/components/Globals';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Spotify from './Spotify';
import { SimplifiedAlbum } from '@spotify/web-api-ts-sdk';
import { postAlbum } from '@/app/actions';
import TextField from '@mui/material/TextField';


export default function Albums( {albums} : { albums: Album[] }) {
	const [_newAlbumDialogOpen, setNewAlbumDialogOpen] = useState(false);
	const [_spAlbum, setSpAlbum] = useState<SimplifiedAlbum | null>(null);

	return <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
		<Stack direction="column" alignItems='center' spacing={3}>
			<Typography variant='h3'>Albums</Typography>
			<Button variant='outlined' onClick={() => setNewAlbumDialogOpen(true)}>Recommend an Album</Button>
			<Typography maxWidth='50%'>Upcoming albums on my list:</Typography>
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				slideToClickedSlide={true}
				coverflowEffect={{
					rotate: 0,
					scale: 1.25,
					depth: 750,
					modifier: 1,
					slideShadows: false
				}}
				modules={[EffectCoverflow]}
			>
				{albums.map((album: Album) => 
					<SwiperSlide key={album.id}>
						<ImageListItem
							sx={{
								width: '25vw',
								height: '25vw',
							}}
						>
							<Image 
								src={album.image_url} 
								height={640}
								width={640}
								alt='HI'
								className='swiper-image'
							/>
							<ImageListItemBar
								title={album.title}
								subtitle={album.artist}
								sx={{ background: 'rgba(0,0,0)' }}
								position='below'
								actionIcon={
								<IconButton
									href={album.url}
									target='_blank'
								>
									<SiSpotify color={SiSpotifyHex} size='36' />
								</IconButton>
								}
							/>
						</ImageListItem>
					</SwiperSlide>
				)}
			</Swiper>
		</Stack>
		<Dialog
            onClose={() => setNewAlbumDialogOpen(false)}
            open={_newAlbumDialogOpen}
            fullWidth
            maxWidth='sm'
			slotProps={{
				paper: {
					component: 'form',
					onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						// const formData = new FormData(event.currentTarget);
						// const formJson = Object.fromEntries(formData.entries());
						if (!_spAlbum) return false;
						const album = {
                            title: _spAlbum.name,
                            artist: _spAlbum.artists[0].name,
                            date_released: _spAlbum.release_date,
                            image_url: _spAlbum.images[0].url,
                            url: 'https://open.spotify.com/album/' + _spAlbum.id,
                            spotify_id: _spAlbum.id, 
                            ranking: 502
                        }
                        postAlbum(album);
                        setNewAlbumDialogOpen(false);
					}
				}
			}}
        >
            <DialogTitle>Recommend an Album</DialogTitle>
            <DialogContent>
                <Box pt={1}>
                    <Spotify
                        onChange={(event, target) => {setSpAlbum(target);}}
						required={true}
                    />
                </Box>
				<br/>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px'}}>
                    <TextField
                        label='Recommended By'
                        name='recommended_by'
                        sx={{ minWidth: 200}}
                        required
                        fullWidth
					/>
                    <TextField
                        label='Recommended By'
                        name='recommended_by'
                        sx={{ minWidth: 200}}
                        required
                        fullWidth
					/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button type='submit'>Submit Album</Button>
            </DialogActions>
        </Dialog>
	</Box>;
}
