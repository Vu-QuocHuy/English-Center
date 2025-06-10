import React, { useState, ChangeEvent } from 'react';
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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Toolbar,
  OutlinedInput,
  InputAdornment,
  SelectChangeEvent,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, Visibility } from '@mui/icons-material';
import TeacherDetails from './TeacherDetails';

interface Teacher {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional for editing existing teachers
  phone: string;
  dateOfBirth: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  salaryPerSession: number;
  specialization: string;
  description: string;
  status: 'active' | 'inactive';
  qualifications: string;
  classes: number;
  yearJoined?: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  gender?: string;
  salaryPerSession?: string;
  specialization?: string;
  description?: string;
  qualifications?: string;
}

interface PaginationLabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
}

const TeacherManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: 'Nguyễn Thị Lan',
      email: 'lan.nguyen@example.com',
      phone: '0901234567',
      dateOfBirth: '1990-05-15',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      gender: 'female',
      salaryPerSession: 150000,
      specialization: 'IELTS',
      description: 'Giáo viên có 5 năm kinh nghiệm giảng dạy IELTS, chuyên về Writing và Speaking',
      status: 'active',
      qualifications: 'TESOL Certificate, IELTS 8.0, Thạc sĩ Ngôn ngữ Anh',
      classes: 3,
      yearJoined: 2020,
    },
    {
      id: 2,
      name: 'Trần Văn Minh',
      email: 'minh.tran@example.com',
      phone: '0902345678',
      dateOfBirth: '1988-12-03',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      gender: 'male',
      salaryPerSession: 120000,
      specialization: 'TOEIC',
      description: 'Chuyên gia TOEIC với kinh nghiệm 7 năm, đã giúp hàng trăm học sinh đạt điểm cao',
      status: 'active',
      qualifications: 'TOEIC 990, Cử nhân Sư phạm Tiếng Anh',
      classes: 2,
      yearJoined: 2018,
    },
  ]);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');

  // Form states
  const [open, setOpen] = useState(false);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    gender: 'female' as 'male' | 'female' | 'other',
    salaryPerSession: 0,
    specialization: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    qualifications: '',
    classes: 0,
    yearJoined: new Date().getFullYear(),
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Additional states
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);

  // Filter teachers based on search and filters
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || teacher.status === statusFilter;
    
    const matchesSpecialization = 
      specializationFilter === 'all' || teacher.specialization === specializationFilter;

    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  // Get unique specializations for filter
  const specializations = Array.from(new Set(teachers.map(t => t.specialization)));

  // Validation function
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Tên không được để trống';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (!editTeacher && !formData.password.trim()) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (!editTeacher && formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]+$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Ngày sinh không được để trống';
    }

    if (!formData.address.trim()) {
      errors.address = 'Địa chỉ không được để trống';
    }

    if (formData.salaryPerSession <= 0) {
      errors.salaryPerSession = 'Lương phải lớn hơn 0';
    }
    
    if (!formData.specialization.trim()) {
      errors.specialization = 'Chuyên môn không được để trống';
    }

    if (!formData.qualifications.trim()) {
      errors.qualifications = 'Trình độ không được để trống';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (teacher?: Teacher) => {
    if (teacher) {
      setEditTeacher(teacher);
      setFormData({
        name: teacher.name,
        email: teacher.email,
        password: '', // Don't show existing password
        phone: teacher.phone,
        dateOfBirth: teacher.dateOfBirth,
        address: teacher.address,
        gender: teacher.gender,
        salaryPerSession: teacher.salaryPerSession,
        specialization: teacher.specialization,
        description: teacher.description,
        status: teacher.status,
        qualifications: teacher.qualifications,
        classes: teacher.classes,
        yearJoined: teacher.yearJoined || new Date().getFullYear(),
      });
    } else {
      setEditTeacher(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        gender: 'female',
        salaryPerSession: 0,
        specialization: '',
        description: '',
        status: 'active',
        qualifications: '',
        classes: 0,
        yearJoined: new Date().getFullYear(),
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTeacher(null);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (editTeacher) {
      setTeachers(teachers.map(t => 
        t.id === editTeacher.id 
          ? { 
              ...t, 
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              dateOfBirth: formData.dateOfBirth,
              address: formData.address,
              gender: formData.gender,
              salaryPerSession: formData.salaryPerSession,
              specialization: formData.specialization,
              description: formData.description,
              status: formData.status,
              qualifications: formData.qualifications,
              classes: formData.classes,
              yearJoined: formData.yearJoined,
            }
          : t
      ));
    } else {
      const newTeacher: Teacher = {
        id: teachers.length + 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        gender: formData.gender,
        salaryPerSession: formData.salaryPerSession,
        specialization: formData.specialization,
        description: formData.description,
        status: formData.status,
        qualifications: formData.qualifications,
        classes: 0,
        yearJoined: formData.yearJoined,
      };
      setTeachers([...teachers, newTeacher]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const handleViewDetails = (teacherId: number) => {
    setSelectedTeacher(teacherId);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản Lý Giáo Viên</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Thêm Giáo Viên Mới
        </Button>
      </Box>

      <Paper sx={{ mb: 2 }}>
        <Toolbar sx={{ gap: 2 }}>
          <OutlinedInput
            size="small"
            placeholder="Tìm kiếm giáo viên..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ width: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Trạng Thái</InputLabel>
            <Select
              value={statusFilter}
              label="Trạng Thái"
              onChange={(e: SelectChangeEvent<'all' | 'active' | 'inactive'>) => 
                setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            >
              <MenuItem value="all">Tất Cả</MenuItem>
              <MenuItem value="active">Đang Làm Việc</MenuItem>
              <MenuItem value="inactive">Đã Nghỉ</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Chuyên Môn</InputLabel>
            <Select
              value={specializationFilter}
              label="Chuyên Môn"
              onChange={(e: SelectChangeEvent) => setSpecializationFilter(e.target.value)}
            >
              <MenuItem value="all">Tất Cả</MenuItem>
              {specializations.map((spec) => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </Paper>

      <Dialog
        open={selectedTeacher !== null}
        onClose={() => setSelectedTeacher(null)}
        maxWidth="lg"
        fullWidth
      >
        {selectedTeacher && (
          <TeacherDetails
            teacherId={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Chuyên môn</TableCell>
              <TableCell>Lương/buổi</TableCell>
              <TableCell>Số lớp</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>{teacher.specialization}</TableCell>
                  <TableCell>{teacher.salaryPerSession?.toLocaleString('vi-VN')}₫</TableCell>
                  <TableCell>{teacher.classes}</TableCell>
                  <TableCell>
                    <Chip
                      label={teacher.status === 'active' ? 'Đang dạy' : 'Nghỉ việc'}
                      color={teacher.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(teacher.id)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(teacher)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(teacher.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTeachers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          labelDisplayedRows={({ from, to, count }: PaginationLabelDisplayedRowsArgs) => 
            `${from}-${to} trong ${count}`
          }
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editTeacher ? 'Chỉnh Sửa Giáo Viên' : 'Thêm Giáo Viên Mới'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
            <TextField
              autoFocus
              label="Tên"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            {!editTeacher && (
              <TextField
                label="Mật khẩu"
                type="password"
                fullWidth
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            )}
            <TextField
              label="Số điện thoại"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
            <TextField
              label="Ngày sinh"
              type="date"
              fullWidth
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              error={!!formErrors.dateOfBirth}
              helperText={formErrors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth error={!!formErrors.gender}>
              <InputLabel>Giới tính</InputLabel>
              <Select
                value={formData.gender}
                label="Giới tính"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | 'other' })}
              >
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Lương trên buổi học (VNĐ)"
              type="number"
              fullWidth
              value={formData.salaryPerSession}
              onChange={(e) => setFormData({ ...formData, salaryPerSession: parseInt(e.target.value) })}
              error={!!formErrors.salaryPerSession}
              helperText={formErrors.salaryPerSession}
            />
            <TextField
              label="Chuyên môn"
              fullWidth
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              error={!!formErrors.specialization}
              helperText={formErrors.specialization}
            />
            <TextField
              label="Địa chỉ"
              fullWidth
              sx={{ gridColumn: '1 / -1' }}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            <TextField
              label="Trình độ/Chứng chỉ"
              fullWidth
              multiline
              rows={2}
              sx={{ gridColumn: '1 / -1' }}
              value={formData.qualifications}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              error={!!formErrors.qualifications}
              helperText={formErrors.qualifications}
              placeholder="Ví dụ: TESOL Certificate, IELTS 8.0, Thạc sĩ Ngôn ngữ Anh"
            />
            <TextField
              label="Mô tả"
              fullWidth
              multiline
              rows={3}
              sx={{ gridColumn: '1 / -1' }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={!!formErrors.description}
              helperText={formErrors.description}
              placeholder="Mô tả về kinh nghiệm, thế mạnh của giáo viên..."
            />
            <TextField
              label="Số lớp đang dạy"
              type="number"
              fullWidth
              value={formData.classes}
              onChange={(e) => setFormData({ ...formData, classes: parseInt(e.target.value) })}
            />
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={formData.status}
                label="Trạng thái"
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              >
                <MenuItem value="active">Đang làm việc</MenuItem>
                <MenuItem value="inactive">Đã nghỉ</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editTeacher ? 'Lưu Thay Đổi' : 'Thêm Giáo Viên'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherManagement;