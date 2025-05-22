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
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  level: string;
  enrolledClasses: string[];
  status: 'active' | 'inactive';
  parent?: string;
  year?: number;
  className?: string;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.j@example.com',
      phone: '(123) 456-7890',
      level: 'Intermediate',
      enrolledClasses: ['IELTS Preparation', 'Business English'],
      status: 'active',
      parent: 'John Doe',
      year: 2024,
      className: '10A1',
    },
    // Add more sample data as needed
  ]);

  const [open, setOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    status: 'active' as 'active' | 'inactive',
    parent: '',
    year: new Date().getFullYear(),
    className: '',
  });

  // State cho filter và tìm kiếm
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState<number | ''>('');
  const [filterClass, setFilterClass] = useState('');
  const [parentDetail, setParentDetail] = useState<string | null>(null);

  const handleOpen = (student?: Student) => {
    if (student) {
      setEditStudent(student);
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        level: student.level,
        status: student.status,
        parent: student.parent || '',
        year: student.year || 2024,
        className: student.className || '',
      });
    } else {
      setEditStudent(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        level: '',
        status: 'active',
        parent: '',
        year: 2024,
        className: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditStudent(null);
  };

  const handleSubmit = () => {
    if (editStudent) {
      // Update existing student
      setStudents(students.map(s => 
        s.id === editStudent.id 
          ? { ...s, ...formData }
          : s
      ));
    } else {
      // Add new student
      const newStudent: Student = {
        id: students.length + 1,
        ...formData,
        enrolledClasses: [],
      };
      setStudents([...students, newStudent]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  // Lọc và tìm kiếm học sinh
  const filteredStudents = students.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.toLowerCase().includes(search.toLowerCase());
    const matchYear = filterYear ? s.year === filterYear : true;
    const matchClass = filterClass ? s.className === filterClass : true;
    return matchSearch && matchYear && matchClass;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản Lý Học Sinh</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Thêm Học Sinh Mới
        </Button>
      </Box>

      {/* Tìm kiếm và lọc */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Tìm kiếm" value={search} onChange={e => setSearch(e.target.value)} size="small" />
        <TextField label="Năm học" type="number" value={filterYear} onChange={e => setFilterYear(e.target.value ? parseInt(e.target.value) : '')} size="small" />
        <TextField label="Lớp" value={filterClass} onChange={e => setFilterClass(e.target.value)} size="small" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Tổng số học sinh: {students.length}</Typography>
        <Typography variant="body2" color="success.main">Đang hoạt động: {students.filter(s => s.status === 'active').length}</Typography>
        <Typography variant="body2" color="error.main">Không hoạt động: {students.filter(s => s.status === 'inactive').length}</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã HS</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Điện Thoại</TableCell>
              <TableCell>Trình Độ</TableCell>
              <TableCell>Năm Học</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Phụ Huynh</TableCell>
              <TableCell>Trạng Thái</TableCell>
              <TableCell>Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>{student.year || '2024'}</TableCell>
                <TableCell>{student.className || ''}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => setParentDetail(student.parent || null)}>
                    {student.parent || 'Chưa cập nhật'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: student.status === 'active' ? 'success.light' : 'error.light',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'inline-block',
                    }}
                  >
                    {student.status === 'active' ? 'Đang Hoạt Động' : 'Không Hoạt Động'}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(student)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup xem chi tiết phụ huynh */}
      <Dialog open={!!parentDetail} onClose={() => setParentDetail(null)}>
        <DialogTitle>Thông tin phụ huynh</DialogTitle>
        <DialogContent>
          <Typography>{parentDetail || 'Chưa cập nhật'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setParentDetail(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thêm/sửa học sinh */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editStudent ? 'Chỉnh Sửa Thông Tin Học Sinh' : 'Thêm Học Sinh Mới'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Điện Thoại"
            fullWidth
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Trình Độ</InputLabel>
            <Select
              value={formData.level}
              label="Trình Độ"
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <MenuItem value="Beginner">Mới Bắt Đầu</MenuItem>
              <MenuItem value="Intermediate">Trung Cấp</MenuItem>
              <MenuItem value="Advanced">Nâng Cao</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Năm Học"
            type="number"
            fullWidth
            value={formData.year || '2024'}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Lớp"
            fullWidth
            value={formData.className || ''}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng Thái</InputLabel>
            <Select
              value={formData.status}
              label="Trạng Thái"
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            >
              <MenuItem value="active">Đang Hoạt Động</MenuItem>
              <MenuItem value="inactive">Không Hoạt Động</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Phụ Huynh"
            fullWidth
            value={formData.parent}
            onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editStudent ? 'Lưu Thay Đổi' : 'Thêm Học Sinh'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentManagement;