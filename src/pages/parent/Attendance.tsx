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
  TextField,
  MenuItem,
  Grid,
  Chip,
} from '@mui/material';
import { Attendance, Student } from '../../types/models';

const ParentAttendance: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [children, setChildren] = useState<Student[]>([]);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const calculateAttendanceStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(a => a.status === 'present').length;
    const absent = total - present;
    return { total, present, absent };
  };

  const stats = calculateAttendanceStats();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Thông tin điểm danh</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Chọn học sinh"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
          >
            {children.map((child) => (
              <MenuItem key={child.id} value={child.id}>
                {child.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Tháng"
            value={filterMonth}
            onChange={(e) => setFilterMonth(Number(e.target.value))}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                Tháng {month}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Năm"
            value={filterYear}
            onChange={(e) => setFilterYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {selectedChild && (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Tổng số buổi</Typography>
                <Typography variant="h5">{stats.total} buổi</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Có mặt</Typography>
                <Typography variant="h5" color="success.main">
                  {stats.present} buổi
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Vắng mặt</Typography>
                <Typography variant="h5" color="error.main">
                  {stats.absent} buổi
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ghi chú</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((attendance) => (
                  <TableRow key={attendance.id}>
                    <TableCell>
                      {new Date(attendance.date).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>{attendance.classId}</TableCell>
                    <TableCell>
                      <Chip
                        label={attendance.status === 'present' ? 'Có mặt' : 'Vắng mặt'}
                        color={attendance.status === 'present' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{attendance.note || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default ParentAttendance; 