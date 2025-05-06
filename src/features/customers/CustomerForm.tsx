import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select, Card, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { mockCustomers } from '../../data/mockData';
import { Customer, CustomerFormData } from '../../types/features';

const { Option } = Select;

const CustomerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isEditMode = id && id !== 'new';

  useEffect(() => {
    if (isEditMode) {
      // Load customer data for editing
      const customer = mockCustomers.find((c) => c.id === id);
      if (customer) {
        form.setFieldsValue({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          status: customer.status,
        });
      } else {
        message.error('Customer not found');
        navigate('/customers');
      }
    }
  }, [id, isEditMode, form, navigate]);

  const onFinish = (values: CustomerFormData) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        if (isEditMode) {
          // Update existing customer
          message.success('Customer updated successfully');
        } else {
          // Create new customer with generated ID
          const newCustomer: Customer = {
            ...values,
            id: `CUST${Date.now()}`,
            joinDate: new Date().toISOString()
          };
          mockCustomers.push(newCustomer); // Add to mock data
          message.success('Customer created successfully');
        }
        navigate('/customers');
      } catch (error) {
        message.error('An error occurred');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="micro-app-container">
      <div className="mb-4">
        <Link to="/customers">
          <Button icon={<ArrowLeftOutlined />}>Back to Customers</Button>
        </Link>
      </div>

      <Card title={<h1 className="text-xl font-bold">{isEditMode ? 'Edit Customer' : 'Create Customer'}</h1>}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: '',
            email: '',
            phone: '',
            address: '',
            status: 'active',
          }}
        >
          <Form.Item
            name="name"
            label="Customer Name"
            rules={[{ required: true, message: 'Please enter customer name' }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              className="mr-2"
            >
              {isEditMode ? 'Update Customer' : 'Create Customer'}
            </Button>
            <Link to="/customers">
              <Button>Cancel</Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CustomerForm;
