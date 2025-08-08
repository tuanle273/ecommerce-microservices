# Hướng dẫn Load Testing cho Ecommerce Microservices

File JMeter này được thiết kế để thực hiện load test cho ứng dụng Ecommerce Microservices, mô phỏng các luồng người dùng từ đầu đến cuối và xác định ngưỡng chịu tải của hệ thống.

## Yêu cầu

- Apache JMeter (phiên bản 5.4 trở lên)
- Ứng dụng Ecommerce Microservices đã được triển khai (sử dụng docker-compose)
- Client Secret từ Keycloak

## Cấu trúc Test Plan

Test plan này mô phỏng 3 luồng chính:

1. **Authentication Flow**: Lấy token từ Keycloak
2. **Product Browsing Flow**: Xem danh sách sản phẩm
3. **Order Processing Flow**: Tạo đơn hàng mới và xem danh sách đơn hàng

## Cách sử dụng

### 1. Chuẩn bị môi trường

- Khởi chạy ứng dụng Ecommerce Microservices:
  ```
  cd ecommerce-microservices
  docker compose up -d
  ```

- Lấy Client Secret từ Keycloak:
  - Truy cập Keycloak Admin UI tại http://localhost:8080/
  - Đăng nhập với tài khoản admin/admin
  - Chọn realm `spring-boot-microservices-realm`
  - Chọn client `spring-cloud-client`
  - Vào tab Credentials và copy Client Secret

### 2. Cấu hình JMeter Test

- Mở file `ecommerce-microservices-load-test.jmx` bằng Apache JMeter
- Cập nhật các biến trong Test Plan:
  - `client_secret`: Thay thế bằng Client Secret đã lấy từ Keycloak
  - `host`: Địa chỉ host của ứng dụng (mặc định: localhost)
  - `api_port`: Port của API Gateway (mặc định: 8181)
  - `keycloak_port`: Port của Keycloak (mặc định: 8080)

### 3. Điều chỉnh tham số load test

Trong Thread Group "Ecommerce User Flow", bạn có thể điều chỉnh các tham số sau để thay đổi cường độ test:

- **Number of Threads (users)**: Số lượng người dùng đồng thời (mặc định: 100)
- **Ramp-up period (seconds)**: Thời gian để tăng dần số lượng người dùng (mặc định: 60)
- **Loop Count**: Số lần lặp lại mỗi luồng (mặc định: 5)
- **Duration (seconds)**: Thời gian chạy test (mặc định: 300)

### 4. Chạy Test

- Nhấn nút "Start" (biểu tượng play màu xanh) để bắt đầu test
- Theo dõi kết quả trong các Listeners:
  - **View Results Tree**: Xem chi tiết từng request
  - **Summary Report**: Tóm tắt kết quả test
  - **Graph Results**: Biểu đồ hiệu suất theo thời gian
  - **Aggregate Report**: Báo cáo tổng hợp

## Kịch bản tìm ngưỡng chịu tải

Để xác định ngưỡng chịu tải của hệ thống, hãy thực hiện các bước sau:

1. **Bắt đầu với tải nhẹ**:
   - Số người dùng: 10
   - Ramp-up: 30 giây
   - Thời gian chạy: 2 phút

2. **Tăng dần tải**:
   - Tăng số người dùng lên 25, 50, 100, 200, 500
   - Giữ nguyên các tham số khác
   - Chạy test sau mỗi lần tăng và ghi nhận kết quả

3. **Xác định ngưỡng**:
   - Theo dõi các chỉ số: Thời gian phản hồi, Throughput, Tỷ lệ lỗi
   - Ngưỡng chịu tải là điểm mà một trong các điều kiện sau xảy ra:
     - Thời gian phản hồi trung bình vượt quá 2 giây
     - Tỷ lệ lỗi vượt quá 1%
     - Throughput không tăng khi tăng số lượng người dùng

4. **Kiểm tra tải liên tục**:
   - Sử dụng số người dùng ở mức ngưỡng
   - Tăng thời gian chạy lên 10-15 phút
   - Theo dõi hiệu suất hệ thống trong thời gian dài

## Phân tích kết quả

- **Thời gian phản hồi (Response Time)**: Thời gian để nhận phản hồi từ server
- **Throughput**: Số request xử lý được trong một đơn vị thời gian
- **Tỷ lệ lỗi (Error Rate)**: Phần trăm request thất bại
- **Percentile 90 (90% Line)**: 90% request có thời gian phản hồi nhỏ hơn giá trị này

## Lưu ý

- Đảm bảo máy chạy JMeter có đủ tài nguyên để tạo tải lớn
- Nếu test trên môi trường production, hãy cẩn thận với số lượng người dùng để tránh làm quá tải hệ thống
- Điều chỉnh thông số timeout trong HTTP Request nếu cần thiết
- Thêm các Assertions để kiểm tra tính đúng đắn của phản hồi
