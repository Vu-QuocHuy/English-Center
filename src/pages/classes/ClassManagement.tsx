import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Class {
  id: string;
  name: string;
  year: number;
  grade: number;
  section: number;
  status: 'active' | 'closed';
  teacherId: string;
  studentCount: number;
}

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    year: new Date().getFullYear(),
    grade: 1,
    section: 1,
  });

  const handleAddClass = () => {
    // TODO: Implement API call to add class
    const classData: Class = {
      id: Math.random().toString(),
      ...newClass,
      status: 'active',
      teacherId: '',
      studentCount: 0,
    };
    setClasses([...classes, classData]);
    setOpenDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản lý lớp học</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Thêm lớp mới
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên lớp</TableCell>
              <TableCell>Năm học</TableCell>
              <TableCell>Khối</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Số học sinh</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name}</TableCell>
                <TableCell>{classItem.year}</TableCell>
                <TableCell>{classItem.grade}</TableCell>
                <TableCell>{classItem.section}</TableCell>
                <TableCell>
                  {classItem.status === 'active' ? 'Đang hoạt động' : 'Đã đóng'}
                </TableCell>
                <TableCell>{classItem.studentCount}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      // TODO: Implement view details
                    }}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thêm lớp mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên lớp"
                value={newClass.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewClass({ ...newClass, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Năm học"
                value={newClass.year}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewClass({ ...newClass, year: parseInt(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Khối</InputLabel>
                <Select
                  value={newClass.grade}
                  label="Khối"
                  onChange={(e) =>
                    setNewClass({ ...newClass, grade: Number(e.target.value) })
                  }
                >
                  {[1, 2, 3, 4, 5].map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      Lớp {grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Lớp</InputLabel>
                <Select
                  value={newClass.section}
                  label="Lớp"
                  onChange={(e) =>
                    setNewClass({ ...newClass, section: Number(e.target.value) })
                  }
                >
                  {[1, 2, 3].map((section) => (
                    <MenuItem key={section} value={section}>
                      {section}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleAddClass} variant="contained">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassManagement; 