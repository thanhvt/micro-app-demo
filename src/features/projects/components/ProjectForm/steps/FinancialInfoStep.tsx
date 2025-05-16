import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, Table, Space, Collapse, Row, Col, Tooltip, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, InfoCircleOutlined, DollarOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Project, PaymentMethod, PaymentStatus, CurrencyCode } from '../../../types/project.types';
import { CURRENCY, PAYMENT_METHOD, PAYMENT_STATUS } from '../../../constants/project.constants';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';

const { Panel } = Collapse;
const { Option } = Select;

interface FinancialInfoStepProps {
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

const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  
  .ant-table-wrapper {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
`;

const SummaryCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  .label {
    color: #666;
  }
  
  .value {
    font-weight: 500;
    color: #333;
  }
`;

const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  const [form] = Form.useForm();
  const [fundingSources, setFundingSources] = useState(data.financialInfo?.fundingSources || []);
  const [expenses, setExpenses] = useState(data.financialInfo?.expenses || []);
  const [paymentSchedules, setPaymentSchedules] = useState(data.financialInfo?.paymentSchedules || []);
  
  // Set initial values
  useEffect(() => {
    form.setFieldsValue({
      budget: data.financialInfo?.budget || 0,
      currency: data.financialInfo?.currency || 'VND',
      exchangeRate: data.financialInfo?.exchangeRate || 23000,
      actualCost: data.financialInfo?.actualCost || 0,
      estimatedCost: data.financialInfo?.estimatedCost || 0,
      costVariance: data.financialInfo?.costVariance || 0,
      contingencyReserve: data.financialInfo?.contingencyReserve || 0,
      managementReserve: data.financialInfo?.managementReserve || 0,
      roi: data.financialInfo?.roi || 0,
      npv: data.financialInfo?.npv || 0,
      irr: data.financialInfo?.irr || 0,
      paybackPeriod: data.financialInfo?.paybackPeriod || 0
    });
    
    setFundingSources(data.financialInfo?.fundingSources || []);
    setExpenses(data.financialInfo?.expenses || []);
    setPaymentSchedules(data.financialInfo?.paymentSchedules || []);
  }, [form, data]);

  // Handle form changes
  const handleValuesChange = (_: any, allValues: any) => {
    // Update data
    onChange({
      financialInfo: {
        ...data.financialInfo,
        budget: allValues.budget,
        currency: allValues.currency,
        exchangeRate: allValues.exchangeRate,
        actualCost: allValues.actualCost,
        estimatedCost: allValues.estimatedCost,
        costVariance: allValues.costVariance,
        contingencyReserve: allValues.contingencyReserve,
        managementReserve: allValues.managementReserve,
        roi: allValues.roi,
        npv: allValues.npv,
        irr: allValues.irr,
        paybackPeriod: allValues.paybackPeriod,
        fundingSources,
        expenses,
        paymentSchedules
      }
    });
    
    // Validate form
    form.validateFields()
      .then(() => {
        onValidationChange?.(true);
      })
      .catch(() => {
        onValidationChange?.(false);
      });
  };

  // Handle funding sources changes
  const handleFundingSourcesChange = (newData: any[]) => {
    setFundingSources(newData);
    onChange({
      financialInfo: {
        ...data.financialInfo,
        fundingSources: newData
      }
    });
  };

  // Handle expenses changes
  const handleExpensesChange = (newData: any[]) => {
    setExpenses(newData);
    onChange({
      financialInfo: {
        ...data.financialInfo,
        expenses: newData
      }
    });
  };

  // Handle payment schedules changes
  const handlePaymentSchedulesChange = (newData: any[]) => {
    setPaymentSchedules(newData);
    onChange({
      financialInfo: {
        ...data.financialInfo,
        paymentSchedules: newData
      }
    });
  };

  // Calculate total funding
  const calculateTotalFunding = () => {
    return fundingSources.reduce((sum, source) => sum + (source.amount || 0), 0);
  };

  // Calculate total expenses
  const calculateTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  };

  // Calculate total payments
  const calculateTotalPayments = () => {
    return paymentSchedules.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  };

  // Funding sources columns
  const fundingSourcesColumns = [
    {
      title: 'Tên nguồn',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      inputType: 'text',
      width: '30%',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      inputType: 'number',
      width: '20%',
      render: (value: number) => value?.toLocaleString() || 0,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      inputType: 'text',
    },
  ];

