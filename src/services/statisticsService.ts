import { FinancialStats, TeacherPaymentStats, StudentPaymentStats, FinancialPeriod, TeacherPayment, StudentPayment } from '../types/models';

// Mock data for demonstration
const mockTeacherPayments: TeacherPayment[] = [
  {
    id: 1,
    teacherId: 1,
    teacherName: 'Nguyễn Văn An',
    classId: 1,
    month: 6,
    year: 2025,
    numberOfSessions: 12,
    amount: 3600000, // 12 buổi × 300,000đ/buổi
    status: 'paid',
    paidDate: '2025-06-05',
    classDetails: [
      { classId: 1, className: 'IELTS Intermediate A', sessions: 8 },
      { classId: 2, className: 'TOEIC Basic B', sessions: 4 }
    ]
  },
  {
    id: 2,
    teacherId: 2,
    teacherName: 'Trần Thị Bình',
    classId: 3,
    month: 6,
    year: 2025,
    numberOfSessions: 16,
    amount: 4800000, // 16 buổi × 300,000đ/buổi
    status: 'pending',
    classDetails: [
      { classId: 3, className: 'English Communication', sessions: 10 },
      { classId: 4, className: 'Business English', sessions: 6 }
    ]
  },
  {
    id: 3,
    teacherId: 3,
    teacherName: 'Lê Hoàng Cường',
    classId: 5,
    month: 6,
    year: 2025,
    numberOfSessions: 10,
    amount: 3500000, // 10 buổi × 350,000đ/buổi (giáo viên senior)
    status: 'paid',
    paidDate: '2025-06-08',
    classDetails: [
      { classId: 5, className: 'IELTS Advanced', sessions: 10 }
    ]
  }
];

const mockStudentPayments: StudentPayment[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Nguyễn Văn A',
    classId: 1,
    className: 'IELTS Intermediate A',
    expectedAmount: 2400000, // 12 buổi × 200,000đ/buổi
    paidAmount: 2400000,
    remainingAmount: 0,
    lastPaymentDate: '2025-06-01',
    status: 'paid'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Trần Thị B',
    classId: 1,
    className: 'IELTS Intermediate A',
    expectedAmount: 2400000,
    paidAmount: 1200000, // Đóng một nửa
    remainingAmount: 1200000,
    lastPaymentDate: '2025-06-01',
    status: 'partial'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Lê Văn C',
    classId: 2,
    className: 'TOEIC Basic B',
    expectedAmount: 1600000, // 8 buổi × 200,000đ/buổi
    paidAmount: 0,
    remainingAmount: 1600000,
    status: 'pending'
  },
  {
    id: 4,
    studentId: 4,
    studentName: 'Phạm Thị D',
    classId: 3,
    className: 'English Communication',
    expectedAmount: 2000000, // 10 buổi × 200,000đ/buổi
    paidAmount: 2000000,
    remainingAmount: 0,
    lastPaymentDate: '2025-06-03',
    status: 'paid'
  },
  {
    id: 5,
    studentId: 5,
    studentName: 'Võ Minh E',
    classId: 4,
    className: 'Business English',
    expectedAmount: 1800000, // 6 buổi × 300,000đ/buổi (lớp cao cấp)
    paidAmount: 900000,
    remainingAmount: 900000,
    lastPaymentDate: '2025-06-02',
    status: 'partial'
  },
  {
    id: 6,
    studentId: 6,
    studentName: 'Nguyễn Thị F',
    classId: 5,
    className: 'IELTS Advanced',
    expectedAmount: 3000000, // 10 buổi × 300,000đ/buổi
    paidAmount: 3000000,
    remainingAmount: 0,
    lastPaymentDate: '2025-06-04',
    status: 'paid'
  }
];

