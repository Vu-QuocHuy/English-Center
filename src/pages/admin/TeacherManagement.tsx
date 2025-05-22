import React, { useState, useEffect, ChangeEvent } from 'react';
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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  classes: number;
  yearJoined?: number;
  status?: 'active' | 'inactive';
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  specialization?: string;
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
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(123) 456-7890',
      specialization: 'IELTS',
      classes: 3,
      yearJoined: 2020,
      status: 'active',
    },
    // Add more sample data as needed
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
    phone: '',
    specialization: '',
    classes: 0,
    yearJoined: new Date().getFullYear(),
    status: 'active' as 'active' | 'inactive',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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
    
    if (!formData.phone.trim()) {
      errors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9()-\s]+$/.test(formData.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.specialization.trim()) {
      errors.specialization = 'Chuyên môn không được để trống';
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
        phone: teacher.phone,
        specialization: teacher.specialization,
        classes: teacher.classes,
        yearJoined: teacher.yearJoined || new Date().getFullYear(),
        status: teacher.status || 'active',
      });
    } else {
      setEditTeacher(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        classes: 0,
        yearJoined: new Date().getFullYear(),
        status: 'active' as 'active' | 'inactive',
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
          ? { ...t, ...formData }
          : t
      ));
    } else {
      const newTeacher: Teacher = {
        id: teachers.length + 1,
        ...formData,
        classes: 0,
      };
      setTeachers([...teachers, newTeacher]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã GV</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Điện Thoại</TableCell>
              <TableCell>Chuyên Môn</TableCell>
              <TableCell>Số Lớp Đang Dạy</TableCell>
              <TableCell>Năm Vào Làm</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTeachers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.id}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>{teacher.specialization}</TableCell>
                  <TableCell>{teacher.classes}</TableCell>
                  <TableCell>{teacher.yearJoined || ''}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: teacher.status === 'active' ? 'success.light' : 'error.light',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block',
                      }}
                    >
                      {teacher.status === 'active' ? 'Đang Làm Việc' : 'Đã Nghỉ'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(teacher)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(teacher.id)} color="error">
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

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editTeacher ? 'Chỉnh Sửa Giáo Viên' : 'Thêm Giáo Viên Mới'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            margin="dense"
            label="Điện Thoại"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
          />
          <TextField
            margin="dense"
            label="Chuyên Môn"
            fullWidth
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            error={!!formErrors.specialization}
            helperText={formErrors.specialization}
          />
          <TextField
            margin="dense"
            label="Số Lớp Đang Dạy"
            type="number"
            fullWidth
            value={formData.classes}
            onChange={(e) => setFormData({ ...formData, classes: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Năm Vào Làm"
            type="number"
            fullWidth
            value={formData.yearJoined}
            onChange={(e) => setFormData({ ...formData, yearJoined: parseInt(e.target.value) })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng Thái</InputLabel>
            <Select
              value={formData.status}
              label="Trạng Thái"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            >
              <MenuItem value="active">Đang Làm Việc</MenuItem>
              <MenuItem value="inactive">Đã Nghỉ</MenuItem>
            </Select>
          </FormControl>
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