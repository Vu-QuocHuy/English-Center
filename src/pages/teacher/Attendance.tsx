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
  TextField,
  MenuItem,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Attendance, Class } from '../../types/models';

const TeacherAttendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const handleSaveAttendance = () => {
    // TODO: Implement save functionality
  };

  const handleAttendanceChange = (studentId: number, status: 'present' | 'absent') => {
    setAttendanceData(prev =>
      prev.map(item =>
        item.studentId === studentId ? { ...item, status } : item
      )
    );
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Điểm danh</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Chọn lớp"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((classItem) => (
              <MenuItem key={classItem.id} value={classItem.id}>
                {classItem.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            fullWidth
            label="Chọn ngày"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {selectedClass && selectedDate && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Học sinh</TableCell>
                <TableCell>Điểm danh</TableCell>
                <TableCell>Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((attendance) => (
                <TableRow key={attendance.studentId}>
                  <TableCell>{attendance.studentId}</TableCell>
                  <TableCell>
                    <RadioGroup
                      row
                      value={attendance.status}
                      onChange={(e) => handleAttendanceChange(attendance.studentId, e.target.value as 'present' | 'absent')}
                    >
                      <FormControlLabel
                        value="present"
                        control={<Radio />}
                        label="Có mặt"
                      />
                      <FormControlLabel
                        value="absent"
                        control={<Radio />}
                        label="Vắng mặt"
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Ghi chú"
                      value={attendance.note || ''}
                      onChange={(e) => {
                        setAttendanceData(prev =>
                          prev.map(item =>
                            item.studentId === attendance.studentId
                              ? { ...item, note: e.target.value }
                              : item
                          )
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedClass && selectedDate && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSaveAttendance}>
            Lưu điểm danh
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TeacherAttendance; 