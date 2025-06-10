import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  useTheme,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  CalendarMonth as CalendarMonthIcon,
  Assessment as AssessmentIcon,
  Campaign as CampaignIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import NotificationBell from '../NotificationBell';
import WelcomeAdPopup from '../WelcomeAdPopup';
import COLORS from '../../constants/colors';

interface MainLayoutProps {
  children: React.ReactNode;
  showHomeNavigation?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showHomeNavigation = false }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showWelcomeAd, setShowWelcomeAd] = useState(false);
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  // Hiển thị popup quảng cáo khi user đăng nhập
  React.useEffect(() => {
    if (user) {
      // Hiển thị ngay lập tức khi đăng nhập
      setShowWelcomeAd(true);
    }
  }, [user]);

  const handleCloseWelcomeAd = () => {
    setShowWelcomeAd(false);
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { text: 'Trang chủ', icon: <HomeIcon />, path: '/home' },
          { text: 'Quản lý lớp học', icon: <SchoolIcon />, path: '/admin/classes' },
          { text: 'Quản lý giáo viên', icon: <PeopleIcon />, path: '/admin/teachers' },
          { text: 'Quản lý học sinh', icon: <PersonIcon />, path: '/admin/students' },
          { text: 'Quản lý phụ huynh', icon: <PeopleIcon />, path: '/admin/parents' },
          { text: 'Thống kê tài chính', icon: <AssessmentIcon />, path: '/admin/financial-statistics' },
          { text: 'Quản lý thanh toán', icon: <PaymentIcon />, path: '/admin/payments' },
          { text: 'Quản lý quảng cáo', icon: <CampaignIcon />, path: '/admin/ads' },
          { text: 'Quản lý tài khoản', icon: <AccountCircleIcon />, path: '/account' },
        ];
      case 'teacher':
        return [
          { text: 'Trang chủ', icon: <HomeIcon />, path: '/home' },
          { text: 'Lớp của tôi', icon: <SchoolIcon />, path: '/teacher/my-classes' },
          { text: 'Lịch làm việc', icon: <CalendarMonthIcon />, path: '/teacher/schedule' },
          { text: 'Quản lý tài khoản', icon: <AccountCircleIcon />, path: '/account' },
        ];
      case 'parent':
        return [
          { text: 'Trang chủ', icon: <HomeIcon />, path: '/home' },
          { text: 'Quản lý con em', icon: <PeopleIcon />, path: '/parent/children' },
          { text: 'Học phí', icon: <PaymentIcon />, path: '/parent/payments' },
          { text: 'Quản lý tài khoản', icon: <AccountCircleIcon />, path: '/account' },
        ];
      case 'student':
        return [
          { text: 'Trang chủ', icon: <HomeIcon />, path: '/home' },
          { text: 'Thời khóa biểu', icon: <CalendarMonthIcon />, path: '/student/schedule' },
          { text: 'Học phí', icon: <PaymentIcon />, path: '/student/tuition' },
          { text: 'Thông tin cá nhân', icon: <PersonIcon />, path: '/student/profile' },
          { text: 'Quản lý tài khoản', icon: <AccountCircleIcon />, path: '/account' },
        ];
      default:
        return [];
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: '100%',
          backgroundColor: COLORS.primary.main,
          color: COLORS.text.primary,
          borderBottom: `1px solid ${COLORS.border.light}`,
          boxShadow: COLORS.shadow.light,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              color: COLORS.text.primary,
              fontWeight: 600,
              transition: theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            English Center
          </Typography>
          
          {/* Home Navigation Links */}
          {showHomeNavigation && (
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              ml: 4,
              flexGrow: 1,
            }}>
              <Button 
                href="#courses"
                sx={{ 
                  color: COLORS.text.primary,
                  '&:hover': {
                    backgroundColor: COLORS.secondary.light,
                  },
                }}
              >
                Khóa học
              </Button>
              <Button 
                href="#testimonials"
                sx={{ 
                  color: COLORS.text.primary,
                  '&:hover': {
                    backgroundColor: COLORS.secondary.light,
                  },
                }}
              >
                Đánh giá
              </Button>
              <Button 
                href="#contact"
                sx={{ 
                  color: COLORS.text.primary,
                  '&:hover': {
                    backgroundColor: COLORS.secondary.light,
                  },
                }}
              >
                Liên hệ
              </Button>
            </Box>
          )}
          
          {!showHomeNavigation && (
            <Box sx={{ flexGrow: 1 }} />
          )}
          
          {user && (user.role === 'student' || user.role === 'parent') && (
            <NotificationBell userRole={user.role} />
          )}
          {user && (
            <>
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ 
                  bgcolor: COLORS.accent.primary, 
                  color: COLORS.primary.main,
                  width: 35, 
                  height: 35 
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    minWidth: 250,
                    mt: 1.5,
                    backgroundColor: COLORS.primary.main,
                    border: `1px solid ${COLORS.border.light}`,
                    boxShadow: COLORS.shadow.medium,
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: COLORS.text.primary }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.text.secondary }}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: COLORS.border.light }} />
                
                {getMenuItems().map((item) => (
                  <MenuItem 
                    key={item.text}
                    onClick={() => {
                      navigate(item.path);
                      handleUserMenuClose();
                    }}
                    sx={{
                      color: COLORS.text.primary,
                      backgroundColor: location.pathname === item.path ? COLORS.secondary.light : 'transparent',
                      '&:hover': {
                        backgroundColor: COLORS.secondary.light,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: COLORS.text.secondary }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </MenuItem>
                ))}
                
                <Divider sx={{ borderColor: COLORS.border.light }} />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{
                    color: COLORS.status.error.main,
                    '&:hover': {
                      backgroundColor: COLORS.status.error.light,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: COLORS.status.error.main }}>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Đăng xuất" />
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: COLORS.background.default,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          display: 'flex',
          flexDirection: 'column',
          pl: 2,
        }}
      >
        <Toolbar />
        <Box sx={{ 
          py: 3,
          pr: 3,
          flexGrow: 1,
          maxWidth: '1600px',
          width: '100%',
          margin: '0 auto',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
        }}>
          {children}
        </Box>
      </Box>

      {/* Welcome Ad Popup */}
      <WelcomeAdPopup
        open={showWelcomeAd}
        onClose={handleCloseWelcomeAd}
      />
    </Box>
  );
};

export default MainLayout;