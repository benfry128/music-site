import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';

function Index() {
  const [_ids, setIds] = useState([]);

  const getQueue = async () => {
    const response = await fetch('https://api.benfrymusic.com/albums/queue');
    const nums = await response.json();
    setIds(nums)
  }

  useEffect( () => {
    getQueue();
  }, [])

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Stack direction="column" alignItems='center' spacing={3}>
        <Typography variant='h3'>
          Albums
        </Typography>
        <Typography maxWidth='50%'>
          Here you can request albums for me to try.
        </Typography>
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
          <>
            {_ids.map((num) => 
              <SwiperSlide key={num}>
                <ImageListItem
                  sx={{
                    width: '25vw',
                    height: '25vw',
                  }}
                >
                  <Image 
                    src={num} 
                    height={640}
                    width={640}
                    alt='HI'
                    className='swiper-image'
                  />
                  <ImageListItemBar
                    title={num}
                    subtitle={num}
                    sx={{ background: 'rgba(0,0,0)' }}
                    position='below'
                    actionIcon={
                      <IconButton>
                        <Image
                          src='/spotify_logo.png'
                          width={939}
                          height={940}
                          alt={'Spotify Logo'}
                          className='spotify'
                        />
                      </IconButton>
                    }
                  >
                  </ImageListItemBar>
                </ImageListItem>
              </SwiperSlide>
            )}
          </>
        </Swiper>
      </Stack>
    </Box>
  );
}

export default Index;
