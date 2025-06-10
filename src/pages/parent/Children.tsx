import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  EventAvailable as PresentIcon,
  EventBusy as AbsentIcon,
  Payment as PaymentIcon,
  Visibility as ViewIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { Student, StudentClassInfo } from '../../types/models';
import dayjs from 'dayjs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box>{children}</Box>}
  </div>
);

const Children: React.FC = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChild, setSelectedChild] = useState<Student | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<StudentClassInfo | null>(null);

  useEffect(() => {
    fetchChildren();
  }, [user?.id]);

  const fetchChildren = async () => {
    setLoading(true);
    try {
      // Mock data cho con em của phụ huynh
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
              attendanceRecords: [
                {
                  id: 1,
                  date: '2025-06-02',
                  status: 'present',
                  sessionTopic: 'Reading Skills - Part 1'
                },
                {
                  id: 2,
                  date: '2025-06-04',
                  status: 'present',
                  sessionTopic: 'Listening Practice'
                },
                {
                  id: 3,
                  date: '2025-06-06',
                  status: 'absent',
                  note: 'Ốm',
                  sessionTopic: 'Speaking Practice'
                }
              ],
              monthlyPayments: [
                {
                  id: 1,
                  month: 5,
                  year: 2025,
                  sessionsInMonth: 12,
                  originalAmount: 2400000,
                  discountAmount: 240000,
                  finalAmount: 2160000,
                  paidAmount: 2160000,
                  remainingAmount: 0,
                  status: 'paid',
                  paidDate: '2025-05-01'
                },
                {
                  id: 2,
                  month: 6,
                  year: 2025,
                  sessionsInMonth: 10,
                  originalAmount: 2000000,
                  discountAmount: 200000,
                  finalAmount: 1800000,
                  paidAmount: 900000,
                  remainingAmount: 900000,
                  status: 'partial',
                  paidDate: '2025-06-01'
                }
              ]
            }
          ]
        }
      ];

      setChildren(mockChildren);
      if (mockChildren.length > 0) {
        setSelectedChild(mockChildren[0]);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getTotalUnpaidAmount = (child: Student): number => {
    return child.enrolledClasses.reduce((total, classInfo) => {
      return total + classInfo.monthlyPayments.reduce((classTotal, payment) => {
        return classTotal + payment.remainingAmount;
      }, 0);
    }, 0);
  };

  const getTotalDiscountAmount = (child: Student): number => {
    return child.enrolledClasses.reduce((total, classInfo) => {
      return total + classInfo.monthlyPayments.reduce((classTotal, payment) => {
        return classTotal + payment.discountAmount;
      }, 0);
    }, 0);
  };

  const getAttendanceRate = (classInfo: StudentClassInfo): number => {
    const totalRecorded = classInfo.attendedSessions + classInfo.absentSessions;
    return totalRecorded > 0 ? Math.round((classInfo.attendedSessions / totalRecorded) * 100) : 0;
  };

  const handleViewAttendance = (classInfo: StudentClassInfo) => {
    setSelectedClass(classInfo);
    setAttendanceDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'late':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'Có mặt';
      case 'absent':
        return 'Vắng mặt';
      case 'late':
        return 'Đi muộn';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Đang tải thông tin con em...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">👨‍👩‍👧‍👦 Quản lý con em</Typography>
        <Typography variant="body2" color="textSecondary">
          Tổng số con: {children.length}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Danh sách con */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>📋 Danh sách con em</Typography>
            {children.map((child) => (
              <Card
                key={child.id}
                sx={{
                  mb: 2,
                  cursor: 'pointer',
                  border: selectedChild?.id === child.id ? '2px solid' : '1px solid',
                  borderColor: selectedChild?.id === child.id ? 'primary.main' : 'divider'
                }}
                onClick={() => setSelectedChild(child)}
              >
                <CardContent sx={{ pb: '16px !important' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight="bold">
                        {child.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {child.enrolledClasses.length} lớp học
                      </Typography>
                      {child.discountPercent > 0 && (
                        <Chip
                          label={`Giảm ${child.discountPercent}%`}
                          size="small"
                          color="success"
                          sx={{ mt: 0.5 }}
                        />
                      )}
                      <Typography variant="caption" color="error.main" sx={{ display: 'block', mt: 0.5 }}>
                        Còn thiếu: {getTotalUnpaidAmount(child).toLocaleString()}₫
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Chi tiết con được chọn */}
        <Grid item xs={12} md={8}>
          {selectedChild ? (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">{selectedChild.name}</Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" color="success.main">
                    💰 Tổng tiết kiệm: {getTotalDiscountAmount(selectedChild).toLocaleString()}₫
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    💳 Tổng còn thiếu: {getTotalUnpaidAmount(selectedChild).toLocaleString()}₫
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="🏫 Các lớp học" />
                  <Tab label="💰 Tình hình học phí" />
                  <Tab label="📊 Tổng quan" />
                </Tabs>
              </Box>

              {/* Tab 1: Các lớp học */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                  {selectedChild.enrolledClasses.map((classInfo) => (
                    <Grid item xs={12} key={classInfo.classId}>
                      <Card sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" color="primary.main">
                                {classInfo.className}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                👨‍🏫 {classInfo.teacherName}
                              </Typography>
                            </Box>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<ViewIcon />}
                              onClick={() => handleViewAttendance(classInfo)}
                            >
                              Xem chi tiết
                            </Button>
                          </Box>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>📅 Lịch học:</Typography>
                                <Typography variant="body2">
                                  {classInfo.schedule.days.join(', ')} • {classInfo.schedule.startTime} - {classInfo.schedule.endTime}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  📍 {classInfo.schedule.room}
                                </Typography>
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>📊 Điểm danh:</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <Typography variant="body2">Tỷ lệ tham dự:</Typography>
                                  <Chip
                                    label={`${getAttendanceRate(classInfo)}%`}
                                    color={getAttendanceRate(classInfo) >= 80 ? 'success' : 'warning'}
                                    size="small"
                                  />
                                </Box>
                                <LinearProgress
                                  variant="determinate"
                                  value={getAttendanceRate(classInfo)}
                                  color={getAttendanceRate(classInfo) >= 80 ? 'success' : 'warning'}
                                />
                                <Typography variant="caption" color="textSecondary">
                                  ✅ {classInfo.attendedSessions} buổi có mặt • ❌ {classInfo.absentSessions} buổi vắng
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="subtitle2" gutterBottom>💰 Học phí:</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2">
                                  Học phí gốc: <span style={{ textDecoration: 'line-through' }}>{classInfo.tuitionFeePerSession.toLocaleString()}₫/buổi</span>
                                </Typography>
                                <Typography variant="body2" color="success.main" fontWeight="bold">
                                  Học phí thực: {classInfo.actualFeePerSession.toLocaleString()}₫/buổi
                                </Typography>
                              </Box>
                              <Chip
                                label={`Tiết kiệm ${selectedChild.discountPercent}%`}
                                color="success"
                                size="small"
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>

              {/* Tab 2: Tình hình học phí */}
              <TabPanel value={tabValue} index={1}>
                {selectedChild.enrolledClasses.map((classInfo) => (
                  <Card key={classInfo.classId} sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom color="primary.main">
                        {classInfo.className}
                      </Typography>
                      
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>📅 Tháng/Năm</TableCell>
                              <TableCell align="right">📚 Số buổi</TableCell>
                              <TableCell align="right">💰 Tiền gốc</TableCell>
                              <TableCell align="right">🎁 Giảm giá</TableCell>
                              <TableCell align="right">💵 Phải đóng</TableCell>
                              <TableCell align="right">✅ Đã đóng</TableCell>
                              <TableCell align="right">⏳ Còn thiếu</TableCell>
                              <TableCell align="center">📊 Trạng thái</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {classInfo.monthlyPayments.map((payment) => (
                              <TableRow key={payment.id}>
                                <TableCell>
                                  <Typography variant="body2" fontWeight="bold">
                                    {payment.month}/{payment.year}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">{payment.sessionsInMonth}</TableCell>
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
                                  <Typography variant="body2" color="success.main">
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
                                    label={
                                      payment.status === 'paid' ? '✅ Đã đóng' :
                                      payment.status === 'partial' ? '🔄 Đóng 1 phần' : '❌ Chưa đóng'
                                    }
                                    color={
                                      payment.status === 'paid' ? 'success' :
                                      payment.status === 'partial' ? 'warning' : 'error'
                                    }
                                    size="small"
                                  />
                                  {payment.paidDate && (
                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                                      {dayjs(payment.paidDate).format('DD/MM/YYYY')}
                                    </Typography>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                ))}
              </TabPanel>

              {/* Tab 3: Tổng quan */}
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary.main">
                          📊 Thống kê học tập
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon><SchoolIcon color="primary" /></ListItemIcon>
                            <ListItemText
                              primary={`${selectedChild.enrolledClasses.length} lớp học`}
                              secondary="Đang theo học"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><PresentIcon color="success" /></ListItemIcon>
                            <ListItemText
                              primary={`${selectedChild.enrolledClasses.reduce((sum, c) => sum + c.attendedSessions, 0)} buổi`}
                              secondary="Đã tham dự"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><AbsentIcon color="error" /></ListItemIcon>
                            <ListItemText
                              primary={`${selectedChild.enrolledClasses.reduce((sum, c) => sum + c.absentSessions, 0)} buổi`}
                              secondary="Đã vắng mặt"
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="success.main">
                          💰 Thống kê tài chính
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon><TrendingUpIcon color="success" /></ListItemIcon>
                            <ListItemText
                              primary={`${getTotalDiscountAmount(selectedChild).toLocaleString()}₫`}
                              secondary={`Đã tiết kiệm (${selectedChild.discountPercent}% giảm giá)`}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><PaymentIcon color="warning" /></ListItemIcon>
                            <ListItemText
                              primary={`${getTotalUnpaidAmount(selectedChild).toLocaleString()}₫`}
                              secondary="Tổng số tiền còn thiếu"
                            />
                          </ListItem>
                        </List>
                        
                        {getTotalUnpaidAmount(selectedChild) > 0 && (
                          <Alert severity="warning" sx={{ mt: 2 }}>
                            <Typography variant="body2">
                              ⚠️ Vui lòng liên hệ nhà trường để đóng học phí còn thiếu.
                            </Typography>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                Chọn một con để xem thông tin chi tiết
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Dialog xem chi tiết điểm danh */}
      <Dialog open={attendanceDialogOpen} onClose={() => setAttendanceDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          📊 Chi tiết điểm danh - {selectedClass?.className}
        </DialogTitle>
        <DialogContent>
          {selectedClass && (
            <>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                👨‍🏫 Giáo viên: {selectedClass.teacherName} | 📍 {selectedClass.schedule.room}
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>📅 Ngày học</TableCell>
                      <TableCell>📚 Chủ đề</TableCell>
                      <TableCell align="center">📊 Trạng thái</TableCell>
                      <TableCell>📝 Ghi chú</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedClass.attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {dayjs(record.date).format('DD/MM/YYYY')}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {dayjs(record.date).format('dddd')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {record.sessionTopic || 'Chưa cập nhật'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={getStatusText(record.status)}
                            color={getStatusColor(record.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {record.note || '-'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAttendanceDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Children;