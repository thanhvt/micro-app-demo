# Hướng Dẫn Tích Hợp API

Tài liệu này mô tả chi tiết cách tích hợp API giữa host app (@vssfe) và micro frontend (@micro-app-demo).

## Mục Lục

1. [Tổng Quan](#1-tổng-quan)
2. [API Service](#2-api-service)
3. [Truyền Hàm API từ Host App](#3-truyền-hàm-api-từ-host-app)
4. [Sử Dụng API trong Micro Frontend](#4-sử-dụng-api-trong-micro-frontend)
5. [Xử Lý Lỗi](#5-xử-lý-lỗi)
6. [Hooks](#6-hooks)
7. [Ví Dụ](#7-ví-dụ)
8. [Best Practices](#8-best-practices)
9. [Troubleshooting](#9-troubleshooting)

## 1. Tổng Quan

Kiến trúc tích hợp API giữa host app và micro frontend:

```
┌─────────────────────────────────────────────────────────────┐
│                      Host App (@vssfe)                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    API Layer                        │    │
│  │                                                     │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │    │
│  │  │ getRequest  │  │ postRequest │  │ putRequest  │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                 │
│                           │ EventBus                        │
│                           ▼                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ shell:api-functions
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Micro Frontend (@micro-app-demo)           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    API Service                      │    │
│  │                                                     │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │    │
│  │  │ getRequest  │  │ postRequest │  │ putRequest  │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Quá trình tích hợp API:
1. Micro frontend yêu cầu các hàm API từ host app thông qua EventBus
2. Host app truyền các hàm API cho micro frontend thông qua EventBus
3. Micro frontend sử dụng các hàm API này để gọi API

## 2. API Service

### Trong Host App

Host app có các hàm API trong file `vssfe/src/utils/common.ts`:

```typescript
// vssfe/src/utils/common.ts
export const getRequest = (
  url: string,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .get(url, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

export const postRequest = (
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    baseApi
      .post(url, data, config)
      .then((res: AxiosResponse) => resolve(res?.data))
      .catch((err: AxiosError) => reject(err));
  });
};

// Các hàm API khác...
```

### Trong Micro Frontend

Micro frontend có API service trong file `micro-app-demo/src/services/apiService.ts`:

```typescript
// micro-app-demo/src/services/apiService.ts
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
  console.log('API Service updated:', Object.keys(newApiService));
};

// Hàm wrapper để xử lý lỗi chung
const wrapApiCall = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    // Xử lý lỗi
    if (error.message && error.message.includes('Modal instance is not set')) {
      console.warn('Modal error intercepted:', error.message);
      throw new Error('Lỗi kết nối với API. Vui lòng thử lại sau.');
    }

    // Xử lý lỗi token
    if (error.response && error.response.status === 401) {
      console.warn('Authentication error:', error.message);
      throw new Error('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
    }

    // Các lỗi khác
    console.error('API call error:', error);
    throw error;
  }
};

// Export các hàm API để sử dụng trong ứng dụng
export const getRequest: GetRequestFunction = (url, config) => {
  return wrapApiCall(() => apiService.getRequest(url, config));
};

// Các hàm API khác...
```

## 3. Truyền Hàm API từ Host App

### Định Nghĩa Sự Kiện

Trong `vssfe/src/types/micro-frontend.ts`:

```typescript
export type ShellEvents = {
  'shell:auth-change': AuthState;
  'shell:refresh-token': void;
  'shell:navigation': { path: string };
  'shell:notification': { type: 'success' | 'error' | 'info' | 'warning'; message: string };
  'shell:api-functions': {
    getRequest?: (url: string, config?: any) => Promise<any>;
    postRequest?: (url: string, data: any, config?: any) => Promise<any>;
    putRequest?: (url: string, data: any, config?: any) => Promise<any>;
    deleteRequest?: (url: string, config?: any) => Promise<any>;
    getFileRequest?: (url: string, config?: any, fileName?: string) => Promise<any>;
    postFileRequest?: (url: string, data: any, fileName?: string, config?: any) => Promise<any>;
  };
};

export type MicroAppEvents = {
  'micro:loaded': { name: string };
  'micro:error': { name: string; error: Error };
  'micro:request-auth': void;
  'micro:request-api-functions': void;
};
```

### Xử Lý Sự Kiện trong Host App

Trong `vssfe/src/components/MicroFrontendLoader/MicroFrontendLoader.tsx`:

```typescript
// Xử lý sự kiện yêu cầu API functions
useEffect(() => {
  const handleRequestApiFunctions = () => {
    try {
      // Import các hàm API từ common.ts
      import('@/utils/common').then((apiModule) => {
        // Tạo các wrapper function để xử lý lỗi và context
        const getRequestWrapper = (url: string, config?: any) => {
          console.log(`[MicroFrontendLoader] Calling getRequest for ${url}`);
          // Sử dụng URL trực tiếp mà không cần thông qua API routes
          return apiModule.getRequest(url, config);
        };

        // Các wrapper function khác...

        const apiFunctions = {
          getRequest: getRequestWrapper,
          postRequest: postRequestWrapper,
          putRequest: putRequestWrapper,
          deleteRequest: deleteRequestWrapper,
          getFileRequest: apiModule.getFileRequest,
          postFileRequest: apiModule.postFileRequest,
        };

        console.log('Sending API functions to micro app:', Object.keys(apiFunctions));
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

### Yêu Cầu API Functions trong Micro Frontend

Trong `micro-app-demo/src/App.tsx`:

```typescript
// Listen for auth state changes from the shell
useEffect(() => {
  const unsubscribeAuth = eventBus.on(ShellToMicroEvents.AUTH_CHANGE, (newAuthState: AuthState) => {
    updateAuth(newAuthState);
  });

  // Lắng nghe API functions từ shell
  const unsubscribeApi = eventBus.on(ShellToMicroEvents.API_FUNCTIONS, (apiFunctions: ApiFunctionsEvent) => {
    console.log('Received API functions from shell:', Object.keys(apiFunctions));
    setApiService(apiFunctions);
  });

  // Request the current auth state from the shell
  eventBus.emit(MicroToShellEvents.REQUEST_AUTH, {});

  // Request API functions from shell
  eventBus.emit(MicroToShellEvents.REQUEST_API_FUNCTIONS, {});

  // Clean up the subscription when the component unmounts
  return () => {
    unsubscribeAuth();
    unsubscribeApi();
  };
}, [eventBus, updateAuth]);
```

## 4. Sử Dụng API trong Micro Frontend

### Gọi API Trực Tiếp

```typescript
import { getRequest, postRequest } from '../../services/apiService';

// Sử dụng getRequest
const fetchData = async () => {
  try {
    const response = await getRequest('/core/api/v1/system/parameters');
    setData(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Sử dụng postRequest
const saveData = async (data) => {
  try {
    const response = await postRequest('/core/api/v1/customers', data);
    return response;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};
```

### Sử Dụng useApi Hook

```typescript
import { useApi } from '../shared/hooks/useApi';

const MyComponent = () => {
  const { data, loading, error, fetchData } = useApi('/core/api/v1/system/parameters');

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

## 5. Xử Lý Lỗi

API service trong micro frontend tự động xử lý các lỗi phổ biến:

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

    // Xử lý lỗi token
    if (error.response && error.response.status === 401) {
      console.warn('Authentication error:', error.message);
      throw new Error('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
    }

    // Các lỗi khác
    console.error('API call error:', error);
    throw error;
  }
};
```

## 6. Hooks

### useApi Hook

Hook `useApi` giúp dễ dàng gọi API và quản lý trạng thái:

```typescript
import { useState, useCallback } from 'react';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../../services/apiService';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  initialLoading?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: () => Promise<void>;
  postData: (data: any) => Promise<void>;
  updateData: (data: any) => Promise<void>;
  removeData: () => Promise<void>;
}

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

  const postData = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postRequest(url, data);
      setData(response);
      options.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Các hàm khác...

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

## 7. Ví Dụ

### ApiExample Component

Component `ApiExample` minh họa cách sử dụng API:

```tsx
import React, { useState } from 'react';
import { Button, Card, Input, Space, Spin, Typography, Alert, Divider, Select } from 'antd';
import { getRequest } from '../../../services/apiService';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const ApiExample: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [apiType, setApiType] = useState<string>('custom');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // Danh sách API mẫu
  const sampleApis = [
    { value: 'custom', label: 'Tùy chỉnh URL' },
    { value: '/core/api/v1/securities/master/search', label: 'Danh sách chứng khoán' },
    { value: '/core/api/v1/customers/search', label: 'Tìm kiếm khách hàng' },
    { value: '/core/api/v1/system/parameters', label: 'Tham số hệ thống' }
  ];

  // Xử lý khi chọn API mẫu
  const handleApiTypeChange = (value: string) => {
    setApiType(value);
    if (value !== 'custom') {
      setUrl(value);
    } else {
      setUrl('');
    }
  };

  const handleFetch = async () => {
    // Logic để gọi API
  };

  return (
    <Card title="Ví dụ sử dụng API từ Host App" className="mb-4">
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* UI để gọi API */}
      </Space>
    </Card>
  );
};
```

## 8. Best Practices

### URL API

- Sử dụng đúng định dạng URL API theo cấu hình của host app
- Không sử dụng URL tuyệt đối (bắt đầu bằng `http://` hoặc `https://`) trừ khi cần thiết

### Xử Lý Lỗi

- Luôn xử lý lỗi khi gọi API
- Sử dụng try/catch để bắt lỗi
- Hiển thị thông báo lỗi cho người dùng

### Caching

- Sử dụng caching để giảm số lượng request API
- Sử dụng React Query hoặc SWR để quản lý cache

### Authentication

- Không lưu trữ token trong micro frontend
- Sử dụng token từ host app thông qua API Layer

## 9. Troubleshooting

### Lỗi "Modal instance is not set"

Lỗi này xảy ra khi micro app cố gắng sử dụng Modal từ host app. Để khắc phục:

- Sử dụng wrapper trong apiService để xử lý lỗi
- Hoặc sử dụng Modal từ Ant Design trong micro app thay vì từ host app

### Lỗi CORS

Nếu gặp lỗi CORS khi gọi API:

- Đảm bảo API được gọi thông qua API Layer của host app
- Đảm bảo URL API có định dạng đúng theo cấu hình của host app

### Lỗi 401 Unauthorized

Nếu gặp lỗi 401 Unauthorized:

- Đảm bảo token được truyền đúng cách
- Kiểm tra xem token có hết hạn không
- Sử dụng wrapper trong apiService để xử lý lỗi
