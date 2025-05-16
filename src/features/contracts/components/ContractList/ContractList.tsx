import React, { useState, useCallback } from 'react';
import { Table, Button, Tag, Tooltip, Space, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExportOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Contract } from '../../types/contract.types';
import { mockContracts } from '../../mock/contract.mock';
import ContractFilters from './ContractFilters';
import {
  CONTRACT_STATUS_COLORS,
  CURRENCY
} from '../../constants/contract.constants';

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

const ContractList: React.FC = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>(mockContracts);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback((values: any) => {
    setLoading(true);
    try {
      let filtered = [...contracts];

      if (values.keyword) {
        const keyword = values.keyword.toLowerCase();
        filtered = filtered.filter(
          contract =>
            contract.basicInfo.contractCode.toLowerCase().includes(keyword) ||
            contract.basicInfo.contractName.toLowerCase().includes(keyword) ||
            contract.basicInfo.partyA.companyName.toLowerCase().includes(keyword) ||
            contract.basicInfo.partyB.companyName.toLowerCase().includes(keyword)
        );
      }

      if (values.status) {
        filtered = filtered.filter(
          contract => contract.basicInfo.status === values.status
        );
      }

      if (values.type) {
        filtered = filtered.filter(
          contract => contract.basicInfo.contractType === values.type
        );
      }

      if (values.dateRange) {
        const [startDate, endDate] = values.dateRange;
        filtered = filtered.filter(contract => {
          const effectiveDate = dayjs(contract.basicInfo.effectiveDate);
          return effectiveDate.isAfter(startDate) && effectiveDate.isBefore(endDate);
        });
      }

      setFilteredContracts(filtered);
    } finally {
      setLoading(false);
    }
  }, [contracts]);

  const handleReset = useCallback(() => {
    setFilteredContracts(contracts);
  }, [contracts]);

  const handleDelete = useCallback((id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa hợp đồng này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        const newContracts = contracts.filter(contract => contract.id !== id);
        setContracts(newContracts);
        setFilteredContracts(newContracts);
        message.success('Đã xóa hợp đồng thành công');
      }
    });
  }, [contracts]);

  const columns = [
    {
      title: 'Mã hợp đồng',
      dataIndex: ['basicInfo', 'contractCode'],
      key: 'contractCode',
      render: (text: string, record: Contract) => (
        <Link to={`/contracts/${record.id}`} className="text-blue-600 hover:text-blue-800">
          {text}
        </Link>
      ),
    },
    {
      title: 'Tên hợp đồng',
      dataIndex: ['basicInfo', 'contractName'],
      key: 'contractName',
    },
    {
      title: 'Đối tác',
      dataIndex: ['basicInfo', 'partyB', 'companyName'],
      key: 'partner',
    },
    {
      title: 'Giá trị',
      dataIndex: ['detailInfo', 'totalValue'],
      key: 'totalValue',
      render: (value: number, record: Contract) => (
        <span>
          {value.toLocaleString()} {record.detailInfo.currency}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: ['basicInfo', 'status'],
      key: 'status',
      render: (status: keyof typeof CONTRACT_STATUS_COLORS) => (
        <Tag color={CONTRACT_STATUS_COLORS[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Ngày hiệu lực',
      dataIndex: ['basicInfo', 'effectiveDate'],
      key: 'effectiveDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: Contract) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              onClick={() => navigate(`/contracts/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/contracts/edit/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <PageHeader>
        <PageTitle>Quản lý hợp đồng</PageTitle>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/contracts/new')}
        >
          Thêm hợp đồng
        </Button>
      </PageHeader>

      <ContractFilters
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={filteredContracts}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredContracts.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} hợp đồng`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ContractList;
