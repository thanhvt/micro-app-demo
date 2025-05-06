import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Descriptions, Card, Spin, Empty } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types/features';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find((p) => p.id === id) || null;
      setProduct(foundProduct);
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

  if (!product) {
    return (
      <div className="micro-app-container">
        <div className="mb-4">
          <Link to="/products">
            <Button icon={<ArrowLeftOutlined />}>Back to Products</Button>
          </Link>
        </div>
        <Card>
          <Empty description="Product not found" />
        </Card>
      </div>
    );
  }

  return (
    <div className="micro-app-container">
      <div className="flex justify-between items-center mb-4">
        <Link to="/products">
          <Button icon={<ArrowLeftOutlined />}>Back to Products</Button>
        </Link>
        <Link to={`/products/edit/${product.id}`}>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Product
          </Button>
        </Link>
      </div>

      <Card title={<h1 className="text-xl font-bold">{product.name}</h1>}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
          <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
          <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
          <Descriptions.Item label="Price">${product.price.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(product.createdAt).toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProductDetail;
