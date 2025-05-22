import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Grade as GradeIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Số lớp đang học',
      value: '3',
      icon: <ClassIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Bài tập',
      value: '8',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    },
    {
      title: 'Điểm trung bình',
      value: 'A',
      icon: <GradeIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    },
    {
      title: 'Tỉ lệ chuyên cần',
      value: '95%',
      icon: <EventIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    },
  ];

  const courses = [
    {
      name: 'Intermediate English',
      progress: 75,
      nextClass: 'Thứ 2, 09:00',
    },
    {
      name: 'IELTS Preparation',
      progress: 60,
      nextClass: 'Thứ 4, 14:00',
    },
    {
      name: 'Business English',
      progress: 40,
      nextClass: 'Thứ 6, 11:00',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trang Tổng Quan Học Sinh
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
            <CardHeader title="Tiến độ các khoá học" />
            <CardContent>
              <List>
                {courses.map((course, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <Box sx={{ width: '100%' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {course.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Lịch học: {course.nextClass}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < courses.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Bài tập sắp tới" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Bài viết IELTS Writing"
                    secondary="Hạn: Ngày mai, 23:59"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Thuyết trình Business English"
                    secondary="Hạn: Thứ 6, 11:00"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Kiểm tra ngữ pháp"
                    secondary="Hạn: Thứ 4 tuần sau"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;