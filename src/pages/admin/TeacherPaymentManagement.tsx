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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface TeacherPayment {
  id: number;
  teacherName: string;
  month: number;
  year: number;
  numberOfSessions: number;
  amount: number;
  status: 'pending' | 'paid';
  paidDate?: string;
}

const mockPayments: TeacherPayment[] = [
  {
    id: 1,
    teacherName: 'Nguyễn Văn A',
    month: 6,
    year: 2024,
    numberOfSessions: 12,
    amount: 4800000,
    status: 'pending',
  },
  {
    id: 2,
    teacherName: 'Trần Thị B',
    month: 6,
    year: 2024,
    numberOfSessions: 10,
    amount: 4000000,
    status: 'paid',
    paidDate: '2024-06-10',
  },
];

const TeacherPaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<TeacherPayment[]>(mockPayments);
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [payDialog, setPayDialog] = useState<{ open: boolean; payment?: TeacherPayment }>({ open: false });

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const handlePay = (payment: TeacherPayment) => {
    setPayDialog({ open: true, payment });
  };
  const handleCloseDialog = () => setPayDialog({ open: false });
  const handleConfirmPay = () => {
    if (payDialog.payment) {
      setPayments(prev =>
        prev.map(p =>
          p.id === payDialog.payment!.id
            ? { ...p, status: 'paid', paidDate: new Date().toISOString().slice(0, 10) }
            : p
        )
      );
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Quản lý lương giáo viên</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Tháng"
            value={filterMonth}
            onChange={e => setFilterMonth(Number(e.target.value))}
          >
            {months.map(month => (
              <MenuItem key={month} value={month}>Tháng {month}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Năm"
            value={filterYear}
            onChange={e => setFilterYear(Number(e.target.value))}
          >
            {years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Giáo viên</TableCell>
              <TableCell>Tháng</TableCell>
              <TableCell>Năm</TableCell>
              <TableCell>Số buổi</TableCell>
              <TableCell>Tổng lương</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày thanh toán</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments
              .filter(p => p.month === filterMonth && p.year === filterYear)
              .map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.teacherName}</TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>{payment.year}</TableCell>
                  <TableCell>{payment.numberOfSessions}</TableCell>
                  <TableCell>{payment.amount.toLocaleString()} VNĐ</TableCell>
                  <TableCell>
                    <Chip label={payment.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'} color={payment.status === 'paid' ? 'success' : 'warning'} size="small" />
                  </TableCell>
                  <TableCell>{payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('vi-VN') : '-'}</TableCell>
                  <TableCell>
                    {payment.status === 'pending' && (
                      <Button variant="contained" size="small" onClick={() => handlePay(payment)}>
                        Thanh toán
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={payDialog.open} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn thanh toán lương cho giáo viên <b>{payDialog.payment?.teacherName}</b> tháng {payDialog.payment?.month}/{payDialog.payment?.year}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleConfirmPay} variant="contained" color="primary">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherPaymentManagement; 