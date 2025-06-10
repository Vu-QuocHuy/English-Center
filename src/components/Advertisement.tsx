import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  Paper,
  Slide,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import COLORS from '../constants/colors';

// Đổi tên interface Advertisement thành AdvertisementProps nếu bị trùng
interface AdvertisementProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

interface Props {
  mode: 'slider' | 'popup' | 'banner';
  userRole?: 'student' | 'parent';
  autoShow?: boolean;
  autoShowDelay?: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Advertisement: React.FC<Props> = ({
  mode = 'slider',
  userRole,
  autoShow = true,
  autoShowDelay = 2000,
}) => {
  const [open, setOpen] = useState(mode === 'popup' ? false : true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dữ liệu quảng cáo sử dụng hình ảnh từ public/images/ads
  const getAdvertisements = (): AdvertisementProps[] => {
    const baseAds = [
      {
        id: 1,
        title: 'Khóa học IELTS chất lượng cao',
        description: 'Cam kết đầu ra 6.5+ với đội ngũ giáo viên kinh nghiệm. Đăng ký ngay để nhận ưu đãi 20% học phí!',
        imageUrl: '/images/ads/ad1.jpg',
        link: '/courses/ielts',
      },
      {
        id: 2,
        title: 'Lớp Tiếng Anh Giao Tiếp',
        description: 'Phát triển kỹ năng giao tiếp tự tin với phương pháp hiện đại. Khai giảng lớp mới - Số lượng có hạn!',
        imageUrl: '/images/ads/ad2.jpg',
        link: '/courses/speaking',
      },
      {
        id: 3,
        title: 'Chương trình học thiếu nhi',
        description: 'Khóa học Tiếng Anh dành cho trẻ em với phương pháp vui nhộn, hiệu quả. Ưu đãi đặc biệt cho học sinh mới!',
        imageUrl: '/images/ads/ad3.jpg',
        link: '/courses/kids',
      },
    ];

    // Có thể tùy chỉnh quảng cáo theo userRole nếu cần
    if (userRole === 'parent') {
      return baseAds.map(ad => {
        if (ad.id === 3) {
          return {
            ...ad,
            title: 'Đăng ký con em học Tiếng Anh',
            description: 'Cho con cơ hội phát triển với chương trình Tiếng Anh chất lượng cao. Ưu đãi đặc biệt cho phụ huynh mới!',
          };
        }
        return ad;
      });
    }

    return baseAds;
  };

  const advertisements = getAdvertisements();

  useEffect(() => {
    if (autoShow && mode === 'popup') {
      const timer = setTimeout(() => {
        setOpen(true);
      }, autoShowDelay);
      return () => clearTimeout(timer);
    }
  }, [autoShow, autoShowDelay, mode]);

  useEffect(() => {
    if (mode === 'slider' || (mode === 'popup' && open)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % advertisements.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [mode, open, advertisements.length]);

  const handleClose = () => {
    setOpen(false);
  };

  const renderSliderContent = () => (
    <Box sx={{ width: '100%', mb: 3, maxWidth: '100%', margin: '0 auto' }}>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        showArrows={true}
        showIndicators={true}
        onChange={setCurrentIndex}
        selectedItem={currentIndex}
      >
        {advertisements.map((ad) => (
          <Paper
            key={ad.id}
            sx={{
              width: '100%',
              position: 'relative',
              backgroundColor: 'primary.light',
              overflow: 'hidden',
              aspectRatio: '16/9',
            }}
          >
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={ad.imageUrl}
                alt={ad.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 2,
                  background: 'rgba(0, 0, 0, 0.5)',
                  textAlign: 'left',
                  color: 'white',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>{ad.title}</Typography>
                <Typography variant="body1">{ad.description}</Typography>
                {ad.link && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={ad.link}
                    sx={{ mt: 1 }}
                  >
                    Xem chi tiết
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );

  const renderPopupContent = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={5000}
            onChange={setCurrentIndex}
            selectedItem={currentIndex}
            showStatus={false}
          >
            {advertisements.map((ad) => (
              <Box key={ad.id} sx={{ position: 'relative' }}>
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    p: 2,
                  }}
                >
                  <Typography variant="h6">{ad.title}</Typography>
                  <Typography variant="body2">{ad.description}</Typography>
                  {ad.link && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={ad.link}
                      sx={{ mt: 1 }}
                    >
                      Xem chi tiết
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Carousel>
        </DialogContent>
      </Box>
    </Dialog>
  );

  const renderBannerContent = () => (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          position: 'fixed',
          top: 0,
          m: 0,
          borderRadius: 0,
          maxHeight: '120px',
        },
      }}
    >
      <DialogContent sx={{ p: 0, height: '120px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'relative',
            bgcolor: 'background.paper',
          }}
        >
          <Box
            component="img"
            src={advertisements[currentIndex].imageUrl}
            alt={advertisements[currentIndex].title}
            sx={{
              width: '200px',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box sx={{ flex: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {advertisements[currentIndex].title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {advertisements[currentIndex].description}
            </Typography>
            {advertisements[currentIndex].link && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                href={advertisements[currentIndex].link}
              >
                Xem chi tiết
              </Button>
            )}
          </Box>
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              p: 1,
            }}
          >
            {advertisements.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  mx: 0.5,
                  borderRadius: '50%',
                  bgcolor: index === currentIndex ? 'primary.main' : 'grey.300',
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );

  switch (mode) {
    case 'slider':
      return renderSliderContent();
    case 'popup':
      return renderPopupContent();
    case 'banner':
      return renderBannerContent();
    default:
      return null;
  }
};

export default Advertisement;