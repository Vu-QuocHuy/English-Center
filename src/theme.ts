import { createTheme } from '@mui/material/styles';
import COLORS from './constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.accent.primary,        // Xanh dương làm màu chính
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: COLORS.primary.main,  // Text trắng trên nền xanh
    },
    secondary: {
      main: COLORS.accent.secondary,      // Xanh lá làm màu phụ
      light: '#81c784',
      dark: '#388e3c',
      contrastText: COLORS.primary.main,
    },
    background: {
      default: COLORS.background.default, // Nền chính trắng
      paper: COLORS.background.paper,     // Nền paper trắng nhạt
    },
    text: {
      primary: COLORS.text.primary,       // Text đen chính
      secondary: COLORS.text.secondary,   // Text xám
      disabled: COLORS.text.disabled,     // Text disabled
    },
    success: {
      main: COLORS.status.success.main,
      light: COLORS.status.success.light,
      dark: COLORS.status.success.dark,
    },
    warning: {
      main: COLORS.status.warning.main,
      light: COLORS.status.warning.light,
      dark: COLORS.status.warning.dark,
    },
    error: {
      main: COLORS.status.error.main,
      light: COLORS.status.error.light,
      dark: COLORS.status.error.dark,
    },
    info: {
      main: COLORS.status.info.main,
      light: COLORS.status.info.light,
      dark: COLORS.status.info.dark,
    },
    divider: COLORS.border.light,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
      color: COLORS.text.primary,
    },
    h5: {
      fontWeight: 500,
      color: COLORS.text.primary,
    },
    h6: {
      fontWeight: 500,
      color: COLORS.text.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          backgroundColor: COLORS.accent.primary,
          color: COLORS.primary.main,
          '&:hover': {
            backgroundColor: COLORS.accent.primary,
            boxShadow: COLORS.shadow.medium,
          },
        },
        outlined: {
          borderColor: COLORS.border.main,
          color: COLORS.text.primary,
          '&:hover': {
            backgroundColor: COLORS.secondary.light,
            borderColor: COLORS.accent.primary,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: COLORS.primary.main,
            '& fieldset': {
              borderColor: COLORS.border.main,
            },
            '&:hover fieldset': {
              borderColor: COLORS.accent.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: COLORS.accent.primary,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: COLORS.background.paper,
          boxShadow: COLORS.shadow.light,
          border: `1px solid ${COLORS.border.light}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: COLORS.primary.main,
          boxShadow: COLORS.shadow.light,
          border: `1px solid ${COLORS.border.light}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.primary.main,
          color: COLORS.text.primary,
          boxShadow: COLORS.shadow.light,
          borderBottom: `1px solid ${COLORS.border.light}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: COLORS.background.paper,
          color: COLORS.text.primary,
          borderRight: `1px solid ${COLORS.border.light}`,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.primary.main,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.secondary.light,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: COLORS.background.paper,
          },
          '&:hover': {
            backgroundColor: COLORS.secondary.light,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: COLORS.border.light,
        },
        head: {
          backgroundColor: COLORS.secondary.light,
          color: COLORS.text.primary,
          fontWeight: 600,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: COLORS.primary.main,
          border: `1px solid ${COLORS.border.light}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: COLORS.status.success.light,
          color: COLORS.status.success.dark,
        },
        standardError: {
          backgroundColor: COLORS.status.error.light,
          color: COLORS.status.error.dark,
        },
        standardWarning: {
          backgroundColor: COLORS.status.warning.light,
          color: COLORS.status.warning.dark,
        },
        standardInfo: {
          backgroundColor: COLORS.status.info.light,
          color: COLORS.status.info.dark,
        },
      },
    },
  },
});

export default theme; 