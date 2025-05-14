export const CONTRACT_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated'
} as const;

export const CONTRACT_TYPE = {
  SERVICE: 'service',
  PRODUCT: 'product',
  MAINTENANCE: 'maintenance',
  CONSULTING: 'consulting',
  OTHER: 'other'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled'
} as const;

export const PAYMENT_METHOD = {
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
  CREDIT_CARD: 'credit_card',
  OTHER: 'other'
} as const;

export const CURRENCY = {
  VND: 'VND',
  USD: 'USD',
  EUR: 'EUR'
} as const;

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const CONTRACT_STATUS_COLORS = {
  [CONTRACT_STATUS.DRAFT]: 'default',
  [CONTRACT_STATUS.PENDING]: 'processing',
  [CONTRACT_STATUS.ACTIVE]: 'success',
  [CONTRACT_STATUS.EXPIRED]: 'warning',
  [CONTRACT_STATUS.TERMINATED]: 'error'
} as const;

export const PAYMENT_STATUS_COLORS = {
  [PAYMENT_STATUS.PENDING]: 'processing',
  [PAYMENT_STATUS.PAID]: 'success',
  [PAYMENT_STATUS.OVERDUE]: 'error',
  [PAYMENT_STATUS.CANCELLED]: 'default'
} as const;

export const APPROVAL_STATUS_COLORS = {
  [APPROVAL_STATUS.PENDING]: 'processing',
  [APPROVAL_STATUS.APPROVED]: 'success',
  [APPROVAL_STATUS.REJECTED]: 'error'
} as const;

// Validation constants
export const VALIDATION = {
  MAX_CONTRACT_NAME_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_NOTE_LENGTH: 500,
  MIN_TOTAL_VALUE: 0,
  MAX_PRODUCTS: 100,
  MAX_PAYMENT_SCHEDULES: 50,
  MAX_ATTACHMENTS: 20,
  ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.png'],
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// Animation constants
export const ANIMATION = {
  DURATION: 0.4,
  EASE: [0.4, 0, 0.2, 1] as const,
  STEP_TRANSITION: {
    initial: { opacity: 0, x: 50, filter: 'blur(8px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -50, filter: 'blur(8px)' }
  },
  PANEL_TRANSITION: {
    initial: { opacity: 0, height: 0, y: -10 },
    animate: { opacity: 1, height: 'auto', y: 0 },
    exit: { opacity: 0, height: 0, y: -10 }
  },
  PAGE_TRANSITION: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 }
  },
  FORM_TRANSITION: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 }
  },
  BUTTON_HOVER: {
    scale: 1.05,
    y: -2,
    transition: { duration: 0.2 }
  },
  BUTTON_TAP: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.1 }
  },
  SUCCESS_ANIMATION: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } },
    exit: { opacity: 0, scale: 0.8 }
  }
} as const;
