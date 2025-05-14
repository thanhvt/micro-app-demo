import React from 'react';
import { Steps, Button, message } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useFormStep } from '../../../shared/hooks/useFormStep';
import type { FormStep } from '../../../shared/hooks/useFormStep';
import { Contract } from '../../types/contract.types';
import BasicInfoStep from './steps/BasicInfoStep';
import DetailInfoStep from './steps/DetailInfoStep';
import AttachmentStep from './steps/AttachmentStep';
import ConfirmationStep from './steps/ConfirmationStep';
import { ANIMATION } from '../../constants/contract.constants';

interface ContractFormProps {
  initialData?: Partial<Contract>;
  onSubmit?: (data: Contract) => void;
}

// Interface removed since we're using the Contract interface from types/contract.types.ts

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const StepContent = styled(motion.div)`
  margin-top: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

// Helper function to check if contract data is complete enough to be submitted
const isCompleteContract = (data: Partial<Contract>): boolean => {
  // Check for required fields in basicInfo
  if (!data.basicInfo?.contractCode || !data.basicInfo?.contractName) {
    return false;
  }
  
  // Check for required fields in detailInfo
  if (!data.detailInfo?.totalValue || !data.detailInfo?.implementationTime) {
    return false;
  }
  
  // Check for confirmation
  if (!data.confirmation?.termsAccepted) {
    return false;
  }
  
  return true;
};

// Declare steps function to use form data and update handlers
const createSteps = (data: Partial<Contract>, updateFormData: (data: Partial<Contract>) => void): FormStep[] => [
  {
    title: 'Thông tin cơ bản',
    content: <BasicInfoStep data={data} onChange={updateFormData} />
  },
  {
    title: 'Thông tin chi tiết',
    content: <DetailInfoStep data={data} onChange={updateFormData} />
  },
  {
    title: 'Phụ lục & tài liệu',
    content: <AttachmentStep data={data} onChange={updateFormData} />
  },
  {
    title: 'Xác nhận',
    content: <ConfirmationStep data={data} onChange={updateFormData} />
  },
];

// Initial data structure matching Contract interface
const defaultInitialData: Partial<Contract> = {
  id: '',
  basicInfo: {
    contractCode: '',
    contractName: '',
    contractType: 'service',
    status: 'draft',
    effectiveDate: '',
    expiryDate: '',
    partyA: {
      companyName: '',
      taxCode: '',
      address: '',
      representative: '',
      position: '',
      phone: '',
      email: ''
    },
    partyB: {
      companyName: '',
      taxCode: '',
      address: '',
      representative: '',
      position: '',
      phone: '',
      email: ''
    }
  },
  detailInfo: {
    totalValue: 0,
    currency: 'VND',
    vatRate: 0,
    paymentTerms: '',
    implementationTime: '',
    implementationLocation: '',
    products: [],
    paymentSchedules: []
  },
  attachments: {
    appendices: [],
    documents: [],
    approvals: []
  },
  confirmation: {
    createdBy: '',
    createdAt: new Date().toISOString(),
    termsAccepted: false
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const ContractForm: React.FC<ContractFormProps> = ({ initialData = {}, onSubmit }) => {
  // Merge provided initialData with defaultInitialData
  const mergedInitialData = { ...defaultInitialData, ...initialData };
  
  // Create steps array first - we'll populate it with real content later
  const stepsConfig: FormStep[] = [
    { title: 'Thông tin cơ bản', content: <></> },
    { title: 'Thông tin chi tiết', content: <></> },
    { title: 'Phụ lục & tài liệu', content: <></> },
    { title: 'Xác nhận', content: <></> },
  ];
  
  // Set up form steps with state management
  const {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    formData,
    updateFormData,
    isLastStep,
  } = useFormStep<Partial<Contract>>(stepsConfig, mergedInitialData, (data) => {
    // Ensure data is complete before calling onSubmit
    if (onSubmit && isCompleteContract(data)) {
      onSubmit(data as Contract);
    }
  });
  
  // Now create the actual step content with current data and update handler
  const steps = createSteps(formData, updateFormData);

  return (
    <FormContainer>
      <Steps
        current={currentStep}
        items={steps.map(step => ({ title: step.title }))}
      />
      <StepContent
        initial={ANIMATION.STEP_TRANSITION.initial}
        animate={ANIMATION.STEP_TRANSITION.animate}
        exit={ANIMATION.STEP_TRANSITION.exit}
        transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
        key={currentStep}
      >
        {steps[currentStep].content}
      </StepContent>

      <ButtonGroup>
        {currentStep > 0 && (
          <Button onClick={goToPreviousStep}>Previous</Button>
        )}
        {currentStep < totalSteps - 1 ? (
          <Button type="primary" onClick={goToNextStep}>
            Tiếp theo
          </Button>
        ) : (
          <Button type="primary" onClick={() => onSubmit?.(formData as Contract)}>
            Hoàn thành
          </Button>
        )}
      </ButtonGroup>
    </FormContainer>
  );
};

export default ContractForm;
