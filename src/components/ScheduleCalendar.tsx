import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  List,
  ListItem,
  Paper,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/vi';
import updateLocale from 'dayjs/plugin/updateLocale';

// Cấu hình dayjs để sử dụng tiếng Việt và plugin updateLocale
dayjs.extend(updateLocale);
dayjs.updateLocale('vi', {
  weekdays: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  weekdaysShort: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  months: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
});
dayjs.locale('vi');

// Tùy chỉnh tên các ngày trong tuần
const weekDayNames = {
  0: 'Chủ nhật',
  1: 'Thứ 2',
  2: 'Thứ 3',
  3: 'Thứ 4',
  4: 'Thứ 5',
  5: 'Thứ 6',
  6: 'Thứ 7'
};

export interface Lesson {
  date: string;
  className: string;
  time: string;
  room: string;
  teacher?: string;
  type?: 'teacher' | 'student';
}

interface ScheduleCalendarProps {
  lessons: Lesson[];
  title: string;
  userType: 'teacher' | 'student';
}

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  width: '100%',
  maxWidth: 'none',
  margin: '0 auto',
  height: 'auto',
  [theme.breakpoints.up('sm')]: {
    minWidth: '600px',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '800px',
  },
  '& .MuiPickersCalendarHeader-root': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .MuiPickersCalendarHeader-label': {
    fontSize: '1.5rem',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    '& .MuiTypography-root': {
      fontSize: '1.5rem',
    },
  },
  '& .MuiDayCalendar-header': {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 auto',
  },
  '& .MuiDayCalendar-weekContainer': {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 auto',
    minHeight: '60px',
  },
  '& .MuiDayCalendar-weekDayLabel': {
    fontSize: '0.9rem',
    width: '100%',
    height: '40px',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'normal',
    padding: '4px',
    '&[aria-label*="Sunday"], &[aria-label*="Saturday"]': {
      color: theme.palette.error.main,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
  '& .MuiPickersDay-root': {
    fontSize: '1rem',
    width: '40px',
    height: '40px',
    margin: '4px auto',
    color: 'rgba(0, 0, 0, 0.87)',
    '&.MuiPickersDay-dayOutsideMonth': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '&.MuiPickersDay-today': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  '& .MuiPickersArrowSwitcher-button': {
    padding: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.54)',
    '& svg': {
      fontSize: '1.5rem',
    },
  },
}));

const ServerDay = ({ day, lessons, userType, ...other }: PickersDayProps<Dayjs> & { lessons: Lesson[], userType: 'teacher' | 'student' }) => {
  const hasLesson = lessons.some(l => {
    const isMatchingDay = dayjs(l.date).isSame(day, 'day');
    const isCorrectType = !l.type || l.type === userType;
    return isMatchingDay && isCorrectType;
  });
  const isWeekend = day.day() === 0 || day.day() === 6;

  return (
    <PickersDay<Dayjs>
      {...other}
      day={day}
      sx={{
        ...other.sx,
        position: 'relative',
        color: isWeekend ? 'error.main' : 'inherit',
        '&::after': hasLesson ? {
          content: '""',
          position: 'absolute',
          bottom: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '4px',
          backgroundColor: 'primary.main',
          borderRadius: '50%',
        } : {},
        '&.MuiPickersDay-today': {
          backgroundColor: 'primary.main',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        },
      }}
    />
  );
};

const ScheduleCalendar: React.FC<ScheduleCalendarProps> = ({ lessons, title, userType }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [open, setOpen] = useState(false);
  const [lessonsOfDay, setLessonsOfDay] = useState<Lesson[]>([]);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      const filteredLessons = lessons.filter(l => {
        const isMatchingDay = dayjs(l.date).isSame(date, 'day');
        const isCorrectType = !l.type || l.type === userType;
        return isMatchingDay && isCorrectType;
      });
      if (filteredLessons.length > 0) {
        setLessonsOfDay(filteredLessons);
        setOpen(true);
      }
    }
  };

  const formatWeekDay = (day: string, date: unknown) => {
    if (dayjs.isDayjs(date)) {
      return weekDayNames[date.day() as keyof typeof weekDayNames];
    }
    return day;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <Box sx={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        p: 2,
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          {title}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#f5f5f5',
            borderRadius: 4,
            height: 'auto',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <StyledDateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            slots={{
              day: (props: any) => (
                <ServerDay {...props} lessons={lessons} userType={userType} />
              ),
            }}
            showDaysOutsideCurrentMonth
            views={['day']}
            dayOfWeekFormatter={formatWeekDay}
          />
        </Paper>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { 
              borderRadius: 2,
              backgroundColor: '#ffebee',
            }
          }}
        >
          <DialogContent>
            <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f' }}>
              Lịch học {lessonsOfDay.length > 1 ? `(${lessonsOfDay.length})` : ''}
            </Typography>
            <List sx={{ p: 0 }}>
              {lessonsOfDay.map((lesson, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: 1,
                    px: 0,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    width: '100%',
                    alignItems: 'center',
                    mb: 1
                  }}>
                    <Typography sx={{ 
                      fontSize: '1.1rem',
                      color: '#d32f2f',
                      width: '120px'
                    }}>
                      {lesson.time}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: '1.1rem',
                      color: '#d32f2f',
                      flex: 1
                    }}>
                      {lesson.className}
                    </Typography>
                  </Box>
                  <Typography sx={{ 
                    fontSize: '1rem',
                    color: '#d32f2f',
                    pl: '120px'
                  }}>
                    {lesson.room}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default ScheduleCalendar;