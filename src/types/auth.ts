export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user?: {
    id: string;
    name: string;
    email: string;
    roles: string[];
  };
}

export interface EventBus {
  on: (event: string, callback: Function) => () => void;
  off: (event: string, callback: Function) => void;
  emit: (event: string, data: any) => void;
}
