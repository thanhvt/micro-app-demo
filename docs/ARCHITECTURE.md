# Kiến Trúc Micro Frontend

## Tổng Quan

Kiến trúc micro frontend được triển khai trong dự án này cho phép phát triển, triển khai và tích hợp các ứng dụng frontend độc lập vào một ứng dụng shell (host-app). Kiến trúc này giúp các team có thể làm việc độc lập trên các phần khác nhau của ứng dụng mà không ảnh hưởng đến nhau.

```
┌─────────────────────────────────────────────────────────────┐
│                      Host App (@vssfe)                      │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Core UI    │  │  Routing    │  │  Authentication     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  API Layer  │  │  EventBus   │  │  MicroFrontendLoader│  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                           │
                           ▼
┌─────────────┐  ┌─────────────────┐  ┌─────────────────────┐
│ Micro App 1 │  │ @micro-app-demo │  │ Micro App 3         │
│             │  │                 │  │                     │
└─────────────┘  └─────────────────┘  └─────────────────────┘
```

## Thành Phần Chính

### 1. Host App (@vssfe)

Host app là ứng dụng chính (shell) chịu trách nhiệm:
- Quản lý routing
- Xác thực người dùng
- Cung cấp UI chung (header, sidebar, footer)
- Tải và mount các micro frontend
- Cung cấp EventBus để giao tiếp giữa các micro frontend
- Cung cấp API Layer để micro frontend có thể gọi API

### 2. Micro Frontend (@micro-app-demo)

Micro frontend là các ứng dụng độc lập có thể được phát triển, kiểm thử và triển khai độc lập. Mỗi micro frontend:
- Được đóng gói thành một bundle JavaScript
- Cung cấp các hàm mount/unmount để host app có thể tải và hiển thị
- Sử dụng EventBus để giao tiếp với host app và các micro frontend khác
- Có thể sử dụng API Layer từ host app

### 3. MicroFrontendLoader

MicroFrontendLoader là component trong host app chịu trách nhiệm:
- Tải manifest của micro frontend
- Tải các script và style của micro frontend
- Mount micro frontend vào container
- Truyền các props cần thiết (authState, eventBus, path, v.v.)
- Xử lý unmount khi người dùng rời khỏi micro frontend

### 4. EventBus

EventBus là cơ chế giao tiếp giữa host app và các micro frontend:
- Cho phép các micro frontend đăng ký lắng nghe sự kiện
- Cho phép các micro frontend phát sự kiện
- Hỗ trợ các sự kiện như auth-change, navigation, notification, v.v.

### 5. API Layer

API Layer là lớp trung gian giúp các micro frontend gọi API:
- Host app cung cấp các hàm API (getRequest, postRequest, v.v.)
- Micro frontend có thể sử dụng các hàm này để gọi API
- Xử lý các vấn đề chung như xác thực, refresh token, xử lý lỗi

## Luồng Dữ Liệu

### Khởi Động Micro Frontend

1. Người dùng truy cập URL của micro frontend
2. Host app tải manifest của micro frontend
3. Host app tải các script và style của micro frontend
4. Host app mount micro frontend vào container
5. Micro frontend đăng ký lắng nghe sự kiện từ host app
6. Micro frontend yêu cầu trạng thái xác thực từ host app
7. Micro frontend yêu cầu các hàm API từ host app

### Gọi API từ Micro Frontend

1. Micro frontend gọi hàm API được cung cấp bởi host app
2. Host app xử lý yêu cầu API (thêm token, xử lý lỗi, v.v.)
3. Host app gửi yêu cầu đến server
4. Host app nhận phản hồi từ server
5. Host app trả kết quả cho micro frontend

### Điều Hướng

1. Micro frontend yêu cầu điều hướng đến một URL khác
2. Micro frontend phát sự kiện navigation với URL đích
3. Host app lắng nghe sự kiện và điều hướng đến URL đích

## Cấu Trúc Thư Mục

```
micro-app-demo/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   ├── data/
│   │   └── mockData.ts
│   ├── features/
│   │   ├── products/
│   │   ├── customers/
│   │   ├── contracts/
│   │   ├── projects/
│   │   └── shared/
│   ├── services/
│   │   └── apiService.ts
│   ├── types/
│   │   ├── auth.ts
│   │   └── features.ts
│   ├── App.tsx
│   ├── bootstrap.tsx
│   └── index.tsx
├── docs/
├── package.json
└── webpack.config.js
```

## Công Nghệ Sử Dụng

- **React**: Thư viện UI
- **TypeScript**: Ngôn ngữ lập trình
- **Webpack**: Bundler
- **Ant Design**: Thư viện UI components
- **Tailwind CSS**: Framework CSS
- **React Router**: Quản lý routing trong micro frontend

## Tích Hợp với Host App

Micro frontend được tích hợp với host app thông qua:
1. **Manifest**: Cung cấp thông tin về các script và style cần tải
2. **Mount/Unmount API**: Cung cấp các hàm để host app có thể mount và unmount micro frontend
3. **EventBus**: Cung cấp cơ chế giao tiếp giữa host app và micro frontend
4. **API Layer**: Cho phép micro frontend sử dụng các hàm API từ host app
