import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';
import { commonStyles } from '../../utils/styles';
import HomeHeader from './HomeHeader';
import Footer from './Footer';
import AdvertisementSlider from '../../components/advertisement/AdvertisementSlider';
import WelcomeAdPopup from '../../components/advertisement/WelcomeAdPopup';
import { useAuth } from '../../contexts/AuthContext';
import { useHomePage } from '../../contexts/HomePageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAnnouncementsAPI } from '../../services/api';
import FeedbackHome from './FeedbackHome';

const teachersData = [
  {
    id: 1,
    name: 'Hoàng Thị Mai',
    role: 'Giáo viên tiếng Anh Tiểu học',
    experience: '8 năm giảng dạy học sinh lớp 1-5',
    education: 'Cử nhân Sư phạm Tiếng Anh, ĐH Sư phạm Hà Nội',
    image: '/images/anh-1.png',
    description: 'Tận tâm, sáng tạo, giúp học sinh nhỏ tuổi yêu thích tiếng Anh qua các hoạt động vui nhộn, tương tác.'
  },
  {
    id: 2,
    name: 'Phạm Quang Duy',
    role: 'Giáo viên tiếng Anh THCS',
    experience: '5 năm giảng dạy học sinh lớp 6-9',
    education: 'Cử nhân Ngôn ngữ Anh, ĐH Ngoại ngữ - ĐHQGHN',
    image: '/images/ang-chin-yong.webp',
    description: 'Chuyên xây dựng nền tảng vững chắc về ngữ pháp, phát âm và giao tiếp cho học sinh cấp 2, giúp các em tự tin sử dụng tiếng Anh.'
  },
  {
    id: 3,
    name: 'Đỗ Thị Hoa',
    role: 'Giáo viên tiếng Anh THPT & luyện thi',
    experience: '6 năm luyện thi tiếng Anh cho học sinh lớp 10-12',
    education: 'Thạc sĩ Giảng dạy Tiếng Anh, ĐH Hà Nội',
    image: '/images/anh-3.png',
    description: 'Kinh nghiệm luyện thi vào 10, tốt nghiệp THPT, IELTS cho học sinh phổ thông. Phương pháp học tập trung, hiệu quả, truyền cảm hứng.'
  }
];

