export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  parentId: number;
  discountPercent: number; // Phần trăm giảm giá học phí
  status: 'active' | 'inactive';
  enrolledClasses: StudentClassInfo[];
}

export interface StudentClassInfo {
  classId: number;
  className: string;
  teacherId: number;
  teacherName: string;
  startDate: string;
  endDate: string;
  tuitionFeePerSession: number; // Học phí gốc mỗi buổi
  actualFeePerSession: number; // Học phí thực tế sau giảm giá
  totalSessions: number;
  attendedSessions: number;
  absentSessions: number;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    room: string;
  };
  attendanceRecords: StudentAttendanceRecord[];
  monthlyPayments: MonthlyPayment[];
}

export interface StudentAttendanceRecord {
  id: number;
  date: string;
  status: 'present' | 'absent' | 'late';
  note?: string;
  sessionTopic?: string;
}

export interface MonthlyPayment {
  id: number;
  month: number;
  year: number;
  sessionsInMonth: number;
  originalAmount: number; // Số tiền gốc
  discountAmount: number; // Số tiền được giảm
  finalAmount: number; // Số tiền phải đóng sau giảm
  paidAmount: number; // Số tiền đã đóng
  remainingAmount: number; // Số tiền còn thiếu
  status: 'paid' | 'partial' | 'unpaid';
  paidDate?: string;
  note?: string;
}

export interface Parent {
  id: number;
  name: string;
  email: string;
  phone: string;
  children: {
    id: number;
    name: string;
  }[];
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  status: 'active' | 'inactive';
  salary: number; // Lương mỗi buổi dạy
}

export interface Class {
  id: number;
  name: string;
  year: number;
  grade: number; // Lớp (3, 4, 5,...)
  order: number; // Số thứ tự trong khối (1, 2, 3,...)
  teacherId: number;
  students: Student[];
  status: 'active' | 'closed' | 'upcoming';
  schedule: ClassSchedule[];
  maxStudents: number;
  tuitionFee: number; // Học phí mỗi buổi
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ClassSchedule {
  id: number;
  classId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface Attendance {
  id: number;
  classId: number;
  studentId: number;
  date: string;
  status: 'present' | 'absent';
  note?: string;
}

export interface Payment {
  id: number;
  studentId: number;
  classId: number;
  amount: number;
  discountAmount: number;
  paidAmount: number;
  status: 'pending' | 'partial' | 'paid';
  month: number;
  year: number;
  paidDate?: string;
}

export interface TeacherPayment {
  id: number;
  teacherId: number;
  teacherName: string;
  classId: number;
  month: number;
  year: number;
  numberOfSessions: number;
  amount: number;
  status: 'pending' | 'paid';
  paidDate?: string;
  classDetails: {
    classId: number;
    className: string;
    sessions: number;
  }[];
}

export interface FinancialPeriod {
  startDate: string;
  endDate: string;
  type: 'month' | 'quarter' | 'year' | 'custom';
}

export interface TeacherPaymentStats {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  teacherCount: number;
  sessionCount: number;
  payments: TeacherPayment[];
}

export interface StudentPaymentStats {
  expectedAmount: number;
  paidAmount: number;
  remainingAmount: number;
  studentCount: number;
  classCount: number;
  payments: StudentPayment[];
}

export interface FinancialStats {
  period: FinancialPeriod;
  teacherStats: TeacherPaymentStats;
  studentStats: StudentPaymentStats;
  profitStats: {
    expectedProfit: number;
    actualProfit: number;
  };
}

export interface StudentPayment {
  id: number;
  studentId: number;
  studentName: string;
  classId: number;
  className: string;
  expectedAmount: number;
  paidAmount: number;
  remainingAmount: number;
  lastPaymentDate?: string;
  status: 'paid' | 'partial' | 'pending';
}

export interface AttendanceRecord {
  studentId: number;
  status: 'present' | 'absent';
} 