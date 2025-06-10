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
} from '@mui/material';
import { TeacherPayment } from '../../types/models';

const TeacherPayments: React.FC = () => {
  const [payments] = useState<TeacherPayment[]>([]);
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const calculateTotalAmount = () => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Thông tin lương</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
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

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Tổng số buổi dạy</Typography>
            <Typography variant="h5">
              {payments.reduce((sum, payment) => sum + payment.numberOfSessions, 0)} buổi
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Tổng tiền lương</Typography>
            <Typography variant="h5" color="success.main">
              {calculateTotalAmount().toLocaleString()} VNĐ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Trạng thái</Typography>
            <Typography variant="h5" color="info.main">
              {payments.every(p => p.status === 'paid') ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Lớp</TableCell>
              <TableCell>Số buổi</TableCell>
              <TableCell>Lương/buổi</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày thanh toán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.classId}</TableCell>
                <TableCell>{payment.numberOfSessions}</TableCell>
                <TableCell>
                  {(payment.amount / payment.numberOfSessions).toLocaleString()} VNĐ
                </TableCell>
                <TableCell>{payment.amount.toLocaleString()} VNĐ</TableCell>
                <TableCell>
                  {payment.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </TableCell>
                <TableCell>
                  {payment.paidDate
                    ? new Date(payment.paidDate).toLocaleDateString('vi-VN')
                    : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeacherPayments; 