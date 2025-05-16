import React, { useState } from 'react';
import { Steps, Button, Tooltip } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useFormStep } from '../../../shared/hooks/useFormStep';
import type { FormStep } from '../../../shared/hooks/useFormStep';
import { Contract } from '../../types/contract.types';
import BasicInfoStep from './steps/BasicInfoStep';
import DetailInfoStep from './steps/DetailInfoStep';
import AttachmentStep from './steps/AttachmentStep';
import ConfirmationStep from './steps/ConfirmationStep';
import { ANIMATION } from '../../constants/contract.constants';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import StepTransitionLoader from '../StepTransitionLoader/StepTransitionLoader';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import useToast from '../../../shared/hooks/useToast';

interface ContractFormProps {
  initialData?: Partial<Contract>;
  onSubmit?: (data: Contract) => void;
}

// Interface removed since we're using the Contract interface from types/contract.types.ts

const FormContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
`;

const StepContent = styled(motion.div)`
  margin-top: 24px;
  position: relative;
  min-height: 300px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 24px;
`;

const SuccessContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
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
  // State for loading and success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStepTransitioning, setIsStepTransitioning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<Contract | null>(null);

  // Use our custom toast hook
  const { showSuccessToast, showErrorToast, showInfoToast } = useToast();

  // Merge provided initialData with defaultInitialData
  const mergedInitialData = { ...defaultInitialData, ...initialData };

  // Create steps array first - we'll populate it with real content later
  const stepsConfig: FormStep[] = [
    { title: 'Thông tin cơ bản', content: <></> },
    { title: 'Thông tin chi tiết', content: <></> },
    { title: 'Phụ lục & tài liệu', content: <></> },
    { title: 'Xác nhận', content: <></> },
  ];

  // Handle form submission with loading state
  const handleSubmit = async (data: Partial<Contract>) => {
    if (!isCompleteContract(data)) {
      showErrorToast('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);
    showInfoToast('Đang xử lý dữ liệu...');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onSubmit) {
        setSubmittedData(data as Contract);
        onSubmit(data as Contract);
        showSuccessToast('Hợp đồng đã được lưu thành công!');
        setShowSuccess(true);
      }
    } catch (error) {
      showErrorToast('Có lỗi xảy ra khi lưu dữ liệu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle step transition with loading state
  const handleNextStep = async () => {
    setIsStepTransitioning(true);

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Show a toast notification when moving to the next step
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < totalSteps) {
      const nextStepTitle = steps[nextStepIndex]?.title || '';
      showInfoToast(`Chuyển đến bước: ${nextStepTitle}`);
    }

    goToNextStep();

    // Add a small delay to make the transition smoother
    setTimeout(() => {
      setIsStepTransitioning(false);
    }, 300);
  };

  const handlePreviousStep = () => {
    setIsStepTransitioning(true);

    // Add a small delay to make the transition smoother
    setTimeout(() => {
      goToPreviousStep();
      setIsStepTransitioning(false);
    }, 300);
  };

  // Set up form steps with state management
  const {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    formData,
    updateFormData,
    isLastStep,
  } = useFormStep<Partial<Contract>>(stepsConfig, mergedInitialData, handleSubmit);

  // Now create the actual step content with current data and update handler
  const steps = createSteps(formData, updateFormData);

  return (
    <FormContainer>
      {/* Loading overlay for form submission */}
      <LoadingOverlay
        isLoading={isSubmitting}
        message="Đang lưu dữ liệu..."
      />

      <FormHeader>
        <Steps
          current={currentStep}
          items={steps.map(step => ({ title: step.title }))}
          responsive={true}
          size="small"
        />
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          showPercentage={true}
        />
      </FormHeader>

      {/* Step transition loader */}
      <StepTransitionLoader isLoading={isStepTransitioning} />

      <AnimatePresence mode="wait">
        <StepContent
          initial={ANIMATION.STEP_TRANSITION.initial}
          animate={ANIMATION.STEP_TRANSITION.animate}
          exit={ANIMATION.STEP_TRANSITION.exit}
          transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
          key={currentStep}
        >
          {steps[currentStep].content}

          {/* Success screen overlay */}
          {showSuccess && (
            <SuccessContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="text-5xl text-green-500 mb-4">
                  <CheckOutlined />
                </div>
                <h2 className="text-2xl font-bold mb-2">Thành công!</h2>
                <p className="text-gray-600 mb-6">
                  Hợp đồng đã được lưu thành công.
                </p>
                <div className="flex justify-center">
                  <Button type="primary" onClick={() => setShowSuccess(false)}>
                    Đóng
                  </Button>
                </div>
              </div>
            </SuccessContainer>
          )}
        </StepContent>
      </AnimatePresence>

      <ButtonGroup>
        {currentStep > 0 && (
          <StyledButton
            onClick={handlePreviousStep}
            disabled={isStepTransitioning || isSubmitting}
          >
            <ArrowLeftOutlined /> Quay lại
          </StyledButton>
        )}

        <div style={{ flex: 1 }}></div>

        {currentStep < totalSteps - 1 ? (
          <Tooltip title="Chuyển đến bước tiếp theo">
            <StyledButton
              type="primary"
              onClick={handleNextStep}
              disabled={isStepTransitioning || isSubmitting}
            >
              Tiếp theo <ArrowRightOutlined />
            </StyledButton>
          </Tooltip>
        ) : (
          <Tooltip title="Hoàn thành và lưu hợp đồng">
            <StyledButton
              type="primary"
              onClick={() => handleSubmit(formData)}
              loading={isSubmitting}
              disabled={isStepTransitioning}
            >
              Hoàn thành <CheckOutlined />
            </StyledButton>
          </Tooltip>
        )}
      </ButtonGroup>
    </FormContainer>
  );
};

export default ContractForm;
