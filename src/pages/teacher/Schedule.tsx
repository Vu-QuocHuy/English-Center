import React from 'react';
import ScheduleCalendar, { Lesson } from '../../components/ScheduleCalendar';

const mockLessons: Lesson[] = [
  { 
    date: '2024-06-03', 
    className: 'IELTS 6.5', 
    time: '18:00 - 19:30', 
    room: 'A1', 
    type: 'teacher' as const
  },
  { 
    date: '2024-06-10', 
    className: 'IELTS 6.5', 
    time: '18:00 - 19:30', 
    room: 'A1', 
    type: 'teacher' as const
  },
  { 
    date: '2024-06-06', 
    className: 'Giao tiếp nâng cao', 
    time: '18:00 - 19:30', 
    room: 'B2', 
    type: 'teacher' as const
  },
  { 
    date: '2024-06-13', 
    className: 'Giao tiếp nâng cao', 
    time: '18:00 - 19:30', 
    room: 'B2', 
    type: 'teacher' as const
  },
  // Thêm mock data cho lịch học sinh
  { 
    date: '2024-06-03', 
    className: 'IELTS 6.5', 
    time: '14:00 - 15:30', 
    room: 'C1', 
    type: 'student' 
  },
  { 
    date: '2024-06-07', 
    className: 'Giao tiếp cơ bản', 
    time: '16:00 - 17:30', 
    room: 'C2', 
    type: 'student' 
  },
];

const TeacherSchedule: React.FC = () => {
  return (
    <ScheduleCalendar
      lessons={mockLessons}
      title="Lịch dạy của tôi"
      userType="teacher"
    />
  );
};

export default TeacherSchedule; 