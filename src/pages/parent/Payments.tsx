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
  Button,
  Chip,
} from '@mui/material';
import { Payment, Student } from '../../types/models';

const ParentPayments: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [children, setChildren] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const calculateTotalAmount = () => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const calculateTotalPaid = () => {
    return payments.reduce((sum, payment) => sum + payment.paidAmount, 0);
  };

  const calculateTotalDiscount = () => {
    return payments.reduce((sum, payment) => sum + payment.discountAmount, 0);
  };

  const calculateTotalRemaining = () => {
    return calculateTotalAmount() - calculateTotalPaid() - calculateTotalDiscount();
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Thông tin học phí</Typography>

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
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Tổng học phí</Typography>
                <Typography variant="h5">
                  {calculateTotalAmount().toLocaleString()} VNĐ
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Đã đóng</Typography>
                <Typography variant="h5" color="success.main">
                  {calculateTotalPaid().toLocaleString()} VNĐ
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Giảm giá</Typography>
                <Typography variant="h5" color="info.main">
                  {calculateTotalDiscount().toLocaleString()} VNĐ
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Còn lại</Typography>
                <Typography variant="h5" color="error.main">
                  {calculateTotalRemaining().toLocaleString()} VNĐ
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Tháng</TableCell>
                  <TableCell>Học phí</TableCell>
                  <TableCell>Giảm giá</TableCell>
                  <TableCell>Đã đóng</TableCell>
                  <TableCell>Còn lại</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.classId}</TableCell>
                    <TableCell>
                      {payment.month}/{payment.year}
                    </TableCell>
                    <TableCell>{payment.amount.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{payment.discountAmount.toLocaleString()} VNĐ</TableCell>
                    <TableCell>{payment.paidAmount.toLocaleString()} VNĐ</TableCell>
                    <TableCell>
                      {(payment.amount - payment.discountAmount - payment.paidAmount).toLocaleString()} VNĐ
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          payment.status === 'paid'
                            ? 'Đã thanh toán'
                            : payment.status === 'partial'
                            ? 'Đã đóng một phần'
                            : 'Chưa thanh toán'
                        }
                        color={
                          payment.status === 'paid'
                            ? 'success'
                            : payment.status === 'partial'
                            ? 'warning'
                            : 'error'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        disabled={payment.status === 'paid'}
                      >
                        Đóng tiền
                      </Button>
                    </TableCell>
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

export default ParentPayments; 