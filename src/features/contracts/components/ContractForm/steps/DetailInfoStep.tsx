import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import styled from '@emotion/styled';
import { Contract } from '../../../types/contract.types';
import {
  CURRENCY,
  PAYMENT_METHOD
} from '../../../constants/contract.constants';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';

interface DetailInfoStepProps {
  data: Partial<Contract>;
  onChange: (values: any) => void;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableSection = styled(AnimatedPanel)`
  margin-top: 24px;
`;

const DetailInfoStep: React.FC<DetailInfoStepProps> = ({ data, onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_: any, allValues: any) => {
    onChange({
      detailInfo: {
        ...data.detailInfo,
        ...allValues
      }
    });
  };

  const productColumns = [
    {
      title: 'Mã SP/DV',
      dataIndex: 'code',
      key: 'code',
      editable: true,
      width: '120px',
    },
    {
      title: 'Tên SP/DV',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      editable: true,
      width: '100px',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      editable: true,
      inputType: 'number',
      width: '100px',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      editable: true,
      inputType: 'number',
      width: '150px',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '150px',
      render: (_: any, record: any) => 
        (record.quantity * record.price).toLocaleString(),
    },
  ];

  const paymentColumns = [
    {
      title: 'Đợt',
      dataIndex: 'installment',
      key: 'installment',
      editable: true,
      inputType: 'number',
      width: '80px',
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'dueDate',
      key: 'dueDate',
      editable: true,
      inputType: 'date',
      width: '150px',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      inputType: 'number',
      width: '150px',
      render: (value: number) => value.toLocaleString(),
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      editable: true,
      inputType: 'select',
      width: '150px',
      options: Object.entries(PAYMENT_METHOD).map(([key, value]) => ({
        label: key,
        value: value
      })),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      editable: true,
    },
  ];

  const handleProductsChange = (products: any[]) => {
    const totalValue = products.reduce(
      (sum, product) => sum + (product.quantity * product.price),
      0
    );

    onChange({
      detailInfo: {
        ...data.detailInfo,
        products,
        totalValue
      }
    });
  };

  const handlePaymentSchedulesChange = (paymentSchedules: any[]) => {
    onChange({
      detailInfo: {
        ...data.detailInfo,
        paymentSchedules
      }
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data.detailInfo}
      onValuesChange={handleValuesChange}
    >
      <AnimatedPanel header="Thông tin tài chính">
        <GridContainer>
          <Form.Item
            name="totalValue"
            label="Tổng giá trị hợp đồng"
            rules={[{ required: true, message: 'Vui lòng nhập tổng giá trị' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả hợp đồng"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="currency"
            label="Loại tiền tệ"
            rules={[{ required: true, message: 'Vui lòng chọn loại tiền tệ' }]}
          >
            <Select
              placeholder="Chọn loại tiền tệ"
              options={Object.entries(CURRENCY).map(([key, value]) => ({
                label: key,
                value: value
              }))}
            />
          </Form.Item>

          <Form.Item
            name="exchangeRate"
            label="Tỷ giá"
            rules={[{ required: true, message: 'Vui lòng nhập tỷ giá' }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Nhập tỷ giá"
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="vatRate"
            label="Thuế VAT (%)"
            rules={[{ required: true, message: 'Vui lòng nhập thuế VAT' }]}
          >
            <InputNumber
              className="w-full"
              placeholder="Nhập thuế VAT"
              min={0}
              max={100}
            />
          </Form.Item>

          <Form.Item
            name="additionalFees"
            label="Chi phí phát sinh"
          >
            <InputNumber
              className="w-full"
              placeholder="Nhập chi phí phát sinh"
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </GridContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Điều khoản thực hiện">
        <GridContainer>
          <Form.Item
            name="paymentTerms"
            label="Điều khoản thanh toán"
            rules={[{ required: true, message: 'Vui lòng nhập điều khoản thanh toán' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập điều khoản thanh toán" />
          </Form.Item>

          <Form.Item
            name="implementationTime"
            label="Thời gian thực hiện"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian thực hiện' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập thời gian thực hiện" />
          </Form.Item>

          <Form.Item
            name="implementationLocation"
            label="Địa điểm thực hiện"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm thực hiện' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập địa điểm thực hiện" />
          </Form.Item>

          <Form.Item
            name="warrantyRequirements"
            label="Yêu cầu bảo hành"
            rules={[{ required: true, message: 'Vui lòng nhập yêu cầu bảo hành' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập yêu cầu bảo hành" />
          </Form.Item>

          <Form.Item
            name="penaltyTerms"
            label="Điều khoản phạt"
            rules={[{ required: true, message: 'Vui lòng nhập điều khoản phạt' }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập điều khoản phạt" />
          </Form.Item>
        </GridContainer>
      </AnimatedPanel>

      <TableSection header="Danh sách sản phẩm/dịch vụ">
        <EditableTable
          columns={productColumns}
          dataSource={data.detailInfo?.products || []}
          rowKey="id"
          onChange={handleProductsChange}
        />
      </TableSection>

      <TableSection header="Lịch thanh toán">
        <EditableTable
          columns={paymentColumns}
          dataSource={data.detailInfo?.paymentSchedules || []}
          rowKey="id"
          onChange={handlePaymentSchedulesChange}
        />
      </TableSection>
    </Form>
  );
};

export default DetailInfoStep;
