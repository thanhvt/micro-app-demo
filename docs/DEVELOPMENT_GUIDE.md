# Hướng Dẫn Phát Triển Micro Frontend

Tài liệu này cung cấp hướng dẫn chi tiết về cách phát triển một micro frontend mới dựa trên kiến trúc và mẫu của @micro-app-demo.

## Mục Lục

1. [Tạo Dự Án Mới](#1-tạo-dự-án-mới)
2. [Cấu Trúc Dự Án](#2-cấu-trúc-dự-án)
3. [Bootstrap](#3-bootstrap)
4. [EventBus](#4-eventbus)
5. [API Integration](#5-api-integration)
6. [Routing](#6-routing)
7. [Authentication](#7-authentication)
8. [Styling](#8-styling)
9. [Testing](#9-testing)
10. [Build và Triển Khai](#10-build-và-triển-khai)

## 1. Tạo Dự Án Mới

### Sử Dụng Template

Cách đơn giản nhất để tạo một micro frontend mới là sao chép từ @micro-app-demo:

```bash
# Clone repository
git clone <repository-url> micro-app-new
cd micro-app-new

# Xóa .git folder để tạo repository mới
rm -rf .git

# Cài đặt dependencies
npm install
```

### Tùy Chỉnh Package.json

Cập nhật thông tin trong `package.json`:

```json
{
  "name": "micro-app-new",
  "version": "0.1.0",
  "description": "New Micro Frontend",
  "scripts": {
    "start": "webpack serve --mode development --port 3002",
    "build": "webpack --mode production",
    "test": "jest"
  },
  // ...
}
```

### Tùy Chỉnh Manifest

Cập nhật thông tin trong `public/manifest.json`:

```json
{
  "name": "micro-app-new",
  "version": "0.1.0",
  "scripts": [
    "http://localhost:3002/static/js/main.js",
    "http://localhost:3002/main.js",
    "/static/js/main.js",
    "/main.js"
  ],
  "styles": [
    "http://localhost:3002/static/css/main.css",
    "http://localhost:3002/main.css",
    "/static/css/main.css",
    "/main.css"
  ],
  "dependencies": []
}
```

## 2. Cấu Trúc Dự Án

Tổ chức dự án theo cấu trúc sau:

```
micro-app-new/
├── public/                 # Static files
│   ├── index.html          # HTML template
│   └── manifest.json       # Micro frontend manifest
├── src/
│   ├── components/         # Shared components
│   ├── features/           # Feature modules
│   │   └── feature1/       # Feature 1
│   │       ├── components/ # Feature-specific components
│   │       ├── hooks/      # Feature-specific hooks
│   │       ├── pages/      # Feature pages
│   │       └── types/      # Feature-specific types
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

### Feature-First Architecture

Tổ chức code theo feature-first architecture:

- Mỗi feature là một module độc lập
- Mỗi feature có thể có components, hooks, pages, và types riêng
- Các component dùng chung được đặt trong thư mục `components`
- Các service dùng chung được đặt trong thư mục `services`

## 3. Bootstrap

File `bootstrap.tsx` là điểm khởi đầu của micro frontend, chịu trách nhiệm:
- Expose các hàm mount/unmount
- Đăng ký micro frontend vào global scope
- Xử lý các sự kiện từ host app

```typescript
// bootstrap.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthState, EventBus } from './types/auth';
import './index.css';

// Define the interface for the micro frontend
interface MicroFrontend {
  mount: (container: HTMLElement, props: MountProps) => void;
  unmount: (container: HTMLElement | null) => void;
  updatePath: (path: string) => void;
  updateAuth: (authState: AuthState) => void;
}

// Define the props that the shell will pass to the micro frontend
interface MountProps {
  basePath: string;
  authState: AuthState;
  eventBus: EventBus;
  path: string;
  isEmbedded?: boolean;
}

// Create a root for React to render into
let root: ReactDOM.Root | null = null;

// Mount function that will be called by the shell
export const mount = (container: HTMLElement, props: MountProps) => {
  root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
};

// Unmount function that will be called by the shell
export const unmount = (container: HTMLElement | null) => {
  if (root) {
    root.unmount();
    root = null;
  }
};

// Update path function
export const updatePath = (newPath: string) => {
  if (window.microAppRouter) {
    window.microAppRouter.navigate(newPath);
  }
};

// Update auth function
export const updateAuth = (newAuthState: AuthState) => {
  if (window.microAppUpdateAuth) {
    window.microAppUpdateAuth(newAuthState);
  }
};

// Register the micro frontend in the global scope
window.micro_app_new = {
  mount,
  unmount,
  updatePath,
  updateAuth
};

// For standalone development
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot, {
      basePath: '',
      authState: {
        isAuthenticated: true,
        token: 'dev-token',
        refreshToken: 'dev-refresh-token',
        user: {
          id: 'dev-user',
          name: 'Developer',
          email: 'dev@example.com',
          roles: ['developer'],
        },
      },
      eventBus: {
        on: (event: string, callback: Function) => {
          console.log(`[DEV] Registered listener for ${event}`);
          return () => console.log(`[DEV] Unregistered listener for ${event}`);
        },
        off: (event: string, callback: Function) => {
          console.log(`[DEV] Removed listener for ${event}`);
        },
        emit: (event: string, data: any) => {
          console.log(`[DEV] Emitted event ${event} with data:`, data);
        },
      },
      path: ''
    });
  }
}
```

## 4. EventBus

EventBus là cơ chế giao tiếp giữa host app và micro frontend. Định nghĩa các sự kiện trong `types/auth.ts`:

```typescript
// types/auth.ts
export interface EventBus {
  on: (event: string, callback: (data: any) => void) => (() => void);
  off: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
}

// Các sự kiện từ micro app đến shell
export enum MicroToShellEvents {
  NAVIGATION = 'micro:navigation',
  NOTIFICATION = 'micro:notification',
  REQUEST_AUTH = 'micro:request-auth',
  PATH_CHANGED = 'micro:path-changed',
  LOADED = 'micro:loaded',
  NEW_TAB = 'micro:new-tab',
  REQUEST_API_FUNCTIONS = 'micro:request-api-functions'
}

// Các sự kiện từ shell đến micro app
export enum ShellToMicroEvents {
  AUTH_CHANGE = 'shell:auth-change',
  PATH_CHANGED = 'shell:path-changed',
  NAVIGATION = 'shell:navigation',
  API_FUNCTIONS = 'shell:api-functions'
}
```

Sử dụng EventBus trong `App.tsx`:

```typescript
// App.tsx
useEffect(() => {
  const unsubscribeAuth = eventBus.on(ShellToMicroEvents.AUTH_CHANGE, (newAuthState: AuthState) => {
    updateAuth(newAuthState);
  });

  const unsubscribeApi = eventBus.on(ShellToMicroEvents.API_FUNCTIONS, (apiFunctions: ApiFunctionsEvent) => {
    setApiService(apiFunctions);
  });

  // Request the current auth state from the shell
  eventBus.emit(MicroToShellEvents.REQUEST_AUTH, {});

  // Request API functions from shell
  eventBus.emit(MicroToShellEvents.REQUEST_API_FUNCTIONS, {});

  return () => {
    unsubscribeAuth();
    unsubscribeApi();
  };
}, [eventBus, updateAuth]);
```

## 5. API Integration

### API Service

Tạo file `services/apiService.ts` để quản lý các hàm API:

```typescript
// services/apiService.ts
import { AxiosRequestConfig } from 'axios';

// Định nghĩa kiểu dữ liệu cho các hàm API
export type GetRequestFunction = (url: string, config?: AxiosRequestConfig) => Promise<any>;
export type PostRequestFunction = (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
// ...

// Interface cho API Service
export interface ApiService {
  getRequest: GetRequestFunction;
  postRequest: PostRequestFunction;
  // ...
}

// Khởi tạo API Service với các hàm mặc định (fallback)
let apiService: ApiService = {
  getRequest: (url, config) => {
    console.warn('getRequest not implemented, using fallback');
    return Promise.reject(new Error('getRequest not implemented'));
  },
  // ...
};

// Hàm để cập nhật API Service
export const setApiService = (newApiService: Partial<ApiService>) => {
  apiService = { ...apiService, ...newApiService };
};

// Hàm wrapper để xử lý lỗi chung
const wrapApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    // Xử lý lỗi
    throw error;
  }
};

// Export các hàm API để sử dụng trong ứng dụng
export const getRequest: GetRequestFunction = (url, config) => {
  return wrapApiCall(() => apiService.getRequest(url, config));
};
// ...
```

### useApi Hook

Tạo hook `useApi` để dễ dàng gọi API:

```typescript
// features/shared/hooks/useApi.ts
import { useState, useCallback } from 'react';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../../services/apiService';

export function useApi<T = any>(url: string, options: UseApiOptions = {}): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(options.initialLoading ?? false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRequest(url);
      setData(response);
      options.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // ...

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    updateData,
    removeData
  };
}
```

## 6. Routing

Sử dụng React Router để quản lý routing trong micro frontend:

```tsx
// App.tsx
<BrowserRouter basename={basePath}>
  <Routes>
    <Route path="/" element={<Navigate to="/feature1" replace />} />
    <Route path="/feature1" element={<Feature1List />} />
    <Route path="/feature1/new" element={<Feature1Form />} />
    <Route path="/feature1/edit/:id" element={<Feature1Form />} />
    <Route path="/feature1/:id" element={<Feature1Detail />} />
    {/* Các route khác */}
  </Routes>
</BrowserRouter>
```

## 7. Authentication

Xử lý xác thực trong micro frontend:

```tsx
// App.tsx
const [user, setUser] = useState(authState?.user);

// Hàm để cập nhật auth state
const updateAuth = useCallback((newAuthState: AuthState) => {
  setUser(newAuthState?.user);
}, []);

// Đăng ký hàm cập nhật vào window
useEffect(() => {
  window.microAppUpdateAuth = updateAuth;
  return () => {
    delete window.microAppUpdateAuth;
  };
}, [updateAuth]);
```

## 8. Styling

### Tailwind CSS

Cấu hình Tailwind CSS trong `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A7D37',
      },
    },
  },
  plugins: [],
}
```

### Ant Design

Cấu hình Ant Design trong `App.tsx`:

```tsx
// App.tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1A7D37',
      borderRadius: 6,
    },
  }}
