type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export const getDefaultRoute = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'teacher':
      return '/teacher/classes';
    case 'student':
      return '/student/dashboard';
    case 'parent':
      return '/parent/children';
    default:
      return '/';
  }
}; 