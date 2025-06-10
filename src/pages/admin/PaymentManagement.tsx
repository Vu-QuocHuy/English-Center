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
  MenuItem,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import COLORS from '../../constants/colors';

interface StudentPayment {
  id: number;
  studentId: number;
  studentName: string;
  className: string;
  month: number;
  year: number;
  expectedAmount: number;
  paidAmount: number;
  remainingAmount: number;
  lastPaymentDate: string | null;
  status: 'paid' | 'partial' | 'pending';
}

interface TeacherPayment {
  id: number;
  teacherId: number;
  teacherName: string;
  classId: number;
  month: number;
  year: number;
  numberOfSessions: number;
  amount: number;
  status: 'paid' | 'pending';
  paidDate?: string;
  classDetails: {
    classId: number;
    className: string;
    sessions: number;
  }[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const PaymentManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterMonth, setFilterMonth] = useState<number>(new Date().getMonth() + 1);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [payDialog, setPayDialog] = useState<{ open: boolean; payment?: TeacherPayment | StudentPayment }>({ open: false });

  // Mock data cho học phí học sinh
  const mockStudentPayments: StudentPayment[] = [
    {
      id: 1,
      studentId: 1,
      studentName: 'Nguyễn Văn A',
      className: 'IELTS 6.5',
      month: 6,
      year: 2025,
      expectedAmount: 2000000,
      paidAmount: 2000000,
      remainingAmount: 0,
      lastPaymentDate: '2025-06-01',
      status: 'paid',
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Trần Thị B',
      className: 'TOEIC 600+',
      month: 6,
      year: 2025,
      expectedAmount: 2000000,
      paidAmount: 0,
      remainingAmount: 2000000,
      lastPaymentDate: null,
      status: 'pending',
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Lê Văn C',
      className: 'Basic English',
      month: 6,
      year: 2025,
      expectedAmount: 1500000,
      paidAmount: 200000,
      remainingAmount: 1300000,
      lastPaymentDate: '2025-05-15',
      status: 'partial',
    },
  ];