>
  {/* App content */}
</ConfigProvider>
```

## 9. Testing

### Unit Testing

Sử dụng Jest và React Testing Library để viết unit test:

```typescript
// Feature1.test.tsx
import { render, screen } from '@testing-library/react';
import Feature1List from './Feature1List';

describe('Feature1List', () => {
  it('renders the list', () => {
    render(<Feature1List />);
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
  });
});
```

### Integration Testing

Viết integration test để kiểm tra tích hợp giữa các component:

```typescript
// Feature1Integration.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Feature1 Integration', () => {
  it('navigates from list to detail', () => {
    render(
      <MemoryRouter initialEntries={['/feature1']}>
        <App />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText('View Detail'));
    expect(screen.getByText('Feature 1 Detail')).toBeInTheDocument();
  });
});
```

## 10. Build và Triển Khai

### Build

Cấu hình webpack trong `webpack.config.js`:

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    libraryTarget: 'umd',
  },
  // ...
};
```

### Triển Khai

Triển khai micro frontend lên web server:

```bash
# Build micro frontend
npm run build

# Triển khai lên web server
cp -r dist/* /path/to/web/server/micro-app-new/
```

### Tích Hợp với Host App

Cấu hình host app để tải micro frontend:

```tsx
// Trong host app
<MicroFrontendLoader
  name="micro-app-new"
  basePath="/micro-app-new"
  manifest={manifest}
  path={relativePath}
  isEmbedded={true}
  onError={(err) => setError(err)}
/>
```
