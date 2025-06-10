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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import COLORS from '../../constants/colors';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  grade: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface ClassForm {
  name: string;
  grade: string;
  order: number;
  year: number;
  maxStudents: number;
  tuitionFee: number;
  teacherId: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  startTime: string;
  endTime: string;
  totalSessions: number;
  description: string;
  classroom: string;
  weekdays: string[];
}

interface ClassData {
  id: number;
  name: string;
  grade: number;
  order: number;
  year: number;
  maxStudents: number;
  tuitionFee: number;
  teacherId: string;
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  totalSessions: number;
  description: string;  classroom: string;
  weekdays: string[];
  students: Student[];
  status: 'active' | 'closed' | 'pending';
}

const ClassManagement: React.FC = () => {
  // Mock data cho học sinh
  const mockStudents: Student[] = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@email.com', phone: '0901234567', grade: 10, joinDate: '2025-01-15', status: 'active' },
    { id: 2, name: 'Trần Thị B', email: 'b.tran@email.com', phone: '0902345678', grade: 10, joinDate: '2025-01-16', status: 'active' },
    { id: 3, name: 'Lê Văn C', email: 'c.le@email.com', phone: '0903456789', grade: 10, joinDate: '2025-01-17', status: 'active' },
    { id: 4, name: 'Phạm Thị D', email: 'd.pham@email.com', phone: '0904567890', grade: 10, joinDate: '2025-01-18', status: 'active' },
    { id: 5, name: 'Hoàng Văn E', email: 'e.hoang@email.com', phone: '0905678901', grade: 10, joinDate: '2025-01-19', status: 'active' },
    { id: 6, name: 'Vũ Thị F', email: 'f.vu@email.com', phone: '0906789012', grade: 11, joinDate: '2025-02-01', status: 'active' },
    { id: 7, name: 'Đỗ Văn G', email: 'g.do@email.com', phone: '0907890123', grade: 11, joinDate: '2025-02-02', status: 'active' },
    { id: 8, name: 'Bùi Thị H', email: 'h.bui@email.com', phone: '0908901234', grade: 11, joinDate: '2025-02-03', status: 'active' },
    { id: 9, name: 'Lý Văn I', email: 'i.ly@email.com', phone: '0909012345', grade: 9, joinDate: '2025-03-01', status: 'active' },
    { id: 10, name: 'Dương Thị K', email: 'k.duong@email.com', phone: '0910123456', grade: 9, joinDate: '2025-03-02', status: 'active' },
  ];

  const [classes, setClasses] = useState<ClassData[]>([
    {
      id: 1,
      name: 'IELTS Intensive',
      grade: 10,
      order: 1,
      year: 2025,
      maxStudents: 20,
      tuitionFee: 300000,
      teacherId: '1',
      startDate: '2025-01-15',
      endDate: '2025-06-15',
      startTime: '16:00',
      endTime: '18:00',
      totalSessions: 40,
      description: 'Khóa học IELTS chuyên sâu, hướng tới đích 6.5-7.0',      classroom: 'A101',
      weekdays: ['2', '4', '6'],
      students: mockStudents.slice(0, 5), // First 5 students
      status: 'active',
    },
    {
      id: 2,
      name: 'TOEIC Basic',
      grade: 11,
      order: 1,
      year: 2025,
      maxStudents: 25,
      tuitionFee: 250000,
      teacherId: '2',
      startDate: '2025-02-01',
      endDate: '2025-07-01',
      startTime: '18:30',
      endTime: '20:30',
      totalSessions: 30,
      description: 'Khóa học TOEIC cơ bản, hướng tới đích 500+',
      classroom: 'B102',
      weekdays: ['3', '5'],
      students: mockStudents.slice(5, 8), // Students 6-8
      status: 'active',
    },
    {
      id: 3,
      name: 'English Communication',
      grade: 9,
      order: 2,
      year: 2025,
      maxStudents: 15,
      tuitionFee: 200000,
      teacherId: '3',
      startDate: '2025-03-01',
      endDate: '2025-08-01',
      startTime: '14:00',
      endTime: '15:30',
      totalSessions: 25,
      description: 'Khóa học giao tiếp tiếng Anh thực tế',
      classroom: 'C103',
      weekdays: ['2', '4', '6'],
      students: mockStudents.slice(8, 10), // Students 9-10
      status: 'active',
    },
  ]);  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [filterGrade, setFilterGrade] = useState<number>(0);
  const [viewStudentsOpen, setViewStudentsOpen] = useState(false);
  const [selectedClassForView, setSelectedClassForView] = useState<ClassData | null>(null);
  
  // Confirmation dialog states
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
  const [classToClose, setClassToClose] = useState<number | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [classForm, setClassForm] = useState<ClassForm>({
    name: '',
    grade: '',
    order: 1,
    year: new Date().getFullYear(),
    maxStudents: 30,
    tuitionFee: 0,
    teacherId: '',
    startDate: null,
    endDate: null,
    startTime: '08:00',
    endTime: '10:00',
    totalSessions: 0,
    description: '',
    classroom: '',
    weekdays: [],
  });

  const weekdayOptions = [
    { value: '2', label: 'Thứ 2' },
    { value: '3', label: 'Thứ 3' },
    { value: '4', label: 'Thứ 4' },
    { value: '5', label: 'Thứ 5' },
    { value: '6', label: 'Thứ 6' },
    { value: '7', label: 'Thứ 7' },
    { value: '8', label: 'Chủ nhật' },
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleOpen = (classItem?: ClassData) => {
    if (classItem) {
      handleEditClass(classItem);
    } else {
      handleEditClass(null);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedClass(null);
  };

  const handleViewStudents = (classItem: ClassData) => {
    setSelectedClassForView(classItem);
    setViewStudentsOpen(true);
  };

  const handleCloseStudentsView = () => {
    setViewStudentsOpen(false);
    setSelectedClassForView(null);
  };

  const handleEditClass = (classItem: ClassData | null) => {
    if (classItem) {
      setSelectedClass(classItem);
      setClassForm({
        name: classItem.name || '',
        grade: String(classItem.grade) || '',
        order: classItem.order || 1,
        year: classItem.year || new Date().getFullYear(),
        maxStudents: classItem.maxStudents || 30,
        tuitionFee: classItem.tuitionFee || 0,
        teacherId: String(classItem.teacherId) || '',
        startDate: classItem.startDate ? dayjs(classItem.startDate) : null,
        endDate: classItem.endDate ? dayjs(classItem.endDate) : null,
        startTime: classItem.startTime || '08:00',
        endTime: classItem.endTime || '10:00',
        totalSessions: classItem.totalSessions || 0,
        description: classItem.description || '',
        classroom: classItem.classroom || '',
        weekdays: classItem.weekdays || [],
      });
    } else {
      setSelectedClass(null);
      setClassForm({
        name: '',
        grade: '',
        order: 1,
        year: new Date().getFullYear(),
        maxStudents: 30,
        tuitionFee: 0,
        teacherId: '',
        startDate: null,
        endDate: null,
        startTime: '08:00',
        endTime: '10:00',
        totalSessions: 0,
        description: '',
        classroom: '',
        weekdays: [],
      });
    }
  };

  const handleSave = async () => {
    // Validation
    if (!classForm.name || !classForm.grade || !classForm.startDate || !classForm.endDate) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (classForm.startDate && classForm.endDate && classForm.startDate.isAfter(classForm.endDate)) {
      alert('Ngày bắt đầu phải trước ngày kết thúc');
      return;
    }

    if (classForm.maxStudents <= 0) {
      alert('Sĩ số tối đa phải lớn hơn 0');
      return;
    }

    if (classForm.totalSessions <= 0) {
      alert('Tổng số buổi học phải lớn hơn 0');
      return;
    }

    const payload = {
      ...classForm,
      startDate: classForm.startDate ? classForm.startDate.toISOString() : null,
      endDate: classForm.endDate ? classForm.endDate.toISOString() : null,
    };

    try {
      if (selectedClass) {        // Update existing class
        console.log('Updating class:', payload);
        const updatedClasses = classes.map(c => 
          c.id === selectedClass.id 
            ? { 
                ...selectedClass, 
                ...payload, 
                id: selectedClass.id, 
                students: selectedClass.students,
                grade: Number(classForm.grade),
                startDate: classForm.startDate ? classForm.startDate.toISOString() : null,
                endDate: classForm.endDate ? classForm.endDate.toISOString() : null,
              } 
            : c
        );
        setClasses(updatedClasses);
      } else {
        // Create new class
        console.log('Creating new class:', payload);
        const newClass: ClassData = {
          ...payload,
          id: Math.max(...classes.map(c => c.id), 0) + 1,
          students: [],
          status: 'pending',
          grade: Number(classForm.grade),
          startDate: classForm.startDate ? classForm.startDate.toISOString() : null,
          endDate: classForm.endDate ? classForm.endDate.toISOString() : null,
        };
        setClasses([...classes, newClass]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving class:', error);
      alert('Có lỗi xảy ra khi lưu thông tin lớp học');
    }
  };

  const handleCloseClass = (classId: number) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, status: 'closed' } : c));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Quản lý lớp học</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Mở lớp mới
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Năm học"
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
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Khối lớp"
            value={filterGrade}
            onChange={(e) => setFilterGrade(Number(e.target.value))}
          >
            <MenuItem value={0}>Tất cả</MenuItem>
            {grades.map((grade) => (
              <MenuItem key={grade} value={grade}>
                Lớp {grade}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>          <TableHead>
            <TableRow>
              <TableCell>Tên lớp</TableCell>
              <TableCell>Khối</TableCell>
              <TableCell>Năm học</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Phòng học</TableCell>
              <TableCell>Giáo viên</TableCell>
              <TableCell>Sĩ số</TableCell>
              <TableCell>Học phí/buổi</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes
              .filter(c => (filterYear ? c.year === filterYear : true) && (filterGrade ? c.grade === filterGrade : true))              .map((classItem) => (                <TableRow key={classItem.id}>
                  <TableCell>{classItem.name}</TableCell>
                  <TableCell>Lớp {classItem.grade}</TableCell>
                  <TableCell>{classItem.year}</TableCell>
                  <TableCell>
                    {classItem.startTime} - {classItem.endTime}
                    <br />
                    <Typography variant="caption" color="textSecondary">
                      {classItem.weekdays?.map(day => {
                        const dayNames = { '2': 'T2', '3': 'T3', '4': 'T4', '5': 'T5', '6': 'T6', '7': 'T7', '8': 'CN' };
                        return dayNames[day as keyof typeof dayNames];
                      }).join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell>{classItem.classroom || 'Chưa phân phòng'}</TableCell>
                  <TableCell>{classItem.teacherId || 'Chưa phân giáo viên'}</TableCell>
                  <TableCell>
                    {classItem.students.length}/{classItem.maxStudents}
                  </TableCell>
                  <TableCell>{classItem.tuitionFee?.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        classItem.status === 'active'
                          ? 'Đang hoạt động'
                          : classItem.status === 'closed'
                          ? 'Đã đóng'
                          : 'Sắp mở'
                      }
                      color={
                        classItem.status === 'active'
                          ? 'success'
                          : classItem.status === 'closed'
                          ? 'error'
                          : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(classItem)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>                    <IconButton
                      color="info"
                      onClick={() => handleViewStudents(classItem)}
                      sx={{ mr: 1 }}
                    >
                      <ViewIcon />
                    </IconButton>
                    {classItem.status === 'active' && (
                      <IconButton
                        color="error"
                        onClick={() => handleCloseClass(classItem.id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedClass ? 'Cập nhật thông tin lớp' : 'Mở lớp mới'}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên lớp"
                  value={classForm.name}
                  onChange={e => setClassForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Khối lớp"
                  value={classForm.grade}
                  onChange={e => setClassForm(f => ({ ...f, grade: e.target.value }))}
                  required
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      Lớp {grade}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số thứ tự"
                  type="number"
                  value={classForm.order}
                  onChange={e => setClassForm(f => ({ ...f, order: Number(e.target.value) }))}
                  helperText="Ví dụ: Lớp 3.1, 3.2, 3.3"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Năm học"
                  value={classForm.year}
                  onChange={e => setClassForm(f => ({ ...f, year: Number(e.target.value) }))}
                  required
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Sĩ số tối đa"
                  type="number"
                  value={classForm.maxStudents}
                  onChange={e => setClassForm(f => ({ ...f, maxStudents: Number(e.target.value) }))}
                  required
                  inputProps={{ min: 1, max: 50 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Học phí/buổi (VNĐ)"
                  type="number"
                  value={classForm.tuitionFee}
                  onChange={e => setClassForm(f => ({ ...f, tuitionFee: Number(e.target.value) }))}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Giáo viên phụ trách"
                  value={classForm.teacherId}
                  onChange={e => setClassForm(f => ({ ...f, teacherId: e.target.value }))}
                >
                  <MenuItem value="">Chọn giáo viên</MenuItem>
                  <MenuItem value="1">Nguyễn Thị A</MenuItem>
                  <MenuItem value="2">Trần Văn B</MenuItem>
                  <MenuItem value="3">Lê Thị C</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phòng học"
                  value={classForm.classroom}
                  onChange={e => setClassForm(f => ({ ...f, classroom: e.target.value }))}
                  placeholder="Ví dụ: A101, B205"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày bắt đầu"
                  value={classForm.startDate}
                  onChange={(newValue: Dayjs | null) => setClassForm(f => ({ ...f, startDate: newValue }))}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      required: true
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>                <DatePicker
                  label="Ngày kết thúc"
                  value={classForm.endDate}
                  onChange={(newValue: Dayjs | null) => setClassForm(f => ({ ...f, endDate: newValue }))}
                  format="DD/MM/YYYY"
                  minDate={classForm.startDate || undefined}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      required: true
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tổng số buổi học"
                  type="number"
                  value={classForm.totalSessions}
                  onChange={e => setClassForm(f => ({ ...f, totalSessions: Number(e.target.value) }))}
                  required
                  inputProps={{ min: 1 }}
                  helperText="Tổng số buổi học dự kiến trong khóa"
                />
              </Grid>              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giờ bắt đầu"
                  type="time"
                  value={classForm.startTime}
                  onChange={e => setClassForm(f => ({ ...f, startTime: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  helperText="Giờ bắt đầu buổi học"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giờ kết thúc"
                  type="time"
                  value={classForm.endTime}
                  onChange={e => setClassForm(f => ({ ...f, endTime: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 300 }}
                  helperText="Giờ kết thúc buổi học"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Lịch học trong tuần"
                  SelectProps={{ multiple: true }}
                  value={classForm.weekdays}
                  onChange={e => setClassForm(f => ({ ...f, weekdays: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value }))}
                  size="small"
                  helperText="Chọn các ngày trong tuần"
                >
                  {weekdayOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mô tả khóa học"
                  value={classForm.description}
                  onChange={e => setClassForm(f => ({ ...f, description: e.target.value }))}
                  multiline
                  rows={3}
                  placeholder="Mô tả về nội dung, mục tiêu của khóa học..."
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {selectedClass ? 'Lưu thay đổi' : 'Tạo lớp'}
          </Button>        </DialogActions>
      </Dialog>

      {/* View Students Dialog */}
      <Dialog 
        open={viewStudentsOpen} 
        onClose={handleCloseStudentsView} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Danh sách học sinh - {selectedClassForView?.name}
        </DialogTitle>
        <DialogContent>
          {selectedClassForView && (
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Sĩ số: {selectedClassForView.students.length}/{selectedClassForView.maxStudents} học sinh
              </Typography>
              
              {selectedClassForView.students.length > 0 ? (
                <List>
                  {selectedClassForView.students.map((student, index) => (
                    <React.Fragment key={student.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {student.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={student.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" component="span">
                                Email: {student.email}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span">
                                SĐT: {student.phone}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span">
                                Lớp: {student.grade} | Ngày tham gia: {student.joinDate}
                              </Typography>
                              <br />
                              <Chip 
                                label={student.status === 'active' ? 'Đang học' : 'Nghỉ học'} 
                                color={student.status === 'active' ? 'success' : 'default'}
                                size="small"
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < selectedClassForView.students.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" color="textSecondary" textAlign="center" sx={{ py: 3 }}>
                  Chưa có học sinh nào trong lớp này
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentsView}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassManagement;