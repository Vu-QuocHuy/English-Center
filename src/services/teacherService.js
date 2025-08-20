import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Lấy danh sách giáo viên tiêu biểu
export const getFeaturedTeachersAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured teachers:', error);
    throw error;
  }
};

// Lấy thông tin chi tiết giáo viên
export const getTeacherDetailAPI = async (teacherId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher detail:', error);
    throw error;
  }
};

// Lấy danh sách tất cả giáo viên (cho admin)
export const getAllTeachersAPI = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching all teachers:', error);
    throw error;
  }
};

// Tạo giáo viên mới (cho admin)
export const createTeacherAPI = async (teacherData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teachers`, teacherData);
    return response.data;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

// Cập nhật thông tin giáo viên (cho admin)
export const updateTeacherAPI = async (teacherId, teacherData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/teachers/${teacherId}`, teacherData);
    return response.data;
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

// Xóa giáo viên (cho admin)
export const deleteTeacherAPI = async (teacherId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/teachers/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};

// Lấy lịch dạy của giáo viên
export const getTeacherScheduleAPI = async (teacherId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/${teacherId}/schedule`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher schedule:', error);
    throw error;
  }
};

// Lấy danh sách lớp học của giáo viên
export const getTeacherClassesAPI = async (teacherId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/${teacherId}/classes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher classes:', error);
    throw error;
  }
};

// Lấy thống kê của giáo viên
export const getTeacherStatsAPI = async (teacherId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/${teacherId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teacher stats:', error);
    throw error;
  }
};

