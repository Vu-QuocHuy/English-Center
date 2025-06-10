import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import ConfirmDialog from '../../components/common/ConfirmDialog';

interface StudentProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<StudentProfile | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Sử dụng dữ liệu mock thay vì gọi API thật
        await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập loading
          const mockProfile: StudentProfile = {
          id: Number(user?.id) || 1,
          name: user?.name || 'Nguyễn Văn A',
          email: user?.email || 'nguyenvana@gmail.com',
          phone: '0123456789',
          dateOfBirth: '2000-05-15',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          parentName: 'Nguyễn Văn B',
          parentPhone: '0987654321',
          avatar: undefined
        };
        
        setProfile(mockProfile);
        setEditedProfile(mockProfile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Không thể tải thông tin cá nhân. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id, user?.name, user?.email]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };
  const handleSave = async () => {
    if (!editedProfile) return;

    try {
      setSaveLoading(true);
      
      // Giả lập việc lưu dữ liệu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Không thể cập nhật thông tin. Vui lòng thử lại sau.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleChange = (field: keyof StudentProfile) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [field]: event.target.value,
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!profile || !editedProfile) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Thông Tin Cá Nhân
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={profile.avatar}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography color="textSecondary">Học sinh</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Họ và tên"
              value={editedProfile.name}
              onChange={handleChange('name')}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={editedProfile.email}
              onChange={handleChange('email')}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số điện thoại"
              value={editedProfile.phone}
              onChange={handleChange('phone')}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ngày sinh"
              type="date"
              value={editedProfile.dateOfBirth}
              onChange={handleChange('dateOfBirth')}
              disabled={!isEditing}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ"
              value={editedProfile.address}
              onChange={handleChange('address')}
              disabled={!isEditing}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tên phụ huynh"
              value={editedProfile.parentName}
              onChange={handleChange('parentName')}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Số điện thoại phụ huynh"
              value={editedProfile.parentPhone}
              onChange={handleChange('parentPhone')}
              disabled={!isEditing}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {!isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={saveLoading}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setConfirmSaveOpen(true)}
                disabled={saveLoading}
              >
                Lưu
              </Button>
            </>
          )}
        </Box>
      </Paper>

      <ConfirmDialog
        open={confirmSaveOpen}
        title="Xác nhận lưu thông tin"
        message="Bạn có chắc chắn muốn lưu các thay đổi thông tin cá nhân không?"
        onConfirm={handleSave}
        onCancel={() => setConfirmSaveOpen(false)}
        loading={saveLoading}
        confirmText="Lưu"
        severity="success"
      />
    </Box>
  );
};

export default Profile; 