import React from 'react';
import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { CONTRACT_STATUS, CONTRACT_TYPE } from '../../constants/contract.constants';

const { RangePicker } = DatePicker;

interface ContractFiltersProps {
  onSearch: (values: any) => void;
  onReset: () => void;
}

const FilterContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  margin-bottom: 24px;
`;

const ContractFilters: React.FC<ContractFiltersProps> = ({ onSearch, onReset }) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <FilterContainer>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSearch}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Form.Item name="keyword" label="Tìm kiếm">
            <Input
              placeholder="Mã HĐ, tên HĐ, công ty..."
              prefix={<SearchOutlined />}
            />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select
              placeholder="Chọn trạng thái"
              allowClear
              options={Object.entries(CONTRACT_STATUS).map(([key, value]) => ({
                label: key,
                value: value
              }))}
            />
          </Form.Item>

          <Form.Item name="type" label="Loại hợp đồng">
            <Select
              placeholder="Chọn loại"
              allowClear
              options={Object.entries(CONTRACT_TYPE).map(([key, value]) => ({
                label: key,
                value: value
              }))}
            />
          </Form.Item>

          <Form.Item name="dateRange" label="Ngày hiệu lực">
            <RangePicker className="w-full" />
          </Form.Item>
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={handleReset} icon={<ReloadOutlined />}>
            Đặt lại
          </Button>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        </div>
      </Form>
    </FilterContainer>
  );
};

export default ContractFilters;
