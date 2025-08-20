import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Button,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Image as ImageIcon,
  TextFields as TextIcon,
  ViewList as ListIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useHomePage } from '../../../contexts/HomePageContext';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { COLORS } from '../../../utils/colors';
import { commonStyles } from '../../../utils/styles';

// Mock data cho demo
const initialHomePageData = {
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
    sections: [
      {
        id: 1,
        title: 'Sứ mệnh',
        content: 'Chúng tôi cam kết mang đến chất lượng đào tạo tiếng Anh tốt nhất, giúp học viên tự tin giao tiếp và đạt được mục tiêu học tập của mình.'
      },
      {
        id: 2,
        title: 'Tầm nhìn',
        content: 'Trở thành trung tâm đào tạo tiếng Anh hàng đầu, được tin tưởng bởi học viên và đối tác trên toàn quốc.'
      },
      {
        id: 3,
        title: 'Giá trị cốt lõi',
        content: 'Chất lượng đào tạo xuất sắc, lấy học viên làm trung tâm. Đội ngũ giáo viên chuyên nghiệp, tận tâm, sáng tạo.'
      },
      {
        id: 4,
        title: 'Lịch sử phát triển',
        content: 'English Center được thành lập năm 2010 với sứ mệnh mang đến chất lượng đào tạo tiếng Anh tốt nhất cho học viên Việt Nam.'
      }
    ]
  },
  teachers: {
    title: 'Đội ngũ giảng viên',
    subtitle: 'Các giảng viên tiêu biểu',
    featuredTeachers: [1, 2, 3], // IDs của giáo viên tiêu biểu
    values: [
      {
        id: 1,
        title: 'Chuyên môn giỏi',
        content: 'Đội ngũ giáo viên chuyên môn giỏi, xuất thân từ các trường học uy tín hàng đầu quốc tế.'
      },
      {
        id: 2,
        title: 'Nhiệt tình',
        content: 'Đội ngũ giảng viên luôn lấy 5 giá trị cốt lõi làm kim chỉ nam cho mọi trường hợp.'
      },
      {
        id: 3,
        title: 'Sáng tạo',
        content: 'Giáo viên luôn chủ động nghiên cứu những phương pháp giảng dạy mới, sáng kiến trong nghề.'
      }
    ]
  },
  announcements: {
    enabled: true,
    popupDelay: 1000,
    bannerAds: [],
    popupAds: []
  }
};

