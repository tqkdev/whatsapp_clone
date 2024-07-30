whatsapp_clone là một ứng dụng web được xây dựng bằng Next.js với TypeScript, Tailwind CSS và Socket.IO. Nó bao gồm các chức năng quản lý người dùng và cuộc trò chuyện, với khả năng giao tiếp thời gian thực.
## Dự án gồm các chức năng
<p>Auth: Đăng kí, đăng nhập, đăng xuất</p>
<p>Tìm kiếm người dùng</p>
<p>Hiển thị tất các cuộc hội thoại</p>
<p>Tạo cuộc trò chuyện và nhắn tin với thời gian thực</p>


## Sử dụng Tailwind CSS
Dự án sử dụng Tailwind CSS để tạo kiểu cho các thành phần giao diện người dùng. Các cấu hình cho Tailwind được đặt trong file tailwind.config.js và các tệp CSS toàn cục được đặt trong thư mục styles.

## Sử dụng Socket.IO
Socket.IO được cấu hình trong file utils/socket.ts và được sử dụng trong các thành phần để lắng nghe và phát các sự kiện thời gian thực.
