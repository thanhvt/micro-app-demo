import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { LoadingOutlined } from '@ant-design/icons';

interface StepTransitionLoaderProps {
  isLoading: boolean;
  position?: 'top' | 'center';
}

const LoaderContainer = styled(motion.div)<{ $position: 'top' | 'center' }>`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4px;
  z-index: 10;
  ${props => props.$position === 'top' ? 'top: 0;' : 'top: 50%; transform: translateY(-50%);'}
`;

const ProgressBar = styled(motion.div)`
  height: 4px;
  background: linear-gradient(90deg, #1890ff, #52c41a);
  width: 100%;
`;

const CenterLoader = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
  font-size: 24px;
`;

const StepTransitionLoader: React.FC<StepTransitionLoaderProps> = ({
  isLoading,
  position = 'top'
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <LoaderContainer
          $position={position}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {position === 'top' ? (
            <ProgressBar
              initial={{ width: '0%', opacity: 0.7 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          ) : (
            <CenterLoader
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingOutlined spin />
            </CenterLoader>
          )}
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
};

export default StepTransitionLoader;
