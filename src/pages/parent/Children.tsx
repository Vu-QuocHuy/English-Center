import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,

  Divider,
  Chip,
  LinearProgress,
  DialogActions,
} from '@mui/material';
import {
  School as SchoolIcon,
  Grade as GradeIcon,
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

interface Class {
  name: string;
  schedule: string;
  teacher: string;
  attendance: number;
  grade: string;
}

interface Child {
  id: number;
  name: string;
  grade: string;
  level: string;
  classes: Class[];
  attendance: number;
  nextClass: string;
  assignments: {
    completed: number;
    total: number;
  };
}

const Children: React.FC = () => {
  const [children] = useState<Child[]>([
    {
      id: 1,
      name: 'John Doe',
      grade: 'A',
      level: 'Intermediate',
      attendance: 95,
      nextClass: '2024-03-15 09:00',
      assignments: {
        completed: 18,
        total: 20,
      },
      classes: [
        {
          name: 'IELTS Preparation',
          schedule: 'Mon, Wed, Fri 9:00-11:00',
          teacher: 'Mr. Smith',
          attendance: 95,
          grade: 'A',
        },
        {
          name: 'Business English',
          schedule: 'Tue, Thu 14:00-16:00',
          teacher: 'Ms. Johnson',
          attendance: 90,
          grade: 'A-',
        },
      ],
    },
    // Add more children as needed
  ]);

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [openClasses, setOpenClasses] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<{ date: string; status: string }[] | null>(null);

  const handleOpenClasses = (child: Child) => {
    setSelectedChild(child);
    setOpenClasses(true);
  };

  const handleCloseClasses = () => {
    setSelectedChild(null);
    setOpenClasses(false);
  };

  const handleOpenAttendance = (child: any) => {
    // Giả lập dữ liệu điểm danh
    setSelectedAttendance([
      { date: '2024-05-01', status: 'Có mặt' },
      { date: '2024-05-03', status: 'Nghỉ' },
      { date: '2024-05-05', status: 'Có mặt' },
    ]);
    setOpenAttendance(true);
  };

  const handleCloseAttendance = () => setOpenAttendance(false);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quản Lý Con
      </Typography>

      <Grid container spacing={3}>
        {children.map((child) => (
          <Grid item xs={12} key={child.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h5">{child.name}</Typography>
                  <Chip
                    icon={<SchoolIcon />}
                    label={child.level}
                    color="primary"
                  />
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                          <GradeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                          <Typography variant="h6" gutterBottom>
                            Tổng Kết Điểm
                          </Typography>
                          <Typography variant="h4" color="primary">
                            {child.grade}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                          <TimelineIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                          <Typography variant="h6" gutterBottom>
                            Điểm Danh
                          </Typography>
                          <Typography variant="h4" color="success.main">
                            {child.attendance}%
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ textAlign: 'center' }}>
                          <AssignmentIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                          <Typography variant="h6" gutterBottom>
                            Bài Tập
                          </Typography>
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(child.assignments.completed / child.assignments.total) * 100}
                              sx={{ height: 10, borderRadius: 5 }}
                            />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {child.assignments.completed}/{child.assignments.total} Đã Hoàn Thành
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Lớp Học Tiếp Theo
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography>
                      {new Date(child.nextClass).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                {/* Hiển thị tổng tiền học, tiền đã giảm, công nợ */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Tổng tiền học: 2.000.000₫</Typography>
                  <Typography variant="subtitle1" color="success.main">Tiền đã giảm: 200.000₫</Typography>
                  <Typography variant="subtitle1" color="error.main">Công nợ: 500.000₫</Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button startIcon={<SchoolIcon />} onClick={() => handleOpenClasses(child)}>
                  Xem Lớp
                </Button>
                <Button startIcon={<EventIcon />} onClick={() => handleOpenAttendance(child)}>
                  Lịch sử điểm danh
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openClasses} onClose={handleCloseClasses} maxWidth="md" fullWidth>
        <DialogTitle>Lớp - {selectedChild?.name}</DialogTitle>
        <DialogContent>
          <List>
            {selectedChild?.classes.map((cls, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6">{cls.name}</Typography>
                      <Chip label={`Điểm: ${cls.grade}`} color="primary" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Giáo viên: {cls.teacher}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Lịch học: {cls.schedule}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Số buổi đã học: {cls.attendance}%
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Điểm: {cls.grade}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" gutterBottom>
                        Công nợ: 0 VNĐ
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={cls.attendance}
                        sx={{ height: 5, borderRadius: 5 }}
                      />
                    </Box>
                  </Box>
                </ListItem>
                {index < selectedChild.classes.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* Popup lịch sử điểm danh */}
      <Dialog open={openAttendance} onClose={handleCloseAttendance} maxWidth="sm" fullWidth>
        <DialogTitle>Lịch sử điểm danh</DialogTitle>
        <DialogContent>
          <ul>
            {selectedAttendance?.map((item, idx) => (
              <li key={idx}>{item.date}: {item.status}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAttendance}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Children;