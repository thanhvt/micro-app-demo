import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  showPercentage?: boolean;
}

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin: 16px 0;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #52c41a);
  border-radius: 3px;
`;

const PercentageIndicator = styled(motion.div)`
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 12px;
  font-weight: 500;
  color: #1890ff;
`;

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  showPercentage = true
}) => {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <ProgressContainer>
      <ProgressBar
        initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      {showPercentage && (
        <PercentageIndicator
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {percentage}%
        </PercentageIndicator>
      )}
    </ProgressContainer>
  );
};

export default ProgressIndicator;