  // Mock data cho lương giáo viên
  const mockTeacherPayments: TeacherPayment[] = [
    {
      id: 1,
      teacherId: 1,
      teacherName: 'Nguyễn Thị X',
      classId: 1,
      month: 6,
      year: 2025,
      numberOfSessions: 20,
      amount: 3000000,
      status: 'paid',
      paidDate: '2025-06-01',
      classDetails: [
        {
          classId: 1,
          className: 'IELTS 6.5',
          sessions: 20
        }
      ]
    },
    {
      id: 2,
      teacherId: 2,
      teacherName: 'Trần Thị Y',
      classId: 2,
      month: 6,
      year: 2025,
      numberOfSessions: 10,
      amount: 2800000,
      status: 'pending',
      classDetails: [
        {
          classId: 2,
          className: 'TOEIC 500+',
          sessions: 10
        }
      ]
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handlePay = (payment: TeacherPayment | StudentPayment) => {
    setPayDialog({ open: true, payment });
  };

  const handleCloseDialog = () => {
    setPayDialog({ open: false });
  };

  const handleConfirmPay = () => {
    console.log('Payment confirmed for:', payDialog.payment);
    handleCloseDialog();
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setFilterMonth(event.target.value as number);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setFilterYear(event.target.value as number);
  };

  const renderStudentPayments = () => {
    const totalExpected = mockStudentPayments.reduce((sum: number, p: StudentPayment) => sum + p.expectedAmount, 0);
    const totalPaid = mockStudentPayments.reduce((sum: number, p: StudentPayment) => sum + p.paidAmount, 0);
    const totalRemaining = mockStudentPayments.reduce((sum: number, p: StudentPayment) => sum + p.remainingAmount, 0);

    return (
      <>
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tổng học phí dự kiến
                </Typography>
                <Typography variant="h5" component="div">
                  {totalExpected.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Đã thu
                </Typography>
                <Typography variant="h5" component="div" color="success.main">
                  {totalPaid.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Còn lại
                </Typography>
                <Typography variant="h5" component="div" color="error.main">
                  {totalRemaining.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Student Payments Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Học sinh</TableCell>
                <TableCell>Lớp học</TableCell>
                <TableCell>Tháng/Năm</TableCell>
                <TableCell>Học phí dự kiến</TableCell>
                <TableCell>Đã thanh toán</TableCell>
                <TableCell>Còn lại</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày thanh toán gần nhất</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockStudentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.studentName}</TableCell>
                  <TableCell>{payment.className}</TableCell>
                  <TableCell>{payment.month}/{payment.year}</TableCell>
                  <TableCell>{payment.expectedAmount.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>{payment.paidAmount.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>{payment.remainingAmount.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        payment.status === 'paid' ? 'Đã thanh toán' :
                        payment.status === 'partial' ? 'Thanh toán một phần' :
                        'Chưa thanh toán'
                      }
                      color={
                        payment.status === 'paid' ? 'success' :
                        payment.status === 'partial' ? 'warning' :
                        'error'
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {payment.lastPaymentDate || 'Chưa có'}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xem chi tiết">
                      <IconButton size="small">
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    {payment.status !== 'paid' && (
                      <Tooltip title="Thu học phí">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handlePay(payment)}
                        >
                          <PaymentIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const renderTeacherPayments = () => {
    const totalAmount = mockTeacherPayments.reduce((sum: number, p: TeacherPayment) => sum + p.amount, 0);
    const totalPaid = mockTeacherPayments.reduce((sum: number, p: TeacherPayment) => sum + (p.status === 'paid' ? p.amount : 0), 0);
    const totalRemaining = mockTeacherPayments.reduce((sum: number, p: TeacherPayment) => sum + (p.status === 'pending' ? p.amount : 0), 0);

    return (
      <>
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tổng lương tháng
                </Typography>
                <Typography variant="h5" component="div">
                  {totalAmount.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Đã trả
                </Typography>
                <Typography variant="h5" component="div" color="success.main">
                  {totalPaid.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Chưa trả
                </Typography>
                <Typography variant="h5" component="div" color="warning.main">
                  {totalRemaining.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Teacher Payments Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Giáo viên</TableCell>
                <TableCell>Lớp học</TableCell>
                <TableCell>Tháng/Năm</TableCell>
                <TableCell>Số buổi dạy</TableCell>
                <TableCell>Lương</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày trả</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTeacherPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.teacherName}</TableCell>
                  <TableCell>{payment.classDetails[0].className}</TableCell>
                  <TableCell>{payment.month}/{payment.year}</TableCell>
                  <TableCell>{payment.numberOfSessions}</TableCell>
                  <TableCell>{payment.amount.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status === 'paid' ? 'Đã trả' : 'Chưa trả'}
                      color={payment.status === 'paid' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {payment.paidDate || 'Chưa có'}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xem chi tiết">
                      <IconButton size="small">
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    {payment.status !== 'paid' && (
                      <Tooltip title="Trả lương">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handlePay(payment)}
                        >
                          <PaymentIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Quản Lý Thanh Toán
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Xuất báo cáo
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            Tạo thanh toán mới
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Tháng</InputLabel>
              <Select
                value={filterMonth}
                label="Tháng"
                onChange={handleMonthChange}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Năm</InputLabel>
              <Select
                value={filterYear}
                label="Năm"
                onChange={handleYearChange}
              >
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              fullWidth
            >
              Lọc
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Học phí học sinh" />
          <Tab label="Lương giáo viên" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={selectedTab} index={0}>
        {renderStudentPayments()}
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        {renderTeacherPayments()}
      </TabPanel>

      {/* Payment Dialog */}
      <Dialog 
        open={payDialog.open} 
        onClose={handleCloseDialog}
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          Xác nhận thanh toán
        </DialogTitle>
        <DialogContent>
          {payDialog.payment && (
            <Box>
              <Typography variant="body1" gutterBottom>
                {'studentName' in payDialog.payment 
                  ? `Học sinh: ${payDialog.payment.studentName}`
                  : `Giáo viên: ${payDialog.payment.teacherName}`
                }
              </Typography>
              <Typography variant="body1" gutterBottom>
                Số tiền: {('amount' in payDialog.payment ? payDialog.payment.amount : 
                  ('remainingAmount' in payDialog.payment ? payDialog.payment.remainingAmount : 0)
                ).toLocaleString('vi-VN')}₫
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleConfirmPay} variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentManagement;