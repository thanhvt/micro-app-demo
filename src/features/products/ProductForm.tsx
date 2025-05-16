import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Card, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { mockProducts } from '../../data/mockData';
import { Product, ProductFormData } from '../../types/features';

const { Option } = Select;

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isEditMode = id && id !== 'new';

  useEffect(() => {
    if (isEditMode) {
      const product = mockProducts.find((p) => p.id === id);
      if (product) {
        form.setFieldsValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
        });
      } else {
        message.error('Product not found');
        navigate('/products');
      }
    }
  }, [id, isEditMode, form, navigate]);

  const onFinish = (values: ProductFormData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        if (isEditMode) {
          // Update existing product
          message.success('Product updated successfully');
        } else {
          // Create new product with generated ID
          const newProduct: Product = {
            ...values,
            id: `PRD${Date.now()}`,
            createdAt: new Date().toISOString()
          };
          mockProducts.push(newProduct); // Add to mock data
          message.success('Product created successfully');
        }
        navigate('/products');
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
        <Button 
          onClick={() => navigate('/products')}
          icon={<ArrowLeftOutlined />}
        >
          Back to Products
        </Button>
      </div>

      <Card title={<h1 className="text-xl font-bold">{isEditMode ? 'Edit Product' : 'Create Product'}</h1>}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: '',
            description: '',
            price: 0,
            category: 'Electronics',
            stock: 0,
          }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              <Option value="Electronics">Electronics</Option>
              <Option value="Audio">Audio</Option>
              <Option value="Wearables">Wearables</Option>
              <Option value="Accessories">Accessories</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter product price' }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              prefix="$"
              className="w-full"
              size="large"
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber min={0} 
              className="w-full"
              size='large'
              style={{ width: '100%' }} placeholder="Enter stock quantity" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SaveOutlined />}
              className="mr-2"
            >
              {isEditMode ? 'Update Product' : 'Create Product'}
            </Button>
            <Link to="/products">
              <Button>Cancel</Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductForm;
