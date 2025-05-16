import React, { useState, useEffect } from 'react';
import { Steps, Button, message, Space } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { 
  ArrowLeftOutlined, 
  ArrowRightOutlined, 
  CheckOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { Project } from '../../types/project.types';
import { ANIMATION } from '../../constants/project.constants';
import BasicInfoStep from './steps/BasicInfoStep';
import FinancialInfoStep from './steps/FinancialInfoStep';
import TeamInfoStep from './steps/TeamInfoStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import ProgressInfoStep from './steps/ProgressInfoStep';
import DocumentsInfoStep from './steps/DocumentsInfoStep';
import LoadingOverlay from '../../../shared/components/LoadingOverlay/LoadingOverlay';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';

const { Step } = Steps;

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: Project) => void;
  isEditMode?: boolean;
}

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StepsContainer = styled.div`
  margin-bottom: 24px;
  
  .ant-steps-item-title {
    font-weight: 500;
  }
`;

const StepContent = styled(motion.div)`
  margin-top: 24px;
  position: relative;
  min-height: 300px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

const defaultInitialData: Partial<Project> = {
  basicInfo: {
    projectCode: '',
    projectName: '',
    projectType: 'software',
    projectCategory: 'internal',
    projectSize: 'medium',
    status: 'draft',
    priority: 'medium',
    startDate: '',
    endDate: '',
    description: '',
    objectives: '',
    scope: '',
    constraints: '',
    assumptions: '',
    client: {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: ''
    }
  },
  financialInfo: {
    budget: 0,
    currency: 'VND',
    actualCost: 0,
    estimatedCost: 0,
    costVariance: 0,
    contingencyReserve: 0,
    managementReserve: 0,
    roi: 0,
    npv: 0,
    irr: 0,
    paybackPeriod: 0,
    fundingSources: [],
    expenses: [],
    paymentSchedules: []
  },
  teamInfo: {
    projectManager: {
      id: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      role: ''
    },
    teamMembers: [],
    stakeholders: [],
    resourceRequirements: []
  },
  technicalInfo: {
    technologies: [],
    infrastructure: [],
    architecture: {
      description: '',
      diagrams: [],
      components: []
    },
    integrations: [],
    securityRequirements: [],
    performanceRequirements: []
  },
  progressInfo: {
    milestones: [],
    tasks: [],
    risks: [],
    issues: [],
    changes: []
  },
  documentsInfo: {
    documents: [],
    approvals: [],
    notes: ''
  }
};

const ProjectForm: React.FC<ProjectFormProps> = ({ 
  initialData = defaultInitialData, 
  onSubmit,
  isEditMode = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Project>>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepValidationErrors, setStepValidationErrors] = useState<Record<number, boolean>>({});

  // Steps configuration
  const steps = [
    {
      title: 'Thông tin cơ bản',
      content: (
        <BasicInfoStep 
          data={formData} 
          onChange={updateFormData} 
          onValidationChange={(isValid) => handleStepValidation(0, isValid)}
        />
      )
    },
    {
      title: 'Tài chính',
      content: (
        <FinancialInfoStep 
          data={formData} 
          onChange={updateFormData}
          onValidationChange={(isValid) => handleStepValidation(1, isValid)}
        />
      )
    },
    {
      title: 'Nhân sự',
      content: (
        <TeamInfoStep 
          data={formData} 
          onChange={updateFormData}
          onValidationChange={(isValid) => handleStepValidation(2, isValid)}
        />
      )
    },
    {
      title: 'Kỹ thuật',
      content: (
        <TechnicalInfoStep 
          data={formData} 
          onChange={updateFormData}
          onValidationChange={(isValid) => handleStepValidation(3, isValid)}
        />
      )
    },
    {
      title: 'Tiến độ',
      content: (
        <ProgressInfoStep 
          data={formData} 
          onChange={updateFormData}
          onValidationChange={(isValid) => handleStepValidation(4, isValid)}
        />
      )
    },
    {
      title: 'Tài liệu',
      content: (
        <DocumentsInfoStep 
          data={formData} 
          onChange={updateFormData}
          onValidationChange={(isValid) => handleStepValidation(5, isValid)}
        />
      )
    }
  ];

  // Update form data
  function updateFormData(newData: Partial<Project>) {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  }

  // Handle step validation
  function handleStepValidation(stepIndex: number, isValid: boolean) {
    setStepValidationErrors(prev => ({
      ...prev,
      [stepIndex]: !isValid
    }));
  }

  // Check if current step is valid
  const isCurrentStepValid = !stepValidationErrors[currentStep];

  // Navigate to next step
  const next = () => {
    if (!isCurrentStepValid) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate validation/processing
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    }, 500);
  };

  // Navigate to previous step
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!isCurrentStepValid) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate ID if not exists (new project)
    const finalData = {
      ...formData,
      id: formData.id || `PRJ-${Date.now()}`,
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: formData.createdBy || 'Current User',
      updatedBy: 'Current User'
    } as Project;
    
    // Simulate API call
    setTimeout(() => {
      try {
        onSubmit(finalData);
        message.success(`Dự án đã được ${isEditMode ? 'cập nhật' : 'tạo'} thành công`);
      } catch (error) {
        message.error('Đã xảy ra lỗi khi lưu dự án');
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <FormContainer>
      <LoadingOverlay 
        isLoading={isSubmitting} 
        message={isEditMode ? 'Đang cập nhật dự án...' : 'Đang tạo dự án mới...'}
      />
      
      <StepsContainer>
        <Steps current={currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </StepsContainer>
      
      <ProgressIndicator 
        currentStep={currentStep} 
        totalSteps={steps.length} 
      />
      
      <AnimatePresence mode="wait">
        <StepContent
          key={currentStep}
          initial={ANIMATION.STEP_TRANSITION.initial}
          animate={ANIMATION.STEP_TRANSITION.animate}
          exit={ANIMATION.STEP_TRANSITION.exit}
          transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
        >
          {isLoading ? (
            <LoadingOverlay isLoading={true} message="Đang xử lý..." />
          ) : (
            steps[currentStep].content
          )}
        </StepContent>
      </AnimatePresence>
      
      <ButtonsContainer>
        <div>
          {currentStep > 0 && (
            <Button 
              onClick={prev}
              icon={<ArrowLeftOutlined />}
              disabled={isLoading}
            >
              Quay lại
            </Button>
          )}
        </div>
        <div>
          {currentStep < steps.length - 1 && (
            <Button 
              type="primary" 
              onClick={next}
              disabled={isLoading || !isCurrentStepValid}
              icon={<ArrowRightOutlined />}
            >
              Tiếp theo
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Space>
              <Button 
                type="default" 
                onClick={() => handleSubmit()}
                disabled={isSubmitting || !isCurrentStepValid}
                icon={<SaveOutlined />}
              >
                Lưu nháp
              </Button>
              <Button 
                type="primary" 
                onClick={() => handleSubmit()}
                disabled={isSubmitting || !isCurrentStepValid}
                icon={<CheckOutlined />}
              >
                {isEditMode ? 'Cập nhật dự án' : 'Tạo dự án'}
              </Button>
            </Space>
          )}
        </div>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default ProjectForm;
