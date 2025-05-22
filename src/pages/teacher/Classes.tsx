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
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  Event as EventIcon,
} from '@mui/icons-material';

interface Student {
  id: number;
  name: string;
  attendance: number;
  grade: string;
}

interface Class {
  id: number;
  name: string;
  schedule: string;
  totalStudents: number;
  averageAttendance: number;
  nextLesson: string;
  students: Student[];
}

const Classes: React.FC = () => {
  const [classes] = useState<Class[]>([
    {
      id: 1,
      name: 'IELTS Preparation',
      schedule: 'Mon, Wed, Fri 9:00-11:00',
      totalStudents: 15,
      averageAttendance: 90,
      nextLesson: '2024-03-15 09:00',
      students: [
        { id: 1, name: 'John Doe', attendance: 95, grade: 'A' },
        { id: 2, name: 'Jane Smith', attendance: 85, grade: 'B+' },
        // Add more students as needed
      ],
    },
    // Add more classes as needed
  ]);

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [openStudents, setOpenStudents] = useState(false);
  const [attendance, setAttendance] = useState<{ [classId: number]: { [student: string]: boolean } }>({});

  const handleOpenStudents = (classItem: Class) => {
    setSelectedClass(classItem);
    setOpenStudents(true);
  };

  const handleCloseStudents = () => {
    setSelectedClass(null);
    setOpenStudents(false);
  };

  const handleToggleAttendance = (classId: number, student: string) => {
    setAttendance((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [student]: !prev[classId]?.[student],
      },
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Classes
      </Typography>

      <Grid container spacing={3}>
        {classes.map((classItem) => (
          <Grid item xs={12} md={6} key={classItem.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {classItem.name}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<EventIcon />}
                    label={classItem.schedule}
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<PeopleIcon />}
                    label={`${classItem.totalStudents} Students`}
                    color="secondary"
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Average Attendance
                    </Typography>
                    <Typography variant="h6">{classItem.averageAttendance}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Next Lesson
                    </Typography>
                    <Typography variant="h6">
                      {new Date(classItem.nextLesson).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button startIcon={<PeopleIcon />} onClick={() => handleOpenStudents(classItem)}>
                  Danh sách học sinh
                </Button>
                <Button startIcon={<EventIcon />}>
                  Số buổi đã dạy: {Math.floor(Math.random() * 30) + 1}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Students Dialog */}
      <Dialog open={openStudents} onClose={handleCloseStudents} maxWidth="sm" fullWidth>
        <DialogTitle>Điểm danh học sinh - {selectedClass?.name}</DialogTitle>
        <DialogContent>
          <ul>
            {selectedClass?.students.map((student, idx) => (
              <li key={idx}>
                <span>{student.name}</span>
                <Button
                  size="small"
                  variant={attendance[selectedClass.id]?.[student.name] ? 'contained' : 'outlined'}
                  color={attendance[selectedClass.id]?.[student.name] ? 'success' : 'primary'}
                  sx={{ ml: 2 }}
                  onClick={() => handleToggleAttendance(selectedClass.id, student.name)}
                >
                  {attendance[selectedClass.id]?.[student.name] ? 'Đã điểm danh' : 'Điểm danh'}
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Classes;