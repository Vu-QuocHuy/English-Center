import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const HomePageContext = createContext(null);

const defaultHomePageState = {
  hero: {
    title: 'Học tiếng Anh hiệu quả',
    subtitle: 'Phương pháp học tập hiện đại, giúp bạn tự tin giao tiếp',
    backgroundImage: '/images/Banner-tieng-Anh.png',
    buttonText: 'Bắt đầu học ngay',
    buttonLink: '/login'
  },
  about: {
    title: 'Về chúng tôi',
    subtitle: 'Tìm hiểu thêm về English Center',
    sections: []
  },
  teachers: {
    title: 'Đội ngũ giảng viên',
    subtitle: 'Các giảng viên tiêu biểu',
    values: []
  },
  announcements: {
    enabled: true,
    popupDelay: 1000,
    bannerAds: [],
    popupAds: []
  },
  customSections: []
};

export const HomePageProvider = ({ children }) => {
  const [state, setState] = useState(defaultHomePageState);

  const updateHomePageData = useCallback((updatedData) => {
    setState((prev) => ({
      ...prev,
      ...updatedData
    }));
  }, []);

  const addCustomSection = useCallback((section) => {
    setState((prev) => ({
      ...prev,
      customSections: [...prev.customSections, section]
    }));
  }, []);

  const updateCustomSection = useCallback((updatedSection) => {
    setState((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === updatedSection.id ? { ...updatedSection } : section
      )
    }));
  }, []);

  const deleteCustomSection = useCallback((sectionId) => {
    setState((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((section) => section.id !== sectionId)
    }));
  }, []);

  const addCustomSectionItem = useCallback((sectionId, item) => {
    setState((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...(section.items || []), item] }
          : section
      )
    }));
  }, []);

  const updateCustomSectionItem = useCallback((sectionId, item) => {
    setState((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: (section.items || []).map((it) => (it.id === item.id ? { ...item } : it))
            }
          : section
      )
    }));
  }, []);

  const deleteCustomSectionItem = useCallback((sectionId, itemId) => {
    setState((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: (section.items || []).filter((it) => it.id !== itemId) }
          : section
      )
    }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      updateHomePageData,
      addCustomSection,
      updateCustomSection,
      deleteCustomSection,
      addCustomSectionItem,
      updateCustomSectionItem,
      deleteCustomSectionItem
    }),
    [state, updateHomePageData, addCustomSection, updateCustomSection, deleteCustomSection, addCustomSectionItem, updateCustomSectionItem, deleteCustomSectionItem]
  );

  return <HomePageContext.Provider value={value}>{children}</HomePageContext.Provider>;
};

export const useHomePage = () => {
  const ctx = useContext(HomePageContext);
  if (!ctx) {
    throw new Error('useHomePage must be used within a HomePageProvider');
  }
  return ctx;
};

// Named exports are already declared above; no re-exports needed


