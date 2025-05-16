import React, { useState } from 'react';
import { Button, Card, Input, Space, Spin, Typography, Alert, Divider } from 'antd';
import { getRequest } from '../../../services/apiService';

const { Title, Text } = Typography;

const ApiExample: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const handleFetch = async () => {
    if (!url) {
      setError('Vui lòng nhập URL API');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await getRequest(url);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi gọi API');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Ví dụ sử dụng API từ Host App" className="mb-4">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>
          Đây là ví dụ về việc sử dụng hàm <code>getRequest</code> được truyền từ host-app sang micro-app.
          Nhập URL API và nhấn nút "Gọi API" để thử nghiệm.
        </Text>
        
        <Divider />
        
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Nhập URL API (ví dụ: /api/v1/users)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onPressEnter={handleFetch}
          />
          <Button type="primary" onClick={handleFetch} loading={loading}>
            Gọi API
          </Button>
        </Space.Compact>

        {loading && (
          <div className="flex justify-center my-4">
            <Spin tip="Đang gọi API..." />
          </div>
        )}

        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
          />
        )}

        {data && (
          <div className="mt-4">
            <Title level={5}>Kết quả:</Title>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default ApiExample;
