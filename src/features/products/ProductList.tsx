import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types/features';

const ProductList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('new');  // Sử dụng relative path
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase()) ||
      product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <Link to={`/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Link to={`/products/${record.id}`} className="text-blue-500 hover:text-blue-700">
            View
          </Link>
          <Link to={`/products/edit/${record.id}`} className="text-green-500 hover:text-green-700">
            Edit
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="micro-app-container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="page-title">Products</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <div className="card">
        <Table
          dataSource={filteredProducts}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default ProductList;
