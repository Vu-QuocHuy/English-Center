import React, { useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Mock data các buổi dạy trong tháng
const mockLessons = [
  { date: '2024-06-03', className: 'IELTS 6.5', time: '18:00 - 19:30', room: 'A1' },
  { date: '2024-06-10', className: 'IELTS 6.5', time: '18:00 - 19:30', room: 'A1' },
  { date: '2024-06-06', className: 'Giao tiếp nâng cao', time: '18:00 - 19:30', room: 'B2' },
  { date: '2024-06-13', className: 'Giao tiếp nâng cao', time: '18:00 - 19:30', room: 'B2' },
];

const TeacherSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [open, setOpen] = useState(false);
  const [lessonsOfDay, setLessonsOfDay] = useState<any[]>([]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    const lessons = mockLessons.filter(l => dayjs(l.date).isSame(date, 'day'));
    setLessonsOfDay(lessons);
    setOpen(lessons.length > 0);
  };

  // Đánh dấu ngày có lớp
  function ServerDay(props: any) {
    const { day, outsideCurrentMonth, ...other } = props;
    const hasLesson = mockLessons.some(l => dayjs(l.date).isSame(day, 'day'));

    return (
      <Box sx={{ position: 'relative' }}>
        <PickersDay 
          {...other} 
          outsideCurrentMonth={outsideCurrentMonth} 
          day={day}
        />
        {hasLesson && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              bgcolor: 'primary.main',
              borderRadius: '50%'
            }}
          />
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Lịch làm việc của tôi</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          slots={{
            day: ServerDay
          }}
          loading={false}
          renderLoading={() => <DayCalendarSkeleton />}
        />
      </LocalizationProvider>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Thông tin lớp dạy</DialogTitle>
        <DialogContent>
          <List>
            {lessonsOfDay.map((l, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={l.className}
                  secondary={`Giờ học: ${l.time} | Phòng: ${l.room}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TeacherSchedule; 