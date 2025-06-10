export const getDefaultRoute = (role: 'admin' | 'teacher' | 'student' | 'parent'): string => {
  // Điều hướng tất cả actor về trang chủ
  return '/home';
}; 