# Hướng Dẫn Xử Lý Sự Cố

Tài liệu này cung cấp hướng dẫn xử lý các sự cố phổ biến khi làm việc với Micro App Demo.

## Mục Lục

1. [Lỗi Khi Khởi Động](#1-lỗi-khi-khởi-động)
2. [Lỗi Khi Build](#2-lỗi-khi-build)
3. [Lỗi Khi Tích Hợp](#3-lỗi-khi-tích-hợp)
4. [Lỗi API](#4-lỗi-api)
5. [Lỗi Routing](#5-lỗi-routing)
6. [Lỗi Xác Thực](#6-lỗi-xác-thực)
7. [Lỗi UI](#7-lỗi-ui)
8. [Lỗi Performance](#8-lỗi-performance)
9. [Công Cụ Debug](#9-công-cụ-debug)

## 1. Lỗi Khi Khởi Động

### Lỗi "Module not found"

**Triệu chứng**: Khi chạy `npm start`, bạn nhận được lỗi "Module not found".

**Nguyên nhân**: Thiếu dependency hoặc đường dẫn import không chính xác.

**Giải pháp**:
1. Chạy `npm install` để cài đặt lại các dependency
2. Kiểm tra đường dẫn import trong file
3. Kiểm tra cấu hình webpack

### Lỗi "Port 3001 is already in use"

**Triệu chứng**: Khi chạy `npm start`, bạn nhận được lỗi "Port 3001 is already in use".

**Nguyên nhân**: Có một ứng dụng khác đang chạy trên port 3001.

**Giải pháp**:
1. Tắt ứng dụng đang chạy trên port 3001
2. Hoặc thay đổi port trong file `webpack.config.js`:
```javascript
devServer: {
  port: 3002, // Thay đổi port
  // ...
}
```

## 2. Lỗi Khi Build

### Lỗi "TypeScript error"

**Triệu chứng**: Khi chạy `npm run build`, bạn nhận được lỗi TypeScript.

**Nguyên nhân**: Code không tuân thủ kiểu dữ liệu TypeScript.

**Giải pháp**:
1. Sửa lỗi TypeScript theo thông báo
2. Hoặc thêm `// @ts-ignore` trước dòng có lỗi (chỉ sử dụng khi cần thiết)

### Lỗi "Out of memory"

**Triệu chứng**: Khi chạy `npm run build`, bạn nhận được lỗi "JavaScript heap out of memory".

**Nguyên nhân**: Quá trình build yêu cầu nhiều bộ nhớ hơn mức mặc định.

**Giải pháp**:
1. Tăng bộ nhớ cho Node.js:
```bash
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

## 3. Lỗi Khi Tích Hợp

### Lỗi "Micro frontend not found"

**Triệu chứng**: Host app không thể tải micro frontend.

**Nguyên nhân**: URL trong manifest không chính xác hoặc micro frontend chưa được build.

**Giải pháp**:
1. Kiểm tra URL trong manifest
2. Đảm bảo micro frontend đã được build và triển khai
3. Kiểm tra console để xem lỗi chi tiết

### Lỗi "Cannot read properties of undefined (reading 'mount')"

**Triệu chứng**: Host app không thể mount micro frontend.

**Nguyên nhân**: Hàm mount không được expose đúng cách.

**Giải pháp**:
1. Kiểm tra file `bootstrap.tsx` để đảm bảo hàm mount được expose đúng cách
2. Kiểm tra xem script của micro frontend đã được tải thành công chưa

## 4. Lỗi API

### Lỗi "Modal instance is not set"

**Triệu chứng**: Khi gọi API, bạn nhận được lỗi "Modal instance is not set".

**Nguyên nhân**: Micro frontend đang cố gắng sử dụng Modal từ host app.

**Giải pháp**:
1. Sử dụng wrapper trong apiService để xử lý lỗi:
```typescript
// Hàm wrapper để xử lý lỗi chung
const wrapApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    // Xử lý lỗi liên quan đến Modal
    if (error.message && error.message.includes('Modal instance is not set')) {
      console.warn('Modal error intercepted:', error.message);
      throw new Error('Lỗi kết nối với API. Vui lòng thử lại sau.');
    }
    throw error;
  }
};
```

### Lỗi CORS

**Triệu chứng**: Khi gọi API, bạn nhận được lỗi CORS.

**Nguyên nhân**: API không cho phép cross-origin request.

**Giải pháp**:
1. Đảm bảo API được gọi thông qua API Layer của host app
2. Đảm bảo URL API có định dạng đúng theo cấu hình của host app

### Lỗi 401 Unauthorized

**Triệu chứng**: Khi gọi API, bạn nhận được lỗi 401 Unauthorized.

**Nguyên nhân**: Token không hợp lệ hoặc đã hết hạn.

**Giải pháp**:
1. Đảm bảo token được truyền đúng cách
2. Kiểm tra xem token có hết hạn không
3. Sử dụng wrapper trong apiService để xử lý lỗi

## 5. Lỗi Routing

### Lỗi "Cannot match any routes"

**Triệu chứng**: Khi truy cập một URL, bạn nhận được lỗi "Cannot match any routes".

**Nguyên nhân**: Route không được định nghĩa hoặc basename không chính xác.

**Giải pháp**:
1. Kiểm tra định nghĩa route trong `App.tsx`
2. Đảm bảo basename được truyền đúng cách:
```tsx
<BrowserRouter basename={basePath}>
  {/* Routes */}
</BrowserRouter>
```

### Lỗi "Cannot update during an existing state transition"

**Triệu chứng**: Khi điều hướng, bạn nhận được lỗi "Cannot update during an existing state transition".

**Nguyên nhân**: Có nhiều lệnh điều hướng được gọi cùng lúc.

**Giải pháp**:
1. Kiểm tra logic điều hướng
2. Sử dụng `useCallback` để tránh tạo hàm mới mỗi khi render

## 6. Lỗi Xác Thực

### Lỗi "User is undefined"

**Triệu chứng**: Khi truy cập một trang yêu cầu xác thực, bạn nhận được lỗi "User is undefined".

**Nguyên nhân**: Thông tin người dùng chưa được truyền từ host app hoặc chưa được lưu trữ đúng cách.

**Giải pháp**:
1. Kiểm tra xem micro frontend đã yêu cầu thông tin xác thực từ host app chưa:
```typescript
// Request the current auth state from the shell
eventBus.emit(MicroToShellEvents.REQUEST_AUTH, {});
```
2. Kiểm tra xem micro frontend đã lắng nghe sự kiện auth-change chưa:
```typescript
const unsubscribeAuth = eventBus.on(ShellToMicroEvents.AUTH_CHANGE, (newAuthState: AuthState) => {
  updateAuth(newAuthState);
});
```

## 7. Lỗi UI

### Lỗi "Component is not defined"

**Triệu chứng**: Khi render một component, bạn nhận được lỗi "Component is not defined".

**Nguyên nhân**: Component chưa được import hoặc tên component không chính xác.

**Giải pháp**:
1. Kiểm tra import statement
2. Kiểm tra tên component

### Lỗi Styling

**Triệu chứng**: UI không hiển thị đúng như mong đợi.

**Nguyên nhân**: CSS không được tải hoặc có xung đột.

**Giải pháp**:
1. Kiểm tra xem CSS đã được tải chưa
2. Sử dụng CSS module hoặc styled-components để tránh xung đột
3. Kiểm tra cấu hình Tailwind CSS

## 8. Lỗi Performance

### Lỗi "Memory leak"

**Triệu chứng**: Khi sử dụng ứng dụng, bạn nhận được cảnh báo "Memory leak".

**Nguyên nhân**: Không cleanup effect hoặc event listener.

**Giải pháp**:
1. Đảm bảo cleanup trong useEffect:
```typescript
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, []);
```
2. Đảm bảo unmount micro frontend khi không sử dụng

### Lỗi "Too many re-renders"

**Triệu chứng**: Khi render một component, bạn nhận được lỗi "Too many re-renders".

**Nguyên nhân**: Component render vô hạn.

**Giải pháp**:
1. Kiểm tra dependency array trong useEffect
2. Kiểm tra logic trong component
3. Sử dụng useCallback và useMemo để tránh tạo hàm và object mới mỗi khi render

## 9. Công Cụ Debug

### Console Log

Sử dụng console.log để debug:

```typescript
console.log('Data:', data);
```

### React DevTools

Sử dụng React DevTools để debug component:

1. Cài đặt React DevTools extension
2. Mở DevTools và chọn tab "Components"

### Network Tab

Sử dụng Network tab trong DevTools để debug API:

1. Mở DevTools và chọn tab "Network"
2. Lọc theo "XHR" để xem các request API

### EventBus Debug

Sử dụng EventBus debug để xem các sự kiện:

```typescript
// Trong host app
(window as any).__MFE_EVENT_BUS__ = eventBus;

// Trong console
window.__MFE_EVENT_BUS__.on('*', (event, data) => {
  console.log('Event:', event, 'Data:', data);
});
```
