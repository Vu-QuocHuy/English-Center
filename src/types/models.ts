export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  parentId: number;
  discountPercent: number; // Phần trăm giảm giá học phí
  status: 'active' | 'inactive';
}

export interface Parent {
  id: number;
  name: string;
  email: string;
  phone: string;
  children: Student[];
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
  month: number;
  year: number;
  status: 'pending' | 'partial' | 'paid';
  paidDate?: string;
}

export interface TeacherPayment {
  id: number;
  teacherId: number;
  classId: number;
  month: number;
  year: number;
  numberOfSessions: number;
  amount: number;
  status: 'pending' | 'paid';
  paidDate?: string;
} 