  // Expenses columns
  const expensesColumns = [
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      inputType: 'text',
      width: '30%',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      inputType: 'number',
      width: '15%',
      render: (value: number) => value?.toLocaleString() || 0,
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (value: string) => value ? dayjs(value).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(PAYMENT_STATUS).map(([key, value]) => ({
        label: {
          'PENDING': 'Chờ thanh toán',
          'PAID': 'Đã thanh toán',
          'OVERDUE': 'Quá hạn',
          'CANCELLED': 'Đã hủy'
        }[key] || key,
        value
      })),
      render: (status: string) => {
        const statusText = {
          'pending': 'Chờ thanh toán',
          'paid': 'Đã thanh toán',
          'overdue': 'Quá hạn',
          'cancelled': 'Đã hủy'
        }[status] || status;
        
        return statusText;
      },
    },
  ];

  // Payment schedules columns
  const paymentSchedulesColumns = [
    {
      title: 'Đợt',
      dataIndex: 'installment',
      key: 'installment',
      editable: true,
      inputType: 'number',
      width: '10%',
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'dueDate',
      key: 'dueDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (value: string) => value ? dayjs(value).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      inputType: 'number',
      width: '15%',
      render: (value: number) => value?.toLocaleString() || 0,
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(PAYMENT_METHOD).map(([key, value]) => ({
        label: {
          'BANK_TRANSFER': 'Chuyển khoản',
          'CASH': 'Tiền mặt',
          'CREDIT_CARD': 'Thẻ tín dụng',
          'OTHER': 'Khác'
        }[key] || key,
        value
      })),
      render: (method: string) => {
        const methodText = {
          'bank_transfer': 'Chuyển khoản',
          'cash': 'Tiền mặt',
          'credit_card': 'Thẻ tín dụng',
          'other': 'Khác'
        }[method] || method;
        
        return methodText;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(PAYMENT_STATUS).map(([key, value]) => ({
        label: {
          'PENDING': 'Chờ thanh toán',
          'PAID': 'Đã thanh toán',
          'OVERDUE': 'Quá hạn',
          'CANCELLED': 'Đã hủy'
        }[key] || key,
        value
      })),
      render: (status: string) => {
        const statusText = {
          'pending': 'Chờ thanh toán',
          'paid': 'Đã thanh toán',
          'overdue': 'Quá hạn',
          'cancelled': 'Đã hủy'
        }[status] || status;
        
        return statusText;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
  ];

  // Add new funding source
  const addFundingSource = () => {
    const newSource = {
      id: `fs-${Date.now()}`,
      name: '',
      amount: 0,
      description: ''
    };
    
    const newData = [...fundingSources, newSource];
    setFundingSources(newData);
    handleFundingSourcesChange(newData);
  };

  // Add new expense
  const addExpense = () => {
    const newExpense = {
      id: `exp-${Date.now()}`,
      category: '',
      description: '',
      amount: 0,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    const newData = [...expenses, newExpense];
    setExpenses(newData);
    handleExpensesChange(newData);
  };

  // Add new payment schedule
  const addPaymentSchedule = () => {
    const newPayment = {
      id: `pay-${Date.now()}`,
      installment: paymentSchedules.length + 1,
      dueDate: new Date().toISOString(),
      amount: 0,
      method: 'bank_transfer',
      status: 'pending',
      note: ''
    };
    
    const newData = [...paymentSchedules, newPayment];
    setPaymentSchedules(newData);
    handlePaymentSchedulesChange(newData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      requiredMark="optional"
    >
      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel header="Thông tin ngân sách" key="1">
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="budget"
                label="Ngân sách"
                rules={[{ required: true, message: 'Vui lòng nhập ngân sách' }]}
                tooltip="Tổng ngân sách của dự án"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập ngân sách"
                  prefix={<DollarOutlined />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="currency"
                label="Đơn vị tiền tệ"
                rules={[{ required: true, message: 'Vui lòng chọn đơn vị tiền tệ' }]}
              >
                <Select placeholder="Chọn đơn vị tiền tệ">
                  {Object.entries(CURRENCY).map(([key, value]) => (
                    <Option key={value} value={value}>{key}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="exchangeRate"
                label="Tỷ giá"
                tooltip="Tỷ giá quy đổi sang VND"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập tỷ giá"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="actualCost"
                label="Chi phí thực tế"
                tooltip="Chi phí đã chi tiêu"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập chi phí thực tế"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="estimatedCost"
                label="Chi phí ước tính"
                tooltip="Chi phí dự kiến"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập chi phí ước tính"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="costVariance"
                label="Chênh lệch chi phí"
                tooltip="Chênh lệch giữa chi phí thực tế và ước tính"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập chênh lệch chi phí"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                name="contingencyReserve"
                label="Dự phòng rủi ro"
                tooltip="Ngân sách dự phòng cho rủi ro đã xác định"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập dự phòng rủi ro"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="managementReserve"
                label="Dự phòng quản lý"
                tooltip="Ngân sách dự phòng cho rủi ro chưa xác định"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập dự phòng quản lý"
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </StyledCollapse>

      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel header="Chỉ số tài chính" key="1">
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item
                name="roi"
                label="ROI (Lợi nhuận đầu tư)"
                tooltip="Tỷ lệ lợi nhuận trên vốn đầu tư"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={1}
                  step={0.01}
                  formatter={value => `${(Number(value) * 100).toFixed(2)}%`}
                  parser={value => value!.replace('%', '') ? Number(value!.replace('%', '')) / 100 : 0}
                  placeholder="Nhập ROI"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="npv"
                label="NPV (Giá trị hiện tại ròng)"
                tooltip="Giá trị hiện tại ròng của dự án"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập NPV"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="irr"
                label="IRR (Tỷ suất hoàn vốn nội bộ)"
                tooltip="Tỷ suất hoàn vốn nội bộ của dự án"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={1}
                  step={0.01}
                  formatter={value => `${(Number(value) * 100).toFixed(2)}%`}
                  parser={value => value!.replace('%', '') ? Number(value!.replace('%', '')) / 100 : 0}
                  placeholder="Nhập IRR"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                name="paybackPeriod"
                label="Thời gian hoàn vốn (tháng)"
                tooltip="Thời gian cần thiết để hoàn vốn đầu tư"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="Nhập thời gian hoàn vốn"
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </StyledCollapse>

      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel 
          header={
            <div className="flex justify-between items-center">
              <span>Nguồn vốn</span>
              <SummaryItem>
                <span className="label">Tổng nguồn vốn:</span>
                <span className="value">
                  {calculateTotalFunding().toLocaleString()} {form.getFieldValue('currency')}
                </span>
              </SummaryItem>
            </div>
          } 
          key="1"
        >
          <div className="mb-4">
            <Button 
              type="dashed" 
              onClick={addFundingSource} 
              icon={<PlusOutlined />}
              block
            >
              Thêm nguồn vốn
            </Button>
          </div>
          
          <TableContainer>
            <EditableTable
              columns={fundingSourcesColumns}
              dataSource={fundingSources}
              rowKey="id"
              onChange={handleFundingSourcesChange}
            />
          </TableContainer>
        </Panel>
      </StyledCollapse>

      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel 
          header={
            <div className="flex justify-between items-center">
              <span>Chi phí</span>
              <SummaryItem>
                <span className="label">Tổng chi phí:</span>
                <span className="value">
                  {calculateTotalExpenses().toLocaleString()} {form.getFieldValue('currency')}
                </span>
              </SummaryItem>
            </div>
          } 
          key="1"
        >
          <div className="mb-4">
            <Button 
              type="dashed" 
              onClick={addExpense} 
              icon={<PlusOutlined />}
              block
            >
              Thêm chi phí
            </Button>
          </div>
          
          <TableContainer>
            <EditableTable
              columns={expensesColumns}
              dataSource={expenses}
              rowKey="id"
              onChange={handleExpensesChange}
            />
          </TableContainer>
        </Panel>
      </StyledCollapse>

      <StyledCollapse defaultActiveKey={['1']} expandIconPosition="end">
        <Panel 
          header={
            <div className="flex justify-between items-center">
              <span>Lịch thanh toán</span>
              <SummaryItem>
                <span className="label">Tổng thanh toán:</span>
                <span className="value">
                  {calculateTotalPayments().toLocaleString()} {form.getFieldValue('currency')}
                </span>
              </SummaryItem>
            </div>
          } 
          key="1"
        >
          <div className="mb-4">
            <Button 
              type="dashed" 
              onClick={addPaymentSchedule} 
              icon={<PlusOutlined />}
              block
            >
              Thêm đợt thanh toán
            </Button>
          </div>
          
          <TableContainer>
            <EditableTable
              columns={paymentSchedulesColumns}
              dataSource={paymentSchedules}
              rowKey="id"
              onChange={handlePaymentSchedulesChange}
            />
          </TableContainer>
        </Panel>
      </StyledCollapse>
    </Form>
  );
};

export default FinancialInfoStep;
