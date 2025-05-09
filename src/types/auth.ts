export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  refreshToken: string;
  user: User | null;
}

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
  NEW_TAB = 'micro:new-tab'
}

// Các sự kiện từ shell đến micro app
export enum ShellToMicroEvents {
  AUTH_CHANGE = 'shell:auth-change',
  PATH_CHANGED = 'shell:path-changed',
  NAVIGATION = 'shell:navigation'
}

// Kiểu dữ liệu cho sự kiện path-changed
export interface PathChangedEvent {
  path: string;
  fullPath?: string;
}

// Kiểu dữ liệu cho sự kiện navigation
export interface NavigationEvent {
  path: string;
}

// Kiểu dữ liệu cho sự kiện notification
export interface NotificationEvent {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

// Kiểu dữ liệu cho sự kiện loaded
export interface LoadedEvent {
  name: string;
  path?: string;
}

// Kiểu dữ liệu cho sự kiện new-tab
export interface NewTabEvent {
  path?: string;
}
