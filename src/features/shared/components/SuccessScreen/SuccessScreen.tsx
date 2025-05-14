import React from 'react';
import { Button, Result } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { CheckCircleOutlined, ArrowLeftOutlined, EyeOutlined } from '@ant-design/icons';

interface SuccessScreenProps {
  title?: string;
  subTitle?: string;
  onViewDetails?: () => void;
  onBackToList?: () => void;
  entityName?: string;
  entityId?: string | number;
}

const SuccessContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title = 'Thao tác thành công!',
  subTitle = 'Dữ liệu đã được lưu thành công vào hệ thống.',
  onViewDetails,
  onBackToList,
  entityName = 'bản ghi',
  entityId
}) => {
  return (
    <SuccessContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <Result
        status="success"
        icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
        title={title}
        subTitle={
          <>
            {subTitle}
            {entityId && (
              <div style={{ marginTop: 8 }}>
                Mã {entityName}: <strong>{entityId}</strong>
              </div>
            )}
          </>
        }
        extra={
          <ButtonGroup>
            {onBackToList && (
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={onBackToList}
              >
                Quay lại danh sách
              </Button>
            )}
            {onViewDetails && (
              <Button 
                type="primary" 
                icon={<EyeOutlined />} 
                onClick={onViewDetails}
              >
                Xem chi tiết
              </Button>
            )}
          </ButtonGroup>
        }
      />
    </SuccessContainer>
  );
};

export default SuccessScreen;
