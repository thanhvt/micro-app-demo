// Các hằng số cho tính năng quản lý dự án

export const PROJECT_STATUS = {
  DRAFT: 'draft',
  PLANNING: 'planning',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const PROJECT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

export const PROJECT_TYPE = {
  SOFTWARE: 'software',
  HARDWARE: 'hardware',
  SERVICE: 'service',
  RESEARCH: 'research',
  INFRASTRUCTURE: 'infrastructure',
  OTHER: 'other'
} as const;

export const PROJECT_CATEGORY = {
  INTERNAL: 'internal',
  EXTERNAL: 'external',
  CLIENT: 'client',
  VENDOR: 'vendor',
  PARTNERSHIP: 'partnership'
} as const;

export const PROJECT_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ENTERPRISE: 'enterprise'
} as const;

export const RISK_LEVEL = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CHANGES_REQUESTED: 'changes_requested'
} as const;

export const CURRENCY = {
  VND: 'VND',
  USD: 'USD',
  EUR: 'EUR'
} as const;

export const PAYMENT_METHOD = {
  BANK_TRANSFER: 'bank_transfer',
  CASH: 'cash',
  CREDIT_CARD: 'credit_card',
  OTHER: 'other'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled'
} as const;

export const TASK_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  BLOCKED: 'blocked'
} as const;

export const MILESTONE_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DELAYED: 'delayed'
} as const;

export const DOCUMENT_TYPE = {
  CONTRACT: 'contract',
  PROPOSAL: 'proposal',
  SPECIFICATION: 'specification',
  REPORT: 'report',
  OTHER: 'other'
} as const;

export const STAKEHOLDER_ROLE = {
  SPONSOR: 'sponsor',
  MANAGER: 'manager',
  TEAM_MEMBER: 'team_member',
  CLIENT: 'client',
  VENDOR: 'vendor',
  ADVISOR: 'advisor'
} as const;

export const TECHNOLOGY_CATEGORY = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DATABASE: 'database',
  INFRASTRUCTURE: 'infrastructure',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  OTHER: 'other'
} as const;

// Màu sắc cho các trạng thái
export const PROJECT_STATUS_COLORS = {
  [PROJECT_STATUS.DRAFT]: 'default',
  [PROJECT_STATUS.PLANNING]: 'processing',
  [PROJECT_STATUS.IN_PROGRESS]: 'processing',
  [PROJECT_STATUS.ON_HOLD]: 'warning',
  [PROJECT_STATUS.COMPLETED]: 'success',
  [PROJECT_STATUS.CANCELLED]: 'error'
} as const;

export const PROJECT_PRIORITY_COLORS = {
  [PROJECT_PRIORITY.LOW]: 'default',
  [PROJECT_PRIORITY.MEDIUM]: 'processing',
  [PROJECT_PRIORITY.HIGH]: 'warning',
  [PROJECT_PRIORITY.CRITICAL]: 'error'
} as const;

export const RISK_LEVEL_COLORS = {
  [RISK_LEVEL.LOW]: 'success',
  [RISK_LEVEL.MEDIUM]: 'processing',
  [RISK_LEVEL.HIGH]: 'warning',
  [RISK_LEVEL.CRITICAL]: 'error'
} as const;

export const APPROVAL_STATUS_COLORS = {
  [APPROVAL_STATUS.PENDING]: 'processing',
  [APPROVAL_STATUS.APPROVED]: 'success',
  [APPROVAL_STATUS.REJECTED]: 'error',
  [APPROVAL_STATUS.CHANGES_REQUESTED]: 'warning'
} as const;

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.NOT_STARTED]: 'default',
  [TASK_STATUS.IN_PROGRESS]: 'processing',
  [TASK_STATUS.COMPLETED]: 'success',
  [TASK_STATUS.BLOCKED]: 'error'
} as const;

export const MILESTONE_STATUS_COLORS = {
  [MILESTONE_STATUS.NOT_STARTED]: 'default',
  [MILESTONE_STATUS.IN_PROGRESS]: 'processing',
  [MILESTONE_STATUS.COMPLETED]: 'success',
  [MILESTONE_STATUS.DELAYED]: 'warning'
} as const;

// Validation constants
export const VALIDATION = {
  MAX_PROJECT_NAME_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_NOTE_LENGTH: 500,
  MIN_BUDGET: 0,
  MAX_TEAM_MEMBERS: 100,
  MAX_TASKS: 200,
  MAX_MILESTONES: 50,
  MAX_RISKS: 50,
  MAX_ISSUES: 50,
  MAX_CHANGES: 50,
  MAX_DOCUMENTS: 100,
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
