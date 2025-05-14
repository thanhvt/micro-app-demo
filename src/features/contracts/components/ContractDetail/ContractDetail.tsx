import React from 'react';
import { Card, Descriptions, Space, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const ContractDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for demonstration
  const contract = {
    id: id,
    code: 'CTR-2024-001',
    title: 'Service Agreement Contract',
    status: 'Draft',
    createdAt: '2024-05-14',
    company: {
      name: 'ABC Corporation',
      address: '123 Business Street',
      representative: 'John Doe'
    },
    partner: {
      name: 'XYZ Ltd',
      address: '456 Partner Avenue',
      representative: 'Jane Smith'
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Card
        title="Contract Details"
        extra={
          <Button type="primary" onClick={() => navigate(`/contracts/edit/${id}`)}>
            Edit Contract
          </Button>
        }
      >
        <Descriptions column={2}>
          <Descriptions.Item label="Contract Code">{contract.code}</Descriptions.Item>
          <Descriptions.Item label="Status">{contract.status}</Descriptions.Item>
          <Descriptions.Item label="Title">{contract.title}</Descriptions.Item>
          <Descriptions.Item label="Created Date">{contract.createdAt}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Company Information">
        <Descriptions column={2}>
          <Descriptions.Item label="Company Name">{contract.company.name}</Descriptions.Item>
          <Descriptions.Item label="Address">{contract.company.address}</Descriptions.Item>
          <Descriptions.Item label="Representative">{contract.company.representative}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Partner Information">
        <Descriptions column={2}>
          <Descriptions.Item label="Partner Name">{contract.partner.name}</Descriptions.Item>
          <Descriptions.Item label="Address">{contract.partner.address}</Descriptions.Item>
          <Descriptions.Item label="Representative">{contract.partner.representative}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Space>
  );
};

export default ContractDetail;
