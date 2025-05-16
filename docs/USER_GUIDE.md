# Hướng Dẫn Sử Dụng Micro App Demo

Tài liệu này cung cấp hướng dẫn chi tiết về cách sử dụng micro-app-demo, bao gồm cài đặt, phát triển, và triển khai.

## Mục Lục

1. [Cài Đặt](#1-cài-đặt)
2. [Cấu Trúc Dự Án](#2-cấu-trúc-dự-án)
3. [Phát Triển](#3-phát-triển)
4. [Tính Năng](#4-tính-năng)
5. [API Integration](#5-api-integration)
6. [Routing](#6-routing)
7. [Styling](#7-styling)
8. [Build và Triển Khai](#8-build-và-triển-khai)
9. [Troubleshooting](#9-troubleshooting)

## 1. Cài Đặt

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

## 2. Cấu Trúc Dự Án

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

## 3. Phát Triển

### Chế Độ Standalone

Micro app có thể chạy ở chế độ standalone (độc lập) hoặc được tích hợp vào host app.

Khi chạy ở chế độ standalone:
- Ứng dụng sẽ sử dụng mock data
- Xác thực sẽ được giả lập
- EventBus sẽ log các sự kiện ra console

### Chế Độ Tích Hợp

Khi được tích hợp vào host app:
- Ứng dụng sẽ nhận authState từ host app
- Ứng dụng sẽ sử dụng EventBus từ host app
- Ứng dụng sẽ sử dụng API Layer từ host app

### Hot Reloading

Ứng dụng hỗ trợ hot reloading, cho phép bạn thấy các thay đổi ngay lập tức mà không cần refresh trang.

## 4. Tính Năng

Micro app demo bao gồm các tính năng sau:

### Quản Lý Sản Phẩm

- Danh sách sản phẩm
- Chi tiết sản phẩm
- Thêm/sửa sản phẩm

### Quản Lý Khách Hàng

- Danh sách khách hàng
- Chi tiết khách hàng
- Thêm/sửa khách hàng

### Quản Lý Hợp Đồng

- Danh sách hợp đồng
- Chi tiết hợp đồng
- Thêm/sửa hợp đồng với form nhiều bước

### Quản Lý Dự Án

- Danh sách dự án
- Chi tiết dự án
- Thêm/sửa dự án với form nhiều bước

## 5. API Integration

### Sử Dụng API Service

Micro app sử dụng API service để gọi API từ host app:

```typescript
import { getRequest, postRequest } from '../../services/apiService';

// Sử dụng getRequest
const fetchData = async () => {
  try {
    const response = await getRequest('/api/next/core/api/v1/system/parameters');
    setData(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Sử dụng postRequest
const saveData = async (data) => {
  try {
    const response = await postRequest('/api/next/core/api/v1/customers', data);
    return response;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};
```

### Sử Dụng useApi Hook

Micro app cung cấp hook `useApi` để dễ dàng gọi API:

```typescript
import { useApi } from '../shared/hooks/useApi';

const MyComponent = () => {
  const { data, loading, error, fetchData } = useApi('/api/next/core/api/v1/system/parameters');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

### Xử Lý Lỗi

API service tự động xử lý các lỗi phổ biến:
- Lỗi xác thực (401)
- Lỗi Modal
- Lỗi mạng

## 6. Routing

### Cấu Trúc Route

Micro app sử dụng React Router để quản lý routing:

```tsx
<BrowserRouter basename={basePath}>
  <Routes>
    <Route path="/" element={<Navigate to="/products" replace />} />
    <Route path="/products" element={<ProductList />} />
    <Route path="/products/new" element={<ProductForm />} />
    <Route path="/products/edit/:id" element={<ProductForm />} />
    <Route path="/products/:id" element={<ProductDetail />} />
    {/* Các route khác */}
  </Routes>
</BrowserRouter>
```

### Điều Hướng

Để điều hướng trong micro app, sử dụng hook `useNavigate` từ React Router:

```typescript
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/products');
  };

  return (
    <Button onClick={handleClick}>Go to Products</Button>
  );
};
```

### Điều Hướng đến Host App

Để điều hướng đến một route trong host app, sử dụng EventBus:

```typescript
const navigateToShell = (path: string) => {
  eventBus.emit('shell:navigation', { path });
};

// Sử dụng
navigateToShell('/dashboard');
```

## 7. Styling

### Tailwind CSS

Micro app sử dụng Tailwind CSS để styling:

```tsx
<div className="flex justify-between items-center p-4 bg-white shadow rounded">
  <h1 className="text-xl font-bold">Products</h1>
  <Button type="primary">Add Product</Button>
</div>
```

### Ant Design

Micro app sử dụng Ant Design cho các component UI:

```tsx
import { Table, Button, Input, Space } from 'antd';

const MyComponent = () => {
  return (
    <div>
      <Input placeholder="Search..." />
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};
```

### Theme

Micro app sử dụng theme từ Ant Design và có thể được tùy chỉnh:

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1A7D37',
      borderRadius: 6,
    },
  }}
>
  <App />
</ConfigProvider>
```

## 8. Build và Triển Khai

### Build

Để build micro app:

```bash
npm run build
# hoặc
yarn build
```

Build output sẽ được tạo trong thư mục `dist`.

### Triển Khai

Để triển khai micro app:

1. Build micro app
2. Đặt các file build vào một web server (nginx, Apache, v.v.)
3. Cấu hình host app để tải micro app từ URL của web server

## 9. Troubleshooting

### Lỗi "Modal instance is not set"

Lỗi này xảy ra khi micro app cố gắng sử dụng Modal từ host app. Để khắc phục:

- Sử dụng wrapper trong apiService để xử lý lỗi
- Hoặc sử dụng Modal từ Ant Design trong micro app thay vì từ host app

### Lỗi CORS

Nếu gặp lỗi CORS khi gọi API:

- Đảm bảo API được gọi thông qua API Layer của host app
- Đảm bảo URL API có định dạng đúng theo cấu hình của host app

### Lỗi "Micro frontend not found"

Nếu host app không thể tải micro app:

- Kiểm tra URL trong manifest
- Đảm bảo micro app đã được build và triển khai
- Kiểm tra console để xem lỗi chi tiết
