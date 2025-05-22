import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Tổng số học sinh',
      value: '250',
      icon: <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Tổng số giáo viên',
      value: '15',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    },
    {
      title: 'Lớp đang hoạt động',
      value: '20',
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Doanh thu tháng',
      value: '25.000.000₫',
      icon: <PaymentIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trang Tổng Quan Quản Trị
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                {stat.icon}
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="h6">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Hoạt động gần đây" />
            <CardContent>
              <Typography variant="body1" paragraph>
                • Đăng ký học sinh mới: Nguyễn Văn A
              </Typography>
              <Typography variant="body1" paragraph>
                • Tạo lớp mới: Lớp 3.1 năm 2025
              </Typography>
              <Typography variant="body1" paragraph>
                • Thu học phí: 2.000.000₫ từ phụ huynh Trần Thị B
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Sự kiện sắp tới" />
            <CardContent>
              <Typography variant="body1" paragraph>
                • Họp giáo viên - Thứ 2, 10:00
              </Typography>
              <Typography variant="body1" paragraph>
                • Khai giảng học kỳ mới - Tuần sau
              </Typography>
              <Typography variant="body1" paragraph>
                • Họp phụ huynh - Thứ 6, 14:00
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;