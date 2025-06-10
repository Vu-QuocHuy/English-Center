# Hướng dẫn thêm hình ảnh Popup quảng cáo

## Bước 1: Lưu hình ảnh

1. Lưu hình ảnh quảng cáo bạn đã cung cấp với tên: `popup-ad.jpg`
2. Đặt vào thư mục: `public/images/ads/popup-ad.jpg`

## Bước 2: Kiểm tra đường dẫn

- Đảm bảo file tồn tại tại: `D:\English-Center\public\images\ads\popup-ad.jpg`
- Component sẽ tự động tải hình ảnh từ `/images/ads/popup-ad.jpg`

## Bước 3: Test

1. Chạy `yarn start`
2. Đăng nhập vào hệ thống
3. Popup sẽ hiển thị sau 1.5 giây

## Tính năng popup:

- ✅ Hiển thị cho tất cả user khi đăng nhập lần đầu trong session
- ✅ Có nút đóng và nút hành động
- ✅ Sử dụng sessionStorage để không hiển thị lại trong cùng session
- ✅ Animation slide up khi hiển thị
- ✅ Responsive design

## Tùy chỉnh:

- Thay đổi thời gian hiển thị: sửa `1500` trong `setTimeout`
- Thay đổi nội dung: sửa trong file `src/components/WelcomeAdPopup.tsx`
- Thay đổi hình ảnh: thay thế file `popup-ad.jpg`
