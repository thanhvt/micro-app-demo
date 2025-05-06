import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Input, Space, Tag } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { mockCustomers } from '../../data/mockData';
import { Customer } from '../../types/features';

const CustomerList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Customer) => (
        <Link to={`/customers/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Link to={`/customers/${record.id}`} className="text-blue-500 hover:text-blue-700">
            View
          </Link>
          <Link to={`/customers/edit/${record.id}`} className="text-green-500 hover:text-green-700">
            Edit
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="micro-app-container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="page-title">Customers</h1>
        <Link to="/customers/new">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Customer
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search customers..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <div className="card">
        <Table
          dataSource={filteredCustomers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default CustomerList;
