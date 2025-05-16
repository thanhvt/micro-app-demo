import { AxiosRequestConfig } from 'axios';

// Định nghĩa kiểu dữ liệu cho các hàm API
export type GetRequestFunction = (url: string, config?: AxiosRequestConfig) => Promise<any>;
export type PostRequestFunction = (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
export type PutRequestFunction = (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
export type DeleteRequestFunction = (url: string, config?: AxiosRequestConfig) => Promise<any>;
export type GetFileRequestFunction = (url: string, config?: AxiosRequestConfig, fileName?: string) => Promise<any>;
export type PostFileRequestFunction = (url: string, data: any, fileName?: string, config?: AxiosRequestConfig) => Promise<any>;

// Interface cho API Service
export interface ApiService {
  getRequest: GetRequestFunction;
  postRequest: PostRequestFunction;
  putRequest: PutRequestFunction;
  deleteRequest: DeleteRequestFunction;
  getFileRequest: GetFileRequestFunction;
  postFileRequest: PostFileRequestFunction;
}

// Khởi tạo API Service với các hàm mặc định (fallback)
let apiService: ApiService = {
  getRequest: (url, config) => {
    console.warn('getRequest not implemented, using fallback');
    return Promise.reject(new Error('getRequest not implemented'));
  },
  postRequest: (url, data, config) => {
    console.warn('postRequest not implemented, using fallback');
    return Promise.reject(new Error('postRequest not implemented'));
  },
  putRequest: (url, data, config) => {
    console.warn('putRequest not implemented, using fallback');
    return Promise.reject(new Error('putRequest not implemented'));
  },
  deleteRequest: (url, config) => {
    console.warn('deleteRequest not implemented, using fallback');
    return Promise.reject(new Error('deleteRequest not implemented'));
  },
  getFileRequest: (url, config, fileName) => {
    console.warn('getFileRequest not implemented, using fallback');
    return Promise.reject(new Error('getFileRequest not implemented'));
  },
  postFileRequest: (url, data, fileName, config) => {
    console.warn('postFileRequest not implemented, using fallback');
    return Promise.reject(new Error('postFileRequest not implemented'));
  }
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


// Export các hàm API để sử dụng trong ứng dụng
export const getRequest: GetRequestFunction = (url, config) => {
  return wrapApiCall(() => apiService.getRequest(url, config));
};

export const postRequest: PostRequestFunction = (url, data, config) => {
  return wrapApiCall(() => apiService.postRequest(url, data, config));
};

export const putRequest: PutRequestFunction = (url, data, config) => {
  return wrapApiCall(() => apiService.putRequest(url, data, config));
};

export const deleteRequest: DeleteRequestFunction = (url, config) => {
  return wrapApiCall(() => apiService.deleteRequest(url, config));
};

export const getFileRequest: GetFileRequestFunction = (url, config, fileName) => {
  return wrapApiCall(() => apiService.getFileRequest(url, config, fileName));
};

export const postFileRequest: PostFileRequestFunction = (url, data, fileName, config) => {
  return wrapApiCall(() => apiService.postFileRequest(url, data, fileName, config));
};

// Export default API Service
export default apiService;
