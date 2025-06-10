export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  class_ids: string[];
  parent_id?: string;
  attendance_records?: AttendanceRecord[];
}

export interface Parent extends User {
  role: 'parent';
  children_ids: string[];
  payment_records?: PaymentRecord[];
}

export interface Teacher extends User {
  role: 'teacher';
  class_ids: string[];
  subjects: string[];
  schedule?: Schedule[];
}

export interface Admin extends User {
  role: 'admin';
}

export interface AttendanceRecord {
  id: string;
  class_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  note?: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
}

export interface Schedule {
  id: string;
  class_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  room: string;
} 