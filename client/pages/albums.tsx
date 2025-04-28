import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';

function index() {
  var numbers = []
  for (var i = 1; i < 10; i++) {
    numbers.push(i);
  }
  console.log(numbers);
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
            {numbers.map((num) => 
              <SwiperSlide>
                <Image 
                  src={`/${num}.jpg`} 
                  width={640}
                  height={640}
                  alt='HI'
                />
              </SwiperSlide>
            )}
          </>
        </Swiper>
      </Stack>
    </Box>
  );
}

export default index;
