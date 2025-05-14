import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Contract } from '../../../types/contract.types';
import { CONTRACT_TYPE, CONTRACT_STATUS } from '../../../constants/contract.constants';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';

const { RangePicker } = DatePicker;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CompanySection = styled(AnimatedPanel)`
  margin-top: 24px;
`;

interface BasicInfoStepProps {
  data: Partial<Contract>;
  onChange: (values: any) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_: any, allValues: any) => {
    onChange(allValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="Mã hợp đồng"
        name="code"
        rules={[{ required: true, message: 'Vui lòng nhập mã hợp đồng' }]}
      >
        <Input placeholder="Nhập mã hợp đồng" />
      </Form.Item>

      <Form.Item
        label="Tên hợp đồng"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên hợp đồng' }]}
      >
        <Input placeholder="Nhập tên hợp đồng" />
      </Form.Item>

      <GridContainer>
        <Form.Item
          label="Mã hợp đồng"
          name="code"
          rules={[{ required: true, message: 'Vui lòng nhập mã hợp đồng' }]}
        >
          <Input placeholder="Nhập mã hợp đồng" />
        </Form.Item>

        <Form.Item
          label="Tên hợp đồng"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên hợp đồng' }]}
        >
          <Input placeholder="Nhập tên hợp đồng" />
        </Form.Item>

        <Form.Item
          label="Loại hợp đồng"
          name="type"
          rules={[{ required: true, message: 'Vui lòng chọn loại hợp đồng' }]}
        >
          <Select placeholder="Chọn loại hợp đồng">
            {Object.entries(CONTRACT_TYPE).map(([key, value]) => (
              <Select.Option key={value} value={value}>{key}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
        >
          <Select placeholder="Chọn trạng thái">
            {Object.entries(CONTRACT_STATUS).map(([key, value]) => (
              <Select.Option key={value} value={value}>{key}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Thời hạn hợp đồng"
          name="contractTerm"
          rules={[{ required: true, message: 'Vui lòng chọn thời hạn hợp đồng' }]}
        >
          <RangePicker 
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            onChange={(dates) => {
              if (dates) {
                const [effectiveDate, expiryDate] = dates;
                onChange({
                  ...data,
                  effectiveDate: effectiveDate?.toISOString(),
                  expiryDate: expiryDate?.toISOString()
                });
              }
            }}
          />
        </Form.Item>
      </GridContainer>

      <CompanySection header="Thông tin bên A">
        <GridContainer>
          <Form.Item
            name={['partyA', 'companyName']}
            label="Tên công ty"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
          >
            <Input placeholder="Nhập tên công ty" />
          </Form.Item>

          <Form.Item
            name={['partyA', 'taxCode']}
            label="Mã số thuế"
            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
          >
            <Input placeholder="Nhập mã số thuế" />
          </Form.Item>

          <Form.Item
            name={['partyA', 'address']}
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            name={['partyA', 'representative']}
            label="Người đại diện"
            rules={[{ required: true, message: 'Vui lòng nhập người đại diện' }]}
          >
            <Input placeholder="Nhập người đại diện" />
          </Form.Item>

          <Form.Item
            name={['partyA', 'position']}
            label="Chức vụ"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ' }]}
          >
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>

          <Form.Item
            name={['partyA', 'phone']}
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name={['partyA', 'email']}
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </GridContainer>
      </CompanySection>

      <CompanySection header="Thông tin bên B">
        <GridContainer>
          <Form.Item
            name={['partyB', 'companyName']}
            label="Tên công ty"
            rules={[{ required: true, message: 'Vui lòng nhập tên công ty' }]}
          >
            <Input placeholder="Nhập tên công ty" />
          </Form.Item>

          <Form.Item
            name={['partyB', 'taxCode']}
            label="Mã số thuế"
            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
          >
            <Input placeholder="Nhập mã số thuế" />
          </Form.Item>

          <Form.Item
            name={['partyB', 'address']}
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            name={['partyB', 'representative']}
            label="Người đại diện"
            rules={[{ required: true, message: 'Vui lòng nhập người đại diện' }]}
          >
            <Input placeholder="Nhập người đại diện" />
          </Form.Item>

          <Form.Item
            name={['partyB', 'position']}
            label="Chức vụ"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ' }]}
          >
            <Input placeholder="Nhập chức vụ" />
          </Form.Item>

          <Form.Item
            name={['partyB', 'phone']}
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name={['partyB', 'email']}
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </GridContainer>
      </CompanySection>
    </Form>
  );
};

export default BasicInfoStep;
