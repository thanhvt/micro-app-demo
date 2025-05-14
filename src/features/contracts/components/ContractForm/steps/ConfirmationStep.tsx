import React from 'react';
import { Form, Checkbox, Input, Descriptions, Tag } from 'antd';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Contract } from '../../../types/contract.types';
import { CONTRACT_STATUS_COLORS } from '../../../constants/contract.constants';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';

interface ConfirmationStepProps {
  data: Partial<Contract>;
  onChange: (values: any) => void;
}

const Container = styled.div`
  .ant-descriptions {
    background: #fafafa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ data, onChange }) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_: any, allValues: any) => {
    onChange({
      confirmation: allValues
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <Container>
      <Form
        form={form}
        layout="vertical"
        initialValues={data.confirmation}
        onValuesChange={handleValuesChange}
      >
        <AnimatedPanel header="Thông tin cơ bản">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Mã hợp đồng">
              {data.basicInfo?.contractCode}
            </Descriptions.Item>
            <Descriptions.Item label="Tên hợp đồng">
              {data.basicInfo?.contractName}
            </Descriptions.Item>
            <Descriptions.Item label="Loại hợp đồng">
              {data.basicInfo?.contractType}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={CONTRACT_STATUS_COLORS[data.basicInfo?.status || 'draft']}>
                {data.basicInfo?.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hiệu lực">
              {dayjs(data.basicInfo?.effectiveDate).format('DD/MM/YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn">
              {dayjs(data.basicInfo?.expiryDate).format('DD/MM/YYYY')}
            </Descriptions.Item>
          </Descriptions>
        </AnimatedPanel>

        <AnimatedPanel header="Thông tin các bên">
          <Descriptions title="Bên A" bordered column={2}>
            <Descriptions.Item label="Tên công ty">
              {data.basicInfo?.partyA.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="Mã số thuế">
              {data.basicInfo?.partyA.taxCode}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {data.basicInfo?.partyA.address}
            </Descriptions.Item>
            <Descriptions.Item label="Người đại diện">
              {data.basicInfo?.partyA.representative}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions title="Bên B" bordered column={2} style={{ marginTop: 16 }}>
            <Descriptions.Item label="Tên công ty">
              {data.basicInfo?.partyB.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="Mã số thuế">
              {data.basicInfo?.partyB.taxCode}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {data.basicInfo?.partyB.address}
            </Descriptions.Item>
            <Descriptions.Item label="Người đại diện">
              {data.basicInfo?.partyB.representative}
            </Descriptions.Item>
          </Descriptions>
        </AnimatedPanel>

        <AnimatedPanel header="Thông tin tài chính">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tổng giá trị">
              {formatCurrency(data.detailInfo?.totalValue || 0)} {data.detailInfo?.currency}
            </Descriptions.Item>
            <Descriptions.Item label="Tỷ giá">
              {formatCurrency(data.detailInfo?.exchangeRate || 0)}
            </Descriptions.Item>
            <Descriptions.Item label="Thuế VAT">
              {data.detailInfo?.vatRate}%
            </Descriptions.Item>
            <Descriptions.Item label="Chi phí phát sinh">
              {formatCurrency(data.detailInfo?.additionalFees || 0)} {data.detailInfo?.currency}
            </Descriptions.Item>
          </Descriptions>
        </AnimatedPanel>

        <AnimatedPanel header="Tài liệu và phê duyệt">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Số lượng tài liệu">
              {data.attachments?.documents?.length || 0} tài liệu
            </Descriptions.Item>
            <Descriptions.Item label="Số lượng phụ lục">
              {data.attachments?.appendices?.length || 0} phụ lục
            </Descriptions.Item>
            <Descriptions.Item label="Số cấp phê duyệt">
              {data.attachments?.approvals?.length || 0} cấp
            </Descriptions.Item>
          </Descriptions>
        </AnimatedPanel>

        <AnimatedPanel header="Xác nhận">
          <Form.Item
            name="comments"
            label="Nhận xét"
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập nhận xét của bạn (nếu có)"
            />
          </Form.Item>

          <Form.Item
            name="termsAccepted"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Vui lòng xác nhận các điều khoản')),
              },
            ]}
          >
            <Checkbox>
              Tôi xác nhận rằng tất cả thông tin trên là chính xác và đồng ý với các điều khoản của hợp đồng
            </Checkbox>
          </Form.Item>
        </AnimatedPanel>
      </Form>
    </Container>
  );
};

export default ConfirmationStep;
