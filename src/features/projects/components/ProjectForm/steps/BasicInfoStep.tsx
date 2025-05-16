import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Radio, Collapse, Row, Col, Divider } from 'antd';
import { InfoCircleOutlined, UserOutlined, BankOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Project } from '../../../types/project.types';
import { 
  PROJECT_STATUS, 
  PROJECT_PRIORITY, 
  PROJECT_TYPE, 
  PROJECT_CATEGORY,
  PROJECT_SIZE
} from '../../../constants/project.constants';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { Option } = Select;

interface BasicInfoStepProps {
  data: Partial<Project>;
  onChange: (data: Partial<Project>) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const StyledCollapse = styled(Collapse)`
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
  
  .ant-collapse-header {
    font-weight: 500;
  }
`;

const FormSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
`;

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  const [form] = Form.useForm();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Set initial values
  useEffect(() => {
    form.setFieldsValue({
      projectCode: data.basicInfo?.projectCode || '',
      projectName: data.basicInfo?.projectName || '',
      projectType: data.basicInfo?.projectType || 'software',
      projectCategory: data.basicInfo?.projectCategory || 'internal',
      projectSize: data.basicInfo?.projectSize || 'medium',
      status: data.basicInfo?.status || 'draft',
      priority: data.basicInfo?.priority || 'medium',
      dateRange: data.basicInfo?.startDate && data.basicInfo?.endDate 
        ? [dayjs(data.basicInfo.startDate), dayjs(data.basicInfo.endDate)]
        : undefined,
      description: data.basicInfo?.description || '',
      objectives: data.basicInfo?.objectives || '',
      scope: data.basicInfo?.scope || '',
      constraints: data.basicInfo?.constraints || '',
      assumptions: data.basicInfo?.assumptions || '',
      clientName: data.basicInfo?.client.name || '',
      clientContactPerson: data.basicInfo?.client.contactPerson || '',
      clientEmail: data.basicInfo?.client.email || '',
      clientPhone: data.basicInfo?.client.phone || '',
      clientAddress: data.basicInfo?.client.address || ''
    });
  }, [form, data]);

  // Handle form changes
  const handleValuesChange = (_: any, allValues: any) => {
    // Extract date range
    const startDate = allValues.dateRange?.[0]?.toISOString();
    const endDate = allValues.dateRange?.[1]?.toISOString();
    
    // Update data
    onChange({
      basicInfo: {
        ...data.basicInfo,
        projectCode: allValues.projectCode,
        projectName: allValues.projectName,
        projectType: allValues.projectType,
        projectCategory: allValues.projectCategory,
        projectSize: allValues.projectSize,
        status: allValues.status,
        priority: allValues.priority,
        startDate: startDate || data.basicInfo?.startDate || '',
        endDate: endDate || data.basicInfo?.endDate || '',
        description: allValues.description,
        objectives: allValues.objectives,
        scope: allValues.scope,
        constraints: allValues.constraints,
        assumptions: allValues.assumptions,
        client: {
          name: allValues.clientName,
          contactPerson: allValues.clientContactPerson,
          email: allValues.clientEmail,
          phone: allValues.clientPhone,
          address: allValues.clientAddress
        }
      }
    });
    
    // Validate form
    form.validateFields()
      .then(() => {
        setFormErrors([]);
        onValidationChange?.(true);
      })
      .catch(({ errorFields }) => {
        setFormErrors(errorFields.map((field: any) => field.name[0]));
        onValidationChange?.(false);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      requiredMark="optional"
      validateTrigger={['onChange', 'onBlur']}
    >
      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel header="Thông tin dự án" key="1">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="projectCode"
                label="Mã dự án"
                rules={[{ required: true, message: 'Vui lòng nhập mã dự án' }]}
                tooltip="Mã dự án dùng để phân biệt các dự án với nhau"
              >
                <Input placeholder="Nhập mã dự án" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="projectName"
                label="Tên dự án"
                rules={[{ required: true, message: 'Vui lòng nhập tên dự án' }]}
              >
                <Input placeholder="Nhập tên dự án" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="projectType"
                label="Loại dự án"
                rules={[{ required: true, message: 'Vui lòng chọn loại dự án' }]}
              >
                <Select placeholder="Chọn loại dự án">
                  {Object.entries(PROJECT_TYPE).map(([key, value]) => (
                    <Option key={value} value={value}>
                      {
                        {
                          'SOFTWARE': 'Phần mềm',
                          'HARDWARE': 'Phần cứng',
                          'SERVICE': 'Dịch vụ',
                          'RESEARCH': 'Nghiên cứu',
                          'INFRASTRUCTURE': 'Hạ tầng',
                          'OTHER': 'Khác'
                        }[key] || key
                      }
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="projectCategory"
                label="Danh mục"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder="Chọn danh mục">
                  {Object.entries(PROJECT_CATEGORY).map(([key, value]) => (
                    <Option key={value} value={value}>
                      {
                        {
                          'INTERNAL': 'Nội bộ',
                          'EXTERNAL': 'Bên ngoài',
                          'CLIENT': 'Khách hàng',
                          'VENDOR': 'Nhà cung cấp',
                          'PARTNERSHIP': 'Đối tác'
                        }[key] || key
                      }
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="projectSize"
                label="Quy mô"
                rules={[{ required: true, message: 'Vui lòng chọn quy mô' }]}
              >
                <Select placeholder="Chọn quy mô">
                  {Object.entries(PROJECT_SIZE).map(([key, value]) => (
                    <Option key={value} value={value}>
                      {
                        {
                          'SMALL': 'Nhỏ',
                          'MEDIUM': 'Trung bình',
                          'LARGE': 'Lớn',
                          'ENTERPRISE': 'Doanh nghiệp'
                        }[key] || key
                      }
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              >
                <Select placeholder="Chọn trạng thái">
                  {Object.entries(PROJECT_STATUS).map(([key, value]) => (
                    <Option key={value} value={value}>
                      {
                        {
                          'DRAFT': 'Nháp',
                          'PLANNING': 'Lập kế hoạch',
                          'IN_PROGRESS': 'Đang thực hiện',
                          'ON_HOLD': 'Tạm dừng',
                          'COMPLETED': 'Hoàn thành',
                          'CANCELLED': 'Đã hủy'
                        }[key] || key
                      }
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="priority"
                label="Độ ưu tiên"
                rules={[{ required: true, message: 'Vui lòng chọn độ ưu tiên' }]}
              >
                <Radio.Group>
                  <Radio.Button value="low">Thấp</Radio.Button>
                  <Radio.Button value="medium">Trung bình</Radio.Button>
                  <Radio.Button value="high">Cao</Radio.Button>
                  <Radio.Button value="critical">Quan trọng</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="dateRange"
                label="Thời gian dự án"
                rules={[{ required: true, message: 'Vui lòng chọn thời gian dự án' }]}
              >
                <RangePicker 
                  style={{ width: '100%' }} 
                  format="DD/MM/YYYY"
                  placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </StyledCollapse>

      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel header="Mô tả dự án" key="1">
          <Form.Item
            name="description"
            label="Mô tả tổng quan"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả dự án' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Nhập mô tả tổng quan về dự án" 
              showCount 
              maxLength={1000} 
            />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="objectives"
                label="Mục tiêu"
                rules={[{ required: true, message: 'Vui lòng nhập mục tiêu dự án' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="Nhập mục tiêu của dự án" 
                  showCount 
                  maxLength={500} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="scope"
                label="Phạm vi"
                rules={[{ required: true, message: 'Vui lòng nhập phạm vi dự án' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="Nhập phạm vi của dự án" 
                  showCount 
                  maxLength={500} 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="constraints"
                label="Ràng buộc"
              >
                <TextArea 
                  rows={3} 
                  placeholder="Nhập các ràng buộc của dự án" 
                  showCount 
                  maxLength={500} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="assumptions"
                label="Giả định"
              >
                <TextArea 
                  rows={3} 
                  placeholder="Nhập các giả định của dự án" 
                  showCount 
                  maxLength={500} 
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </StyledCollapse>

      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel header="Thông tin khách hàng" key="1">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="clientName"
                label="Tên công ty/tổ chức"
                rules={[{ required: true, message: 'Vui lòng nhập tên công ty/tổ chức' }]}
              >
                <Input 
                  placeholder="Nhập tên công ty/tổ chức" 
                  prefix={<BankOutlined />} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="clientContactPerson"
                label="Người liên hệ"
                rules={[{ required: true, message: 'Vui lòng nhập tên người liên hệ' }]}
              >
                <Input 
                  placeholder="Nhập tên người liên hệ" 
                  prefix={<UserOutlined />} 
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="clientEmail"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email' },
                  { type: 'email', message: 'Email không hợp lệ' }
                ]}
              >
                <Input 
                  placeholder="Nhập email" 
                  prefix={<MailOutlined />} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="clientPhone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                <Input 
                  placeholder="Nhập số điện thoại" 
                  prefix={<PhoneOutlined />} 
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="clientAddress"
                label="Địa chỉ"
              >
                <Input 
                  placeholder="Nhập địa chỉ" 
                  prefix={<HomeOutlined />} 
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </StyledCollapse>
    </Form>
  );
};

export default BasicInfoStep;
