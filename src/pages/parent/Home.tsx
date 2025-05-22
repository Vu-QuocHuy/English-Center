import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableBody, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import AdvertisementSlider from '../../components/AdvertisementSlider';

// Mock popup quảng cáo
const AdPopup = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Thông báo lớp mới</DialogTitle>
    <DialogContent>
      <Typography variant="h6">Khai giảng lớp tiếng Anh thiếu nhi</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Đăng ký ngay để nhận ưu đãi học phí lên tới 20%! Lớp khai giảng ngày 20/06.
      </Typography>
      <img src="/ads/english-kids.jpg" alt="ad" style={{ width: '100%', borderRadius: 8 }} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Đóng</Button>
    </DialogActions>
  </Dialog>
);

// Mock data
const mockParent = {
  id: 1,
  name: 'Phụ huynh Nguyễn Văn B',
  children: [
    {
      id: 1,
      name: 'Nguyễn Minh Anh',
      classes: [
        {
          id: 1,
          name: 'IELTS 6.5',
          teacher: { name: 'Nguyễn Văn A' },
          schedule: 'Thứ 2, 18:00 - 19:30',
          attendance: [
            { date: '2024-06-01', status: 'present' },
            { date: '2024-06-03', status: 'absent' },
            { date: '2024-06-05', status: 'present' },
            { date: '2024-06-08', status: 'absent' },
            { date: '2024-06-10', status: 'present' },
          ],
          payments: [
            { month: 6, year: 2024, amount: 2000000, paidAmount: 1000000, status: 'partial' },
            { month: 5, year: 2024, amount: 2000000, paidAmount: 2000000, status: 'paid' },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Nguyễn Minh Tuấn',
      classes: [
        {
          id: 2,
          name: 'Giao tiếp nâng cao',
          teacher: { name: 'Trần Thị B' },
          schedule: 'Thứ 5, 18:00 - 19:30',
          attendance: [
            { date: '2024-06-02', status: 'present' },
            { date: '2024-06-04', status: 'present' },
            { date: '2024-06-06', status: 'present' },
          ],
          payments: [
            { month: 6, year: 2024, amount: 1800000, paidAmount: 0, status: 'pending' },
          ],
        },
      ],
    },
  ],
};

const ParentHome: React.FC = () => {
  const [adOpen, setAdOpen] = useState(true);
  const [tab, setTab] = useState(0);
  const parent = mockParent;
  const child = parent.children[tab];

  // Tính tổng nợ của từng con
  const getTotalDebt = (child: any) =>
    child.classes.reduce((sum: number, cls: any) =>
      sum + cls.payments.reduce((s: number, p: any) => s + (p.amount - p.paidAmount), 0), 0);

  return (
    <Box>
      {/* Popup quảng cáo */}
      <AdPopup open={adOpen} onClose={() => setAdOpen(false)} />
      {/* Slider quảng cáo (nếu muốn dùng song song) */}
      <AdvertisementSlider userRole="parent" />
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        Chào mừng {parent.name}!
      </Typography>
      {/* Tabs chọn con */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        {parent.children.map((c) => (
          <Tab key={c.id} label={c.name} />
        ))}
      </Tabs>
      {/* Thông tin từng con */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Lớp đang học
      </Typography>
      <Grid container spacing={2}>
        {child.classes.map((cls: any) => (
          <Grid item xs={12} md={6} key={cls.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight={600}>{cls.name}</Typography>
              <Typography variant="body2" color="text.secondary">Giáo viên: {cls.teacher.name}</Typography>
              <Typography variant="body2">Lịch học: {cls.schedule}</Typography>
              <Typography variant="body2" color="success.main">
                Đã học: {cls.attendance.filter((a: any) => a.status === 'present').length} buổi
              </Typography>
              <Typography variant="body2" color="error.main">
                Nghỉ: {cls.attendance.filter((a: any) => a.status === 'absent').length} buổi
              </Typography>
              {cls.attendance.some((a: any) => a.status === 'absent') && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" fontWeight={600}>Danh sách buổi nghỉ:</Typography>
                  <List dense>
                    {cls.attendance.filter((a: any) => a.status === 'absent').map((a: any, idx: number) => (
                      <ListItem key={idx}>
                        <ListItemText primary={new Date(a.date).toLocaleDateString('vi-VN')} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight={600}>Học phí:</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tháng</TableCell>
                      <TableCell>Năm</TableCell>
                      <TableCell>Phải đóng</TableCell>
                      <TableCell>Đã đóng</TableCell>
                      <TableCell>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cls.payments.map((p: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{p.month}</TableCell>
                        <TableCell>{p.year}</TableCell>
                        <TableCell>{p.amount.toLocaleString()} VNĐ</TableCell>
                        <TableCell>{p.paidAmount.toLocaleString()} VNĐ</TableCell>
                        <TableCell>
                          <Chip label={p.status === 'paid' ? 'Đã đóng' : p.status === 'partial' ? 'Đóng một phần' : 'Chưa đóng'} color={p.status === 'paid' ? 'success' : p.status === 'partial' ? 'warning' : 'error'} size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Tổng số tiền chưa đóng</Typography>
        <Typography variant="h5" color="error.main">
          {getTotalDebt(child).toLocaleString()} VNĐ
        </Typography>
      </Box>
    </Box>
  );
};

export default ParentHome; 