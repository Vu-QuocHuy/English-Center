import React from 'react';
import ScheduleCalendar, { Lesson } from '../../components/ScheduleCalendar';

// Mock data các buổi học trong tháng
const mockLessons: Lesson[] = [
  {
    date: '2024-06-03',
    className: 'IELTS 6.5',
    time: '18:00 - 19:30',
    teacher: 'Nguyễn Văn A',
    room: 'P.201',
    type: 'student' as const
  },
  {
    date: '2024-06-10',
    className: 'IELTS 6.5',
    time: '18:00 - 19:30',
    teacher: 'Nguyễn Văn A',
    room: 'P.201',
    type: 'student' as const
  },
  {
    date: '2024-06-06',
    className: 'Giao tiếp nâng cao',
    time: '18:00 - 19:30',
    teacher: 'Trần Thị B',
    room: 'P.302',
    type: 'student' as const
  },
  {
    date: '2024-06-13',
    className: 'Giao tiếp nâng cao',
    time: '18:00 - 19:30',
    teacher: 'Trần Thị B',
    room: 'P.302',
    type: 'student' as const
  },
];

const StudentSchedule: React.FC = () => {
  return (
    <ScheduleCalendar
      lessons={mockLessons}
      title="Lịch học của tôi"
      userType="student"
    />
  );
};

export default StudentSchedule; 