const HomePageManagement = () => {
  const { user } = useAuth();
  const { 
    hero, about, teachers, announcements, customSections,
    updateHomePageData, addCustomSection, updateCustomSection, deleteCustomSection,
    addCustomSectionItem, updateCustomSectionItem, deleteCustomSectionItem
  } = useHomePage();
  const [activeTab, setActiveTab] = useState(0);
  const [homePageData, setHomePageData] = useState({ hero, about, teachers, announcements });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editDialog, setEditDialog] = useState({ open: false, type: '', data: null });
  const [sectionDialog, setSectionDialog] = useState({ open: false, type: '', data: null });

  useEffect(() => {
    loadHomePageData();
  }, []);

  const loadHomePageData = async () => {
    setLoading(true);
    try {
      // TODO: Thay thế bằng API call thực tế
      // const response = await getHomePageDataAPI();
      // setHomePageData(response.data);
      
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHomePageData(initialHomePageData);
    } catch (error) {
      setMessage({ type: 'error', text: 'Không thể tải dữ liệu trang chủ' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Thay thế bằng API call thực tế
      // await updateHomePageDataAPI(homePageData);
      
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Cập nhật trang chủ thành công!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Không thể cập nhật trang chủ' });
    } finally {
      setSaving(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditSection = (type, data) => {
    setEditDialog({ open: true, type, data });
  };

  const handleCloseEditDialog = () => {
    setEditDialog({ open: false, type: '', data: null });
  };

  const handleSaveSection = (type, updatedData) => {
    setHomePageData(prev => ({
      ...prev,
      [type]: updatedData
    }));
    handleCloseEditDialog();
  };

  const handleUpdateField = (section, field, value) => {
    setHomePageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleUpdateArrayField = (section, field, index, value) => {
    setHomePageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item, i) => 
          i === index ? { ...item, ...value } : item
        )
      }
    }));
  };

  const renderHeroSection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phần Hero (Banner chính)
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add hero banner functionality
            setMessage({ type: 'info', text: 'Tính năng thêm banner mới sẽ được phát triển sau' });
          }}
          sx={commonStyles.primaryButton}
        >
          Thêm Banner
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tiêu đề chính"
            value={homePageData.hero.title}
            onChange={(e) => handleUpdateField('hero', 'title', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tiêu đề phụ"
            value={homePageData.hero.subtitle}
            onChange={(e) => handleUpdateField('hero', 'subtitle', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Text nút"
            value={homePageData.hero.buttonText}
            onChange={(e) => handleUpdateField('hero', 'buttonText', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Link nút"
            value={homePageData.hero.buttonLink}
            onChange={(e) => handleUpdateField('hero', 'buttonLink', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ảnh nền (URL)"
            value={homePageData.hero.backgroundImage}
            onChange={(e) => handleUpdateField('hero', 'backgroundImage', e.target.value)}
            sx={commonStyles.formField}
            helperText="Nhập URL của ảnh nền"
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const renderAboutSection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phần Giới thiệu
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add about section functionality
            setMessage({ type: 'info', text: 'Tính năng thêm phần giới thiệu mới sẽ được phát triển sau' });
          }}
          sx={commonStyles.primaryButton}
        >
          Thêm Phần Giới thiệu
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tiêu đề chính"
            value={homePageData.about.title}
            onChange={(e) => handleUpdateField('about', 'title', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tiêu đề phụ"
            value={homePageData.about.subtitle}
            onChange={(e) => handleUpdateField('about', 'subtitle', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
      </Grid>
      
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Các phần nội dung
      </Typography>
      
      <List sx={{ bgcolor: '#f8f9fa', borderRadius: 1 }}>
        {homePageData.about.sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <ListItem>
              <ListItemText
                primary={section.title}
                secondary={section.content.substring(0, 100) + '...'}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleEditSection('aboutSection', { ...section, index })}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < homePageData.about.sections.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );

  const renderTeachersSection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phần Giáo viên
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add teacher value functionality
            setMessage({ type: 'info', text: 'Tính năng thêm giá trị cốt lõi mới sẽ được phát triển sau' });
          }}
          sx={commonStyles.primaryButton}
        >
          Thêm Giá trị Cốt lõi
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tiêu đề chính"
            value={homePageData.teachers.title}
            onChange={(e) => handleUpdateField('teachers', 'title', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tiêu đề phụ"
            value={homePageData.teachers.subtitle}
            onChange={(e) => handleUpdateField('teachers', 'subtitle', e.target.value)}
            sx={commonStyles.formField}
          />
        </Grid>
      </Grid>
      
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        Giá trị cốt lõi
      </Typography>
      
      <List sx={{ bgcolor: '#f8f9fa', borderRadius: 1 }}>
        {homePageData.teachers.values.map((value, index) => (
          <React.Fragment key={value.id}>
            <ListItem>
              <ListItemText
                primary={value.title}
                secondary={value.content.substring(0, 100) + '...'}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleEditSection('teacherValue', { ...value, index })}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < homePageData.teachers.values.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );

  const renderCustomSections = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sections tùy chỉnh
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setSectionDialog({ open: true, type: 'add', data: null })}
          sx={commonStyles.primaryButton}
        >
          Thêm Section mới
        </Button>
      </Box>
      
      {customSections.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            Chưa có section tùy chỉnh nào. Hãy thêm section đầu tiên!
          </Typography>
        </Box>
      ) : (
        <List sx={{ bgcolor: '#f8f9fa', borderRadius: 1 }}>
          {customSections.map((section, index) => (
            <React.Fragment key={section.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {section.title}
                      </Typography>
                      <Chip 
                        label={section.enabled ? 'Đang hiển thị' : 'Đã ẩn'} 
                        size="small" 
                        color={section.enabled ? 'success' : 'default'}
                      />
                      <Chip 
                        label={section.type} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {section.subtitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {section.items.length} items • Thứ tự: {section.order}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => setSectionDialog({ open: true, type: 'edit', data: section })}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      if (window.confirm('Bạn có chắc muốn xóa section này?')) {
                        deleteCustomSection(section.id);
                      }
                    }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < customSections.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );

  const renderAnnouncementsSection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cài đặt Quảng cáo
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add announcement functionality
            setMessage({ type: 'info', text: 'Tính năng thêm quảng cáo mới sẽ được phát triển sau' });
          }}
          sx={commonStyles.primaryButton}
        >
          Thêm Quảng cáo
        </Button>
      </Box>
      
      <FormControlLabel
        control={
          <Switch
            checked={homePageData.announcements.enabled}
            onChange={(e) => handleUpdateField('announcements', 'enabled', e.target.checked)}
          />
        }
        label="Bật quảng cáo"
        sx={{ mb: 3 }}
      />
      
      <TextField
        fullWidth
        type="number"
        label="Thời gian hiển thị popup (ms)"
        value={homePageData.announcements.popupDelay}
        onChange={(e) => handleUpdateField('announcements', 'popupDelay', parseInt(e.target.value))}
        sx={commonStyles.formField}
        helperText="Thời gian chờ trước khi hiển thị popup quảng cáo"
      />
    </Paper>
  );

  const renderEditDialog = () => {
    if (!editDialog.open) return null;

    const { type, data } = editDialog;
    const [editData, setEditData] = useState(data);

    const handleSave = () => {
      if (type === 'aboutSection') {
        const updatedSections = [...homePageData.about.sections];
        updatedSections[data.index] = editData;
        handleSaveSection('about', { ...homePageData.about, sections: updatedSections });
      } else if (type === 'teacherValue') {
        const updatedValues = [...homePageData.teachers.values];
        updatedValues[data.index] = editData;
        handleSaveSection('teachers', { ...homePageData.teachers, values: updatedValues });
      }
    };

    return (
      <Dialog open={editDialog.open} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={commonStyles.dialogTitle}>
          Chỉnh sửa {type === 'aboutSection' ? 'phần nội dung' : 'giá trị cốt lõi'}
        </DialogTitle>
        <DialogContent sx={commonStyles.dialogContent}>
          <TextField
            fullWidth
            label="Tiêu đề"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            sx={commonStyles.formField}
          />
          <TextField
            fullWidth
            label="Nội dung"
            value={editData.content}
            onChange={(e) => setEditData({ ...editData, content: e.target.value })}
            sx={commonStyles.formField}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions sx={commonStyles.formActions}>
          <Button onClick={handleCloseEditDialog} sx={commonStyles.secondaryButton}>Hủy</Button>
          <Button onClick={handleSave} variant="contained" sx={commonStyles.primaryButton}>Lưu</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderSectionDialog = () => {
    if (!sectionDialog.open) return null;

    const { type, data } = sectionDialog;
    const [sectionData, setSectionData] = useState(
      type === 'add' 
        ? {
            id: `section_${Date.now()}`,
            title: '',
            subtitle: '',
            type: 'grid',
            enabled: true,
            order: customSections.length + 1,
            items: []
          }
        : { ...data }
    );

    const handleSave = () => {
      if (type === 'add') {
        addCustomSection(sectionData);
      } else {
        updateCustomSection(sectionData);
      }
      setSectionDialog({ open: false, type: '', data: null });
    };

    return (
      <Dialog open={sectionDialog.open} onClose={() => setSectionDialog({ open: false, type: '', data: null })} maxWidth="md" fullWidth>
        <DialogTitle sx={commonStyles.dialogTitle}>
          {type === 'add' ? 'Thêm Section mới' : 'Chỉnh sửa Section'}
        </DialogTitle>
        <DialogContent sx={commonStyles.dialogContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tiêu đề chính"
                value={sectionData.title}
                onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                sx={commonStyles.formField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tiêu đề phụ"
                value={sectionData.subtitle}
                onChange={(e) => setSectionData({ ...sectionData, subtitle: e.target.value })}
                sx={commonStyles.formField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={commonStyles.formField}>
                <InputLabel>Loại hiển thị</InputLabel>
                <Select
                  value={sectionData.type}
                  onChange={(e) => setSectionData({ ...sectionData, type: e.target.value })}
                  label="Loại hiển thị"
                >
                  <MenuItem value="grid">Grid (Lưới)</MenuItem>
                  <MenuItem value="list">List (Danh sách)</MenuItem>
                  <MenuItem value="carousel">Carousel (Trình chiếu)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Thứ tự hiển thị"
                value={sectionData.order}
                onChange={(e) => setSectionData({ ...sectionData, order: parseInt(e.target.value) })}
                sx={commonStyles.formField}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={sectionData.enabled}
                    onChange={(e) => setSectionData({ ...sectionData, enabled: e.target.checked })}
                  />
                }
                label="Hiển thị section này"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={commonStyles.formActions}>
          <Button onClick={() => setSectionDialog({ open: false, type: '', data: null })} sx={commonStyles.secondaryButton}>Hủy</Button>
          <Button onClick={handleSave} variant="contained" sx={commonStyles.primaryButton}>Lưu</Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={commonStyles.pageContainer}>
          <Box sx={commonStyles.contentContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          </Box>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={commonStyles.pageContainer}>
        <Box sx={commonStyles.contentContainer}>
          <Box sx={commonStyles.pageHeader}>
            <Typography variant="h5" component="h1" sx={commonStyles.pageTitle}>
              Quản lý Trang chủ
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Chỉnh sửa nội dung trang chủ một cách dễ dàng
          </Typography>

          {message.text && (
            <Alert severity={message.type} sx={{ mb: 3 }} onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}

          <Paper sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} sx={{ px: 2 }}>
                <Tab label="Hero Banner" icon={<ImageIcon />} iconPosition="start" />
                <Tab label="Giới thiệu" icon={<TextIcon />} iconPosition="start" />
                <Tab label="Giáo viên" icon={<ListIcon />} iconPosition="start" />
                <Tab label="Section tùy chỉnh" icon={<AddIcon />} iconPosition="start" />
                <Tab label="Quảng cáo" icon={<SettingsIcon />} iconPosition="start" />
              </Tabs>
            </Box>
          </Paper>

          <Box>
            {activeTab === 0 && renderHeroSection()}
            {activeTab === 1 && renderAboutSection()}
            {activeTab === 2 && renderTeachersSection()}
            {activeTab === 3 && renderCustomSections()}
            {activeTab === 4 && renderAnnouncementsSection()}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={saving}
              sx={commonStyles.primaryButton}
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </Box>

          {renderEditDialog()}
          {renderSectionDialog()}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default HomePageManagement;
