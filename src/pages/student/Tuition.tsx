import React, { useState, useEffect } from 'react';
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
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import COLORS from '../../constants/colors';

interface TuitionPayment {
  id: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  description: string;
}

const Tuition: React.FC = () => {
  const [payments, setPayments] = useState<TuitionPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchTuitionData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Sử dụng dữ liệu mock thay vì gọi API thật
        await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập loading
          const mockPayments: TuitionPayment[] = [
          {
            id: 1,
            amount: 2500000,
            dueDate: '2024-01-15',
            status: 'paid',
            paidDate: '2024-01-10',
            description: 'Học phí tháng 1/2024'
          },
          {
            id: 2,
            amount: 2500000,
            dueDate: '2024-02-15',
            status: 'paid',
            paidDate: '2024-02-12',
            description: 'Học phí tháng 2/2024'
          },
          {
            id: 3,
            amount: 2500000,
            dueDate: '2024-03-15',
            status: 'paid',
            paidDate: '2024-03-14',
            description: 'Học phí tháng 3/2024'
          },
          {
            id: 4,
            amount: 2500000,
            dueDate: '2024-04-15',
            status: 'paid',
            paidDate: '2024-04-13',
            description: 'Học phí tháng 4/2024'
          },
          {
            id: 5,
            amount: 2500000,
            dueDate: '2024-05-15',
            status: 'paid',
            paidDate: '2024-05-14',
            description: 'Học phí tháng 5/2024'
          },
          {
            id: 6,
            amount: 2500000,
            dueDate: '2024-06-15',
            status: 'pending',
            description: 'Học phí tháng 6/2024'
          },
          {
            id: 7,
            amount: 2500000,
            dueDate: '2024-07-15',
            status: 'pending',
            description: 'Học phí tháng 7/2024'
          },
          {
            id: 8,
            amount: 500000,
            dueDate: '2024-06-01',
            status: 'overdue',
            description: 'Phí tài liệu học tập'
          }
        ];
        
        // Sắp xếp theo thứ tự ngày mới nhất trên cùng (dueDate)
        const sortedPayments = mockPayments.sort((a, b) => {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        });
        
        setPayments(sortedPayments);
      } catch (err) {
        console.error('Error fetching tuition data:', err);
        setError('Không thể tải thông tin học phí. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchTuitionData();
    }
  }, [user?.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'overdue':
        return 'Quá hạn';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Thông Tin Học Phí
      </Typography>

      {/* Thống kê tổng quan */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng đã thanh toán
              </Typography>
              <Typography variant="h6" color="success.main">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(
                  payments
                    .filter(p => p.status === 'paid')
                    .reduce((total, p) => total + p.amount, 0)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Chờ thanh toán
              </Typography>
              <Typography variant="h6" color="warning.main">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(
                  payments
                    .filter(p => p.status === 'pending')
                    .reduce((total, p) => total + p.amount, 0)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Quá hạn
              </Typography>
              <Typography variant="h6" color="error.main">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(
                  payments
                    .filter(p => p.status === 'overdue')
                    .reduce((total, p) => total + p.amount, 0)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng cộng
              </Typography>
              <Typography variant="h6">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(
                  payments.reduce((total, p) => total + p.amount, 0)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mô tả</TableCell>
              <TableCell align="right">Số tiền</TableCell>
              <TableCell align="center">Hạn thanh toán</TableCell>
              <TableCell align="center">Ngày thanh toán</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.description}</TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(payment.amount)}
                </TableCell>
                <TableCell align="center">
                  {new Date(payment.dueDate).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell align="center">
                  {payment.paidDate
                    ? new Date(payment.paidDate).toLocaleDateString('vi-VN')
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={getStatusText(payment.status)}
                    color={getStatusColor(payment.status) as any}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tuition; 