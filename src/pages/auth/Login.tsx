import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { getDefaultRoute } from '../../utils/routeUtils';
import COLORS from '../../constants/colors';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await login(email, password, role);
      const defaultRoute = getDefaultRoute(role as 'admin' | 'teacher' | 'student' | 'parent');
      navigate(defaultRoute);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    return email && password && !emailError && !passwordError;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: COLORS.background.light,
        backgroundImage: COLORS.gradient.secondary,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            backgroundColor: COLORS.primary.main,
            border: `1px solid ${COLORS.border.light}`,
            boxShadow: COLORS.shadow.medium,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 600,
              color: COLORS.accent.primary,
              textAlign: 'center',
            }}
          >
            English Center
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              color: COLORS.text.secondary,
              textAlign: 'center',
              fontWeight: 400,
            }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                backgroundColor: COLORS.status.error.light,
                color: COLORS.status.error.dark,
                border: `1px solid ${COLORS.status.error.main}`,
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: COLORS.primary.main,
                  '& fieldset': {
                    borderColor: COLORS.border.main,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.accent.primary,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: COLORS.accent.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: COLORS.text.secondary,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: COLORS.accent.primary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon 
                      sx={{ 
                        color: emailError ? COLORS.status.error.main : COLORS.accent.primary 
                      }} 
                    />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: COLORS.primary.main,
                  '& fieldset': {
                    borderColor: COLORS.border.main,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.accent.primary,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: COLORS.accent.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: COLORS.text.secondary,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: COLORS.accent.primary,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon 
                      sx={{ 
                        color: passwordError ? COLORS.status.error.main : COLORS.accent.primary 
                      }} 
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ 
                        color: COLORS.text.secondary,
                        '&:hover': {
                          color: COLORS.accent.primary,
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControl 
              fullWidth 
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: COLORS.primary.main,
                  '& fieldset': {
                    borderColor: COLORS.border.main,
                  },
                  '&:hover fieldset': {
                    borderColor: COLORS.accent.primary,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: COLORS.accent.primary,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: COLORS.text.secondary,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: COLORS.accent.primary,
                },
              }}
            >
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  color: COLORS.text.primary,
                }}
              >
                <MenuItem value="admin">Administrator</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="parent">Parent</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isFormValid()}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: COLORS.accent.primary,
                color: COLORS.primary.main,
                border: 'none',
                boxShadow: COLORS.shadow.light,
                '&:hover': {
                  backgroundColor: COLORS.accent.primary,
                  boxShadow: COLORS.shadow.medium,
                  transform: 'translateY(-1px)',
                },
                '&:disabled': {
                  backgroundColor: COLORS.text.disabled,
                  color: COLORS.primary.main,
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;