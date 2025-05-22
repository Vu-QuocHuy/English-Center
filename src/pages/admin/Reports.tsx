import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Reports: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reportType, setReportType] = useState('month');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Thay mock data bằng placeholder cho dữ liệu thực tế sẽ fetch sau
  const [financialData, setFinancialData] = useState<any[]>([]); // Sẽ fetch sau
  const [teacherSalaryTotal, setTeacherSalaryTotal] = useState(0);
  const [expectedIncomeTotal, setExpectedIncomeTotal] = useState(0);
  const [actualIncomeTotal, setActualIncomeTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);
  const [unpaidTotal, setUnpaidTotal] = useState(0);

  const [studentTrendData, setStudentTrendData] = useState<any[]>([]); // Sẽ fetch sau
  const [studentYear, setStudentYear] = useState(dayjs().year());

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Báo cáo thống kê
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Thống kê tài chính" />
        <Tab label="Thống kê học sinh" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Loại báo cáo"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="month">Theo tháng</MenuItem>
              <MenuItem value="quarter">Theo quý</MenuItem>
              <MenuItem value="year">Theo năm</MenuItem>
              <MenuItem value="custom">Tùy chọn</MenuItem>
            </TextField>
          </Grid>
          {reportType === 'month' && (
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Tháng"
                value={dayjs().month() + 1}
                // onChange={...}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>Tháng {i + 1}</MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          {reportType === 'quarter' && (
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Quý"
                value={1}
                // onChange={...}
              >
                {[1, 2, 3, 4].map((q) => (
                  <MenuItem key={q} value={q}>Quý {q}</MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          {(reportType === 'month' || reportType === 'quarter' || reportType === 'year') && (
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Năm"
                value={dayjs().year()}
                // onChange={...}
              >
                {[...Array(5)].map((_, i) => (
                  <MenuItem key={dayjs().year() - i} value={dayjs().year() - i}>{dayjs().year() - i}</MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          {reportType === 'custom' && (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Từ ngày"
                  value={startDate}
                  onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Đến ngày"
                  value={endDate}
                  onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="contained" color="primary">
                  Xem báo cáo
                </Button>
              </Grid>
            </LocalizationProvider>
          )}
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Tổng chi trả giáo viên</Typography>
              <Typography variant="h5" color="error">
                {teacherSalaryTotal.toLocaleString()} VNĐ
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Tổng học phí dự kiến</Typography>
              <Typography variant="h5" color="info.main">
                {expectedIncomeTotal.toLocaleString()} VNĐ
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Đã thu học phí</Typography>
              <Typography variant="h5" color="success.main">
                {actualIncomeTotal.toLocaleString()} VNĐ
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Tổng giảm giá</Typography>
              <Typography variant="h5" color="primary">
                {discountTotal.toLocaleString()} VNĐ
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Còn phải thu</Typography>
              <Typography variant="h5" color="warning.main">
                {unpaidTotal.toLocaleString()} VNĐ
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Placeholder cho bảng và biểu đồ, sẽ cập nhật sau khi có dữ liệu thực tế */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Biểu đồ thu chi (sẽ cập nhật sau)
          </Typography>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.500' }}>
            Dữ liệu sẽ hiển thị ở đây
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thời gian</TableCell>
                <TableCell align="right">Chi trả giáo viên</TableCell>
                <TableCell align="right">Học phí dự kiến</TableCell>
                <TableCell align="right">Đã thu</TableCell>
                <TableCell align="right">Giảm giá</TableCell>
                <TableCell align="right">Còn phải thu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Sẽ map dữ liệu thực tế ở đây */}
              {financialData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.timeLabel}</TableCell>
                  <TableCell align="right">{row.teacherSalary?.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="right">{row.expectedIncome?.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="right">{row.actualIncome?.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="right">{row.discount?.toLocaleString()} VNĐ</TableCell>
                  <TableCell align="right">{row.unpaid?.toLocaleString()} VNĐ</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Năm"
              value={studentYear}
              onChange={e => setStudentYear(Number(e.target.value))}
            >
              {[...Array(5)].map((_, i) => (
                <MenuItem key={dayjs().year() - i} value={dayjs().year() - i}>{dayjs().year() - i}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Tổng số học sinh</Typography>
              <Typography variant="h5">
                {studentTrendData.length > 0 ? studentTrendData[studentTrendData.length - 1].total : 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Học sinh mới (tháng này)</Typography>
              <Typography variant="h5" color="success.main">
                +{studentTrendData.length > 0 ? studentTrendData[studentTrendData.length - 1].new : 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Học sinh nghỉ (tháng này)</Typography>
              <Typography variant="h5" color="error">
                -{studentTrendData.length > 0 ? studentTrendData[studentTrendData.length - 1].left : 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Biến động học sinh theo tháng (sẽ cập nhật sau)
          </Typography>
          <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.500' }}>
            Dữ liệu sẽ hiển thị ở đây
          </Box>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tháng</TableCell>
                <TableCell align="right">Tổng số</TableCell>
                <TableCell align="right">Học sinh mới</TableCell>
                <TableCell align="right">Học sinh nghỉ</TableCell>
                <TableCell align="right">Tăng/Giảm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Sẽ map dữ liệu thực tế ở đây */}
              {studentTrendData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">+{row.new}</TableCell>
                  <TableCell align="right">-{row.left}</TableCell>
                  <TableCell align="right">
                    <Typography color={row.new - row.left > 0 ? 'success.main' : 'error'}>
                      {row.new - row.left > 0 ? '+' : ''}
                      {row.new - row.left}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};

export default Reports; 