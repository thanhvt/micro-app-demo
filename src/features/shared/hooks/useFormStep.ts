import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import * as yup from 'yup';

export interface FormStep {
  title: string;
  content: ReactNode;
  validationSchema?: yup.ObjectSchema<any>;
}

export interface UseFormStepReturn<T> {
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  formData: T;
  updateFormData: (data: Partial<T>) => void;
  validateCurrentStep: () => Promise<boolean>;
}

export const useFormStep = <T extends Record<string, any>>(
  steps: FormStep[],
  initialData: T,
  onComplete?: (data: T) => void
): UseFormStepReturn<T> => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<T>(initialData);

  const validateCurrentStep = async (): Promise<boolean> => {
    const currentStepData = steps[currentStep];
    if (currentStepData.validationSchema) {
      try {
        await currentStepData.validationSchema.validate(formData, { abortEarly: false });
        return true;
      } catch (error) {
        return false;
      }
    }
    return true;
  };

  const updateFormData = useCallback((data: Partial<T>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  const goToNextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (currentStep === steps.length - 1) {
      onComplete?.(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    totalSteps: steps.length,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    formData,
    updateFormData,
    validateCurrentStep
  };
};

export default useFormStep;
