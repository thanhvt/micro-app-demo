import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import ContractForm from '../components/ContractForm';
import { Contract } from '../types/contract.types';
import { mockContracts } from '../mock/contract.mock';
import { ANIMATION } from '../constants/contract.constants';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import SuccessScreen from '../../../features/shared/components/SuccessScreen/SuccessScreen';
import { ArrowLeftOutlined } from '@ant-design/icons';
import useToast from '../../shared/hooks/useToast';

const ContractFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contract, setContract] = useState<Partial<Contract> | undefined>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedContract, setSubmittedContract] = useState<Contract | null>(null);

  // Use our custom toast hook
  const { showSuccessToast, showErrorToast, showInfoToast } = useToast();

  useEffect(() => {
    if (id) {
      setLoading(true);
      showInfoToast('Đang tải dữ liệu hợp đồng...');

      // Simulate API call with a small delay to show loading state
      setTimeout(() => {
        const foundContract = mockContracts.find(c => c.id === id);
        if (foundContract) {
          setContract(foundContract);
          showSuccessToast('Đã tải dữ liệu hợp đồng thành công');
        } else {
          showErrorToast('Không tìm thấy hợp đồng');
          navigate('/contracts');
        }
        setLoading(false);
      }, 800);
    }
  }, [id, navigate, showInfoToast, showSuccessToast, showErrorToast]);

  const handleSubmit = async (data: Contract) => {
    try {
      setSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a new ID if creating a new contract
      if (!id) {
        data.id = `contract-${Date.now()}`;
        showSuccessToast(`Đã tạo hợp đồng mới với mã: ${data.id}`);
      } else {
        showSuccessToast(`Đã cập nhật hợp đồng: ${data.id}`);
      }

      setSubmittedContract(data);
      setShowSuccess(true);
    } catch (error) {
      showErrorToast('Có lỗi xảy ra. Vui lòng thử lại');
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewDetails = () => {
    if (submittedContract?.id) {
      navigate(`/contracts/${submittedContract.id}`);
    }
  };

  const handleBackToList = () => {
    navigate('/contracts');
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <SuccessScreen
          title={id ? 'Cập nhật hợp đồng thành công!' : 'Tạo hợp đồng thành công!'}
          subTitle="Hợp đồng đã được lưu vào hệ thống."
          entityName="hợp đồng"
          entityId={submittedContract?.id}
          onViewDetails={handleViewDetails}
          onBackToList={handleBackToList}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={ANIMATION.PAGE_TRANSITION.initial}
      animate={ANIMATION.PAGE_TRANSITION.animate}
      exit={ANIMATION.PAGE_TRANSITION.exit}
      transition={{
        duration: ANIMATION.DURATION,
        ease: ANIMATION.EASE
      }}
      className="p-6 relative"
    >
      <LoadingOverlay isLoading={loading} message="Đang tải dữ liệu..." />

      <div className="flex items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/contracts')}
          className="mr-4"
        >
          Quay lại
        </Button>
        <h1 className="text-2xl font-semibold m-0">
          {id ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng mới'}
        </h1>
      </div>

      {!loading && (
        <ContractForm
          initialData={contract}
          onSubmit={handleSubmit}
        />
      )}
    </motion.div>
  );
};

export default ContractFormPage;
