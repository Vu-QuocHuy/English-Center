import React, { useState, useEffect, useCallback } from 'react';
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
  Card,
  CardContent,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  MonetizationOn as MoneyIcon,
  School as SchoolIcon,
  TrendingUp as SavingsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { Student, MonthlyPayment } from '../../types/models';
import dayjs from 'dayjs';

const ParentPayments: React.FC = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<MonthlyPayment | null>(null);
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const fetchPaymentData = useCallback(async () => {
    setLoading(true);
    try {
      // Mock data cho thanh toán của con em
      const mockChildren: Student[] = [
        {
          id: 1,
          name: 'Nguyễn Văn An',
          email: 'an.nguyen@email.com',
          phone: '0901234567',
          parentId: Number(user?.id) || 1,
          discountPercent: 10,
          status: 'active',
          enrolledClasses: [
            {
              classId: 1,
              className: 'IELTS Intermediate A',
              teacherId: 1,
              teacherName: 'Cô Nguyễn Thị Mai',
              startDate: '2025-01-15',
              endDate: '2025-06-15',
              tuitionFeePerSession: 200000,
              actualFeePerSession: 180000,
              totalSessions: 48,
              attendedSessions: 35,
              absentSessions: 5,
              schedule: {
                days: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
                startTime: '19:00',
                endTime: '21:00',
                room: 'Phòng A101'
              },
              attendanceRecords: [],
              monthlyPayments: [
                {
                  id: 1,
                  month: 1,
                  year: 2025,
                  sessionsInMonth: 12,
                  originalAmount: 2400000,
                  discountAmount: 240000,
                  finalAmount: 2160000,
                  paidAmount: 2160000,
                  remainingAmount: 0,
                  status: 'paid',
                  paidDate: '2025-01-05',
                  note: 'Đóng đầy đủ đúng hạn'
                },
                {
                  id: 2,
                  month: 2,
                  year: 2025,
                  sessionsInMonth: 10,
                  originalAmount: 2000000,
                  discountAmount: 200000,
                  finalAmount: 1800000,
                  paidAmount: 1800000,
                  remainingAmount: 0,
                  status: 'paid',
                  paidDate: '2025-02-03'
                },
                {
                  id: 3,
                  month: 3,
                  year: 2025,
                  sessionsInMonth: 11,
                  originalAmount: 2200000,
                  discountAmount: 220000,
                  finalAmount: 1980000,
                  paidAmount: 1000000,
                  remainingAmount: 980000,
                  status: 'partial',
                  paidDate: '2025-03-02',
                  note: 'Đóng trước 1 triệu, còn thiếu 980k'
                },
                {
                  id: 4,
                  month: 4,
                  year: 2025,
                  sessionsInMonth: 12,
                  originalAmount: 2400000,
                  discountAmount: 240000,
                  finalAmount: 2160000,
                  paidAmount: 0,
                  remainingAmount: 2160000,
                  status: 'unpaid',
                  note: 'Chưa đóng học phí tháng 4'
                },
                {
                  id: 5,
                  month: 5,
                  year: 2025,
                  sessionsInMonth: 10,
                  originalAmount: 2000000,
                  discountAmount: 200000,
                  finalAmount: 1800000,
                  paidAmount: 0,
                  remainingAmount: 1800000,
                  status: 'unpaid'
                },
                {
                  id: 6,
                  month: 6,
                  year: 2025,
                  sessionsInMonth: 8,
                  originalAmount: 1600000,
                  discountAmount: 160000,
                  finalAmount: 1440000,
                  paidAmount: 0,
                  remainingAmount: 1440000,
                  status: 'unpaid'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Nguyễn Thị Bình',
          email: 'binh.nguyen@email.com',
          phone: '0901234568',
          parentId: Number(user?.id) || 1,
          discountPercent: 15,
          status: 'active',
          enrolledClasses: [
            {
              classId: 2,
              className: 'TOEIC Basic B',
              teacherId: 2,
              teacherName: 'Thầy Trần Văn Nam',
              startDate: '2025-03-01',
              endDate: '2025-08-01',
              tuitionFeePerSession: 150000,
              actualFeePerSession: 127500,
              totalSessions: 32,
              attendedSessions: 20,
              absentSessions: 3,
              schedule: {
                days: ['Thứ 3', 'Thứ 5'],
                startTime: '18:00',
                endTime: '20:00',
                room: 'Phòng B202'
              },
              attendanceRecords: [],
              monthlyPayments: [
                {
                  id: 7,
                  month: 3,
                  year: 2025,
                  sessionsInMonth: 8,
                  originalAmount: 1200000,
                  discountAmount: 180000,
                  finalAmount: 1020000,
                  paidAmount: 1020000,
                  remainingAmount: 0,
                  status: 'paid',
                  paidDate: '2025-03-01'
                },
                {
                  id: 8,
                  month: 4,
                  year: 2025,
                  sessionsInMonth: 9,
                  originalAmount: 1350000,
                  discountAmount: 202500,
                  finalAmount: 1147500,
                  paidAmount: 500000,
                  remainingAmount: 647500,
                  status: 'partial',
                  paidDate: '2025-04-01'
                },
                {
                  id: 9,
                  month: 5,
                  year: 2025,
                  sessionsInMonth: 8,
                  originalAmount: 1200000,
                  discountAmount: 180000,
                  finalAmount: 1020000,
                  paidAmount: 0,
                  remainingAmount: 1020000,
                  status: 'unpaid'
                }
              ]
            }
          ]
        }
      ];

      setChildren(mockChildren);
      if (mockChildren.length > 0) {
        setSelectedChildId(mockChildren[0].id.toString());
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchPaymentData();
  }, [user?.id, fetchPaymentData]);

  const selectedChild = children.find(child => child.id.toString() === selectedChildId);

  const getAllPayments = (): (MonthlyPayment & { childName: string; className: string })[] => {
    if (!selectedChild) return [];
    
    return selectedChild.enrolledClasses.flatMap(classInfo =>
      classInfo.monthlyPayments
        .filter(payment => payment.year === filterYear)
        .map(payment => ({
          ...payment,
          childName: selectedChild.name,
          className: classInfo.className
        }))
    ).sort((a, b) => a.month - b.month);
  };

  const getTotalStats = () => {
    const payments = getAllPayments();
    
    return {
      totalOriginal: payments.reduce((sum, p) => sum + p.originalAmount, 0),
      totalDiscount: payments.reduce((sum, p) => sum + p.discountAmount, 0),
      totalFinal: payments.reduce((sum, p) => sum + p.finalAmount, 0),
      totalPaid: payments.reduce((sum, p) => sum + p.paidAmount, 0),
      totalRemaining: payments.reduce((sum, p) => sum + p.remainingAmount, 0),
      paidCount: payments.filter(p => p.status === 'paid').length,
      partialCount: payments.filter(p => p.status === 'partial').length,
      unpaidCount: payments.filter(p => p.status === 'unpaid').length
    };
  };

  const handleViewPaymentDetail = (payment: MonthlyPayment) => {
    setSelectedPayment(payment);
    setPaymentDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'unpaid': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return '✅ Đã đóng đủ';
      case 'partial': return '🔄 Đóng một phần';
      case 'unpaid': return '❌ Chưa đóng';
      default: return 'Không xác định';
    }
  };

  const stats = getTotalStats();
  const allPayments = getAllPayments();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Đang tải thông tin thanh toán...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">💰 Quản lý thanh toán học phí</Typography>
        <Typography variant="body2" color="textSecondary">
          Theo dõi tình hình học phí của con em
        </Typography>
      </Box>

      {/* Bộ lọc */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="👶 Chọn con"
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
            >
              {children.map((child) => (
                <MenuItem key={child.id} value={child.id.toString()}>
                  {child.name} {child.discountPercent > 0 && `(Giảm ${child.discountPercent}%)`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="📅 Năm"
              value={filterYear}
              onChange={(e) => setFilterYear(Number(e.target.value))}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {selectedChild && (
        <>
          {/* Thống kê tổng quan */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <MoneyIcon color="primary" />
                    <Typography variant="subtitle2">Tổng học phí gốc</Typography>
                  </Box>
                  <Typography variant="h5" color="primary.main" sx={{ textDecoration: 'line-through' }}>
                    {stats.totalOriginal.toLocaleString()}₫
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SavingsIcon color="success" />
                    <Typography variant="subtitle2">Tiết kiệm được</Typography>
                  </Box>
                  <Typography variant="h5" color="success.main">
                    {stats.totalDiscount.toLocaleString()}₫
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Giảm {selectedChild.discountPercent}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CheckIcon color="info" />
                    <Typography variant="subtitle2">Phải đóng</Typography>
                  </Box>
                  <Typography variant="h5" color="info.main">
                    {stats.totalFinal.toLocaleString()}₫
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Đã đóng: {stats.totalPaid.toLocaleString()}₫
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <WarningIcon color="error" />
                    <Typography variant="subtitle2">Còn thiếu</Typography>
                  </Box>
                  <Typography variant="h5" color="error.main">
                    {stats.totalRemaining.toLocaleString()}₫
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {stats.unpaidCount + stats.partialCount} tháng chưa đóng đủ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Cảnh báo nếu còn nợ */}
          {stats.totalRemaining > 0 && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                ⚠️ <strong>Thông báo:</strong> Hiện tại con em bạn còn thiếu {stats.totalRemaining.toLocaleString()}₫ 
                học phí. Vui lòng liên hệ nhà trường để đóng học phí để đảm bảo việc học không bị gián đoạn.
              </Typography>
            </Alert>
          )}

          {/* Bảng chi tiết thanh toán */}
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">📋 Chi tiết thanh toán năm {filterYear}</Typography>
              <Typography variant="body2" color="textSecondary">
                Con: {selectedChild.name} • Tổng cộng: {allPayments.length} tháng
              </Typography>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>📅 Tháng</TableCell>
                    <TableCell>🏫 Lớp học</TableCell>
                    <TableCell align="right">📚 Số buổi</TableCell>
                    <TableCell align="right">💰 Tiền gốc</TableCell>
                    <TableCell align="right">🎁 Giảm</TableCell>
                    <TableCell align="right">💵 Phải đóng</TableCell>
                    <TableCell align="right">✅ Đã đóng</TableCell>
                    <TableCell align="right">⏳ Còn thiếu</TableCell>
                    <TableCell align="center">📊 Trạng thái</TableCell>
                    <TableCell align="center">🔍 Chi tiết</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPayments.map((payment) => (
                    <TableRow 
                      key={payment.id}
                      sx={{ 
                        bgcolor: payment.status === 'unpaid' ? 'error.50' : 
                               payment.status === 'partial' ? 'warning.50' : 'inherit'
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          Tháng {payment.month}/{payment.year}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {payment.className}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {payment.sessionsInMonth}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                          {payment.originalAmount.toLocaleString()}₫
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="success.main">
                          -{payment.discountAmount.toLocaleString()}₫
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight="bold">
                          {payment.finalAmount.toLocaleString()}₫
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          variant="body2" 
                          color={payment.paidAmount > 0 ? 'success.main' : 'textSecondary'}
                          fontWeight="bold"
                        >
                          {payment.paidAmount.toLocaleString()}₫
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          variant="body2" 
                          color={payment.remainingAmount > 0 ? 'error.main' : 'success.main'}
                          fontWeight="bold"
                        >
                          {payment.remainingAmount.toLocaleString()}₫
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getStatusText(payment.status)}
                          color={getStatusColor(payment.status)}
                          size="small"
                        />
                        {payment.paidDate && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                            {dayjs(payment.paidDate).format('DD/MM/YYYY')}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleViewPaymentDetail(payment)}
                        >
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}

      {/* Dialog chi tiết thanh toán */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          💰 Chi tiết thanh toán - Tháng {selectedPayment?.month}/{selectedPayment?.year}
        </DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Con: {selectedChild?.name}
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon><SchoolIcon /></ListItemIcon>
                  <ListItemText
                    primary="Số buổi học trong tháng"
                    secondary={`${selectedPayment.sessionsInMonth} buổi`}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><MoneyIcon /></ListItemIcon>
                  <ListItemText
                    primary="Học phí gốc"
                    secondary={`${selectedPayment.originalAmount.toLocaleString()}₫`}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><SavingsIcon /></ListItemIcon>
                  <ListItemText
                    primary={`Giảm giá (${selectedChild?.discountPercent}%)`}
                    secondary={`-${selectedPayment.discountAmount.toLocaleString()}₫`}
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem>
                  <ListItemIcon><PaymentIcon /></ListItemIcon>
                  <ListItemText
                    primary="Số tiền phải đóng"
                    secondary={
                      <Typography variant="body2" fontWeight="bold" color="primary.main">
                        {selectedPayment.finalAmount.toLocaleString()}₫
                      </Typography>
                    }
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><CheckIcon /></ListItemIcon>
                  <ListItemText
                    primary="Số tiền đã đóng"
                    secondary={
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {selectedPayment.paidAmount.toLocaleString()}₫
                      </Typography>
                    }
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon><WarningIcon /></ListItemIcon>
                  <ListItemText
                    primary="Số tiền còn thiếu"
                    secondary={
                      <Typography variant="body2" fontWeight="bold" color="error.main">
                        {selectedPayment.remainingAmount.toLocaleString()}₫
                      </Typography>
                    }
                  />
                </ListItem>
              </List>

              {selectedPayment.note && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Ghi chú:</strong> {selectedPayment.note}
                  </Typography>
                </Alert>
              )}

              {selectedPayment.paidDate && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  📅 Ngày đóng: {dayjs(selectedPayment.paidDate).format('DD/MM/YYYY')}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentPayments;