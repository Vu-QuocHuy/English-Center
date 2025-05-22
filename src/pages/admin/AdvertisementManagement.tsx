import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Chip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
  roles: string[];
  status: 'active' | 'inactive';
}

const mockAds: Advertisement[] = [
  {
    id: 1,
    title: 'Khai giảng lớp tiếng Anh thiếu nhi',
    description: 'Đăng ký ngay để nhận ưu đãi học phí lên tới 20%!',
    image: '/ads/english-kids.jpg',
    roles: ['parent', 'student'],
    status: 'active',
  },
  {
    id: 2,
    title: 'Lớp luyện thi IELTS khai giảng tháng 7',
    description: 'Cam kết đầu ra 6.5+ với giáo viên bản ngữ.',
    image: '/ads/ielts-class.jpg',
    roles: ['student'],
    status: 'inactive',
  },
];

const AdvertisementManagement: React.FC = () => {
  const [ads, setAds] = useState<Advertisement[]>(mockAds);
  const [open, setOpen] = useState(false);
  const [editAd, setEditAd] = useState<Advertisement | null>(null);

  const handleOpen = (ad?: Advertisement) => {
    setEditAd(ad || null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditAd(null);
  };

  // Mock save
  const handleSave = () => {
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Quản lý quảng cáo</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Thêm quảng cáo
        </Button>
      </Box>
      <Paper sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Đối tượng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map(ad => (
              <TableRow key={ad.id}>
                <TableCell>{ad.title}</TableCell>
                <TableCell>{ad.description}</TableCell>
                <TableCell>
                  {ad.roles.map(r => (
                    <Chip key={r} label={r === 'parent' ? 'Phụ huynh' : 'Học sinh'} size="small" sx={{ mr: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>
                  <Chip label={ad.status === 'active' ? 'Đang hiển thị' : 'Ẩn'} color={ad.status === 'active' ? 'success' : 'default'} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(ad)}><EditIcon /></IconButton>
                  <IconButton color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editAd ? 'Cập nhật quảng cáo' : 'Thêm quảng cáo'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Tiêu đề"
            sx={{ mb: 2, mt: 1 }}
            defaultValue={editAd?.title || ''}
          />
          <TextField
            fullWidth
            label="Mô tả"
            sx={{ mb: 2 }}
            defaultValue={editAd?.description || ''}
          />
          <TextField
            fullWidth
            label="Link hình ảnh"
            sx={{ mb: 2 }}
            defaultValue={editAd?.image || ''}
          />
          {/* Có thể thêm chọn đối tượng, trạng thái... */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdvertisementManagement; 