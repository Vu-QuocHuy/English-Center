import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import theme from './theme';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import Typography from '@mui/material/Typography';
import StudentSchedule from './pages/student/Schedule';
import TeacherSchedule from './pages/teacher/Schedule';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import LandingPage from './pages/LandingPage';

// Admin Pages
import ClassManagement from './pages/admin/ClassManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import StudentManagement from './pages/admin/StudentManagement';
import ParentManagement from './pages/admin/ParentManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import AdvertisementManagement from './pages/admin/AdvertisementManagement';
import FinancialStatistics from './pages/admin/FinancialStatistics';

// Teacher Pages
import MyClasses from './pages/teacher/MyClasses';

// Shared Pages
import Account from './pages/Account';

// Student Pages
import StudentTuition from './pages/student/Tuition';
import StudentProfile from './pages/student/Profile';

// Parent Pages
import ParentChildren from './pages/parent/Children';
import ParentPayments from './pages/parent/Payments';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <CssBaseline />
        <Router>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        user ? <Navigate to="/home" replace /> : <Login />
      } />
      
      <Route path="/" element={
        user ? <Navigate to="/home" replace /> : <LandingPage />
      } />

      {/* Protected Routes */}
      <Route path="/home" element={
        !user ? <Navigate to="/" replace /> : (
          <MainLayout showHomeNavigation={true}>
            <LandingPage showNavigation={false} />
          </MainLayout>
        )
      } />

      {/* Account Management - Available to all authenticated users */}
      <Route path="/account" element={
        !user ? <Navigate to="/" replace /> : (
          <MainLayout>
            <Account />
          </MainLayout>
        )
      } />

      {/* Admin Routes */}
      <Route path="/admin/*" element={
        !user ? <Navigate to="/" replace /> : (
          user.role !== 'admin' ? <Navigate to="/home" replace /> : (
            <MainLayout>
              <Routes>
                <Route path="classes" element={<ClassManagement />} />
                <Route path="teachers" element={<TeacherManagement />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="parents" element={<ParentManagement />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="ads" element={<AdvertisementManagement />} />
                <Route path="financial-statistics" element={<FinancialStatistics />} />
              </Routes>
            </MainLayout>
          )
        )
      } />

      {/* Teacher Routes */}
      <Route path="/teacher/*" element={
        !user ? <Navigate to="/" replace /> : (
          user.role !== 'teacher' ? <Navigate to="/home" replace /> : (
            <MainLayout>
              <Routes>
                <Route path="my-classes" element={<MyClasses />} />
                <Route path="schedule" element={<TeacherSchedule />} />
              </Routes>
            </MainLayout>
          )
        )
      } />

      {/* Student Routes */}
      <Route path="/student/*" element={
        !user ? <Navigate to="/" replace /> : (
          user.role !== 'student' ? <Navigate to="/home" replace /> : (
            <MainLayout>
              <Routes>
                <Route path="schedule" element={<StudentSchedule />} />
                <Route path="tuition" element={<StudentTuition />} />
                <Route path="profile" element={<StudentProfile />} />
              </Routes>
            </MainLayout>
          )
        )
      } />

      {/* Parent Routes */}
      <Route path="/parent/*" element={
        !user ? <Navigate to="/" replace /> : (
          user.role !== 'parent' ? <Navigate to="/home" replace /> : (
            <MainLayout>
              <Routes>
                <Route path="children" element={<ParentChildren />} />
                <Route path="payments" element={<ParentPayments />} />
              </Routes>
            </MainLayout>
          )
        )
      } />
    </Routes>
  );
};

export default App;