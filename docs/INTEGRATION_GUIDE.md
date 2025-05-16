# Hướng Dẫn Tích Hợp Micro Frontend

Tài liệu này mô tả cách tích hợp micro frontend (@micro-app-demo) vào host app (@vssfe).

## Tổng Quan

Quá trình tích hợp bao gồm các bước sau:
1. Cấu hình micro frontend để expose các API cần thiết
2. Cấu hình host app để tải và mount micro frontend
3. Thiết lập giao tiếp giữa host app và micro frontend
4. Cấu hình routing để điều hướng đến micro frontend

## 1. Cấu Hình Micro Frontend

### 1.1. Tạo Manifest

Tạo file `manifest.json` trong thư mục `public` của micro frontend:

```json
{
  "name": "micro-app-demo",
  "version": "0.1.0",
  "scripts": [
    "http://localhost:3001/static/js/main.js",
    "http://localhost:3001/main.js",
    "/static/js/main.js",
    "/main.js"
  ],
  "styles": [
    "http://localhost:3001/static/css/main.css",
    "http://localhost:3001/main.css",
    "/static/css/main.css",
    "/main.css"
  ],
  "dependencies": []
}
```

### 1.2. Expose Mount/Unmount API

Trong file `bootstrap.tsx`, expose các hàm mount/unmount:

```typescript
// Define the interface for the micro frontend
interface MicroFrontend {
  mount: (container: HTMLElement, props: MountProps) => void;
  unmount: (container: HTMLElement | null) => void;
  updatePath: (path: string) => void;
  updateAuth: (authState: AuthState) => void;
}

// Mount function that will be called by the shell
export const mount = (container: HTMLElement, props: MountProps) => {
  // Mount logic
};

// Unmount function that will be called by the shell
export const unmount = (container: HTMLElement | null) => {
  // Unmount logic
};

// Register the micro frontend in the global scope
window.micro_app_demo = {
  mount,
  unmount,
  updatePath,
  updateAuth
};
```

### 1.3. Cấu Hình Webpack

Cấu hình webpack để build micro frontend thành một bundle có thể được tải bởi host app:

```javascript
// webpack.config.js
module.exports = {
  // ...
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    libraryTarget: 'umd',
  },
  // ...
};
```

## 2. Cấu Hình Host App

### 2.1. Tạo MicroFrontendLoader Component

Host app cần có một component để tải và mount micro frontend:

```tsx
// MicroFrontendLoader.tsx
const MicroFrontendLoader: React.FC<MicroFrontendProps> = ({
  name,
  basePath,
  manifest,
  path,
  isEmbedded = false,
  onError,
}) => {
  // Logic để tải và mount micro frontend
};
```

### 2.2. Tạo Route cho Micro Frontend

Tạo route trong host app để điều hướng đến micro frontend:

```tsx
// app/[locale]/(main)/micro-app-demo/[[...path]]/page.tsx
export default function MicroAppDemoNestedPage({ params }: { params: { path?: string[] } }) {
  // Logic để tải manifest và render MicroFrontendLoader
  return (
    <div className="micro-app-container">
      <MicroFrontendLoader
        name="micro-app-demo"
        basePath="/micro-app-demo"
        manifest={manifest}
        path={relativePath}
        isEmbedded={true}
        onError={(err) => setError(err)}
      />
    </div>
  );
}
```

### 2.3. Cấu Hình Menu

Thêm menu item trong host app để điều hướng đến micro frontend:

```tsx
// Trong component menu của host app
<MenuItem key="micro-app-demo" icon={<AppstoreOutlined />}>
  <Link href="/micro-app-demo">Micro App Demo</Link>
</MenuItem>
```

## 3. Thiết Lập Giao Tiếp

### 3.1. EventBus

Host app cần cung cấp EventBus để giao tiếp với micro frontend:

```typescript
// EventBus.ts
class EventBus implements EventBusInterface {
  private listeners: {
    [K in keyof EventTypes]?: Array<(data: EventTypes[K]) => void>;
  } = {};

  on<K extends keyof EventTypes>(
    event: K,
    callback: (data: EventTypes[K]) => void
  ): () => void {
    // Logic để đăng ký lắng nghe sự kiện
  }

  off<K extends keyof EventTypes>(
    event: K,
    callback: (data: EventTypes[K]) => void
  ): void {
    // Logic để hủy đăng ký lắng nghe sự kiện
  }

  emit<K extends keyof EventTypes>(event: K, data: EventTypes[K]): void {
    // Logic để phát sự kiện
  }
}
```

### 3.2. API Layer

Host app cần cung cấp API Layer để micro frontend có thể gọi API:

```typescript
// Trong MicroFrontendLoader.tsx
useEffect(() => {
  const handleRequestApiFunctions = () => {
    try {
      // Import các hàm API từ common.ts
      import('@/utils/common').then((apiModule) => {
        // Tạo các wrapper function để xử lý lỗi và context
        const getRequestWrapper = (url: string, config?: any) => {
          // Logic để gọi API
        };
        
        const apiFunctions = {
          getRequest: getRequestWrapper,
          postRequest: postRequestWrapper,
          putRequest: putRequestWrapper,
          deleteRequest: deleteRequestWrapper,
          getFileRequest: apiModule.getFileRequest,
          postFileRequest: apiModule.postFileRequest,
        };
        
        eventBus.emit('shell:api-functions', apiFunctions);
      });
    } catch (err) {
      console.error(`Error sending API functions to ${name}:`, err);
    }
  };

  const unsubscribe = eventBus.on('micro:request-api-functions', handleRequestApiFunctions);
  return unsubscribe;
}, [name]);
```

## 4. Cấu Hình Routing

### 4.1. Routing trong Host App

Host app cần cấu hình routing để điều hướng đến micro frontend:

```tsx
// next.config.js
module.exports = {
  // ...
  async rewrites() {
    return [
      {
        source: '/micro-app-demo/:path*',
        destination: '/app/[locale]/(main)/micro-app-demo/:path*',
      },
    ];
  },
  // ...
};
```

### 4.2. Routing trong Micro Frontend

Micro frontend cần cấu hình routing để xử lý các route nội bộ:

```tsx
// App.tsx
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

## 5. Xử Lý Xác Thực

### 5.1. Truyền Trạng Thái Xác Thực

Host app cần truyền trạng thái xác thực cho micro frontend:

```tsx
// Trong MicroFrontendLoader.tsx
microFrontend.mount(containerRef.current, {
  basePath,
  authState,
  eventBus,
  path,
  isEmbedded,
});
```

### 5.2. Lắng Nghe Thay Đổi Xác Thực

Micro frontend cần lắng nghe thay đổi trạng thái xác thực:

```tsx
// Trong App.tsx
useEffect(() => {
  const unsubscribeAuth = eventBus.on(ShellToMicroEvents.AUTH_CHANGE, (newAuthState: AuthState) => {
    updateAuth(newAuthState);
  });

  // Request the current auth state from the shell
  eventBus.emit(MicroToShellEvents.REQUEST_AUTH, {});

  // Clean up the subscription when the component unmounts
  return () => {
    unsubscribeAuth();
  };
}, [eventBus, updateAuth]);
```

## 6. Kiểm Thử Tích Hợp

Sau khi tích hợp, cần kiểm thử các tính năng sau:
- Tải và hiển thị micro frontend
- Điều hướng giữa các route trong micro frontend
- Gọi API từ micro frontend
- Xác thực và phân quyền
- Giao tiếp giữa host app và micro frontend
