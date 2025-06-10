import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  School as SchoolIcon,
  Star as StarIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  salaryPerSession: number;
  specialization: string;
  description: string;
  status: 'active' | 'inactive';
  qualifications: string;
  classes: number;
  yearJoined?: number;
}

interface TeacherDetailsProps {
  teacherId: number;
  onClose: () => void;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

interface Performance {
  id: number;
  month: string;
  rating: number;
  studentFeedback: number;
  attendanceRate: number;
  comments: string;
}

interface Schedule {
  id: number;
  day: string;
  time: string;
  class: string;
  room: string;
}

const TeacherDetails: React.FC<TeacherDetailsProps> = ({ teacherId, onClose }) => {
  const [tabValue, setTabValue] = useState(0);
  const [openCertDialog, setOpenCertDialog] = useState(false);
  const [openPerformanceDialog, setOpenPerformanceDialog] = useState(false);

  // Mock teacher data - trong thực tế sẽ fetch từ API hoặc props
  const mockTeachers: Teacher[] = [
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      email: 'lan.nguyen@example.com',
      phone: '0901234567',
      dateOfBirth: '1990-05-15',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      gender: 'female',
      salaryPerSession: 150000,
      specialization: 'IELTS',
      description: 'Giáo viên có 5 năm kinh nghiệm giảng dạy IELTS, chuyên về Writing và Speaking',
      status: 'active',
      qualifications: 'TESOL Certificate, IELTS 8.0, Thạc sĩ Ngôn ngữ Anh',
      classes: 3,
      yearJoined: 2020,
    },
    {
      id: 2,
      name: 'Trần Văn Minh',
      email: 'minh.tran@example.com',
      phone: '0902345678',
      dateOfBirth: '1988-12-03',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      gender: 'male',
      salaryPerSession: 120000,
      specialization: 'TOEIC',
      description: 'Chuyên gia TOEIC với kinh nghiệm 7 năm, đã giúp hàng trăm học sinh đạt điểm cao',
      status: 'active',
      qualifications: 'TOEIC 990, Cử nhân Sư phạm Tiếng Anh',
      classes: 2,
      yearJoined: 2018,
    },
  ];

  // Tìm giáo viên theo ID
  const teacher = mockTeachers.find(t => t.id === teacherId);

  // Nếu không tìm thấy giáo viên
  if (!teacher) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Không tìm thấy thông tin giáo viên
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Đóng
        </Button>
      </Box>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Calculate age
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate years of experience
  const calculateExperience = (yearJoined?: number) => {
    if (!yearJoined) return 'N/A';
    return new Date().getFullYear() - yearJoined;
  };

  // Mock data
  const certificates: Certificate[] = [
    {
      id: 1,
      name: 'TESOL Certificate',
      issuer: 'Cambridge University',
      date: '2020-01-15',
      expiryDate: '2025-01-15',
    },
    {
      id: 2,
      name: 'CELTA',
      issuer: 'Cambridge English',
      date: '2019-06-20',
    },
  ];

  const performances: Performance[] = [
    {
      id: 1,
      month: '2024-03',
      rating: 4.5,
      studentFeedback: 4.8,
      attendanceRate: 98,
      comments: 'Excellent performance and student engagement',
    },
    {
      id: 2,
      month: '2024-02',
      rating: 4.3,
      studentFeedback: 4.5,
      attendanceRate: 95,
      comments: 'Good performance, needs minor improvements in time management',
    },
  ];

