import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import {
  School as SchoolIcon,
  Event as EventIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface Class {
  id: number;
  name: string;
  teacher: string;
  schedule: string;
  level: string;
  attendance: number;
  grade: string;
  nextSession: string;
}

const Classes: React.FC = () => {
  const [classes] = useState<Class[]>([
    {
      id: 1,
      name: 'IELTS Preparation',
      teacher: 'Mr. Smith',
      schedule: 'Mon, Wed, Fri 9:00-11:00',
      level: 'Advanced',
      attendance: 95,
      grade: 'A',
      nextSession: '2024-03-15 09:00',
    },
    {
      id: 2,
      name: 'Business English',
      teacher: 'Ms. Johnson',
      schedule: 'Tue, Thu 14:00-16:00',
      level: 'Intermediate',
      attendance: 90,
      grade: 'A-',
      nextSession: '2024-03-14 14:00',
    },
  ]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lớp Của Tôi
      </Typography>

      <Grid container spacing={3}>
        {classes.map((cls) => (
          <Grid item xs={12} key={cls.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h5">{cls.name}</Typography>
                  </Box>
                  <Chip
                    label={cls.level}
                    color="primary"
                    size="small"
                  />
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">Giáo viên</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{cls.teacher}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body1">Lịch học</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{cls.schedule}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body1">Buổi tiếp theo</Typography>
                        </TableCell>
                        <TableCell>{new Date(cls.nextSession).toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body1">Điểm</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={cls.grade} color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body1">Số buổi đã học</Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LinearProgress
                              variant="determinate"
                              value={cls.attendance}
                              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {cls.attendance}%
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Classes;