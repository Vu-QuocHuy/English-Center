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

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ClassManagement from './pages/admin/ClassManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import StudentManagement from './pages/admin/StudentManagement';
import ParentManagement from './pages/admin/ParentManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import Reports from './pages/admin/Reports';
import AdvertisementManagement from './pages/admin/AdvertisementManagement';
import TeacherPaymentManagement from './pages/admin/TeacherPaymentManagement';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherClasses from './pages/teacher/Classes';
import TeacherAttendance from './pages/teacher/Attendance';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentClasses from './pages/student/Classes';
import StudentHome from './pages/student/Home';

// Parent Pages
import ParentDashboard from './pages/parent/Dashboard';
import ParentChildren from './pages/parent/Children';
import ParentAttendance from './pages/parent/Attendance';
import ParentPayments from './pages/parent/Payments';
import ParentHome from './pages/parent/Home';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'teacher' | 'student' | 'parent')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <AdminDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/classes"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <ClassManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/teachers"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <TeacherManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/students"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <StudentManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/parents"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <ParentManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <PaymentManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <Reports />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/ads"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <AdvertisementManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/teacher-payments"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout>
                      <TeacherPaymentManagement />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Teacher Routes */}
              <Route
                path="/teacher/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MainLayout>
                      <TeacherDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/classes"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MainLayout>
                      <TeacherClasses />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/attendance"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MainLayout>
                      <TeacherAttendance />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/students"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MainLayout>
                      <Typography variant="h4">Danh sách học sinh</Typography>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/schedule"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <MainLayout>
                      <TeacherSchedule />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MainLayout>
                      <StudentDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/classes"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MainLayout>
                      <Typography variant="h4">Lớp học của tôi</Typography>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/home"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MainLayout>
                      <StudentHome />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/schedule"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MainLayout>
                      <StudentSchedule />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Parent Routes */}
              <Route
                path="/parent/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <ParentDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent/children"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <ParentChildren />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent/attendance"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <ParentAttendance />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent/payments"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <ParentPayments />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent/home"
                element={
                  <ProtectedRoute allowedRoles={['parent']}>
                    <MainLayout>
                      <ParentHome />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Default Route */}
              <Route
                path="/"
                element={
                  <Navigate to="/login" />
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App; 