  const schedule: Schedule[] = [
    {
      id: 1,
      day: 'Thứ 2',
      time: '08:00 - 09:30',
      class: 'IELTS Intermediate',
      room: 'P201',
    },
    {
      id: 2,
      day: 'Thứ 3',
      time: '10:00 - 11:30',
      class: 'Speaking Advanced',
      room: 'P305',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Chi tiết giáo viên: {teacher.name}
        </Typography>
        <Button onClick={onClose} variant="outlined">
          Đóng
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Thông tin chung" />
          <Tab label="Chứng chỉ & Bằng cấp" />
          <Tab label="Đánh giá hiệu suất" />
          <Tab label="Lịch dạy" />
        </Tabs>
      </Box>

      {/* Thông tin chung */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Thông tin cá nhân
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Họ và tên" secondary={teacher.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Email" secondary={teacher.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Số điện thoại" secondary={teacher.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Ngày sinh" 
                      secondary={`${formatDate(teacher.dateOfBirth)} (${calculateAge(teacher.dateOfBirth)} tuổi)`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Giới tính" 
                      secondary={
                        teacher.gender === 'male' ? 'Nam' : 
                        teacher.gender === 'female' ? 'Nữ' : 'Khác'
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Địa chỉ" secondary={teacher.address} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Thông tin công việc
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Chuyên môn" secondary={teacher.specialization} />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Lương mỗi buổi" 
                      secondary={`${teacher.salaryPerSession.toLocaleString('vi-VN')}₫`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Trạng thái" 
                      secondary={
                        <Chip
                          label={teacher.status === 'active' ? 'Đang làm việc' : 'Nghỉ việc'}
                          color={teacher.status === 'active' ? 'success' : 'default'}
                          size="small"
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Năm vào làm" 
                      secondary={teacher.yearJoined || 'N/A'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Kinh nghiệm" 
                      secondary={`${calculateExperience(teacher.yearJoined)} năm`} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Số lớp đang dạy" secondary={`${teacher.classes} lớp`} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Trình độ & Bằng cấp
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {teacher.qualifications}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Mô tả
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {teacher.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Chứng chỉ & Bằng cấp */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<SchoolIcon />}
            onClick={() => setOpenCertDialog(true)}
          >
            Thêm chứng chỉ
          </Button>
        </Box>
        <Timeline>
          {certificates.map((cert) => (
            <TimelineItem key={cert.id}>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <SchoolIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span">
                  {cert.name}
                </Typography>
                <Typography color="text.secondary">
                  {cert.issuer} - {cert.date}
                </Typography>
                {cert.expiryDate && (
                  <Chip
                    label={`Hết hạn: ${cert.expiryDate}`}
                    color="warning"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </TabPanel>

      {/* Đánh giá hiệu suất */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<StarIcon />}
            onClick={() => setOpenPerformanceDialog(true)}
          >
            Thêm đánh giá
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tháng</TableCell>
                <TableCell>Đánh giá</TableCell>
                <TableCell>Phản hồi học viên</TableCell>
                <TableCell>Tỷ lệ điểm danh</TableCell>
                <TableCell>Nhận xét</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {performances.map((perf) => (
                <TableRow key={perf.id}>
                  <TableCell>{perf.month}</TableCell>
                  <TableCell>
                    <Rating value={perf.rating} readOnly precision={0.5} />
                  </TableCell>
                  <TableCell>{perf.studentFeedback}/5.0</TableCell>
                  <TableCell>{perf.attendanceRate}%</TableCell>
                  <TableCell>{perf.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Lịch dạy */}
      <TabPanel value={tabValue} index={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thứ</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Phòng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.class}</TableCell>
                  <TableCell>{item.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Dialog thêm chứng chỉ */}
      <Dialog open={openCertDialog} onClose={() => setOpenCertDialog(false)}>
        <DialogTitle>Thêm chứng chỉ mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên chứng chỉ"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Đơn vị cấp"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Ngày cấp"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Ngày hết hạn"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCertDialog(false)}>Hủy</Button>
          <Button variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thêm đánh giá */}
      <Dialog open={openPerformanceDialog} onClose={() => setOpenPerformanceDialog(false)}>
        <DialogTitle>Thêm đánh giá mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tháng"
            type="month"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <Typography component="legend" sx={{ mt: 2 }}>Đánh giá chung</Typography>
          <Rating />
          <TextField
            margin="dense"
            label="Phản hồi học viên"
            type="number"
            fullWidth
            variant="outlined"
            InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
          />
          <TextField
            margin="dense"
            label="Tỷ lệ điểm danh (%)"
            type="number"
            fullWidth
            variant="outlined"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
          />
          <TextField
            margin="dense"
            label="Nhận xét"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPerformanceDialog(false)}>Hủy</Button>
          <Button variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherDetails;