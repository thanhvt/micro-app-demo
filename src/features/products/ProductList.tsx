import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types/features';
import ApiExample from '../shared/components/ApiExample';

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

    // Hàm để mở chi tiết sản phẩm trong tab mới
    const openInNewTab = (productId: string) => {
      // Lấy base URL của ứng dụng
      const baseUrl = window.location.origin;
      // Tạo URL đầy đủ đến trang chi tiết sản phẩm
      const detailUrl = `${baseUrl}/micro-app-demo/products/${productId}`;

      // Mở tab mới với URL đã tạo
      window.open(detailUrl, '_blank');
    };

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
        <Tooltip title="View Details">
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/products/${record.id}`)}
          />
        </Tooltip>
        <Tooltip title="Open in New Tab">
          <Button
            icon={<ExportOutlined />}
            onClick={() => openInNewTab(record.id)}
          />
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/products/edit/${record.id}`)}
          />
        </Tooltip>
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

      {/* Thêm component ApiExample */}
      <div className="mt-8">
        <ApiExample />
      </div>
    </div>
  );
};

export default ProductList;
