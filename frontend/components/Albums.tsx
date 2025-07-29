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
import { postNotes } from '@/app/actions';

export default function Albums( {albums} : { albums: Album[] }) {
	const [_newAlbumDialogOpen, setNewAlbumDialogOpen] = useState(false);
	const [_spAlbum, setSpAlbum] = useState<SimplifiedAlbum | null>(null);

	const queueAlbums = albums.filter((a) => a.queue_position).sort((a, b) => (a.queue_position! - b.queue_position!));

	const albumInDb = _spAlbum ? albums.find((a) => a.spotify_id === _spAlbum.id) : null;
	const albumIsReviewed = !!albumInDb && albumInDb.rating == null;

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
				{queueAlbums.map((album: Album) => 
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
            onClose={() => {
				setSpAlbum(null);
				setNewAlbumDialogOpen(false);
			}}
            open={_newAlbumDialogOpen}
            fullWidth
            maxWidth='sm'
			slotProps={{
				paper: {
					component: 'form',
					onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
						let albumId = albumInDb?.id;
						if (!albumInDb && _spAlbum) {
							const postObject = {
								title: _spAlbum.name,
								artist: _spAlbum.artists[0].name,
								date_released: _spAlbum.release_date + (_spAlbum.release_date_precision !== 'day' ? '-01' : '') + (_spAlbum.release_date_precision === 'year' ? '-01' : ''),
								image_url: _spAlbum.images[0].url,
								url: _spAlbum.external_urls.spotify,
								spotify_id: _spAlbum.id,
								ranking: 502
							}
							const result = await postAlbum(postObject);
							if (result === -1) {
								return 'aH';
							}
							albumId = result.id;
						}

						const notesObject = {
							id: albumId!,
							source: formJson.source.toString(),
							notes: formJson.notes.toString()
						}
						postNotes(notesObject);
                        setNewAlbumDialogOpen(false);
					}
				}
			}}
        >
            <DialogTitle>Recommend an Album</DialogTitle>
            <DialogContent>
                <Box m={1}>
                    <Spotify
                        onChange={(event, target) => setSpAlbum(target)}
						renderInput={(params) => {
							let helperText = '';
							if (albumIsReviewed) {
								if (albumInDb.date_listened! < new Date(2021, 5, 1)){
									helperText += 'I listened to this album before I started keeping track of my listening. ';
								} else {
									helperText += `I reviewed this album on ${albumInDb.date_listened!.toLocaleDateString()}`
									if (albumInDb.date_listened! >= new Date(2022, 8, 14)) {
										helperText += '. You can check out the review on Instagram. ';
									} else {
										helperText += ', before I started the Instagram account. ';
									} 
								}
								switch (albumInDb.rating) {
									case 0:
										helperText += "I didn't really like it. ";
										break;
									case 1:
										helperText += 'I thought it was decent. ';
										break;
									case 2:
										helperText += 'I really liked it! ';
								}
								helperText += "If you'd like me to re-review it, feel free to submit it again and I'll add it to the backlog. "
							}
							return <TextField 
								{...params} 
								label="Search for an album" 
								required
								helperText={helperText}
							/>;
						}}
                    />
                </Box>
                <Box m={1}>
					<TextField
                        label='Name or Instagram handle'
                        name='source'
						required
                        fullWidth
					/>
                </Box>
				<Box m={1}>
					<TextField
						label='Notes'
						name='notes'
						fullWidth
						multiline
						helperText='What do you like about this album? Anything I should know before listening?'
						slotProps={{ htmlInput: { maxLength: 499 } }}
					/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button type='submit'>Submit Album</Button>
            </DialogActions>
        </Dialog>
	</Box>;
}
