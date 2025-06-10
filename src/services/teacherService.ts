import { Class, Attendance, AttendanceRecord } from '../types/models';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const teacherService = {
  async getMyClasses(): Promise<Class[]> {
    const response = await axios.get(`${BASE_URL}/api/teacher/classes`);
    return response.data;
  },

  async getClassAttendance(classId: number, date: string): Promise<Attendance[]> {
    const response = await axios.get(`${BASE_URL}/api/teacher/attendance`, {
      params: {
        classId,
        date,
      },
    });
    return response.data;
  },

  async saveAttendance(classId: number, date: string, records: AttendanceRecord[]): Promise<void> {
    await axios.post(`${BASE_URL}/api/teacher/attendance`, {
      classId,
      date,
      records,
    });
  },

  async getClassDetails(classId: number): Promise<Class> {
    const response = await axios.get(`${BASE_URL}/api/teacher/classes/${classId}`);
    return response.data;
  },
}; 