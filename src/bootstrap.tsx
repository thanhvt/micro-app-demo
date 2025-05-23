import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApiFunctionsEvent, AuthState, EventBus, MicroToShellEvents, ShellToMicroEvents } from './types/auth';
import { setApiService } from './services/apiService';
import './index.css';
import 'antd/dist/reset.css';

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
  console.log('Mount function called with container:', container);
  console.log('Mount props:', props);

  root = ReactDOM.createRoot(container);

  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );

  // Notify the shell that the micro app has loaded
  if (props.eventBus) {
    props.eventBus.emit(MicroToShellEvents.LOADED, { name: 'micro-app-demo' });

    // Show a welcome notification
    props.eventBus.emit(MicroToShellEvents.NOTIFICATION, {
      type: 'success',
      message: 'Micro App Demo loaded successfully!'
    });

    // Đăng ký lắng nghe sự kiện API functions
    props.eventBus.on(ShellToMicroEvents.API_FUNCTIONS, (apiFunctions: ApiFunctionsEvent) => {
      console.log('Received API functions from shell in bootstrap:', Object.keys(apiFunctions));
      setApiService(apiFunctions);
    });

    // Yêu cầu API functions từ shell
    props.eventBus.emit(MicroToShellEvents.REQUEST_API_FUNCTIONS, {});
  } else {
    console.warn('EventBus not provided in mount props');
  }

  console.log('Mount function completed successfully');
};

// Unmount function that will be called by the shell
export const unmount = (container: HTMLElement | null) => {
  console.log('Unmount function called with container:', container);

  if (root) {
    root.unmount();
    root = null;
    console.log('React root unmounted successfully');
  } else {
    console.warn('No React root to unmount');
  }
};

// Thêm phương thức updatePath
export const updatePath = (newPath: string) => {
  console.log('Updating path without remounting:', newPath);

  // Cập nhật path trong micro app
  if (window.microAppRouter) {
    window.microAppRouter.navigate(newPath);
  }
};

// Thêm phương thức updateAuth
export const updateAuth = (newAuthState: AuthState) => {
  console.log('Updating auth state without remounting:', newAuthState);

  // Cập nhật auth state trong micro app
  if (window.microAppUpdateAuth) {
    window.microAppUpdateAuth(newAuthState);
  }
};

// Register the micro frontend in the global scope
console.log('Registering micro_app_demo in global scope');

/**
 * Đăng ký micro app vào window object
 *
 * Chúng ta sử dụng nhiều cách khác nhau để đảm bảo micro app được đăng ký đúng cách:
 * 1. Đăng ký trực tiếp vào window
 * 2. Đăng ký thông qua defineProperty để đảm bảo không bị ghi đè
 * 3. Thêm các biến debug để dễ dàng kiểm tra
 */

// Cách 1: Đăng ký trực tiếp vào window
window.micro_app_demo = {
  mount,
  unmount,
  updatePath,
  updateAuth
};

// Cách 2: Đăng ký thông qua defineProperty để đảm bảo không bị ghi đè
if (!window.micro_app_demo || typeof window.micro_app_demo.mount !== 'function') {
  Object.defineProperty(window, 'micro_app_demo', {
    value: { mount, unmount, updatePath, updateAuth },
    writable: false,
    configurable: true,
  });
}

// Thêm các biến debug để dễ dàng kiểm tra
(window as any).__MICRO_APP_DEMO_VERSION__ = '0.1.0';
(window as any).__MICRO_APP_DEMO_MOUNT__ = mount;
(window as any).__MICRO_APP_DEMO_UNMOUNT__ = unmount;

// Log để xác nhận đăng ký thành công
console.log('micro_app_demo registered successfully', window.micro_app_demo);

// Thêm một hàm helper để kiểm tra xem micro app đã được đăng ký chưa
(window as any).__CHECK_MICRO_APP_DEMO__ = () => {
  console.log('Checking micro_app_demo registration:');
  console.log('window.micro_app_demo:', window.micro_app_demo);
  console.log('window.micro_app_demo.mount:', window.micro_app_demo?.mount);
  console.log('window.__MICRO_APP_DEMO_MOUNT__:', (window as any).__MICRO_APP_DEMO_MOUNT__);
  return window.micro_app_demo && typeof window.micro_app_demo.mount === 'function';
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

// Declare the global window interface
declare global {
  interface Window {
    micro_app_demo: MicroFrontend;
    microAppRouter?: {
      navigate: (path: string) => void;
    };
    microAppUpdateAuth?: (authState: AuthState) => void;
  }
}
