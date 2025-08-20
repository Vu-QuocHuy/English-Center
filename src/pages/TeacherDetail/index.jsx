import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Divider,
  Button,
  Skeleton,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  IconButton
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Psychology as PsychologyIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  EmojiEvents
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { COLORS } from '../../utils/colors';
import HomeHeader from '../Home/HomeHeader';
import { getTeacherDetailAPI } from '../../services/teacherService';

const TeacherDetail = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // TODO: Thay thế bằng API call thực tế
    fetchTeacherDetail();
  }, [teacherId]);

  const fetchTeacherDetail = async () => {
    setLoading(true);
    try {
      // TODO: Thay thế bằng API call thực tế khi backend sẵn sàng
      // const response = await getTeacherDetailAPI(teacherId);
      // setTeacher(response.data);
      
      // Mock data cho demo - sẽ được thay thế bằng API thực tế
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data dựa trên teacherId
      const mockTeachers = {
        '1': {
          id: '1',
          name: 'Hoàng Thị Mai',
          role: 'Giáo viên tiếng Anh Tiểu học',
          experience: '8 năm giảng dạy học sinh lớp 1-5',
          education: 'Cử nhân Sư phạm Tiếng Anh, ĐH Sư phạm Hà Nội',
          image: '/images/anh-1.png',
          description: 'Tận tâm, sáng tạo, giúp học sinh nhỏ tuổi yêu thích tiếng Anh qua các hoạt động vui nhộn, tương tác.',
          email: 'hoangmai@englishcenter.com',
          phone: '0901 234 567',
          location: 'Hà Nội',
          languages: ['Tiếng Anh', 'Tiếng Việt'],
          specializations: ['Tiếng Anh Tiểu học', 'Phát âm', 'Giao tiếp'],
          achievements: [
            'Chứng chỉ TESOL quốc tế',
            'Giải thưởng Giáo viên xuất sắc 2023',
            'Chứng chỉ Cambridge Young Learners'
          ],
          teachingMethods: [
            'Phương pháp học qua trò chơi',
            'Tương tác nhóm',
            'Học qua bài hát và video',
            'Thực hành giao tiếp thực tế'
          ],
          rating: 4.8,
          totalStudents: 150,
          totalClasses: 25,
          certificates: [
            'TESOL Certificate',
            'Cambridge Young Learners',
            'IELTS Teacher Training'
          ]
        },
        '2': {
          id: '2',
          name: 'Phạm Quang Duy',
          role: 'Giáo viên tiếng Anh THCS',
          experience: '5 năm giảng dạy học sinh lớp 6-9',
          education: 'Cử nhân Ngôn ngữ Anh, ĐH Ngoại ngữ - ĐHQGHN',
          image: '/images/ang-chin-yong.webp',
          description: 'Chuyên xây dựng nền tảng vững chắc về ngữ pháp, phát âm và giao tiếp cho học sinh cấp 2, giúp các em tự tin sử dụng tiếng Anh.',
          email: 'phamduy@englishcenter.com',
          phone: '0902 345 678',
          location: 'Hà Nội',
          languages: ['Tiếng Anh', 'Tiếng Việt', 'Tiếng Hàn'],
          specializations: ['Tiếng Anh THCS', 'Ngữ pháp', 'Phát âm', 'Giao tiếp'],
          achievements: [
            'Chứng chỉ TESOL quốc tế',
            'Chứng chỉ tiếng Hàn TOPIK',
            'Giải thưởng Giáo viên trẻ xuất sắc 2022'
          ],
          teachingMethods: [
            'Phương pháp học ngữ pháp có hệ thống',
            'Luyện phát âm chuẩn',
            'Thực hành giao tiếp theo chủ đề',
            'Học qua video và audio'
          ],
          rating: 4.7,
          totalStudents: 120,
          totalClasses: 20,
          certificates: [
            'TESOL Certificate',
            'TOPIK Certificate',
            'Cambridge TKT'
          ]
        },
        '3': {
          id: '3',
          name: 'Đỗ Thị Hoa',
          role: 'Giáo viên tiếng Anh THPT & luyện thi',
          experience: '6 năm luyện thi tiếng Anh cho học sinh lớp 10-12',
          education: 'Thạc sĩ Giảng dạy Tiếng Anh, ĐH Hà Nội',
          image: '/images/anh-3.png',
          description: 'Kinh nghiệm luyện thi vào 10, tốt nghiệp THPT, IELTS cho học sinh phổ thông. Phương pháp học tập trung, hiệu quả, truyền cảm hứng.',
          email: 'dochoa@englishcenter.com',
          phone: '0903 456 789',
          location: 'Hà Nội',
          languages: ['Tiếng Anh', 'Tiếng Việt'],
          specializations: ['Tiếng Anh THPT', 'Luyện thi IELTS', 'Luyện thi đại học'],
          achievements: [
            'Thạc sĩ Giảng dạy Tiếng Anh',
            'Chứng chỉ IELTS 8.5',
            'Giải thưởng Giáo viên xuất sắc 2023',
            'Học bổng Fulbright'
          ],
          teachingMethods: [
            'Phương pháp luyện thi hiệu quả',
            'Học tập trung vào mục tiêu',
            'Thực hành đề thi thực tế',
            'Phân tích lỗi và cải thiện'
          ],
          rating: 4.9,
          totalStudents: 200,
          totalClasses: 30,
          certificates: [
            'Master in TESOL',
            'IELTS 8.5',
            'Cambridge DELTA',
            'Fulbright Scholarship'
          ]
        }
      };
      
      const mockTeacher = mockTeachers[teacherId];
      if (!mockTeacher) {
        throw new Error('Teacher not found');
      }
      
      setTeacher(mockTeacher);
    } catch (err) {
      setError('Không thể tải thông tin giáo viên');
      console.error('Error fetching teacher detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        <HomeHeader />
        <Container maxWidth="lg" sx={{ pt: 10, pb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="60%" />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rectangular" height={400} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={150} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" height={100} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        <HomeHeader />
        <Container maxWidth="lg" sx={{ pt: 10, pb: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Quay lại
          </Button>
        </Container>
      </Box>
    );
  }

  if (!teacher) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        <HomeHeader />
        <Container maxWidth="lg" sx={{ pt: 10, pb: 4 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            Không tìm thấy thông tin giáo viên
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Quay lại
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <HomeHeader />
      <Container maxWidth="lg" sx={{ pt: 10, pb: 4 }}>
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)'
              }
            }}
          >
            Quay lại
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Teacher Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                position: 'relative',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 3,
                textAlign: 'center'
              }}>
                <Avatar
                  src={teacher.image}
                  alt={teacher.name}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                  }}
                />
                <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                  {teacher.name}
                </Typography>
                <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ mb: 2 }}>
                  {teacher.role}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <Rating value={teacher.rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2" color="rgba(255,255,255,0.9)">
                    {teacher.rating}/5
                  </Typography>
                </Box>
              </Box>

              <CardContent sx={{ p: 3 }}>
                {/* Contact Info */}
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                  Thông tin liên hệ
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={teacher.email}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={teacher.phone}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <LocationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={teacher.location}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Languages */}
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                  Ngôn ngữ
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {teacher.languages.map((language, index) => (
                    <Chip
                      key={index}
                      icon={<LanguageIcon />}
                      label={language}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {teacher.totalStudents}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Học sinh
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {teacher.totalClasses}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Lớp học
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {/* About */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                      Giới thiệu
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      {teacher.description}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      Với {teacher.experience}, {teacher.name} đã tích lũy được nhiều kinh nghiệm trong việc giảng dạy và phát triển phương pháp học tập hiệu quả cho học sinh.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Education & Experience */}
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SchoolIcon color="primary" />
                      Học vấn
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {teacher.education}
                    </Typography>
                    
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkIcon color="primary" />
                      Kinh nghiệm
                    </Typography>
                    <Typography variant="body1">
                      {teacher.experience}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Specializations */}
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PsychologyIcon color="primary" />
                      Chuyên môn
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {teacher.specializations.map((spec, index) => (
                        <Chip
                          key={index}
                          label={spec}
                          size="small"
                          color="secondary"
                          variant="outlined"
                          sx={{ alignSelf: 'flex-start' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Teaching Methods */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <GroupIcon color="primary" />
                      Phương pháp giảng dạy
                    </Typography>
                    <List>
                      {teacher.teachingMethods.map((method, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <StarIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={method}
                            primaryTypographyProps={{ variant: 'body1' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Achievements */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <CardContent sx={{ p: 3 }}>
                                         <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                       <EmojiEvents color="primary" />
                       Thành tích & Chứng chỉ
                     </Typography>
                    <List>
                      {teacher.achievements.map((achievement, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <EmojiEvents color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={achievement}
                            primaryTypographyProps={{ variant: 'body1' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherDetail;
