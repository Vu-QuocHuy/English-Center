import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Avatar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Security
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';
import { loginValidationSchema } from '../../validations/loginValidation';
import { getDashboardPath } from '../../utils/helpers';
import { USER_ROLES } from '../../utils/constants';

const StaffLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, error: authError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [roleError, setRoleError] = useState('');

  const from = location.state?.from?.pathname || '/';
  const message = location.state?.message;

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    setIsSubmitting,
    validate
  } = useForm(
    {
      email: '',
      password: ''
    },
    loginValidationSchema
  );

  // Autofill fix: đồng bộ giá trị input khi trình duyệt tự động điền
  useEffect(() => {
    const emailInput = document.getElementById('staff-email');
    const passwordInput = document.getElementById('staff-password');
    // Nếu input có value mà state chưa có, cập nhật lại state
    if (emailInput && emailInput.value && values.email !== emailInput.value) {
      handleChange({ target: { name: 'email', value: emailInput.value } });
    }
    if (passwordInput && passwordInput.value && values.password !== passwordInput.value) {
      handleChange({ target: { name: 'password', value: passwordInput.value } });
    }
    // Lắng nghe sự kiện autofill (có thể lặp lại khi trình duyệt autofill sau render)
    const autofillInterval = setInterval(() => {
      if (emailInput && emailInput.value && values.email !== emailInput.value) {
        handleChange({ target: { name: 'email', value: emailInput.value } });
      }
      if (passwordInput && passwordInput.value && values.password !== passwordInput.value) {
        handleChange({ target: { name: 'password', value: passwordInput.value } });
      }
    }, 500);
    return () => clearInterval(autofillInterval);
  }, [values.email, values.password, handleChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    const isValid = validate();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login({
        email: values.email,
        password: values.password
      });

      if (result && result.user) {
        const userRole = result.user.role;
        
        // Kiểm tra xem user có phải là admin hoặc teacher không
        if (userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.TEACHER) {
          setRoleError('');
          navigate(getDashboardPath(userRole), { replace: true });
        } else {
          // Nếu không phải admin/teacher, hiển thị lỗi
          clearError();
          setRoleError('Tài khoản này không có quyền truy cập vào hệ thống quản lý. Vui lòng sử dụng trang đăng nhập thông thường.');
          // Logout để xóa session
          logout();
        }
      }
    } catch (error) {
      console.error('Login failed with error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url(/images/admin-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: 0
      }
    }}>
      <Container component="main" maxWidth="sm" sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Card sx={{
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          borderRadius: 4,
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.98)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <CardContent sx={{ p: 5 }}>
            {/* Header với icon và title */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Avatar sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                mb: 2,
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }}>
                <Security sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                Hệ thống Quản lý
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center" sx={{ maxWidth: 350 }}>
                Đăng nhập dành cho Quản trị viên và Giáo viên
              </Typography>
            </Box>

            {authError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {authError}
              </Alert>
            )}
            
            {roleError && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {roleError}
              </Alert>
            )}
            
            {message && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="staff-email"
                label="Email công việc"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                    '&.Mui-focused fieldset': {
                      borderColor: '#1e3c72',
                      boxShadow: 'none',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                    },
                    '&.Mui-autofill': {
                      backgroundColor: 'white !important',
                      WebkitBoxShadow: '0 0 0 100px white inset !important',
                      WebkitTextFillColor: '#222 !important',
                      'color': '#222 !important',
                    },
                    '&.Mui-autofill:hover': {
                      backgroundColor: 'white !important',
                    },
                    '&.Mui-autofill:focus': {
                      backgroundColor: 'white !important',
                    }
                  },
                  '& .MuiInputBase-input': {
                    '&:-webkit-autofill': {
                      backgroundColor: 'white !important',
                      WebkitBoxShadow: '0 0 0 100px white inset !important',
                      WebkitTextFillColor: '#222 !important',
                      'color': '#222 !important',
                    }
                  }
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                id="staff-password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'white',
                    '&.Mui-focused fieldset': {
                      borderColor: '#1e3c72',
                      boxShadow: 'none',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                    },
                    '&.Mui-autofill': {
                      backgroundColor: 'white !important',
                      WebkitBoxShadow: '0 0 0 100px white inset !important',
                      WebkitTextFillColor: '#222 !important',
                      'color': '#222 !important',
                    },
                    '&.Mui-autofill:hover': {
                      backgroundColor: 'white !important',
                    },
                    '&.Mui-autofill:focus': {
                      backgroundColor: 'white !important',
                    }
                  },
                  '& .MuiInputBase-input': {
                    '&:-webkit-autofill': {
                      backgroundColor: 'white !important',
                      WebkitBoxShadow: '0 0 0 100px white inset !important',
                      WebkitTextFillColor: '#222 !important',
                      'color': '#222 !important',
                    }
                  },
                  // Hide browser's default password visibility icon
                  '& input[type="password"]::-ms-reveal': {
                    display: 'none',
                  },
                  '& input[type="password"]::-ms-clear': {
                    display: 'none',
                  },
                  '& input[type="password"]::-webkit-contacts-auto-fill-button': {
                    display: 'none',
                  },
                  '& input[type="password"]::-webkit-credentials-auto-fill-button': {
                    display: 'none',
                  }
                }}
              />

              {/* Nút quên mật khẩu */}
              <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    color: 'primary.main',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(30, 60, 114, 0.04)',
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={() => navigate('/forgot-password')}
                >
                  Quên mật khẩu?
                </Button>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    transform: 'translateY(-1px)',
                    background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Đăng nhập Hệ thống Quản lý'
                )}
              </Button>

              {/* Divider */}
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="textSecondary">
                  hoặc
                </Typography>
              </Divider>

              {/* Link về trang đăng nhập thông thường */}
              <Box textAlign="center">
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  Bạn là học sinh hoặc phụ huynh?
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/login')}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(30, 60, 114, 0.04)'
                    }
                  }}
                >
                  Đăng nhập thông thường
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default StaffLogin;
