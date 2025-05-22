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
  weekdays: string[];
  students: any[];
  status: 'active' | 'closed' | 'pending';
}

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [filterYear, setFilterYear] = useState<number>(new Date().getFullYear());
  const [filterGrade, setFilterGrade] = useState<number>(0);
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
    weekdays: [],
  });
  const weekdayOptions = [
    { value: 1, label: 'Thứ 2' },
    { value: 2, label: 'Thứ 3' },
    { value: 3, label: 'Thứ 4' },
    { value: 4, label: 'Thứ 5' },
    { value: 5, label: 'Thứ 6' },
    { value: 6, label: 'Thứ 7' },
    { value: 0, label: 'Chủ nhật' },
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
        weekdays: [],
      });
    }
  };

  const handleSave = async () => {
    const payload = {
      ...classForm,
      startDate: classForm.startDate ? classForm.startDate.toISOString() : null,
      endDate: classForm.endDate ? classForm.endDate.toISOString() : null,
    };
    if (selectedClass) {
      await fetch(`/api/classes/${selectedClass.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    handleClose();
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên lớp</TableCell>
              <TableCell>Năm học</TableCell>
              <TableCell>Giáo viên</TableCell>
              <TableCell>Sĩ số</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes
              .filter(c => (filterYear ? c.year === filterYear : true) && (filterGrade ? c.grade === filterGrade : true))
              .map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell>{classItem.name}</TableCell>
                  <TableCell>{classItem.year}</TableCell>
                  <TableCell>{classItem.teacherId}</TableCell>
                  <TableCell>
                    {classItem.students.length}/{classItem.maxStudents}
                  </TableCell>
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
                    </IconButton>
                    <IconButton
                      color="info"
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tên lớp"
                  value={classForm.name}
                  onChange={e => setClassForm(f => ({ ...f, name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Khối lớp"
                  value={classForm.grade}
                  onChange={e => setClassForm(f => ({ ...f, grade: e.target.value }))}
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Năm học"
                  value={classForm.year}
                  onChange={e => setClassForm(f => ({ ...f, year: Number(e.target.value) }))}
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Học phí/buổi"
                  type="number"
                  value={classForm.tuitionFee}
                  onChange={e => setClassForm(f => ({ ...f, tuitionFee: Number(e.target.value) }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Giáo viên"
                  value={classForm.teacherId}
                  onChange={e => setClassForm(f => ({ ...f, teacherId: e.target.value }))}
                >
                  <MenuItem value="">Chọn giáo viên</MenuItem>
                </TextField>
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
                      size: "small"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Ngày kết thúc"
                  value={classForm.endDate}
                  onChange={(newValue: Dayjs | null) => setClassForm(f => ({ ...f, endDate: newValue }))}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Số buổi học trong tuần (chọn thứ)"
                  SelectProps={{ multiple: true }}
                  value={classForm.weekdays}
                  onChange={e => setClassForm(f => ({ ...f, weekdays: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value }))}
                  size="small"
                >
                  {weekdayOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {selectedClass ? 'Lưu thay đổi' : 'Tạo lớp'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassManagement;