import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Alert,
  Divider,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import dayjs from 'dayjs';

// Interfaces
interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  enrollDate: string;
  level: string;
  attendanceRate: number;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'late' | 'absent';
  date: string;
  note?: string;
}

interface ClassSession {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  isCompleted: boolean;
  attendanceRecords: AttendanceRecord[];
}

interface TeacherClass {
  id: string;
  name: string;
  grade: string;
  description: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  classroom: string;
  totalSessions: number;
  completedSessions: number;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  students: Student[];
  sessions: ClassSession[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const MyClasses: React.FC = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<TeacherClass | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<ClassSession | null>(null);
  const [attendanceData, setAttendanceData] = useState<{ [studentId: string]: 'present' | 'late' | 'absent' }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeacherClasses();
  }, []);

  const fetchTeacherClasses = async () => {
    setLoading(true);
    try {
      // Mock data với thời gian thực để nút điểm danh hiển thị
      const currentTime = dayjs();
      const currentDate = currentTime.format('YYYY-MM-DD');
      const currentDay = currentTime.format('dddd');
      
      const mockClasses: TeacherClass[] = [
        {
          id: '1',
          name: 'IELTS Intermediate - Class A',
          grade: 'Intermediate',
          description: 'Khóa học IELTS trình độ trung cấp với focus vào 4 kỹ năng cơ bản',
          schedule: {
            days: [currentDay], // Ngày hiện tại
            startTime: currentTime.subtract(1, 'hour').format('HH:mm'), // Bắt đầu 1 tiếng trước
            endTime: currentTime.add(2, 'hour').format('HH:mm'), // Kết thúc 2 tiếng sau
          },
          classroom: 'Room A101',
          totalSessions: 48,
          completedSessions: 12,
          startDate: '2024-01-15',
          endDate: '2024-06-15',
          maxStudents: 20,
          currentStudents: 15,
          students: [
            {
              id: '1',
              name: 'Nguyễn Văn An',
              email: 'an.nguyen@email.com',
              phone: '0901234567',
              enrollDate: '2024-01-15',
              level: 'Intermediate',
              attendanceRate: 95,
            },
            {
              id: '2',
              name: 'Trần Thị Bình',
              email: 'binh.tran@email.com',
              phone: '0902345678',
              enrollDate: '2024-01-15',
              level: 'Intermediate',
              attendanceRate: 88,
            },
            {
              id: '3',
              name: 'Lê Hoàng Cường',
              email: 'cuong.le@email.com',
              phone: '0903456789',
              enrollDate: '2024-01-20',
              level: 'Intermediate',
              attendanceRate: 92,
            },
            {
              id: '4',
              name: 'Phạm Thị Mai',
              email: 'mai.pham@email.com',
              phone: '0904567890',
              enrollDate: '2024-01-25',
              level: 'Intermediate',
              attendanceRate: 90,
            },
            {
              id: '5',
              name: 'Võ Minh Tuấn',
              email: 'tuan.vo@email.com',
              phone: '0905678901',
              enrollDate: '2024-02-01',
              level: 'Intermediate',
              attendanceRate: 87,
            },
          ],
          sessions: [
            {
              id: '1',
              date: '2024-01-15',
              startTime: '09:00',
              endTime: '11:00',
              topic: 'Introduction to IELTS',
              isCompleted: true,
              attendanceRecords: [
                { studentId: '1', status: 'present', date: '2024-01-15' },
                { studentId: '2', status: 'present', date: '2024-01-15' },
                { studentId: '3', status: 'late', date: '2024-01-15' },
                { studentId: '4', status: 'present', date: '2024-01-15' },
                { studentId: '5', status: 'absent', date: '2024-01-15' },
              ],
            },
            {
              id: '2',
              date: currentDate, // Hôm nay
              startTime: currentTime.subtract(1, 'hour').format('HH:mm'),
              endTime: currentTime.add(2, 'hour').format('HH:mm'),
              topic: 'Reading Skills Practice',
              isCompleted: false, // Chưa điểm danh
              attendanceRecords: [], // Chưa có ai điểm danh
            },
          ],
        },
        {
          id: '2',
          name: 'TOEIC Preparation',
          grade: 'Intermediate',
          description: 'Khóa học luyện thi TOEIC cho người đi làm',
          schedule: {
            days: [currentDay], // Ngày hiện tại
            startTime: currentTime.subtract(30, 'minute').format('HH:mm'), // Bắt đầu 30 phút trước
            endTime: currentTime.add(1, 'hour').format('HH:mm'), // Kết thúc 1 tiếng sau  
          },
          classroom: 'Room C305',
          totalSessions: 24,
          completedSessions: 6,
          startDate: '2024-03-01',
          endDate: '2024-08-01',
          maxStudents: 18,
          currentStudents: 10,
          students: [
            {
              id: '9',
              name: 'Lê Văn Hoàng',
              email: 'hoang.le@email.com',
              phone: '0907890123',
              enrollDate: '2024-03-01',
              level: 'Intermediate',
              attendanceRate: 98,
            },
            {
              id: '10',
              name: 'Trần Thị Kim',
              email: 'kim.tran@email.com',
              phone: '0908901234',
              enrollDate: '2024-03-01',
              level: 'Intermediate',
              attendanceRate: 92,
            },
          ],
          sessions: [
            {
              id: '4',
              date: currentDate, // Hôm nay
              startTime: currentTime.subtract(30, 'minute').format('HH:mm'),
              endTime: currentTime.add(1, 'hour').format('HH:mm'),
              topic: 'TOEIC Listening Practice',
              isCompleted: false, // Chưa điểm danh
              attendanceRecords: [],
            },
          ],
        },
      ];

      setClasses(mockClasses);
      if (mockClasses.length > 0) {
        setSelectedClass(mockClasses[0]);
      }
    } catch (err) {
      setError('Không thể tải danh sách lớp học');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const isCurrentlyInClass = (classItem: TeacherClass): boolean => {
    const now = dayjs();
    const currentDay = now.format('dddd');
    const currentTime = now.format('HH:mm');
    
    return classItem.schedule.days.includes(currentDay) &&
           currentTime >= classItem.schedule.startTime &&
           currentTime <= classItem.schedule.endTime;
  };

  const getTodaySession = (classItem: TeacherClass): ClassSession | null => {
    const today = dayjs().format('YYYY-MM-DD');
    return classItem.sessions.find(session => session.date === today) || null;
  };

  const handleStartAttendance = (classItem: TeacherClass) => {
    const todaySession = getTodaySession(classItem);
    if (!todaySession) {
      setError('Không có buổi học nào hôm nay');
      return;
    }

    setCurrentSession(todaySession);
    setSelectedClass(classItem);
    
    // Initialize attendance data
    const initialAttendance: { [studentId: string]: 'present' | 'late' | 'absent' } = {};
    classItem.students.forEach(student => {
      const existingRecord = todaySession.attendanceRecords.find(
        record => record.studentId === student.id
      );
      initialAttendance[student.id] = existingRecord?.status || 'absent';
    });
    
    setAttendanceData(initialAttendance);
    setAttendanceDialogOpen(true);
  };

  const handleSaveAttendance = async () => {
    if (!currentSession || !selectedClass) return;

    setLoading(true);
    try {
      // Create attendance records
      const attendanceRecords: AttendanceRecord[] = Object.entries(attendanceData).map(
        ([studentId, status]) => ({
          studentId,
          status,
          date: currentSession.date,
        })
      );

      // In real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state
      const updatedClasses = classes.map(classItem => {
        if (classItem.id === selectedClass.id) {
          const updatedSessions = classItem.sessions.map(session => {
            if (session.id === currentSession.id) {
              return {
                ...session,
                attendanceRecords,
                isCompleted: true,
              };
            }
            return session;
          });
          return { ...classItem, sessions: updatedSessions };
        }
        return classItem;
      });

      setClasses(updatedClasses);
      setSuccess('Điểm danh đã được lưu thành công!');
      setAttendanceDialogOpen(false);
    } catch (err) {
      setError('Có lỗi xảy ra khi lưu điểm danh');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId: string, status: 'present' | 'late' | 'absent') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const getAttendanceStatusColor = (status: 'present' | 'late' | 'absent') => {
    switch (status) {
      case 'present':
        return 'success';
      case 'late':
        return 'warning';
      case 'absent':
        return 'error';
      default:
        return 'default';
    }
  };

  const getAttendanceStatusText = (status: 'present' | 'late' | 'absent') => {
    switch (status) {
      case 'present':
        return 'Có mặt';
      case 'late':
        return 'Muộn';
      case 'absent':
        return 'Vắng';
      default:
        return 'Chưa điểm danh';
    }
  };

  if (loading && classes.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Đang tải danh sách lớp học...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Lớp học của tôi</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchTeacherClasses}
          disabled={loading}
        >
          Làm mới
        </Button>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Class Selection */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Danh sách lớp học</Typography>
            <List>
              {classes.map((classItem) => (
                <ListItem
                  key={classItem.id}
                  button
                  selected={selectedClass?.id === classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    border: selectedClass?.id === classItem.id ? '2px solid' : '1px solid',
                    borderColor: selectedClass?.id === classItem.id ? 'primary.main' : 'divider',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={classItem.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          {classItem.grade} • {classItem.currentStudents}/{classItem.maxStudents} học sinh
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {classItem.classroom}
                        </Typography>
                        {isCurrentlyInClass(classItem) && (
                          <Chip
                            size="small"
                            label="Đang diễn ra"
                            color="success"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Class Details */}
        <Grid item xs={12} md={8}>
          {selectedClass ? (
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Typography variant="h5">{selectedClass.name}</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                  {/* Nút điểm danh chính */}
                  {isCurrentlyInClass(selectedClass) && getTodaySession(selectedClass) && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<TodayIcon />}
                      onClick={() => handleStartAttendance(selectedClass)}
                      disabled={getTodaySession(selectedClass)?.isCompleted}
                      sx={{ mb: 1 }}
                    >
                      {getTodaySession(selectedClass)?.isCompleted ? 'Đã điểm danh' : 'Điểm danh'}
                    </Button>
                  )}
                  
                  {/* Nút điểm danh demo - luôn hiển thị */}
                  {(!isCurrentlyInClass(selectedClass) || !getTodaySession(selectedClass)) && (
                    <Button
                      variant="outlined"
                      color="secondary" 
                      size="large"
                      startIcon={<TodayIcon />}
                      onClick={() => handleStartAttendance(selectedClass)}
                      sx={{ mb: 1 }}
                    >
                      Điểm danh (Demo)
                    </Button>
                  )}
                </Box>
              </Box>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Thông tin lớp" />
                  <Tab label="Danh sách học sinh" />
                  <Tab label="Lịch sử điểm danh" />
                </Tabs>
              </Box>

              {/* Class Information Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Thông tin cơ bản
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography><strong>Tên lớp:</strong> {selectedClass.name}</Typography>
                          <Typography><strong>Trình độ:</strong> {selectedClass.grade}</Typography>
                          <Typography><strong>Phòng học:</strong> {selectedClass.classroom}</Typography>
                          <Typography><strong>Sĩ số:</strong> {selectedClass.currentStudents}/{selectedClass.maxStudents}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Lịch học
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography><strong>Ngày học:</strong> {selectedClass.schedule.days.join(', ')}</Typography>
                          <Typography><strong>Giờ học:</strong> {selectedClass.schedule.startTime} - {selectedClass.schedule.endTime}</Typography>
                          <Typography><strong>Thời gian:</strong> {dayjs(selectedClass.startDate).format('DD/MM/YYYY')} - {dayjs(selectedClass.endDate).format('DD/MM/YYYY')}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Tiến độ học tập
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Typography>
                            <strong>Đã hoàn thành:</strong> {selectedClass.completedSessions}/{selectedClass.totalSessions} buổi học
                          </Typography>
                          <Chip
                            label={`${Math.round((selectedClass.completedSessions / selectedClass.totalSessions) * 100)}%`}
                            color="primary"
                          />
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {selectedClass.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Students List Tab */}
              <TabPanel value={tabValue} index={1}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Học sinh</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Ngày tham gia</TableCell>
                        <TableCell>Tỷ lệ tham dự</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedClass.students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ bgcolor: 'primary.main' }}>
                                {student.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {student.name}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {student.level}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone || 'N/A'}</TableCell>
                          <TableCell>{dayjs(student.enrollDate).format('DD/MM/YYYY')}</TableCell>
                          <TableCell>
                            <Chip
                              label={`${student.attendanceRate}%`}
                              color={student.attendanceRate >= 90 ? 'success' : student.attendanceRate >= 75 ? 'warning' : 'error'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>

              {/* Attendance History Tab */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Lịch sử điểm danh
                </Typography>
                {selectedClass.sessions.map((session) => (
                  <Accordion key={session.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Typography variant="body1" fontWeight="bold">
                          {dayjs(session.date).format('DD/MM/YYYY')} - {session.topic}
                        </Typography>
                        <Chip
                          label={session.isCompleted ? 'Đã điểm danh' : 'Chưa điểm danh'}
                          color={session.isCompleted ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {session.attendanceRecords.length > 0 ? (
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>Học sinh</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Ghi chú</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {session.attendanceRecords.map((record) => {
                                const student = selectedClass.students.find(s => s.id === record.studentId);
                                return (
                                  <TableRow key={record.studentId}>
                                    <TableCell>{student?.name}</TableCell>
                                    <TableCell>
                                      <Chip
                                        label={getAttendanceStatusText(record.status)}
                                        color={getAttendanceStatusColor(record.status)}
                                        size="small"
                                      />
                                    </TableCell>
                                    <TableCell>{record.note || '-'}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Typography color="textSecondary">
                          Chưa có dữ liệu điểm danh cho buổi học này
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </TabPanel>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                Chọn một lớp học để xem thông tin chi tiết
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Attendance Dialog */}
      <Dialog
        open={attendanceDialogOpen}
        onClose={() => setAttendanceDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssignmentIcon />
            Điểm danh - {currentSession?.topic}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Ngày: {dayjs(currentSession?.date).format('DD/MM/YYYY')} | 
            Thời gian: {currentSession?.startTime} - {currentSession?.endTime}
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Học sinh</TableCell>
                  <TableCell>Có mặt</TableCell>
                  <TableCell>Muộn</TableCell>
                  <TableCell>Vắng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedClass?.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {student.name.charAt(0)}
                        </Avatar>
                        <Typography>{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={attendanceData[student.id] === 'present'}
                            onChange={() => handleAttendanceChange(student.id, 'present')}
                            color="success"
                          />
                        }
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={attendanceData[student.id] === 'late'}
                            onChange={() => handleAttendanceChange(student.id, 'late')}
                            color="warning"
                          />
                        }
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={attendanceData[student.id] === 'absent'}
                            onChange={() => handleAttendanceChange(student.id, 'absent')}
                            color="error"
                          />
                        }
                        label=""
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAttendanceDialogOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSaveAttendance}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : 'Lưu điểm danh'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyClasses;
