import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Slider from 'react-slick';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
  roles: string[];
}

interface AdvertisementSliderProps {
  userRole: 'parent' | 'student';
}

const mockAds: Advertisement[] = [
  {
    id: 1,
    title: 'Khai giảng lớp tiếng Anh thiếu nhi',
    description: 'Đăng ký ngay để nhận ưu đãi học phí lên tới 20%!',
    image: '/ads/english-kids.jpg',
    roles: ['parent', 'student'],
  },
  {
    id: 2,
    title: 'Lớp luyện thi IELTS khai giảng tháng 7',
    description: 'Cam kết đầu ra 6.5+ với giáo viên bản ngữ.',
    image: '/ads/ielts-class.jpg',
    roles: ['student'],
  },
  {
    id: 3,
    title: 'Ưu đãi học phí cho học sinh cũ',
    description: 'Giảm thêm 10% cho học sinh đăng ký lại.',
    image: '/ads/old-student.jpg',
    roles: ['parent'],
  },
];

const AdvertisementSlider: React.FC<AdvertisementSliderProps> = ({ userRole }) => {
  const ads = mockAds.filter(ad => ad.roles.includes(userRole));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  if (ads.length === 0) return null;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Slider {...settings}>
        {ads.map(ad => (
          <Card key={ad.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 2 }}>
            <CardMedia
              component="img"
              image={ad.image}
              alt={ad.title}
              sx={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 2, mr: 2 }}
            />
            <CardContent>
              <Typography variant="h6">{ad.title}</Typography>
              <Typography variant="body2" color="text.secondary">{ad.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default AdvertisementSlider; 