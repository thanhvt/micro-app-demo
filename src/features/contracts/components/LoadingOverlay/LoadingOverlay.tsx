import React from 'react';
import { Spin } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  opacity?: number;
  zIndex?: number;
}

const OverlayContainer = styled(motion.div)<{ $opacity?: number; $zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, ${props => props.$opacity || 0.8});
  z-index: ${props => props.$zIndex || 1000};
  backdrop-filter: blur(2px);
`;

const LoadingMessage = styled.div`
  margin-top: 16px;
  font-size: 16px;
  color: #1890ff;
  font-weight: 500;
`;

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Đang xử lý...',
  opacity = 0.8,
  zIndex = 1000
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  return (
    <AnimatePresence>
      {isLoading && (
        <OverlayContainer
          $opacity={opacity}
          $zIndex={zIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Spin indicator={antIcon} size="large" />
          {message && <LoadingMessage>{message}</LoadingMessage>}
        </OverlayContainer>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
