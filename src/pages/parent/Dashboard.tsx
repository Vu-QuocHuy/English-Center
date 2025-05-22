import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  School as SchoolIcon,
  Payment as PaymentIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ParentDashboard: React.FC = () => {
  const children = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      grade: '3A',
      attendance: {
        present: 45,
        total: 50,
      },
      payments: {
        paid: 3000000,
        total: 3500000,
      },
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      grade: '5B',
      attendance: {
        present: 48,
        total: 50,
      },
      payments: {
        paid: 4000000,
        total: 4000000,
      },
    },
  ];

  const recentActivities = [
    '• Đóng học phí tháng 3 cho Nguyễn Văn A',
    '• Xem điểm danh của Nguyễn Văn B',
    '• Cập nhật thông tin liên hệ',
    '• Đăng ký khóa học mới cho Nguyễn Văn A',
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Trang Phụ Huynh
      </Typography>

      {children.map((child) => (
        <Paper key={child.id} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h5">{child.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Lớp {child.grade}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h6">Điểm danh</Typography>
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(child.attendance.present / child.attendance.total) * 100}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {child.attendance.present}/{child.attendance.total} Buổi
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <PaymentIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h6">Học phí</Typography>
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(child.payments.paid / child.payments.total) * 100}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {child.payments.paid.toLocaleString()}/{child.payments.total.toLocaleString()} VNĐ
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}

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
    </Box>
  );
};

export default ParentDashboard;