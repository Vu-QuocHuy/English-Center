import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import ConfirmDialog from '../components/common/ConfirmDialog';
import COLORS from '../constants/colors';

// Interfaces for different user types with their extended profiles
interface StudentProfile {
  id: string;
  name: string;
  email: string;
  role: 'student';
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  avatar?: string;
  level?: string;
  enrolledClasses?: string[];
  joinDate?: string;
}

interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  role: 'teacher';
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  specialization?: string;
  qualifications?: string;
  avatar?: string;
  salaryPerSession?: number;
  description?: string;
  yearJoined?: number;
}

interface ParentProfile {
  id: string;
  name: string;
  email: string;
  role: 'parent';
  phone?: string;
  address?: string;
  avatar?: string;
  children?: Array<{
    id: string;
    name: string;
    class?: string;
  }>;
  occupation?: string;
}

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  phone?: string;
  avatar?: string;
  department?: string;
  position?: string;
  permissions?: string[];
}

type UserProfile = StudentProfile | TeacherProfile | ParentProfile | AdminProfile;

const Account: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      // In a real app, fetch complete profile from API
      // For now, use mock data based on user role
      const mockProfile = getMockProfileData(user);
      setProfile(mockProfile);
      setEditedProfile(mockProfile);
    }
  }, [user]);

  const getMockProfileData = (user: any): UserProfile => {
    switch (user.role) {
      case 'student':
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'student',
          phone: '0901234567',
          dateOfBirth: '2005-03-15',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          parentName: 'Nguyễn Văn A',
          parentPhone: '0912345678',
          level: 'Intermediate',
          enrolledClasses: ['IELTS Preparation', 'Business English'],
          joinDate: '2024-01-15',
        } as StudentProfile;
      case 'teacher':
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'teacher',
          phone: '0902345678',
          dateOfBirth: '1990-05-20',
          address: '456 Đường XYZ, Quận 3, TP.HCM',
          gender: 'female',
          specialization: 'IELTS, TOEIC',
          qualifications: 'TESOL Certificate, IELTS 8.0, Thạc sĩ Ngôn ngữ Anh',
          salaryPerSession: 150000,
          description: 'Giáo viên có 5 năm kinh nghiệm giảng dạy tiếng Anh',
          yearJoined: 2020,
        } as TeacherProfile;
      case 'parent':
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'parent',
          phone: '0903456789',
          address: '789 Đường DEF, Quận 5, TP.HCM',
          children: [
            { id: '1', name: 'Nguyễn Văn B', class: 'IELTS Preparation' },
            { id: '2', name: 'Nguyễn Thị C', class: 'Business English' },
          ],
          occupation: 'Kỹ sư',
        } as ParentProfile;
      case 'admin':
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'admin',
          phone: '0904567890',
          department: 'Quản trị hệ thống',
          position: 'Quản lý cấp cao',
          permissions: ['user_management', 'financial_management', 'system_settings'],
        } as AdminProfile;
      default:
        return user as UserProfile;
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setError(null);
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!editedProfile.name.trim()) {
        throw new Error('Tên không được để trống');
      }
      if (!editedProfile.email.trim()) {
        throw new Error('Email không được để trống');
      }

      // In a real app, make API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setProfile(editedProfile);
      setIsEditing(false);
      setSuccess('Cập nhật thông tin thành công!');
      
      // Update auth context if needed
      if (updateUserProfile) {
        updateUserProfile({
          id: editedProfile.id,
          name: editedProfile.name,
          email: editedProfile.email,
          role: editedProfile.role,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    } as UserProfile);
  };
  // Type guards
  const isStudent = (profile: UserProfile): profile is StudentProfile => profile.role === 'student';
  const isTeacher = (profile: UserProfile): profile is TeacherProfile => profile.role === 'teacher';
  const isParent = (profile: UserProfile): profile is ParentProfile => profile.role === 'parent';
  const isAdmin = (profile: UserProfile): profile is AdminProfile => profile.role === 'admin';

  // Helper functions that include null checks
  const isStudentSafe = (profile: UserProfile | null): profile is StudentProfile => 
    profile !== null && isStudent(profile);
  const isTeacherSafe = (profile: UserProfile | null): profile is TeacherProfile => 
    profile !== null && isTeacher(profile);
  const isParentSafe = (profile: UserProfile | null): profile is ParentProfile => 
    profile !== null && isParent(profile);
  const isAdminSafe = (profile: UserProfile | null): profile is AdminProfile => 
    profile !== null && isAdmin(profile);

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    if (!currentPassword.trim()) {
      setError('Vui lòng nhập mật khẩu hiện tại');
      return;
    }
    if (!newPassword.trim()) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      // In a real app, make API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setChangePasswordOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Đổi mật khẩu thành công!');
    } catch (err) {
      setError('Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  const getImmutableFields = (): string[] => {
    switch (user?.role) {
      case 'student':
        return ['email', 'parentName', 'parentPhone', 'level', 'enrolledClasses', 'joinDate'];
      case 'teacher':
        return ['email', 'salaryPerSession', 'yearJoined'];
      case 'parent':
        return ['email', 'children'];
      case 'admin':
        return ['email', 'permissions'];
      default:
        return ['email'];
    }
  };

  const isFieldEditable = (field: string): boolean => {
    return !getImmutableFields().includes(field);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (!profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Thông tin tài khoản</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setChangePasswordOpen(true)}
            disabled={isEditing}
          >
            Đổi mật khẩu
          </Button>
          {!isEditing ? (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Chỉnh sửa
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </>
          )}
        </Box>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mr: 3,
            }}
          >
            {profile.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {profile.role === 'admin' && 'Quản trị viên'}
              {profile.role === 'teacher' && 'Giáo viên'}
              {profile.role === 'student' && 'Học sinh'}
              {profile.role === 'parent' && 'Phụ huynh'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>Thông tin cơ bản</Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Họ và tên"
              value={editedProfile?.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing || !isFieldEditable('name')}
              helperText={!isFieldEditable('name') ? 'Không thể thay đổi' : ''}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={editedProfile?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing || !isFieldEditable('email')}
              helperText={!isFieldEditable('email') ? 'Không thể thay đổi' : ''}
            />
          </Grid>          {(isStudentSafe(editedProfile) || isTeacherSafe(editedProfile) || isParentSafe(editedProfile)) && editedProfile.phone !== undefined && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={editedProfile.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing || !isFieldEditable('phone')}
                helperText={!isFieldEditable('phone') ? 'Không thể thay đổi' : ''}
              />
            </Grid>
          )}

          {(isStudentSafe(editedProfile) || isTeacherSafe(editedProfile)) && editedProfile.dateOfBirth !== undefined && (
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ngày sinh"
                type="date"
                value={editedProfile.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing || !isFieldEditable('dateOfBirth')}
                InputLabelProps={{ shrink: true }}
                helperText={!isFieldEditable('dateOfBirth') ? 'Không thể thay đổi' : ''}
              />
            </Grid>
          )}          {(isStudentSafe(editedProfile) || isTeacherSafe(editedProfile) || isParentSafe(editedProfile)) && editedProfile.address !== undefined && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={editedProfile.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing || !isFieldEditable('address')}
                helperText={!isFieldEditable('address') ? 'Không thể thay đổi' : ''}
              />
            </Grid>
          )}

          {/* Role-specific fields */}
          {isTeacher(profile) && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>Thông tin giảng dạy</Typography>
              </Grid>
              
              {isTeacherSafe(editedProfile) && editedProfile.gender !== undefined && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!isEditing || !isFieldEditable('gender')}>
                    <InputLabel>Giới tính</InputLabel>
                    <Select
                      value={editedProfile.gender || ''}
                      label="Giới tính"
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                    >
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                      <MenuItem value="other">Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {isTeacherSafe(editedProfile) && editedProfile.specialization !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth                    label="Chuyên môn"
                    value={editedProfile.specialization || ''}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    disabled={!isEditing || !isFieldEditable('specialization')}
                    helperText={!isFieldEditable('specialization') ? 'Không thể thay đổi' : ''}
                  />
                </Grid>
              )}

              {isTeacherSafe(editedProfile) && editedProfile.qualifications !== undefined && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bằng cấp và chứng chỉ"
                    value={editedProfile.qualifications || ''}
                    onChange={(e) => handleInputChange('qualifications', e.target.value)}
                    disabled={!isEditing || !isFieldEditable('qualifications')}
                    multiline
                    rows={2}
                    helperText={!isFieldEditable('qualifications') ? 'Không thể thay đổi' : ''}
                  />
                </Grid>
              )}

              {isTeacherSafe(editedProfile) && editedProfile.description !== undefined && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mô tả bản thân"
                    value={editedProfile.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    disabled={!isEditing || !isFieldEditable('description')}
                    multiline
                    rows={3}
                    helperText={!isFieldEditable('description') ? 'Không thể thay đổi' : ''}
                  />
                </Grid>
              )}

              {isTeacherSafe(editedProfile) && editedProfile.salaryPerSession !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Lương mỗi buổi (VND)"
                    type="number"
                    value={editedProfile.salaryPerSession || ''}
                    disabled={true}
                    helperText="Không thể thay đổi"
                  />
                </Grid>
              )}              {isTeacherSafe(editedProfile) && editedProfile.yearJoined !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Năm bắt đầu làm việc"
                    type="number"
                    value={editedProfile.yearJoined || ''}
                    disabled={true}
                    helperText="Không thể thay đổi"
                  />
                </Grid>
              )}
            </>
          )}

          {isStudent(profile) && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>Thông tin học tập</Typography>
              </Grid>

              {isStudentSafe(editedProfile) && editedProfile.parentName !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tên phụ huynh"
                    value={editedProfile.parentName || ''}
                    disabled={true}
                    helperText="Không thể thay đổi"
                  />
                </Grid>
              )}

              {isStudentSafe(editedProfile) && editedProfile.parentPhone !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại phụ huynh"
                    value={editedProfile.parentPhone || ''}
                    disabled={true}
                    helperText="Không thể thay đổi"
                  />
                </Grid>
              )}

              {isStudentSafe(editedProfile) && editedProfile.level !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Trình độ hiện tại"                    value={editedProfile.level || ''}
                    disabled={true}
                    helperText="Không thể thay đổi"
                  />
                </Grid>
              )}

              {isStudentSafe(editedProfile) && editedProfile.joinDate !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ngày tham gia"
                    value={editedProfile.joinDate || ''}
                    disabled={true}
                    helperText="Không thể thay đổi"
                  />
                </Grid>
              )}

              {isStudentSafe(editedProfile) && editedProfile.enrolledClasses && (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ mb: 1 }}>Lớp đang học:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {editedProfile.enrolledClasses.map((className, index) => (
                      <Chip key={index} label={className} variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              )}
            </>
          )}

          {isParent(profile) && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>Thông tin gia đình</Typography>
              </Grid>

              {isParentSafe(editedProfile) && editedProfile.occupation !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nghề nghiệp"
                    value={editedProfile.occupation || ''}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    disabled={!isEditing || !isFieldEditable('occupation')}
                    helperText={!isFieldEditable('occupation') ? 'Không thể thay đổi' : ''}
                  />
                </Grid>
              )}              {isParentSafe(editedProfile) && editedProfile.children && (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ mb: 1 }}>Con em:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {editedProfile.children.map((child) => (
                      <Chip 
                        key={child.id} 
                        label={`${child.name} - ${child.class || 'Chưa có lớp'}`} 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Grid>
              )}
            </>
          )}

          {isAdmin(profile) && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>Thông tin quản trị</Typography>
              </Grid>

              {isAdminSafe(editedProfile) && editedProfile.department !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phòng ban"
                    value={editedProfile.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing || !isFieldEditable('department')}
                    helperText={!isFieldEditable('department') ? 'Không thể thay đổi' : ''}
                  />
                </Grid>
              )}              {isAdminSafe(editedProfile) && editedProfile.position !== undefined && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Chức vụ"
                    value={editedProfile.position || ''}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    disabled={!isEditing || !isFieldEditable('position')}
                    helperText={!isFieldEditable('position') ? 'Không thể thay đổi' : ''}
                  />
                </Grid>
              )}

              {isAdminSafe(editedProfile) && editedProfile.permissions && (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ mb: 1 }}>Quyền hạn:</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {editedProfile.permissions.map((permission, index) => (
                      <Chip 
                        key={index} 
                        label={
                          permission === 'user_management' ? 'Quản lý người dùng' :
                          permission === 'financial_management' ? 'Quản lý tài chính' :
                          permission === 'system_settings' ? 'Cài đặt hệ thống' :
                          permission
                        } 
                        color="primary" 
                        variant="outlined" 
                      />
                    ))}
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Mật khẩu hiện tại"
            type={showPasswords.current ? 'text' : 'password'}
            fullWidth
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility('current')}
                    edge="end"
                  >
                    {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Mật khẩu mới"
            type={showPasswords.new ? 'text' : 'password'}
            fullWidth
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility('new')}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Xác nhận mật khẩu mới"
            type={showPasswords.confirm ? 'text' : 'password'}
            fullWidth
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => togglePasswordVisibility('confirm')}
                    edge="end"
                  >
                    {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)}>Hủy</Button>
          <Button 
            onClick={handleChangePassword} 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Account;
