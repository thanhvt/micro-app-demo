import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { motion } from 'framer-motion';
import ContractForm from '../components/ContractForm';
import { Contract } from '../types/contract.types';
import { mockContracts } from '../mock/contract.mock';
import { ANIMATION } from '../constants/contract.constants';

const ContractFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contract, setContract] = useState<Partial<Contract> | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate API call
      const foundContract = mockContracts.find(c => c.id === id);
      if (foundContract) {
        setContract(foundContract);
      } else {
        message.error('Không tìm thấy hợp đồng');
        navigate('/contracts');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleSubmit = async (data: Contract) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success(
        id 
          ? 'Cập nhật hợp đồng thành công'
          : 'Tạo hợp đồng thành công'
      );
      navigate('/contracts');
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
      className="p-6"
    >
      <h1 className="text-2xl font-semibold mb-6">
        {id ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng mới'}
      </h1>
      
      <ContractForm
        initialData={contract}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
};

export default ContractFormPage;
