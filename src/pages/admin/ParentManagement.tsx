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
} from '@mui/material';
import { Parent } from '../../types/models';

// Mock data for testing
const mockParents: Parent[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    children: [
      { id: 1, name: 'Nguyễn Văn B' },
      { id: 2, name: 'Nguyễn Văn C' }
    ]
  },
  {
    id: 2,
    name: 'Trần Thị D',
    email: 'tranthid@example.com',
    phone: '0909876543',
    children: [
      { id: 3, name: 'Trần Văn E' }
    ]
  },
  {
    id: 3,
    name: 'Lê Văn F',
    email: 'levanf@example.com',
    phone: '0905555555',
    children: [
      { id: 4, name: 'Lê Thị G' },
      { id: 5, name: 'Lê Văn H' }
    ]
  }
];

const ParentManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

  const handleOpen = (parent?: Parent) => {
    if (parent) {
      setSelectedParent(parent);
    } else {
      setSelectedParent(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedParent(null);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Quản lý phụ huynh</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Thêm phụ huynh
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Số con</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockParents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>{parent.name}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>{parent.phone}</TableCell>
                <TableCell>{parent.children.length}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(parent)}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button variant="outlined" color="info">
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedParent ? 'Cập nhật thông tin phụ huynh' : 'Thêm phụ huynh mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Họ tên"
              margin="normal"
              defaultValue={selectedParent?.name}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              defaultValue={selectedParent?.email}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              margin="normal"
              defaultValue={selectedParent?.phone}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ParentManagement;