import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface WelcomeAdPopupProps {
  open: boolean;
  onClose: () => void;
}

const WelcomeAdPopup: React.FC<WelcomeAdPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'transparent',
          boxShadow: 'none',
          overflow: 'visible',
          maxHeight: '90vh',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
        },
        '& .MuiDialog-container': {
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
              transform: 'scale(0.9)',
            },
            '100%': {
              opacity: 1,
              transform: 'scale(1)',
            },
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: -20,
            top: -20,
            zIndex: 2,
            bgcolor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'white',
              transform: 'scale(1.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent 
          sx={{ 
            p: 0, 
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            borderRadius: 2,
            bgcolor: 'white',
          }}
        >
          <Box
            component="img"
            src="/images/ads/popupad.jpg"
            alt="Học tiếng Anh Online miễn phí"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default WelcomeAdPopup; 