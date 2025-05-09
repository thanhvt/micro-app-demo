import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, Tag, Divider, Space, Tooltip, Modal, Input, Spin } from 'antd';
import { ArrowLeftOutlined, EditOutlined, ShareAltOutlined, CopyOutlined } from '@ant-design/icons';
import { Product } from '../../types/features';
import { mockProducts } from '@/data/mockData';
// import { fetchProductById } from '../../services/productService';

interface ProductDetailProps {
  showNotification: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ showNotification }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find((p) => p.id === id) || null;
      setProduct(foundProduct);
      setLoading(false);
      const baseUrl = window.location.origin;
      setShareUrl(`${baseUrl}/micro-app-demo/products/${id}`);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/products/edit/${id}`);
    }
  };

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        showNotification('Link copied to clipboard!', 'success');
        setShareModalVisible(false);
      })
      .catch(() => {
        showNotification('Failed to copy link', 'error');
      });
  };

  const handleOpenInNewTab = () => {
    window.open(shareUrl, '_blank');
    setShareModalVisible(false);
  };

  if (loading) {
    return (
      <div className="micro-app-container flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-md">
        <h2 className="text-xl font-bold mb-2">Product not found</h2>
        <p>The product you are looking for does not exist or has been removed.</p>
        <Button 
          type="primary" 
          danger 
          className="mt-4" 
          onClick={handleBack}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="flex justify-between items-center mb-4">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
        >
          Back
        </Button>
        <Space>
          <Tooltip title="Share Product">
            <Button 
              icon={<ShareAltOutlined />} 
              onClick={handleShare}
            >
              Share
            </Button>
          </Tooltip>
          <Tooltip title="Edit Product">
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={handleEdit}
            >
              Edit
            </Button>
          </Tooltip>
        </Space>
      </div>
      
      <Card title={product.name} className="shadow-md">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID" span={2}>{product.id}</Descriptions.Item>
          <Descriptions.Item label="Name" span={2}>{product.name}</Descriptions.Item>
          <Descriptions.Item label="Price" span={1}>${product.price.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="Stock" span={1}>{product.stock} units</Descriptions.Item>
          <Descriptions.Item label="Category" span={2}>
            <Tag color="blue">{product.category}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {product.description}
          </Descriptions.Item>
        </Descriptions>
        
        <Divider />
        
        <div className="flex justify-end">
          <Button danger onClick={() => {
            showNotification(`Product ${product.name} deleted`, 'info');
            navigate('/products');
          }}>
            Delete Product
          </Button>
        </div>
      </Card>
      
      <Modal
        title="Share Product"
        open={shareModalVisible}
        onCancel={() => setShareModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setShareModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="copy" 
            type="primary" 
            icon={<CopyOutlined />} 
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>,
          <Button 
            key="open" 
            icon={<ShareAltOutlined />} 
            onClick={handleOpenInNewTab}
          >
            Open in New Tab
          </Button>
        ]}
      >
        <div className="mb-4">
          <p className="mb-2">Share this product with others:</p>
          <Input 
            value={shareUrl} 
            readOnly 
            addonAfter={
              <CopyOutlined 
                className="cursor-pointer" 
                onClick={handleCopyLink} 
              />
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;
