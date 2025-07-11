export const API_CONFIG = {
  BASE_URL: 'https://eng-center-management.onrender.com/api/v1',
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-tokens',
      CHANGE_PASSWORD: '/auth/change-password',
      FORGOT_PASSWORD: '/auth/forgot-password',
      VERIFY_CODE: '/auth/verify-code',
      RESET_PASSWORD: '/auth/reset-password',
      VERIFY_EMAIL: '/auth/verify-email',
      SEND_VERIFICATION_EMAIL: '/auth/send-verification-email',
    },
    // User endpoints
    USERS: {
      GET_ALL: '/users',
      GET_BY_ID: (id) => `/users/${id}`,
      CREATE: '/users',
      UPDATE: (id) => `/users/${id}`,
      DELETE: (id) => `/users/${id}`,
      UPLOAD_AVATAR: '/users/me/avatar',
    },
    // Teacher endpoints
    TEACHERS: {
      GET_ALL: '/teachers',
      GET_BY_ID: (id) => `/teachers/${id}`,
      CREATE: '/teachers',
      UPDATE: (id) => `/teachers/${id}`,
      DELETE: (id) => `/teachers/${id}`,
      GET_MY_CLASSES: '/teachers/me/classes',
      GET_SCHEDULE: (id) => `/teachers/${id}/schedule`,
    },
    // Student endpoints
    STUDENTS: {
      GET_ALL: '/students',
      GET_BY_ID: (id) => `/students/${id}`,
      CREATE: '/students',
      UPDATE: (id) => `/students/${id}`,
      DELETE: (id) => `/students/${id}`,
      MONTHLY_CHANGES: '/students/monthly-changes',
      SCHEDULE: (id) => `/students/${id}/schedule`,
      ATTENDANCE: (id) => `/students/${id}/attendance`,
    },
    // Class endpoints
    CLASSES: {
      GET_ALL: '/classes',
      GET_BY_ID: (id) => `/classes/${id}`,
      CREATE: '/classes',
      UPDATE: (id) => `/classes/${id}`,
      DELETE: (id) => `/classes/${id}`,
      ENROLL_STUDENT: (id) => `/classes/${id}/students`,
      GET_STUDENTS: (id) => `/classes/${id}/students`,
      REMOVE_STUDENT: (id) => `/classes/${id}/students`,
      ASSIGN_TEACHER: (id) => `/classes/${id}/teacher`,
      UNASSIGN_TEACHER: (id) => `/classes/${id}/teacher`,
    },
    PARENTS: {
      CREATE: '/parents',
      GET_ALL: '/parents',
      GET_BY_ID: (id) => `/parents/${id}`,
      UPDATE: (id) => `/parents/${id}`,
      DELETE: (id) => `/parents/${id}`,
      ADD_CHILD: '/parents',
      REMOVE_CHILD: '/parents',
      PAY_TUITION: '/parents/pay-tuition',
    },
    ATTENDANCES: {
      GET_TODAY: (id) => `/attendances/${id}/today`,
      GET_LIST: '/attendances/all',
      UPDATE: (id) => `/attendances/${id}`,
      GET_BY_ID: (id) => `/attendances/${id}`,
    },
    PAYMENTS: {
      GET_ALL: '/payments',
      GET_BY_STUDENT: (studentId) => `/payments?studentId=${studentId}`,
      GET_TOTAL: '/payments/total',
      GET_TEACHER_PAYMENTS: '/teacher-payments',
      PAY_TEACHER: (id) => `/teacher-payments/${id}/pay`,
      GET_TEACHER_PAYMENT_BY_ID: (id) => `/teacher-payments/${id}`,
    },
    SCHEDULES: {
      GET_STUDENT_SCHEDULE: '/schedules/student/me',
    },
    ANNOUNCEMENTS: {
      CREATE: '/announcements',
      GET_ALL: '/announcements',
      GET_BY_ID: (id) => `/announcements/${id}`,
      UPDATE: (id) => `/announcements/${id}`,
      DELETE: (id) => `/announcements/${id}`,
    },
    DASHBOARD: {
      ADMIN: '/dashboard/admin',
      TEACHER: (id) => `/dashboard/teacher/${id}`,
      PARENT: (id) => `/dashboard/parent/${id}`,
      STUDENT: (id) => `/dashboard/student/${id}`,
    },
  },
};