export const statisticsService = {
  // Get financial statistics for a specific period
  async getFinancialStats(period: FinancialPeriod): Promise<FinancialStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter data based on period
    const filteredTeacherPayments = this.filterPaymentsByPeriod(mockTeacherPayments, period);
    const filteredStudentPayments = this.filterStudentPaymentsByPeriod(mockStudentPayments, period);
    
    // Calculate teacher stats
    const teacherStats: TeacherPaymentStats = {
      totalAmount: filteredTeacherPayments.reduce((sum, p) => sum + p.amount, 0),
      paidAmount: filteredTeacherPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      pendingAmount: filteredTeacherPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
      teacherCount: new Set(filteredTeacherPayments.map(p => p.teacherId)).size,
      sessionCount: filteredTeacherPayments.reduce((sum, p) => sum + p.numberOfSessions, 0),
      payments: filteredTeacherPayments
    };
    
    // Calculate student stats
    const studentStats: StudentPaymentStats = {
      expectedAmount: filteredStudentPayments.reduce((sum, p) => sum + p.expectedAmount, 0),
      paidAmount: filteredStudentPayments.reduce((sum, p) => sum + p.paidAmount, 0),
      remainingAmount: filteredStudentPayments.reduce((sum, p) => sum + p.remainingAmount, 0),
      studentCount: filteredStudentPayments.length,
      classCount: new Set(filteredStudentPayments.map(p => p.classId)).size,
      payments: filteredStudentPayments
    };
    
    // Calculate profit stats
    const profitStats = {
      expectedProfit: studentStats.expectedAmount - teacherStats.totalAmount,
      actualProfit: studentStats.paidAmount - teacherStats.paidAmount
    };
    
    return {
      period,
      teacherStats,
      studentStats,
      profitStats
    };
  },

  // Get teacher payment statistics
  async getTeacherPaymentStats(period: FinancialPeriod): Promise<TeacherPaymentStats> {
    const filteredPayments = this.filterPaymentsByPeriod(mockTeacherPayments, period);
    
    return {
      totalAmount: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
      paidAmount: filteredPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      pendingAmount: filteredPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
      teacherCount: new Set(filteredPayments.map(p => p.teacherId)).size,
      sessionCount: filteredPayments.reduce((sum, p) => sum + p.numberOfSessions, 0),
      payments: filteredPayments
    };
  },

  // Get student payment statistics
  async getStudentPaymentStats(period: FinancialPeriod): Promise<StudentPaymentStats> {
    const filteredPayments = this.filterStudentPaymentsByPeriod(mockStudentPayments, period);
    
    return {
      expectedAmount: filteredPayments.reduce((sum, p) => sum + p.expectedAmount, 0),
      paidAmount: filteredPayments.reduce((sum, p) => sum + p.paidAmount, 0),
      remainingAmount: filteredPayments.reduce((sum, p) => sum + p.remainingAmount, 0),
      studentCount: filteredPayments.length,
      classCount: new Set(filteredPayments.map(p => p.classId)).size,
      payments: filteredPayments
    };
  },

  // Filter teacher payments by period
  filterPaymentsByPeriod(payments: TeacherPayment[], period: FinancialPeriod): TeacherPayment[] {
    return payments.filter(payment => {
      const paymentDate = new Date(payment.year, payment.month - 1, 1);
      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      
      return paymentDate >= startDate && paymentDate <= endDate;
    });
  },

  // Filter student payments by period
  filterStudentPaymentsByPeriod(payments: StudentPayment[], period: FinancialPeriod): StudentPayment[] {
    // For demo purposes, we'll assume all current payments are within the selected period
    // In real implementation, you would filter based on actual payment dates or class periods
    return payments;
  },

  // Export financial report as Excel (mock implementation)
  async exportFinancialReport(period: FinancialPeriod): Promise<Blob> {
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a simple text blob as mock Excel file
    const reportData = `Báo cáo tài chính từ ${period.startDate} đến ${period.endDate}\n\n` +
      `Dữ liệu xuất vào: ${new Date().toLocaleString('vi-VN')}\n` +
      `Loại báo cáo: ${period.type}\n\n` +
      `Chi tiết sẽ được implement trong phiên bản thực tế.`;
    
    return new Blob([reportData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  },

  // Get predefined periods
  getPredefinedPeriods() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentQuarter = Math.ceil(currentMonth / 3);

    return {
      currentMonth: {
        type: 'month',
        startDate: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`,
        endDate: new Date(currentYear, currentMonth, 0).toISOString().split('T')[0]
      },
      currentQuarter: {
        type: 'quarter',
        startDate: `${currentYear}-${((currentQuarter - 1) * 3 + 1).toString().padStart(2, '0')}-01`,
        endDate: `${currentYear}-${(currentQuarter * 3).toString().padStart(2, '0')}-${new Date(currentYear, currentQuarter * 3, 0).getDate()}`
      },
      currentYear: {
        type: 'year',
        startDate: `${currentYear}-01-01`,
        endDate: `${currentYear}-12-31`
      }
    };
  }
}; 