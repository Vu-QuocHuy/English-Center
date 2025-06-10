import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { statisticsService } from '../../services/statisticsService';
import { FinancialStats, FinancialPeriod } from '../../types/models';

const FinancialStatistics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FinancialStats | null>(null);
  const [periodType, setPeriodType] = useState<'month' | 'quarter' | 'year' | 'custom'>('month');
  const [period, setPeriod] = useState<FinancialPeriod>(statisticsService.getPredefinedPeriods().currentMonth as FinancialPeriod);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedQuarter, setSelectedQuarter] = useState<number>(Math.ceil((new Date().getMonth() + 1) / 3));

  // Generate arrays for dropdowns
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const quarters = [1, 2, 3, 4];

  const getMonthName = (month: number) => {
    return new Date(2000, month - 1, 1).toLocaleString('vi-VN', { month: 'long' });
  };

  const getQuarterPeriod = (year: number, quarter: number) => {
    const startMonth = (quarter - 1) * 3 + 1;
    const endMonth = quarter * 3;
    return {
      type: 'quarter' as const,
      startDate: `${year}-${startMonth.toString().padStart(2, '0')}-01`,
      endDate: new Date(year, endMonth, 0).toISOString().split('T')[0]
    };
  };

  const handlePeriodTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newType = event.target.value as 'month' | 'quarter' | 'year' | 'custom';
    setPeriodType(newType);
    
    switch (newType) {
      case 'month':
        setPeriod({
          type: 'month',
          startDate: `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-01`,
          endDate: new Date(selectedYear, selectedMonth, 0).toISOString().split('T')[0]
        } as FinancialPeriod);
        break;
      case 'quarter':
        setPeriod(getQuarterPeriod(selectedYear, selectedQuarter));
        break;
      case 'year':
        setPeriod({
          type: 'year',
          startDate: `${selectedYear}-01-01`,
          endDate: `${selectedYear}-12-31`
        } as FinancialPeriod);
        break;
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    
    switch (periodType) {
      case 'month':
        setPeriod({
          type: 'month',
          startDate: `${year}-${selectedMonth.toString().padStart(2, '0')}-01`,
          endDate: new Date(year, selectedMonth, 0).toISOString().split('T')[0]
        } as FinancialPeriod);
        break;
      case 'quarter':
        setPeriod(getQuarterPeriod(year, selectedQuarter));
        break;
      case 'year':
        setPeriod({
          type: 'year',
          startDate: `${year}-01-01`,
          endDate: `${year}-12-31`
        } as FinancialPeriod);
        break;
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const month = Number(event.target.value);
    setSelectedMonth(month);
    setPeriod({
      type: 'month',
      startDate: `${selectedYear}-${month.toString().padStart(2, '0')}-01`,
      endDate: new Date(selectedYear, month, 0).toISOString().split('T')[0]
    } as FinancialPeriod);
  };

  const handleQuarterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quarter = Number(event.target.value);
    setSelectedQuarter(quarter);
    setPeriod(getQuarterPeriod(selectedYear, quarter));
  };

  const handleDateChange = (type: 'start' | 'end', date: dayjs.Dayjs | null) => {
    if (date) {
      const newDate = date.format('YYYY-MM-DD');
      const currentPeriod = { ...period };
      
      if (type === 'start') {
        if (dayjs(newDate).isAfter(currentPeriod.endDate)) {
          setError('Ngày bắt đầu không thể sau ngày kết thúc');
          return;
        }
        currentPeriod.startDate = newDate;
      } else {
        if (dayjs(newDate).isBefore(currentPeriod.startDate)) {
          setError('Ngày kết thúc không thể trước ngày bắt đầu');
          return;
        }
        currentPeriod.endDate = newDate;
      }
      
      setError(null);
      setPeriod({
        ...currentPeriod,
        type: 'custom'
      } as FinancialPeriod);
    }
  };

  const loadStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await statisticsService.getFinancialStats(period);
      setStats(data);
    } catch (err) {
      setError('Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [period]);

  const handleExport = async () => {
    try {
      const blob = await statisticsService.exportFinancialReport(period);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-report-${period.startDate}-to-${period.endDate}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Không thể xuất báo cáo. Vui lòng thử lại sau.');
    }
  };

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  return (
    <Box>      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>💰 Thống kê tài chính</Typography>
          <Typography variant="body2" color="textSecondary">
            📅 Thời gian: {new Date(period.startDate).toLocaleDateString('vi-VN')} - {new Date(period.endDate).toLocaleDateString('vi-VN')}
            {period.type !== 'custom' && (
              <Typography component="span" sx={{ ml: 1, fontWeight: 'bold' }}>
                ({period.type === 'month' ? 'Tháng' : 
                  period.type === 'quarter' ? 'Quý' : 
                  period.type === 'year' ? 'Năm' : 'Tùy chỉnh'})
              </Typography>
            )}
          </Typography>
        </Box>
        <Box>
          <IconButton 
            onClick={loadStatistics} 
            sx={{ mr: 1 }}
            color="primary"
            disabled={loading}
          >
            <RefreshIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            Xuất báo cáo
          </Button>
        </Box>
      </Box>      <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          🔍 Bộ lọc thời gian
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="📊 Loại thời gian"
              value={periodType}
              onChange={handlePeriodTypeChange}
              variant="outlined"
            >
              <MenuItem value="month">📅 Tháng</MenuItem>
              <MenuItem value="quarter">📈 Quý</MenuItem>
              <MenuItem value="year">🗓️ Năm</MenuItem>
              <MenuItem value="custom">⚙️ Tùy chỉnh</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="🗓️ Năm"
              value={selectedYear}
              onChange={handleYearChange}
              variant="outlined"
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {periodType === 'month' && (
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="📅 Tháng"
                value={selectedMonth}
                onChange={handleMonthChange}
                variant="outlined"
              >
                {months.map(month => (
                  <MenuItem key={month} value={month}>
                    {getMonthName(month)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {periodType === 'quarter' && (
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="📈 Quý"
                value={selectedQuarter}
                onChange={handleQuarterChange}
                variant="outlined"
              >
                {quarters.map(quarter => (
                  <MenuItem key={quarter} value={quarter}>
                    Quý {quarter}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {periodType === 'custom' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="📅 Từ ngày"
                  value={dayjs(period.startDate)}
                  onChange={(date) => handleDateChange('start', date)}
                  format="DD/MM/YYYY"
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!error && error.includes('bắt đầu'),
                      helperText: error && error.includes('bắt đầu') ? error : ''
                    } 
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="📅 Đến ngày"
                  value={dayjs(period.endDate)}
                  onChange={(date) => handleDateChange('end', date)}
                  format="DD/MM/YYYY"
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!error && error.includes('kết thúc'),
                      helperText: error && error.includes('kết thúc') ? error : ''
                    } 
                  }}
                />
              </Grid>
            </LocalizationProvider>
          )}
          
          {(periodType !== 'custom') && (
            <Grid item xs={12} sm={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '56px', color: 'textSecondary' }}>
                <Typography variant="body2">
                  📊 Dữ liệu sẽ được cập nhật tự động
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {stats && (
        <>          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    💰 Chi phí giáo viên
                  </Typography>
                  <Typography variant="h5" color="error.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats.teacherStats.totalAmount.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    ✅ Đã trả: {stats.teacherStats.paidAmount.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="warning.main">
                    ⏳ Còn nợ: {stats.teacherStats.pendingAmount.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    {stats.teacherStats.teacherCount} giáo viên • {stats.teacherStats.sessionCount} buổi dạy
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    📚 Học phí dự kiến
                  </Typography>
                  <Typography variant="h5" color="info.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats.studentStats.expectedAmount.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    👥 {stats.studentStats.studentCount} học sinh
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    🏫 {stats.studentStats.classCount} lớp học
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    Tổng số tiền cần thu theo buổi học
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    💵 Học phí đã thu
                  </Typography>
                  <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats.studentStats.paidAmount.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="error.main">
                    💳 Còn thiếu: {stats.studentStats.remainingAmount.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📊 Tỷ lệ thu: {stats.studentStats.expectedAmount > 0 ? 
                      Math.round((stats.studentStats.paidAmount / stats.studentStats.expectedAmount) * 100) : 0}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    Số tiền thực tế đã nhận được
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom variant="subtitle2">
                    📈 Lợi nhuận
                  </Typography>
                  <Typography variant="h5" color="warning.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {stats.profitStats.expectedProfit.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    💰 Thực tế: {stats.profitStats.actualProfit.toLocaleString()} ₫
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📊 Tỷ lệ: {stats.profitStats.expectedProfit > 0 ? 
                      Math.round((stats.profitStats.actualProfit / stats.profitStats.expectedProfit) * 100) : 0}%
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    Dự kiến vs Thực tế
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="📊 Chi tiết giáo viên" />
              <Tab label="👨‍🎓 Chi tiết học sinh" />
              <Tab label="📈 Tổng quan" />
            </Tabs><Box sx={{ p: 2 }}>
              {selectedTab === 0 && (
                <>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Chi tiết thanh toán giáo viên</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tổng cộng: {stats.teacherStats.payments.length} giáo viên
                    </Typography>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>👨‍🏫 Giáo viên</TableCell>
                          <TableCell align="right">📚 Số buổi dạy</TableCell>
                          <TableCell align="right">💰 Tổng lương</TableCell>
                          <TableCell align="right">✅ Đã trả</TableCell>
                          <TableCell align="right">⏳ Còn nợ</TableCell>
                          <TableCell align="center">📊 Trạng thái</TableCell>
                          <TableCell>🏫 Lớp giảng dạy</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats.teacherStats.payments.map((payment) => (
                          <TableRow key={payment.id} hover>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {payment.teacherName}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  ID: {payment.teacherId}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="bold">
                                {payment.numberOfSessions}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                buổi
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="bold" color="primary.main">
                                {payment.amount.toLocaleString()} ₫
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {Math.round(payment.amount / payment.numberOfSessions).toLocaleString()}₫/buổi
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                {payment.status === 'paid' ? payment.amount.toLocaleString() : '0'} ₫
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="error.main" fontWeight="bold">
                                {payment.status === 'pending' ? payment.amount.toLocaleString() : '0'} ₫
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={payment.status === 'paid' ? '✅ Đã thanh toán' : '⏳ Chưa thanh toán'}
                                color={payment.status === 'paid' ? 'success' : 'warning'}
                                size="small"
                                variant={payment.status === 'paid' ? 'filled' : 'outlined'}
                              />
                              {payment.paidDate && (
                                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                                  {new Date(payment.paidDate).toLocaleDateString('vi-VN')}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Box>
                                {payment.classDetails.map((classDetail, index) => (
                                  <Chip
                                    key={classDetail.classId}
                                    label={`${classDetail.className} (${classDetail.sessions})`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              {selectedTab === 1 && (
                <>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Chi tiết thanh toán học phí</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Tổng cộng: {stats.studentStats.payments.length} học sinh
                    </Typography>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>👨‍🎓 Học sinh</TableCell>
                          <TableCell>🏫 Lớp học</TableCell>
                          <TableCell align="right">💵 Học phí dự kiến</TableCell>
                          <TableCell align="right">✅ Đã đóng</TableCell>
                          <TableCell align="right">⏳ Còn thiếu</TableCell>
                          <TableCell align="center">📊 Trạng thái</TableCell>
                          <TableCell>📅 Ngày đóng gần nhất</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats.studentStats.payments.map((payment) => (
                          <TableRow key={payment.id} hover>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {payment.studentName}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  ID: {payment.studentId}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="bold">
                                {payment.className}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                ID: {payment.classId}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="bold" color="info.main">
                                {payment.expectedAmount.toLocaleString()} ₫
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="success.main" fontWeight="bold">
                                {payment.paidAmount.toLocaleString()} ₫
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {payment.expectedAmount > 0 ? 
                                  Math.round((payment.paidAmount / payment.expectedAmount) * 100) : 0}%
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" color="error.main" fontWeight="bold">
                                {payment.remainingAmount.toLocaleString()} ₫
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={
                                  payment.status === 'paid'
                                    ? '✅ Đã đóng đủ'
                                    : payment.status === 'partial'
                                    ? '🔄 Đóng một phần'
                                    : '❌ Chưa đóng'
                                }
                                color={
                                  payment.status === 'paid'
                                    ? 'success'
                                    : payment.status === 'partial'
                                    ? 'warning'
                                    : 'error'
                                }
                                size="small"
                                variant={payment.status === 'paid' ? 'filled' : 'outlined'}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {payment.lastPaymentDate
                                  ? new Date(payment.lastPaymentDate).toLocaleDateString('vi-VN')
                                  : '❌ Chưa có'}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>                  </TableContainer>
                </>
              )}

              {selectedTab === 2 && (
                <>
                  <Typography variant="h6" gutterBottom>📈 Tổng quan tài chính</Typography>
                  
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'info.50' }}>
                        <Typography variant="h6" color="info.main" gutterBottom>
                          💰 Phân tích dòng tiền
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Tổng thu dự kiến:</Typography>
                            <Typography fontWeight="bold" color="info.main">
                              {stats.studentStats.expectedAmount.toLocaleString()} ₫
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Tổng chi dự kiến:</Typography>
                            <Typography fontWeight="bold" color="error.main">
                              {stats.teacherStats.totalAmount.toLocaleString()} ₫
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: 1, borderColor: 'divider' }}>
                            <Typography fontWeight="bold">Lợi nhuận dự kiến:</Typography>
                            <Typography fontWeight="bold" color="success.main">
                              {stats.profitStats.expectedProfit.toLocaleString()} ₫
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
                        <Typography variant="h6" color="success.main" gutterBottom>
                          📊 Thực tế hiện tại
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Đã thu thực tế:</Typography>
                            <Typography fontWeight="bold" color="success.main">
                              {stats.studentStats.paidAmount.toLocaleString()} ₫
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography>Đã chi thực tế:</Typography>
                            <Typography fontWeight="bold" color="error.main">
                              {stats.teacherStats.paidAmount.toLocaleString()} ₫
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: 1, borderColor: 'divider' }}>
                            <Typography fontWeight="bold">Lợi nhuận thực tế:</Typography>
                            <Typography fontWeight="bold" color="primary.main">
                              {stats.profitStats.actualProfit.toLocaleString()} ₫
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Card sx={{ height: '100%', bgcolor: 'warning.50' }}>
                        <CardContent>
                          <Typography variant="h6" color="warning.main" gutterBottom>
                            ⚠️ Cần thu thêm
                          </Typography>
                          <Typography variant="h4" color="error.main" fontWeight="bold">
                            {stats.studentStats.remainingAmount.toLocaleString()} ₫
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Từ {stats.studentStats.payments.filter(p => p.status !== 'paid').length} học sinh chưa đóng đủ
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Card sx={{ height: '100%', bgcolor: 'error.50' }}>
                        <CardContent>
                          <Typography variant="h6" color="error.main" gutterBottom>
                            💸 Cần trả giáo viên
                          </Typography>
                          <Typography variant="h4" color="error.main" fontWeight="bold">
                            {stats.teacherStats.pendingAmount.toLocaleString()} ₫
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Cho {stats.teacherStats.payments.filter(p => p.status === 'pending').length} giáo viên chưa được thanh toán
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <Card sx={{ height: '100%', bgcolor: 'info.50' }}>
                        <CardContent>
                          <Typography variant="h6" color="info.main" gutterBottom>
                            📊 Tỷ lệ hoàn thành
                          </Typography>
                          <Typography variant="h4" color="primary.main" fontWeight="bold">
                            {stats.studentStats.expectedAmount > 0 ? 
                              Math.round((stats.studentStats.paidAmount / stats.studentStats.expectedAmount) * 100) : 0}%
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Tỷ lệ thu học phí so với dự kiến
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Paper sx={{ mt: 3, p: 2 }}>
                    <Typography variant="h6" gutterBottom>📋 Ghi chú quan trọng</Typography>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        • <strong>Học phí dự kiến:</strong> Được tính dựa trên số buổi học và mức phí/buổi của từng lớp
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        • <strong>Chi phí giáo viên:</strong> Được tính dựa trên số buổi dạy và mức lương/buổi của từng giáo viên
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        • <strong>Lợi nhuận dự kiến:</strong> = Tổng học phí dự kiến - Tổng chi phí giáo viên
                      </Typography>
                      <Typography variant="body2">
                        • <strong>Lợi nhuận thực tế:</strong> = Số tiền đã thu - Số tiền đã trả giáo viên
                      </Typography>
                    </Box>
                  </Paper>
                </>
              )}
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default FinancialStatistics;