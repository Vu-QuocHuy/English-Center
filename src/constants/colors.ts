// Bảng màu chủ đạo - White Theme
export const COLORS = {
  // Màu chính - Trắng và các tone liên quan
  primary: {
    main: '#FFFFFF',           // Trắng thuần
    light: '#FAFAFA',          // Trắng nhạt
    lighter: '#F5F5F5',        // Xám trắng rất nhạt
    contrast: '#212121',       // Đen cho contrast
  },

  // Màu phụ - Xám để tạo depth
  secondary: {
    main: '#F8F9FA',           // Trắng xám
    light: '#E9ECEF',          // Xám rất nhạt
    dark: '#DEE2E6',           // Xám nhạt
    darker: '#CED4DA',         // Xám trung bình nhạt
  },

  // Màu accent - để tạo điểm nhấn
  accent: {
    primary: '#2196F3',        // Xanh dương nhẹ
    secondary: '#4CAF50',      // Xanh lá nhẹ
    tertiary: '#FF9800',       // Cam nhẹ
  },

  // Màu text
  text: {
    primary: '#212121',        // Đen chính
    secondary: '#757575',      // Xám đen
    disabled: '#BDBDBD',       // Xám nhạt
    hint: '#9E9E9E',           // Xám gợi ý
  },

  // Màu background
  background: {
    default: '#FFFFFF',        // Nền chính trắng
    paper: '#FAFAFA',          // Nền card/paper
    light: '#F5F5F5',          // Nền sáng
    dark: '#EEEEEE',           // Nền tối nhất (vẫn sáng)
  },

  // Màu viền
  border: {
    light: '#F0F0F0',          // Viền rất nhạt
    main: '#E0E0E0',           // Viền chính
    dark: '#BDBDBD',           // Viền đậm
  },

  // Màu trạng thái
  status: {
    success: {
      main: '#4CAF50',         // Xanh lá thành công
      light: '#E8F5E8',        // Nền xanh lá nhạt
      dark: '#388E3C',         // Xanh lá đậm
    },
    error: {
      main: '#F44336',         // Đỏ lỗi
      light: '#FFEBEE',        // Nền đỏ nhạt
      dark: '#D32F2F',         // Đỏ đậm
    },
    warning: {
      main: '#FF9800',         // Cam cảnh báo
      light: '#FFF3E0',        // Nền cam nhạt
      dark: '#F57C00',         // Cam đậm
    },
    info: {
      main: '#2196F3',         // Xanh dương thông tin
      light: '#E3F2FD',        // Nền xanh dương nhạt
      dark: '#1976D2',         // Xanh dương đậm
    },
  },

  // Màu overlay
  overlay: {
    light: 'rgba(255, 255, 255, 0.8)',   // Overlay trắng nhạt
    medium: 'rgba(255, 255, 255, 0.9)',  // Overlay trắng vừa
    dark: 'rgba(0, 0, 0, 0.1)',          // Overlay đen rất nhạt
    darker: 'rgba(0, 0, 0, 0.2)',        // Overlay đen nhạt
  },

  // Màu shadow
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',        // Bóng rất nhạt
    medium: 'rgba(0, 0, 0, 0.1)',        // Bóng vừa
    dark: 'rgba(0, 0, 0, 0.15)',         // Bóng đậm
  },

  // Màu gradient
  gradient: {
    primary: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
    secondary: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 100%)',
    accent: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
  },
} as const;

// Màu sắc cho các component cụ thể
export const COMPONENT_COLORS = {
  // Header/Navigation
  header: {
    background: COLORS.primary.main,
    text: COLORS.text.primary,
    border: COLORS.border.light,
  },

  // Sidebar
  sidebar: {
    background: COLORS.background.paper,
    text: COLORS.text.primary,
    hover: COLORS.secondary.light,
    active: COLORS.accent.primary,
  },

  // Card/Paper
  card: {
    background: COLORS.primary.main,
    border: COLORS.border.light,
    shadow: COLORS.shadow.light,
  },

  // Button
  button: {
    primary: {
      background: COLORS.accent.primary,
      text: COLORS.primary.main,
      hover: COLORS.accent.primary,
    },
    secondary: {
      background: COLORS.primary.main,
      text: COLORS.text.primary,
      border: COLORS.border.main,
    },
  },

  // Input/Form
  input: {
    background: COLORS.primary.main,
    border: COLORS.border.main,
    focus: COLORS.accent.primary,
    text: COLORS.text.primary,
    placeholder: COLORS.text.hint,
  },

  // Table
  table: {
    header: COLORS.secondary.light,
    row: COLORS.primary.main,
    rowAlt: COLORS.background.paper,
    border: COLORS.border.light,
    hover: COLORS.secondary.light,
  },
} as const;

// Export individual color palettes for convenience
export const PRIMARY_COLORS = COLORS.primary;
export const SECONDARY_COLORS = COLORS.secondary;
export const ACCENT_COLORS = COLORS.accent;
export const TEXT_COLORS = COLORS.text;
export const BACKGROUND_COLORS = COLORS.background;
export const STATUS_COLORS = COLORS.status;

// Utility function để lấy màu theo path
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let current: any = COLORS;
  
  for (const key of keys) {
    current = current[key];
    if (current === undefined) {
      console.warn(`Color path "${path}" not found`);
      return COLORS.primary.main; // Fallback to white
    }
  }
  
  return current;
};

// Utility function để tạo rgba từ hex
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default COLORS; 