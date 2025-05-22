import React from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';
import AdvertisementSlider from '../../components/AdvertisementSlider';

// Mock data lớp học và điểm danh
const mockClasses = [
  {
    id: 1,
    name: 'IELTS 6.5',
    teacher: 'Nguyễn Văn A',
    totalSessions: 10,
    attended: 8,
    absent: 2,
  },
  {
    id: 2,
    name: 'Giao tiếp nâng cao',
    teacher: 'Trần Thị B',
    totalSessions: 12,
    attended: 12,
    absent: 0,
  },
];

// Mock data thông báo
const mockNotices = [
  { id: 1, content: 'Lớp IELTS 6.5 sẽ kiểm tra giữa kỳ vào ngày 20/06.' },
  { id: 2, content: 'Trung tâm nghỉ lễ Quốc khánh 2/9.' },
];

// Mock data lịch học
const mockSchedule = [
  { id: 1, className: 'IELTS 6.5', time: 'Thứ 2, 18:00 - 19:30' },
  { id: 2, className: 'Giao tiếp nâng cao', time: 'Thứ 5, 18:00 - 19:30' },
];

const StudentHome: React.FC = () => {
  return (
    <Box>
      <AdvertisementSlider userRole="student" />
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Chào mừng bạn đến với hệ thống quản lý trung tâm Anh ngữ!
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Lớp học của tôi
      </Typography>
      <Grid container spacing={2}>
        {mockClasses.map(cls => (
          <Grid item xs={12} md={6} key={cls.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>{cls.name}</Typography>
              <Typography variant="body2" color="text.secondary">Giáo viên: {cls.teacher}</Typography>
              <Typography variant="body2">Tổng số buổi: {cls.totalSessions}</Typography>
              <Typography variant="body2" color="success.main">Đã học: {cls.attended} buổi</Typography>
              <Typography variant="body2" color="error.main">Nghỉ: {cls.absent} buổi</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Thông báo
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <List>
          {mockNotices.map(notice => (
            <ListItem key={notice.id}>
              <ListItemText primary={notice.content} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Lịch học sắp tới
      </Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {mockSchedule.map(sch => (
            <ListItem key={sch.id}>
              <ListItemText primary={sch.className} secondary={sch.time} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default StudentHome; 