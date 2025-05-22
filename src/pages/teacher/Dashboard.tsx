import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

const TeacherDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Lớp của tôi',
      value: '5',
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Học sinh',
      value: '120',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'info.main' }} />,
    },
    {
      title: 'Thu nhập',
      value: '12.500.000 VNĐ',
      icon: <PaymentIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
  ];

  const recentActivities = [
    '• Điểm danh lớp 5A',
    '• Hoàn thành dạy lớp 3',
    '• Nhận lương tháng 3',
    '• Cập nhật lịch học lớp 4B',
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trang Giáo Viên
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {stat.icon}
              <Typography variant="h6" component="div">
                {stat.title}
              </Typography>
              <Typography variant="h4" color="primary">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Hoạt động gần đây
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={activity} />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard; 