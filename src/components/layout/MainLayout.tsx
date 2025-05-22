import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Dashboard as DashboardIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import NotificationBell from '../NotificationBell';

const drawerWidth = 240;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { text: 'Tổng quan', icon: <DashboardIcon />, path: '/admin/dashboard' },
          { text: 'Quản lý lớp học', icon: <SchoolIcon />, path: '/admin/classes' },
          { text: 'Quản lý giáo viên', icon: <PeopleIcon />, path: '/admin/teachers' },
          { text: 'Quản lý học sinh', icon: <PersonIcon />, path: '/admin/students' },
          { text: 'Quản lý phụ huynh', icon: <PeopleIcon />, path: '/admin/parents' },
          { text: 'Quản lý học phí', icon: <PaymentIcon />, path: '/admin/payments' },
          { text: 'Quản lý quảng cáo', icon: <DashboardIcon />, path: '/admin/ads' },
          { text: 'Quản lý lương giáo viên', icon: <PaymentIcon />, path: '/admin/teacher-payments' },
        ];
      case 'teacher':
        return [
          { text: 'Tổng quan', icon: <DashboardIcon />, path: '/teacher/dashboard' },
          { text: 'Lớp của tôi', icon: <SchoolIcon />, path: '/teacher/classes' },
          { text: 'Học sinh', icon: <PersonIcon />, path: '/teacher/students' },
          { text: 'Điểm danh', icon: <PaymentIcon />, path: '/teacher/attendance' },
          { text: 'Lịch làm việc', icon: <DashboardIcon />, path: '/teacher/schedule' },
        ];
      case 'parent':
        return [
          { text: 'Trang chủ', icon: <DashboardIcon />, path: '/parent/home' },
          { text: 'Tổng quan', icon: <DashboardIcon />, path: '/parent/dashboard' },
          { text: 'Thông tin con', icon: <PersonIcon />, path: '/parent/children' },
          { text: 'Điểm danh', icon: <PersonIcon />, path: '/parent/attendance' },
          { text: 'Học phí', icon: <PaymentIcon />, path: '/parent/payments' },
        ];
      case 'student':
        return [
          { text: 'Trang chủ', icon: <DashboardIcon />, path: '/student/home' },
          { text: 'Tổng quan', icon: <DashboardIcon />, path: '/student/dashboard' },
          { text: 'Lớp học của tôi', icon: <SchoolIcon />, path: '/student/classes' },
          { text: 'Lịch học', icon: <DashboardIcon />, path: '/student/schedule' },
        ];
      default:
        return [];
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: 'primary.dark' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.light' }}>
            {user?.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'white' }}>
              {user?.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'white' }}>
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
      <List>
        {getMenuItems().map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text}
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'white',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'primary.main',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Trung tâm Tiếng Anh
          </Typography>
          {user && (user.role === 'student' || user.role === 'parent') && (
            <NotificationBell userRole={user.role} />
          )}
          {user && (
            <Button 
              color="primary"
              onClick={logout}
              startIcon={<LogoutIcon />}
              variant="outlined"
              size="small"
            >
              Đăng xuất
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout; 