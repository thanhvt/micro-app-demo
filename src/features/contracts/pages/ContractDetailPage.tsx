import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, Tag, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Contract } from '../types/contract.types';
import { mockContracts } from '../mock/contract.mock';
import { CONTRACT_STATUS_COLORS, ANIMATION } from '../constants/contract.constants';
import AnimatedPanel from '../../shared/components/AnimatedPanel/AnimatedPanel';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Container = styled.div`
  .ant-descriptions {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    margin-bottom: 24px;
  }
`;

const ContractDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contract, setContract] = useState<Contract | undefined>();
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

  const handleDelete = () => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa hợp đồng này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          setLoading(true);
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          message.success('Xóa hợp đồng thành công');
          navigate('/contracts');
        } catch (error) {
          message.error('Có lỗi xảy ra. Vui lòng thử lại');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (loading || !contract) {
    return <div>Loading...</div>;
  }

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return '0';
    return value.toLocaleString();
  };

  // The JSX return statement needs to be wrapped in a React fragment
  return (
    <div className="contract-detail-wrapper">
      <motion.div
        initial={ANIMATION.PAGE_TRANSITION.initial}
        animate={ANIMATION.PAGE_TRANSITION.animate}
        exit={ANIMATION.PAGE_TRANSITION.exit}
        transition={{
          duration: ANIMATION.DURATION,
          ease: ANIMATION.EASE
        }}
      >
        <PageHeader>
          <PageTitle>Chi tiết hợp đồng</PageTitle>
          <Space>
            <Button
              icon={<PrinterOutlined />}
              onClick={() => window.print()}
            >
              In hợp đồng
            </Button>
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/contracts/edit/${id}`)}
            >
              Chỉnh sửa
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Xóa
            </Button>
          </Space>
        </PageHeader>

        <Container>
          <AnimatedPanel header="Thông tin cơ bản">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Mã hợp đồng">
                {contract.basicInfo.contractCode}
              </Descriptions.Item>
              <Descriptions.Item label="Tên hợp đồng">
                {contract.basicInfo.contractName}
              </Descriptions.Item>
              <Descriptions.Item label="Loại hợp đồng">
                {contract.basicInfo.contractType}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color={CONTRACT_STATUS_COLORS[contract.basicInfo.status]}>
                  {contract.basicInfo.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Ngày hiệu lực">
                {dayjs(contract.basicInfo.effectiveDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày hết hạn">
                {dayjs(contract.basicInfo.expiryDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </AnimatedPanel>

          <AnimatedPanel header="Thông tin các bên">
            <Descriptions title="Bên A" bordered column={2}>
              <Descriptions.Item label="Tên công ty">
                {contract.basicInfo.partyA.companyName}
              </Descriptions.Item>
              <Descriptions.Item label="Mã số thuế">
                {contract.basicInfo.partyA.taxCode}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {contract.basicInfo.partyA.address}
              </Descriptions.Item>
              <Descriptions.Item label="Người đại diện">
                {contract.basicInfo.partyA.representative}
              </Descriptions.Item>
              <Descriptions.Item label="Chức vụ">
                {contract.basicInfo.partyA.position}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {contract.basicInfo.partyA.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {contract.basicInfo.partyA.email}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="Bên B" bordered column={2} style={{ marginTop: 16 }}>
              <Descriptions.Item label="Tên công ty">
                {contract.basicInfo.partyB.companyName}
              </Descriptions.Item>
              <Descriptions.Item label="Mã số thuế">
                {contract.basicInfo.partyB.taxCode}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {contract.basicInfo.partyB.address}
              </Descriptions.Item>
              <Descriptions.Item label="Người đại diện">
                {contract.basicInfo.partyB.representative}
              </Descriptions.Item>
              <Descriptions.Item label="Chức vụ">
                {contract.basicInfo.partyB.position}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {contract.basicInfo.partyB.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {contract.basicInfo.partyB.email}
              </Descriptions.Item>
            </Descriptions>
          </AnimatedPanel>

          <AnimatedPanel header="Thông tin tài chính">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Tổng giá trị">
                {formatCurrency(contract.detailInfo.totalValue)} {contract.detailInfo.currency}
              </Descriptions.Item>
              <Descriptions.Item label="Tỷ giá">
                {formatCurrency(contract.detailInfo.exchangeRate)}
              </Descriptions.Item>
              <Descriptions.Item label="Thuế VAT">
                {contract.detailInfo.vatRate}%
              </Descriptions.Item>
              <Descriptions.Item label="Chi phí phát sinh">
                {formatCurrency(contract.detailInfo.additionalFees)} {contract.detailInfo.currency}
              </Descriptions.Item>
            </Descriptions>
          </AnimatedPanel>

          <AnimatedPanel header="Điều khoản thực hiện">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Điều khoản thanh toán">
                {contract.detailInfo.paymentTerms}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian thực hiện">
                {contract.detailInfo.implementationTime}
              </Descriptions.Item>
              <Descriptions.Item label="Địa điểm thực hiện">
                {contract.detailInfo.implementationLocation}
              </Descriptions.Item>
              <Descriptions.Item label="Yêu cầu bảo hành">
                {contract.detailInfo.warrantyRequirements}
              </Descriptions.Item>
              <Descriptions.Item label="Điều khoản phạt">
                {contract.detailInfo.penaltyTerms}
              </Descriptions.Item>
            </Descriptions>
          </AnimatedPanel>

          <AnimatedPanel header="Tài liệu và phê duyệt">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Số lượng tài liệu">
                {contract.attachments.documents.length} tài liệu
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng phụ lục">
                {contract.attachments.appendices.length} phụ lục
              </Descriptions.Item>
              <Descriptions.Item label="Số cấp phê duyệt">
                {contract.attachments.approvals.length} cấp
              </Descriptions.Item>
              {contract.attachments.notes && (
                <Descriptions.Item label="Ghi chú">
                  {contract.attachments.notes}
                </Descriptions.Item>
              )}
            </Descriptions>
          </AnimatedPanel>
        </Container>
      </motion.div>
    </div>
  );
};

export default ContractDetailPage;
