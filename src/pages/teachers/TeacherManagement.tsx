import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { People as PeopleIcon, Event as EventIcon } from '@mui/icons-material';

interface Class {
  id: number;
  name: string;
  year: number;
  grade: number;
  order: number;
  students: string[];
  sessionsTaught: number;
}

const sampleClasses: Class[] = [
  {
    id: 1,
    name: 'Lớp 3.1',
    year: 2024,
    grade: 3,
    order: 1,
    students: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'],
    sessionsTaught: 18,
  },
  {
    id: 2,
    name: 'Lớp 4.2',
    year: 2024,
    grade: 4,
    order: 2,
    students: ['Phạm Văn D', 'Hoàng Thị E'],
    sessionsTaught: 15,
  },
];

const TeacherManagement: React.FC = () => {
  const [classes] = useState<Class[]>(sampleClasses);
  const [openStudents, setOpenStudents] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [attendance, setAttendance] = useState<{ [classId: number]: { [student: string]: boolean } }>({});

  const handleOpenStudents = (classItem: Class) => {
    setSelectedClass(classItem);
    setOpenStudents(true);
  };
  const handleCloseStudents = () => {
    setOpenStudents(false);
    setSelectedClass(null);
  };
  const handleToggleAttendance = (classId: number, student: string) => {
    setAttendance(prev => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [student]: !prev[classId]?.[student],
      },
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Quản Lý Lớp Dạy Của Tôi</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Lớp</TableCell>
              <TableCell>Năm Học</TableCell>
              <TableCell>Khối</TableCell>
              <TableCell>Số Thứ Tự</TableCell>
              <TableCell>Số Buổi Đã Dạy</TableCell>
              <TableCell>Học Sinh</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.year}</TableCell>
                <TableCell>{classItem.grade}</TableCell>
                <TableCell>{classItem.order}</TableCell>
                <TableCell>{classItem.sessionsTaught}</TableCell>
                <TableCell>{classItem.students.length}</TableCell>
                <TableCell>
                  <Button startIcon={<PeopleIcon />} onClick={() => handleOpenStudents(classItem)}>
                    Danh sách học sinh & Điểm danh
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog xem danh sách học sinh và điểm danh */}
      <Dialog open={openStudents} onClose={handleCloseStudents} maxWidth="sm" fullWidth>
        <DialogTitle>Điểm danh học sinh - {selectedClass?.name}</DialogTitle>
        <DialogContent>
          <ul>
            {selectedClass?.students.map((student, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <span>{student}</span>
                <Button
                  size="small"
                  variant={attendance[selectedClass.id]?.[student] ? 'contained' : 'outlined'}
                  color={attendance[selectedClass.id]?.[student] ? 'success' : 'primary'}
                  sx={{ ml: 2 }}
                  onClick={() => handleToggleAttendance(selectedClass.id, student)}
                >
                  {attendance[selectedClass.id]?.[student] ? 'Đã điểm danh' : 'Điểm danh'}
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudents}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherManagement;
