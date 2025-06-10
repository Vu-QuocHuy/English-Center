# 🎨 Color Constants - White Theme

Hệ thống quản lý màu sắc cho trang web English Center với chủ đề trắng làm màu chính.

## 📁 Cấu trúc file

- `colors.ts` - File chính chứa tất cả biến màu

## 🎯 Cách sử dụng

### 1. Import màu sắc

```typescript
// Import toàn bộ
import COLORS from "../constants/colors";

// Import từng phần cụ thể
import {
  PRIMARY_COLORS,
  TEXT_COLORS,
  STATUS_COLORS,
} from "../constants/colors";

// Import component colors
import { COMPONENT_COLORS } from "../constants/colors";
```

### 2. Sử dụng trong component

```typescript
// Trong styled components
const StyledBox = styled(Box)`
  background-color: ${COLORS.primary.main};
  color: ${COLORS.text.primary};
  border: 1px solid ${COLORS.border.light};
`;

// Trong sx prop của Material-UI
<Paper sx={{
  backgroundColor: COLORS.background.paper,
  color: COLORS.text.primary,
  border: `1px solid ${COLORS.border.light}`
}}>

// Sử dụng component colors
<Button sx={{
  backgroundColor: COMPONENT_COLORS.button.primary.background,
  color: COMPONENT_COLORS.button.primary.text,
}}>
```

### 3. Sử dụng utility functions

```typescript
import { getColor, hexToRgba } from "../constants/colors";

// Lấy màu theo path
const primaryColor = getColor("primary.main"); // '#FFFFFF'
const successColor = getColor("status.success.main"); // '#4CAF50'

// Tạo màu với độ trong suốt
const transparentWhite = hexToRgba("#FFFFFF", 0.8); // 'rgba(255, 255, 255, 0.8)'
```

## 🎨 Palette màu chính

### Primary Colors (Màu chính)

- `main: '#FFFFFF'` - Trắng thuần
- `light: '#FAFAFA'` - Trắng nhạt
- `lighter: '#F5F5F5'` - Xám trắng rất nhạt
- `contrast: '#212121'` - Đen cho contrast

### Secondary Colors (Màu phụ)

- `main: '#F8F9FA'` - Trắng xám
- `light: '#E9ECEF'` - Xám rất nhạt
- `dark: '#DEE2E6'` - Xám nhạt
- `darker: '#CED4DA'` - Xám trung bình nhạt

### Accent Colors (Màu nhấn)

- `primary: '#2196F3'` - Xanh dương nhẹ
- `secondary: '#4CAF50'` - Xanh lá nhẹ
- `tertiary: '#FF9800'` - Cam nhẹ

### Text Colors (Màu chữ)

- `primary: '#212121'` - Đen chính
- `secondary: '#757575'` - Xám đen
- `disabled: '#BDBDBD'` - Xám nhạt
- `hint: '#9E9E9E'` - Xám gợi ý

### Status Colors (Màu trạng thái)

- **Success**: `main: '#4CAF50'`, `light: '#E8F5E8'`, `dark: '#388E3C'`
- **Error**: `main: '#F44336'`, `light: '#FFEBEE'`, `dark: '#D32F2F'`
- **Warning**: `main: '#FF9800'`, `light: '#FFF3E0'`, `dark: '#F57C00'`
- **Info**: `main: '#2196F3'`, `light: '#E3F2FD'`, `dark: '#1976D2'`

## 💡 Best Practices

1. **Sử dụng màu có ý nghĩa**: Luôn chọn màu phù hợp với ngữ cảnh
2. **Contrast tốt**: Đảm bảo độ tương phản giữa text và background
3. **Consistency**: Sử dụng một cách nhất quán trong toàn bộ ứng dụng
4. **Accessibility**: Tuân thủ các tiêu chuẩn về khả năng tiếp cận

## 🔧 Tùy chỉnh

Để thay đổi màu sắc, chỉnh sửa trong file `colors.ts`:

```typescript
// Thay đổi màu accent chính
accent: {
  primary: '#1976D2', // Thay vì '#2196F3'
  // ...
}
```

## 📱 Responsive Colors

Các màu đã được thiết kế để hoạt động tốt trên mọi thiết bị và kích thước màn hình.

## 🎨 Component-Specific Colors

File cũng cung cấp màu sắc được định nghĩa trước cho các component:

- `COMPONENT_COLORS.header` - Màu cho header
- `COMPONENT_COLORS.sidebar` - Màu cho sidebar
- `COMPONENT_COLORS.card` - Màu cho card/paper
- `COMPONENT_COLORS.button` - Màu cho button
- `COMPONENT_COLORS.input` - Màu cho input/form
- `COMPONENT_COLORS.table` - Màu cho table
