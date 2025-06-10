import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Rating,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School as SchoolIcon,
  Group as GroupIcon,
  EmojiEvents as TrophyIcon,
  Language as LanguageIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import COLORS from '../constants/colors';
import Advertisement from '../components/Advertisement';
import WelcomeAdPopup from '../components/WelcomeAdPopup';

interface LandingPageProps {
  showNavigation?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ showNavigation = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showWelcomeAd, setShowWelcomeAd] = useState(false);
  const [showAdvertisements, setShowAdvertisements] = useState(true);
  const [userClickedNavigation, setUserClickedNavigation] = useState(false);

  // Hiển thị popup quảng cáo sau 3 giây khi load trang
  useEffect(() => {
    if (showAdvertisements && !userClickedNavigation) {
      const timer = setTimeout(() => {
        setShowWelcomeAd(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAdvertisements, userClickedNavigation]);



  const handleCloseWelcomeAd = () => {
    setShowWelcomeAd(false);
  };

  const handleNavigationClick = () => {
    // Ẩn tất cả quảng cáo vĩnh viễn khi user click vào navigation
    setShowAdvertisements(false);
    setShowWelcomeAd(false);
    setUserClickedNavigation(true);
  };

  return (
    <Box>
      {/* Navigation */}
      {showNavigation && (
        <AppBar 
          position="fixed" 
          color="transparent" 
          sx={{ 
            backgroundColor: COLORS.primary.main,
            borderBottom: `1px solid ${COLORS.border.light}`,
            boxShadow: COLORS.shadow.light,
          }}
        >
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  flexGrow: 1, 
                  color: COLORS.accent.primary, 
                  fontWeight: 'bold' 
                }}
              >
                English Center
              </Typography>
              {isMobile ? (
                <Button sx={{ color: COLORS.text.primary }}>
                  <MenuIcon />
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    href="#courses"
                    onClick={handleNavigationClick}
                    sx={{ 
                      color: COLORS.text.primary,
                      '&:hover': {
                        backgroundColor: COLORS.secondary.light,
                      },
                    }}
                  >
                    Khóa học
                  </Button>
                  <Button 
                    href="#testimonials"
                    onClick={handleNavigationClick}
                    sx={{ 
                      color: COLORS.text.primary,
                      '&:hover': {
                        backgroundColor: COLORS.secondary.light,
                      },
                    }}
                  >
                    Đánh giá
                  </Button>
                  <Button 
                    href="#contact"
                    onClick={handleNavigationClick}
                    sx={{ 
                      color: COLORS.text.primary,
                      '&:hover': {
                        backgroundColor: COLORS.secondary.light,
                      },
                    }}
                  >
                    Liên hệ
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    sx={{
                      backgroundColor: COLORS.accent.primary,
                      color: COLORS.primary.main,
                      '&:hover': {
                        backgroundColor: COLORS.accent.primary,
                        boxShadow: COLORS.shadow.medium,
                      },
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )}

      {/* Add margin top to account for fixed AppBar */}
      <Box sx={{ marginTop: showNavigation ? '64px' : '0' }}>
        {/* Advertisement Slider - chỉ hiển thị khi showAdvertisements = true */}
        {showAdvertisements && (
          <Advertisement mode="slider" autoShow={false} />
        )}

        {/* Hero Section */}
        <Box
          sx={{
            backgroundColor: COLORS.background.light,
            backgroundImage: COLORS.gradient.primary,
            color: COLORS.text.primary,
            py: 15,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="md">
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
                fontSize: { xs: '2.5rem', md: '3.75rem' },
                color: COLORS.text.primary,
              }}
            >
              Chào mừng đến với English Center
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom
              sx={{
                mb: 6,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                color: COLORS.text.secondary,
              }}
            >
              Nơi khởi đầu hành trình chinh phục tiếng Anh của bạn
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              size="large"
              sx={{ 
                py: 2, 
                px: 4,
                fontSize: '1.2rem',
                backgroundColor: COLORS.accent.primary,
                color: COLORS.primary.main,
                boxShadow: COLORS.shadow.medium,
                '&:hover': {
                  backgroundColor: COLORS.accent.primary,
                  boxShadow: COLORS.shadow.dark,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Bắt đầu ngay
            </Button>
          </Container>
        </Box>

        {/* Welcome Ad Popup - chỉ hiển thị khi showWelcomeAd = true */}
        {showWelcomeAd && (
          <WelcomeAdPopup
            open={showWelcomeAd}
            onClose={handleCloseWelcomeAd}
          />
        )}

        {/* Stats Section */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <SchoolIcon sx={{ fontSize: 60, color: COLORS.accent.primary }} />
                <Typography variant="h4" sx={{ color: COLORS.text.primary }}>1000+</Typography>
                <Typography sx={{ color: COLORS.text.secondary }}>Học viên</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <GroupIcon sx={{ fontSize: 60, color: COLORS.accent.primary }} />
                <Typography variant="h4" sx={{ color: COLORS.text.primary }}>50+</Typography>
                <Typography sx={{ color: COLORS.text.secondary }}>Giáo viên</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <TrophyIcon sx={{ fontSize: 60, color: COLORS.accent.primary }} />
                <Typography variant="h4" sx={{ color: COLORS.text.primary }}>95%</Typography>
                <Typography sx={{ color: COLORS.text.secondary }}>Tỷ lệ đậu</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box textAlign="center">
                <LanguageIcon sx={{ fontSize: 60, color: COLORS.accent.primary }} />
                <Typography variant="h4" sx={{ color: COLORS.text.primary }}>10+</Typography>
                <Typography sx={{ color: COLORS.text.secondary }}>Năm kinh nghiệm</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Courses Section */}
        <Box 
          id="courses" 
          sx={{ 
            backgroundColor: COLORS.background.paper, 
            py: 8 
          }}
        >
          <Container>
            <Typography 
              variant="h3" 
              textAlign="center" 
              gutterBottom
              sx={{ color: COLORS.text.primary }}
            >
              Các khóa học nổi bật
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                {
                  title: 'IELTS',
                  description: 'Luyện thi IELTS với giáo viên bản ngữ',
                  image: '/images/ielts.jpg',
                },
                {
                  title: 'TOEIC',
                  description: 'Khóa học TOEIC từ cơ bản đến nâng cao',
                  image: '/images/toeic.jpg',
                },
                {
                  title: 'English for Kids',
                  description: 'Tiếng Anh cho trẻ em từ 4-15 tuổi',
                  image: '/images/kids.jpg',
                },
              ].map((course, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={course.image}
                      alt={course.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {course.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {course.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials */}
        <Box id="testimonials" sx={{ py: 8 }}>
          <Container>
            <Typography variant="h3" textAlign="center" gutterBottom>
              Học viên nói gì về chúng tôi
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                {
                  name: 'Nguyễn Văn A',
                  comment: 'Tôi đã đạt 7.5 IELTS sau 6 tháng học tại trung tâm',
                  rating: 5,
                },
                {
                  name: 'Trần Thị B',
                  comment: 'Giáo viên nhiệt tình, phương pháp giảng dạy hiệu quả',
                  rating: 5,
                },
                {
                  name: 'Lê Văn C',
                  comment: 'Con tôi rất thích học tại trung tâm',
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {testimonial.name[0]}
                        </Avatar>
                        <Typography variant="h6">{testimonial.name}</Typography>
                      </Box>
                      <Typography color="text.secondary" paragraph>
                        "{testimonial.comment}"
                      </Typography>
                      <Rating value={testimonial.rating} readOnly />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box id="contact" sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Liên hệ với chúng tôi
                </Typography>
                <Typography paragraph>
                  Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM
                </Typography>
                <Typography paragraph>
                  Email: contact@englishcenter.com
                </Typography>
                <Typography paragraph>
                  Điện thoại: (028) 1234 5678
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Giờ làm việc
                </Typography>
                <Typography paragraph>
                  Thứ 2 - Thứ 6: 8:00 - 21:00
                </Typography>
                <Typography paragraph>
                  Thứ 7 - Chủ nhật: 8:00 - 17:00
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage; 