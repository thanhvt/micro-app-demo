import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Descriptions, Card, Spin, Empty, Tag } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { mockCustomers } from '../../data/mockData';
import { Customer } from '../../types/features';

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCustomer = mockCustomers.find((c) => c.id === id) || null;
      setCustomer(foundCustomer);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="micro-app-container flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="micro-app-container">
        <div className="mb-4">
          <Link to="/customers">
            <Button icon={<ArrowLeftOutlined />}>Back to Customers</Button>
          </Link>
        </div>
        <Card>
          <Empty description="Customer not found" />
        </Card>
      </div>
    );
  }

  return (
    <div className="micro-app-container">
      <div className="flex justify-between items-center mb-4">
        <Link to="/customers">
          <Button icon={<ArrowLeftOutlined />}>Back to Customers</Button>
        </Link>
        <Link to={`/customers/edit/${customer.id}`}>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Customer
          </Button>
        </Link>
      </div>

      <Card title={<h1 className="text-xl font-bold">{customer.name}</h1>}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{customer.address}</Descriptions.Item>
          <Descriptions.Item label="Join Date">
            {new Date(customer.joinDate).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={customer.status === 'active' ? 'green' : 'red'}>
              {customer.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default CustomerDetail;