const Home = () => {
  const { user } = useAuth();
  const { hero, about, teachers: teachersConfig, announcements, customSections } = useHomePage();
  const navigate = useNavigate();
  const [showWelcomeAd, setShowWelcomeAd] = useState(false);
  const [ads, setAds] = useState([]);
  const [popupAds, setPopupAds] = useState([]);
  const [bannerAds, setBannerAds] = useState([]);

  useEffect(() => {
    const adShown = sessionStorage.getItem('welcomeAdShown');
    if (!adShown && announcements.enabled) {
      const timer = setTimeout(() => {
        setShowWelcomeAd(true);
      }, announcements.popupDelay);
      return () => clearTimeout(timer);
    }
  }, [announcements.enabled, announcements.popupDelay]);

  useEffect(() => {
    getAllAnnouncementsAPI()
      .then(res => {
        setAds(res.data || []);
        setPopupAds((res.data || []).filter(ad => ad.displayType === 'popup'));
        setBannerAds((res.data || []).filter(ad => ad.displayType === 'banner'));
      });
  }, []);

  const handleCloseWelcomeAd = () => {
    sessionStorage.setItem('welcomeAdShown', 'true');
    setShowWelcomeAd(false);
  };

  const handleTeacherClick = (teacherId) => {
    navigate(`/teacher/${teacherId}`);
  };

  const renderCustomSection = (section) => {
    if (!section.enabled) return null;

    const renderGridItems = () => (
      <Grid container spacing={4}>
        {section.items.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }
              }}
            >
              {item.image && (
                <Box sx={{ position: 'relative', paddingTop: '60%' }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 'bold', color: '#000' }}
                >
                  {item.title}
                </Typography>
                {item.subtitle && (
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {item.subtitle}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ lineHeight: 1.6, color: '#555', mb: 2 }}
                >
                  {item.description || item.content}
                </Typography>
                {item.price && (
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 'bold', mb: 1 }}
                  >
                    {item.price}
                  </Typography>
                )}
                {item.duration && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Thời lượng: {item.duration}
                  </Typography>
                )}
                {item.rating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {item.rating}/5
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );

    const renderListItems = () => (
      <List>
        {section.items.map((item) => (
          <ListItem key={item.id} sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
            <ListItemText
              primary={
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
              }
              secondary={
                <Box>
                  {item.subtitle && (
                    <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
                      {item.subtitle}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {item.description || item.content}
                  </Typography>
                  {item.price && (
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {item.price}
                    </Typography>
                  )}
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    );

    const renderCarouselItems = () => (
      <Box sx={{ position: 'relative' }}>
        {/* Simple carousel implementation */}
        <Grid container spacing={3}>
          {section.items.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {item.avatar && (
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  )}
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name || item.title}
                    </Typography>
                    {item.role && (
                      <Typography variant="body2" color="text.secondary">
                        {item.role}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#555' }}>
                  {item.content || item.description}
                </Typography>
                {item.rating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <Rating value={item.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {item.rating}/5
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );

    return (
      <Box sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2
            }}
          >
            {section.title}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 0,
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 300
            }}
          >
            {section.subtitle}
          </Typography>
        </Box>

        {section.type === 'grid' && renderGridItems()}
        {section.type === 'list' && renderListItems()}
        {section.type === 'carousel' && renderCarouselItems()}
      </Box>
    );
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative'
    }}>
      {/* Quảng cáo popup động */}
      {popupAds.length > 0 && (
        <WelcomeAdPopup
          open={showWelcomeAd}
          onClose={handleCloseWelcomeAd}
          ads={popupAds}
        />
      )}
      <HomeHeader sx={{
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
      }} />
      <Box sx={{ width: '100%' }}>
        {/* Advertisement Banner động - chuyển lên đầu */}
        <Box sx={{ mb: 0 }}>
          <AdvertisementSlider ads={bannerAds} />
        </Box>
        <Box sx={{ px: '8%', bgcolor: '#fff', py: 4 }}>


          {/* About Section - now 4 columns */}
          <Box id="about-section" sx={{ mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 2
                }}
            >
              {about.title}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
                sx={{
                  mb: 0,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  fontWeight: 300
                }}
            >
              {about.subtitle}
            </Typography>
            </Box>
            <Grid container spacing={4}>
              {about.sections.map((section, index) => (
                <Grid item xs={12} md={3} key={section.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: '100%',
                    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                    borderRadius: 3,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        border: `1px solid ${index === 0 ? 'rgba(229,57,53,0.2)' : 
                                       index === 1 ? 'rgba(25,118,210,0.2)' : 
                                       index === 2 ? 'rgba(76,175,80,0.2)' : 
                                       'rgba(255,152,0,0.2)'}`
                    }
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: '#000',
                      mb: 1
                    }}
                  >
                      {section.title}
                  </Typography>
                  <Typography paragraph sx={{ lineHeight: 1.8, color: '#555' }}>
                      {section.content}
                  </Typography>
                </Paper>
              </Grid>
              ))}
            </Grid>
          </Box>

          {/* Teachers Section */}
          <Box id="teachers-section" sx={{ mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 2
                }}
            >
              {teachersConfig.title}
            </Typography>
            </Box>

              {/* Section 3 giá trị cốt lõi */}
              <Box sx={{ mb: 8 }}>
                  <Grid container spacing={4}>
                    {teachersConfig.values.map((value, index) => (
                      <Grid item xs={12} md={4} key={value.id}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                          borderRadius: 3,
                          border: '1px solid rgba(0,0,0,0.05)',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                              border: `1px solid ${index === 0 ? 'rgba(229,57,53,0.2)' : 
                                             index === 1 ? 'rgba(25,118,210,0.2)' : 
                                             'rgba(76,175,80,0.2)'}`
                          }
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            textAlign: 'center',
                            color: '#000'
                          }}
                        >
                            {value.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ textAlign: 'justify', lineHeight: 1.8 }}>
                            {value.content}
                      </Typography>
                    </Paper>
                    </Grid>
                    ))}
                  </Grid>
            </Box>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 2
                }}
            >
              {teachersConfig.subtitle}
            </Typography>
            </Box>
            <Grid container spacing={4}>
              {teachersData.map((teacher) => (
                <Grid item key={teacher.id} xs={12} md={4}>
                  <Card
                    onClick={() => handleTeacherClick(teacher.id)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '100%' }}>
                      <CardMedia
                        component="img"
                        image={teacher.image}
                        alt={teacher.name}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{ fontWeight: 'bold', color: '#000' }}
                      >
                        {teacher.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        gutterBottom
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {teacher.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        {teacher.experience}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{ mb: 2, fontWeight: 500 }}
                      >
                        {teacher.education}
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.6, color: '#555', mb: 2 }}
                      >
                        {teacher.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mt: 'auto',
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white'
                          }
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* Custom Sections */}
            {customSections
              .filter(section => section.enabled)
              .sort((a, b) => a.order - b.order)
              .map(section => (
                <Box key={section.id} id={`section-${section.id}`}>
                  {renderCustomSection(section)}
                </Box>
              ))}

            {/* Feedback slider section */}
            <Box id="feedback-section" sx={{ my: 10 }}>
              <FeedbackHome />
            </Box>
            </Box>
          </Box>
        </Box>
      <Footer />
    </Box>
  );
};

export default Home;
