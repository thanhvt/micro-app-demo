# Tài Liệu Micro App Demo

Chào mừng bạn đến với tài liệu của Micro App Demo! Tài liệu này cung cấp thông tin chi tiết về kiến trúc, cách sử dụng, và cách phát triển micro frontend.

## Mục Lục

1. [Giới Thiệu](#giới-thiệu)
2. [Tài Liệu](#tài-liệu)
3. [Cài Đặt](#cài-đặt)
4. [Phát Triển](#phát-triển)
5. [Liên Hệ](#liên-hệ)

## Giới Thiệu

Micro App Demo là một ứng dụng micro frontend được phát triển để minh họa cách tích hợp các ứng dụng frontend độc lập vào một ứng dụng shell (host-app). Ứng dụng này bao gồm các tính năng quản lý sản phẩm, khách hàng, hợp đồng, và dự án.

Micro App Demo được xây dựng với:
- React 18
- TypeScript
- Ant Design
- Tailwind CSS
- React Router
- Webpack

## Tài Liệu

Tài liệu chi tiết về Micro App Demo được chia thành các phần sau:

### Kiến Trúc và Thiết Kế

- [Kiến Trúc Micro Frontend](./ARCHITECTURE.md) - Mô tả chi tiết về kiến trúc micro frontend
- [Hướng Dẫn Tích Hợp](./INTEGRATION_GUIDE.md) - Hướng dẫn tích hợp micro frontend vào host app

### Hướng Dẫn Sử Dụng

- [Hướng Dẫn Sử Dụng](./USER_GUIDE.md) - Hướng dẫn sử dụng Micro App Demo
- [API Integration](./API_INTEGRATION.md) - Hướng dẫn tích hợp API giữa host app và micro frontend

### Phát Triển

- [Hướng Dẫn Phát Triển](./DEVELOPMENT_GUIDE.md) - Hướng dẫn phát triển một micro frontend mới

## Cài Đặt

### Yêu Cầu

- Node.js (v14 trở lên)
- npm hoặc yarn

### Cài Đặt Dependencies

```bash
# Clone repository
git clone <repository-url>
cd micro-app-demo

# Cài đặt dependencies
npm install
# hoặc
yarn install
```

### Khởi Động Ứng Dụng

```bash
# Khởi động ứng dụng ở chế độ development
npm start
# hoặc
yarn start
```

Ứng dụng sẽ chạy ở địa chỉ [http://localhost:3001](http://localhost:3001).

### Build

```bash
# Build ứng dụng
npm run build
# hoặc
yarn build
```

Build output sẽ được tạo trong thư mục `dist`.

## Phát Triển

### Cấu Trúc Dự Án

```
micro-app-demo/
├── public/                 # Static files
│   ├── index.html          # HTML template
│   └── manifest.json       # Micro frontend manifest
├── src/
│   ├── components/         # Shared components
│   ├── data/               # Mock data
│   │   └── mockData.ts
│   ├── features/           # Feature modules
│   │   ├── products/       # Product management feature
│   │   ├── customers/      # Customer management feature
│   │   ├── contracts/      # Contract management feature
│   │   ├── projects/       # Project management feature
│   │   └── shared/         # Shared feature components
│   ├── services/           # Services
│   │   └── apiService.ts   # API service
│   ├── types/              # TypeScript type definitions
│   │   ├── auth.ts         # Authentication types
│   │   └── features.ts     # Feature-specific types
│   ├── App.tsx             # Main App component
│   ├── bootstrap.tsx       # Micro frontend bootstrap
│   └── index.tsx           # Entry point
├── docs/                   # Documentation
├── package.json            # Dependencies and scripts
└── webpack.config.js       # Webpack configuration
```

### Chế Độ Development

Micro App Demo có thể chạy ở hai chế độ:

1. **Standalone Mode**: Chạy độc lập, sử dụng mock data và giả lập xác thực
2. **Integrated Mode**: Tích hợp vào host app, sử dụng API và xác thực từ host app

Để chạy ở chế độ standalone:

```bash
npm start
# hoặc
yarn start
```

### Tích Hợp với Host App

Để tích hợp Micro App Demo vào host app:

1. Build Micro App Demo
2. Đặt các file build vào một web server
3. Cấu hình host app để tải Micro App Demo từ URL của web server

Chi tiết về cách tích hợp có thể được tìm thấy trong [Hướng Dẫn Tích Hợp](./INTEGRATION_GUIDE.md).

## Liên Hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ với chúng tôi qua:

- Email: [example@example.com](mailto:example@example.com)
- GitHub: [github.com/example/micro-app-demo](https://github.com/example/micro-app-demo)
