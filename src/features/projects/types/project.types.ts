import { ReactNode } from 'react';

// Các kiểu dữ liệu cơ bản
export type ProjectStatus = 'draft' | 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';
export type ProjectType = 'software' | 'hardware' | 'service' | 'research' | 'infrastructure' | 'other';
export type ProjectCategory = 'internal' | 'external' | 'client' | 'vendor' | 'partnership';
export type ProjectSize = 'small' | 'medium' | 'large' | 'enterprise';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';
export type CurrencyCode = 'VND' | 'USD' | 'EUR';
export type PaymentMethod = 'bank_transfer' | 'cash' | 'credit_card' | 'other';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type TaskStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked';
export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed' | 'delayed';
export type DocumentType = 'contract' | 'proposal' | 'specification' | 'report' | 'other';
export type StakeholderRole = 'sponsor' | 'manager' | 'team_member' | 'client' | 'vendor' | 'advisor';
export type TechnologyCategory = 'frontend' | 'backend' | 'database' | 'infrastructure' | 'mobile' | 'desktop' | 'other';

// Thông tin cơ bản
export interface ProjectBasicInfo {
  projectCode: string;
  projectName: string;
  projectType: ProjectType;
  projectCategory: ProjectCategory;
  projectSize: ProjectSize;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  endDate: string;
  description: string;
  objectives: string;
  scope: string;
  constraints: string;
  assumptions: string;
  client: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
  };
}

// Thông tin tài chính
export interface ProjectFinancialInfo {
  budget: number;
  currency: CurrencyCode;
  exchangeRate?: number;
  actualCost: number;
  estimatedCost: number;
  costVariance: number;
  contingencyReserve: number;
  managementReserve: number;
  roi: number;
  npv: number;
  irr: number;
  paybackPeriod: number;
  fundingSources: {
    id: string;
    name: string;
    amount: number;
    description: string;
  }[];
  expenses: {
    id: string;
    category: string;
    description: string;
    amount: number;
    date: string;
    status: PaymentStatus;
  }[];
  paymentSchedules: {
    id: string;
    installment: number;
    dueDate: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    note?: string;
  }[];
}

// Thông tin nhân sự
export interface ProjectTeamInfo {
  projectManager: {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
  };
  teamMembers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    startDate: string;
    endDate?: string;
    allocation: number; // Phần trăm thời gian
    skills: string[];
    responsibilities: string;
  }[];
  stakeholders: {
    id: string;
    name: string;
    organization: string;
    role: StakeholderRole;
    email: string;
    phone: string;
    influence: 'low' | 'medium' | 'high';
    interest: 'low' | 'medium' | 'high';
    expectations: string;
    communicationFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'as_needed';
  }[];
  resourceRequirements: {
    id: string;
    resourceType: string;
    quantity: number;
    skills: string[];
    startDate: string;
    endDate: string;
    notes: string;
  }[];
}

// Thông tin kỹ thuật
export interface ProjectTechnicalInfo {
  technologies: {
    id: string;
    name: string;
    category: TechnologyCategory;
    version: string;
    description: string;
    purpose: string;
  }[];
  infrastructure: {
    id: string;
    name: string;
    type: string;
    provider: string;
    specifications: string;
    cost: number;
    startDate: string;
    endDate?: string;
  }[];
  architecture: {
    description: string;
    diagrams: string[];
    components: {
      id: string;
      name: string;
      description: string;
      dependencies: string[];
    }[];
  };
  integrations: {
    id: string;
    system: string;
    description: string;
    integrationMethod: string;
    dataFlow: string;
    status: string;
  }[];
  securityRequirements: {
    id: string;
    category: string;
    description: string;
    priority: ProjectPriority;
    implementationStatus: string;
  }[];
  performanceRequirements: {
    id: string;
    category: string;
    description: string;
    metrics: string;
    targetValues: string;
  }[];
}

// Thông tin tiến độ
export interface ProjectProgressInfo {
  milestones: {
    id: string;
    name: string;
    description: string;
    dueDate: string;
    status: MilestoneStatus;
    completionDate?: string;
    deliverables: string[];
  }[];
  tasks: {
    id: string;
    name: string;
    description: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    status: TaskStatus;
    completionPercentage: number;
    priority: ProjectPriority;
    dependencies: string[];
    notes: string;
  }[];
  risks: {
    id: string;
    name: string;
    description: string;
    category: string;
    probability: 'low' | 'medium' | 'high';
    impact: 'low' | 'medium' | 'high';
    level: RiskLevel;
    mitigationPlan: string;
    contingencyPlan: string;
    owner: string;
    status: 'open' | 'mitigated' | 'closed' | 'occurred';
  }[];
  issues: {
    id: string;
    name: string;
    description: string;
    category: string;
    priority: ProjectPriority;
    severity: 'low' | 'medium' | 'high' | 'critical';
    reportedDate: string;
    reportedBy: string;
    assignee: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    resolutionDate?: string;
    resolution?: string;
  }[];
  changes: {
    id: string;
    name: string;
    description: string;
    requestedBy: string;
    requestedDate: string;
    impact: string;
    priority: ProjectPriority;
    status: ApprovalStatus;
    approvedBy?: string;
    approvedDate?: string;
    implementationDate?: string;
    notes: string;
  }[];
}

// Tài liệu và phụ lục
export interface ProjectDocumentsInfo {
  documents: {
    id: string;
    name: string;
    type: DocumentType;
    version: string;
    uploadDate: string;
    uploadedBy: string;
    description: string;
    url: string;
    size: number;
    status: 'draft' | 'review' | 'approved' | 'obsolete';
  }[];
  approvals: {
    id: string;
    stage: string;
    approver: string;
    role: string;
    dueDate: string;
    status: ApprovalStatus;
    approvalDate?: string;
    comments?: string;
  }[];
  notes: string;
}

// Cấu trúc dữ liệu chính
export interface Project {
  id: string;
  basicInfo: ProjectBasicInfo;
  financialInfo: ProjectFinancialInfo;
  teamInfo: ProjectTeamInfo;
  technicalInfo: ProjectTechnicalInfo;
  progressInfo: ProjectProgressInfo;
  documentsInfo: ProjectDocumentsInfo;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// Form related types
export interface FormStep {
  title: string;
  content: ReactNode;
  validationSchema?: any;
}

export interface StepProps {
  data: Partial<Project>;
  onChange: (data: Partial<Project>) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLastStep?: boolean;
}
