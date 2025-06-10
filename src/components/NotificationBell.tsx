import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, ListItemText, Typography, Box, Stack, Button, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
import COLORS from '../constants/colors';

interface Notification {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  type: 'system' | 'teacher' | 'attendance' | 'score' | 'other';
  forRole: 'student' | 'parent' | 'all';
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: 'Lớp mới khai giảng',
    content: 'Lớp IELTS 6.5 sẽ khai giảng vào 20/06. Đăng ký ngay!',
    createdAt: '2024-06-10T10:00:00',
    type: 'system',
    forRole: 'student',
    isRead: false,
  },
  {
    id: 2,
    title: 'Điểm danh',
    content: 'Bạn đã nghỉ buổi học ngày 08/06.',
    createdAt: '2024-06-08T19:00:00',
    type: 'attendance',
    forRole: 'student',
    isRead: false,
  },
  {
    id: 3,
    title: 'Thông báo từ giáo viên',
    content: 'Tuần sau kiểm tra giữa kỳ, các em chuẩn bị bài nhé!',
    createdAt: '2024-06-07T15:00:00',
    type: 'teacher',
    forRole: 'student',
    isRead: true,
  },
];

const NotificationBell: React.FC<{ userRole: 'student' | 'parent' }> = ({ userRole }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const open = Boolean(anchorEl);
  const filteredNotifications = notifications.filter(n => n.forRole === userRole || n.forRole === 'all');
  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => (n.forRole === userRole || n.forRole === 'all') ? { ...n, isRead: true } : n));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications(prev => prev.filter(n => !(n.forRole === userRole || n.forRole === 'all')));
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {unreadCount > 0 && (
          <FiberManualRecordIcon color="error" sx={{ fontSize: 12, ml: 0.5 }} />
        )}
        <IconButton color="inherit" onClick={handleOpen} size="large">
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{ sx: { minWidth: 340 } }}>
        <Box sx={{ px: 2, pt: 1, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Thông báo</Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>Đánh dấu đã đọc</Button>
            <Button size="small" color="error" onClick={handleDeleteAll} disabled={filteredNotifications.length === 0}>Xóa tất cả</Button>
          </Stack>
        </Box>
        {filteredNotifications.length === 0 && (
          <MenuItem disabled>
            <ListItemText primary="Không có thông báo mới" />
          </MenuItem>
        )}
        {filteredNotifications.map((n) => (
          <MenuItem
            key={n.id}
            selected={!n.isRead}
            sx={{ alignItems: 'flex-start', backgroundColor: !n.isRead ? 'rgba(25, 118, 210, 0.08)' : undefined }}
            onClick={() => handleMarkAsRead(n.id)}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
              <Box>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {!n.isRead && <FiberManualRecordIcon color="error" sx={{ fontSize: 12 }} />}
                  <Typography fontWeight={!n.isRead ? 600 : 400}>{n.title}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">{n.content}</Typography>
                <Typography variant="caption" color="text.secondary">{new Date(n.createdAt).toLocaleString('vi-VN')}</Typography>
              </Box>
              <Tooltip title="Xóa thông báo">
                <IconButton edge="end" size="small" color="error" onClick={e => { e.stopPropagation(); handleDelete(n.id); }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NotificationBell;
