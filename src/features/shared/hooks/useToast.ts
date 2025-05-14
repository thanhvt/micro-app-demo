import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface UseToastReturn {
  showToast: (message: string, type?: ToastType) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showWarningToast: (message: string) => void;
}

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const useToast = (): UseToastReturn => {
  const showToast = (message: string, type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message, defaultOptions);
        break;
      case 'error':
        toast.error(message, defaultOptions);
        break;
      case 'warning':
        toast.warning(message, defaultOptions);
        break;
      default:
        toast.info(message, defaultOptions);
    }
  };

  const showSuccessToast = (message: string) => {
    showToast(message, 'success');
  };

  const showErrorToast = (message: string) => {
    showToast(message, 'error');
  };

  const showInfoToast = (message: string) => {
    showToast(message, 'info');
  };

  const showWarningToast = (message: string) => {
    showToast(message, 'warning');
  };

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};

export default useToast;
