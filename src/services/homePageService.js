import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Lấy dữ liệu trang chủ
export const getHomePageDataAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage`);
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    throw error;
  }
};

// Cập nhật dữ liệu trang chủ
export const updateHomePageDataAPI = async (homePageData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/homepage`, homePageData);
    return response.data;
  } catch (error) {
    console.error('Error updating homepage data:', error);
    throw error;
  }
};

// Lấy cấu hình hero section
export const getHeroSectionAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/hero`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    throw error;
  }
};

// Cập nhật hero section
export const updateHeroSectionAPI = async (heroData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/homepage/hero`, heroData);
    return response.data;
  } catch (error) {
    console.error('Error updating hero section:', error);
    throw error;
  }
};

// Lấy cấu hình about section
export const getAboutSectionAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/about`);
    return response.data;
  } catch (error) {
    console.error('Error fetching about section:', error);
    throw error;
  }
};

// Cập nhật about section
export const updateAboutSectionAPI = async (aboutData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/homepage/about`, aboutData);
    return response.data;
  } catch (error) {
    console.error('Error updating about section:', error);
    throw error;
  }
};

// Lấy cấu hình teachers section
export const getTeachersSectionAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/teachers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers section:', error);
    throw error;
  }
};

// Cập nhật teachers section
export const updateTeachersSectionAPI = async (teachersData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/homepage/teachers`, teachersData);
    return response.data;
  } catch (error) {
    console.error('Error updating teachers section:', error);
    throw error;
  }
};

// Lấy cấu hình announcements
export const getAnnouncementsConfigAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/announcements`);
    return response.data;
  } catch (error) {
    console.error('Error fetching announcements config:', error);
    throw error;
  }
};

// Cập nhật cấu hình announcements
export const updateAnnouncementsConfigAPI = async (announcementsData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/homepage/announcements`, announcementsData);
    return response.data;
  } catch (error) {
    console.error('Error updating announcements config:', error);
    throw error;
  }
};

// Upload ảnh cho trang chủ
export const uploadHomePageImageAPI = async (file, type) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    
    const response = await axios.post(`${API_BASE_URL}/homepage/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading homepage image:', error);
    throw error;
  }
};

// Lấy preview trang chủ
export const getHomePagePreviewAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/preview`);
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage preview:', error);
    throw error;
  }
};

// Publish thay đổi trang chủ
export const publishHomePageAPI = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/homepage/publish`);
    return response.data;
  } catch (error) {
    console.error('Error publishing homepage:', error);
    throw error;
  }
};

// Lấy lịch sử thay đổi trang chủ
export const getHomePageHistoryAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/homepage/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage history:', error);
    throw error;
  }
};

// Khôi phục phiên bản trang chủ
export const restoreHomePageVersionAPI = async (versionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/homepage/restore/${versionId}`);
    return response.data;
  } catch (error) {
    console.error('Error restoring homepage version:', error);
    throw error;
  }
};

