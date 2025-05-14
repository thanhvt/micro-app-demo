import { ReactNode } from 'react';

export type ContractStatus = 'draft' | 'pending' | 'active' | 'expired' | 'terminated';
export type ContractType = 'service' | 'product' | 'maintenance' | 'consulting' | 'other';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';
export type PaymentMethod = 'bank_transfer' | 'cash' | 'credit_card' | 'other';
export type CurrencyCode = 'VND' | 'USD' | 'EUR';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Party {
  companyName: string;
  taxCode: string;
  address: string;
  representative: string;
  position: string;
  phone: string;
  email: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  totalAmount: number;
  description?: string;
}

export interface PaymentSchedule {
  id: string;
  installment: number;
  dueDate: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  note?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  uploadedBy: string;
  url: string;
}

export interface Approval {
  level: number;
  approver: string;
  dueDate: string;
  status: ApprovalStatus;
  comment?: string;
}

export interface ContractBasicInfo {
  contractCode: string;
  contractName: string;
  contractType: ContractType;
  status: ContractStatus;
  effectiveDate: string;
  expiryDate: string;
  partyA: Party;
  partyB: Party;
}

export interface ContractDetailInfo {
  totalValue: number;
  currency: CurrencyCode;
  exchangeRate?: number;
  vatRate: number;
  additionalFees?: number;
  paymentTerms: string;
  implementationTime: string;
  implementationLocation: string;
  warrantyRequirements?: string;
  penaltyTerms?: string;
  products: Product[];
  paymentSchedules: PaymentSchedule[];
}

export interface ContractAttachments {
  appendices: {
    id: string;
    number: string;
    date: string;
    description: string;
  }[];
  documents: Attachment[];
  approvals: Approval[];
  notes?: string;
}

export interface ContractConfirmation {
  createdBy: string;
  createdAt: string;
  comments?: string;
  termsAccepted: boolean;
}

export interface Contract {
  id: string;
  basicInfo: ContractBasicInfo;
  detailInfo: ContractDetailInfo;
  attachments: ContractAttachments;
  confirmation: ContractConfirmation;
  createdAt: string;
  updatedAt: string;
}

// Form related types
export interface FormStep {
  title: string;
  content: ReactNode;
  validationSchema?: any;
}

export interface StepProps {
  data: Partial<Contract>;
  onChange: (data: Partial<Contract>) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLastStep?: boolean;
}

export interface EditableTableProps<T> {
  data: T[];
  onChange: (data: T[]) => void;
  columns: any[];
  rowKey: string;
}
