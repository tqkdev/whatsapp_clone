# Nextjs + TypeScript

## Giới Thiệu

whatsapp_clone là một ứng dụng web được xây dựng bằng Next.js với TypeScript, Tailwind CSS và Socket.IO. Nó bao gồm các chức năng quản lý người dùng và cuộc trò chuyện, với khả năng giao tiếp thời gian thực.

## Tính Năng

<p>Auth: Đăng kí, đăng nhập, đăng xuất</p>
<p>Tìm kiếm người dùng</p>
<p>Hiển thị tất các cuộc hội thoại</p>
<p>Tạo cuộc trò chuyện và nhắn tin với thời gian thực</p>

## Công Nghệ

- **Frontend**: Nextjs, TypeScript, Tailwind CSS, Socket.IO


## Dự án gồm các chức năng
<p>Auth: Đăng kí, đăng nhập, đăng xuất</p>
<p>Tìm kiếm người dùng</p>
<p>Hiển thị tất các cuộc hội thoại</p>
<p>Tạo cuộc trò chuyện và nhắn tin với thời gian thực</p>


## Sử dụng Tailwind CSS
Dự án sử dụng Tailwind CSS để tạo kiểu cho các thành phần giao diện người dùng. Các cấu hình cho Tailwind được đặt trong file tailwind.config.js và các tệp CSS toàn cục được đặt trong thư mục styles.

## Sử dụng Socket.IO
Socket.IO được cấu hình trong file socket/socket.ts và được sử dụng trong các thành phần để lắng nghe và phát các sự kiện thời gian thực.


## Cài Đặt

1. Di chuyển đến thư mục frontend:

    ```sh
    git git@github.com:tqkdev/whatsapp_clone.git
    cd app/whatsapp_clone
    ```

2. Cài đặt các phụ thuộc:

    ```sh
    npm install
    ```

3. Tạo file `.env` ở thư mục gốc của frontend và thêm nội dung sau:

    ```env
   NEXT_PUBLIC_API_ENDPOINT=<next_public_api_endpoint>
    ```

4. Khởi động server phát triển frontend:

    ```sh
    npm run dev
    ```
