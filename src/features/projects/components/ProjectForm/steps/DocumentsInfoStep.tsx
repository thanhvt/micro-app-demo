import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Upload, Tag, Checkbox, Space } from 'antd';
import { PlusOutlined, UploadOutlined, FileOutlined, FilePdfOutlined, FileWordOutlined, FileExcelOutlined, FileImageOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Project, DocumentType, ApprovalStatus } from '../../../types/project.types';
import { DOCUMENT_TYPE, APPROVAL_STATUS } from '../../../constants/project.constants';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';

const { TextArea } = Input;
const { Option } = Select;

interface DocumentsInfoStepProps {
  data: Partial<Project>;
  onChange: (data: Partial<Project>) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const TableContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  
  .ant-table-wrapper {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
`;

const ConfirmationContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
`;

const DocumentsInfoStep: React.FC<DocumentsInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  const [form] = Form.useForm();
  const [documents, setDocuments] = useState(data.documentsInfo?.documents || []);
  const [approvals, setApprovals] = useState(data.documentsInfo?.approvals || []);
  const [termsAccepted, setTermsAccepted] = useState(data.documentsInfo?.notes ? true : false);
  
  // Set initial values
  useEffect(() => {
    form.setFieldsValue({
      notes: data.documentsInfo?.notes || '',
      termsAccepted: termsAccepted
    });
    
    setDocuments(data.documentsInfo?.documents || []);
    setApprovals(data.documentsInfo?.approvals || []);
    
    // Validate form
    onValidationChange?.(true);
  }, [form, data, termsAccepted, onValidationChange]);

  // Handle form changes
  const handleValuesChange = (_: any, allValues: any) => {
    // Update data
    onChange({
      documentsInfo: {
        ...data.documentsInfo,
        documents,
        approvals,
        notes: allValues.notes
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

  // Handle documents changes
  const handleDocumentsChange = (newData: any[]) => {
    setDocuments(newData);
    onChange({
      documentsInfo: {
        ...data.documentsInfo,
        documents: newData,
        approvals,
        notes: form.getFieldValue('notes')
      }
    });
  };

  // Handle approvals changes
  const handleApprovalsChange = (newData: any[]) => {
    setApprovals(newData);
    onChange({
      documentsInfo: {
        ...data.documentsInfo,
        documents,
        approvals: newData,
        notes: form.getFieldValue('notes')
      }
    });
  };

  // Handle terms accepted change
  const handleTermsAcceptedChange = (e: any) => {
    setTermsAccepted(e.target.checked);
    
    if (e.target.checked) {
      // If terms are accepted, add confirmation data
      onChange({
        confirmation: {
          ...data.confirmation,
          termsAccepted: true,
          createdBy: 'Current User',
          createdAt: new Date().toISOString()
        }
      });
    } else {
      // If terms are not accepted, remove confirmation data
      onChange({
        confirmation: {
          ...data.confirmation,
          termsAccepted: false
        }
      });
    }
  };

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdfOutlined />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined />;
      case 'xls':
      case 'xlsx':
        return <FileExcelOutlined />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImageOutlined />;
      default:
        return <FileOutlined />;
    }
  };

  // Documents columns
  const documentsColumns = [
    {
      title: 'Tên tài liệu',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      inputType: 'text',
      width: '20%',
      render: (text: string, record: any) => (
        <Space>
          {getFileIcon(record.type)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(DOCUMENT_TYPE).map(([key, value]) => ({
        label: {
          'CONTRACT': 'Hợp đồng',
          'PROPOSAL': 'Đề xuất',
          'SPECIFICATION': 'Đặc tả',
          'REPORT': 'Báo cáo',
          'OTHER': 'Khác'
        }[key] || key,
        value
      })),
      render: (type: DocumentType) => {
        const typeText = {
          'contract': 'Hợp đồng',
          'proposal': 'Đề xuất',
          'specification': 'Đặc tả',
          'report': 'Báo cáo',
          'other': 'Khác'
        }[type] || type;
        
        return typeText;
      },
    },
    {
      title: 'Phiên bản',
      dataIndex: 'version',
      key: 'version',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Ngày tải lên',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Người tải lên',
      dataIndex: 'uploadedBy',
      key: 'uploadedBy',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: [
        { label: 'Nháp', value: 'draft' },
        { label: 'Đang xem xét', value: 'review' },
        { label: 'Đã phê duyệt', value: 'approved' },
        { label: 'Lỗi thời', value: 'obsolete' }
      ],
      render: (status: string) => {
        const statusText = {
          'draft': 'Nháp',
          'review': 'Đang xem xét',
          'approved': 'Đã phê duyệt',
          'obsolete': 'Lỗi thời'
        }[status] || status;
        
        const color = {
          'draft': 'default',
          'review': 'processing',
          'approved': 'success',
          'obsolete': 'warning'
        }[status] || 'default';
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
  ];

  // Approvals columns
  const approvalsColumns = [
    {
      title: 'Giai đoạn',
      dataIndex: 'stage',
      key: 'stage',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Người phê duyệt',
      dataIndex: 'approver',
      key: 'approver',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'dueDate',
      key: 'dueDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(APPROVAL_STATUS).map(([key, value]) => ({
        label: {
          'PENDING': 'Chờ phê duyệt',
          'APPROVED': 'Đã phê duyệt',
          'REJECTED': 'Đã từ chối',
          'CHANGES_REQUESTED': 'Yêu cầu thay đổi'
        }[key] || key,
        value
      })),
      render: (status: ApprovalStatus) => {
        const statusText = {
          'pending': 'Chờ phê duyệt',
          'approved': 'Đã phê duyệt',
          'rejected': 'Đã từ chối',
          'changes_requested': 'Yêu cầu thay đổi'
        }[status] || status;
        
        const color = {
          'pending': 'processing',
          'approved': 'success',
          'rejected': 'error',
          'changes_requested': 'warning'
        }[status] || 'default';
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Ngày phê duyệt',
      dataIndex: 'approvalDate',
      key: 'approvalDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'comments',
      key: 'comments',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
  ];

  // Add new document
  const addDocument = () => {
    const newDocument = {
      id: `doc-${Date.now()}`,
      name: '',
      type: 'other',
      version: '1.0',
      uploadDate: new Date().toISOString(),
      uploadedBy: 'Current User',
      description: '',
      url: '',
      size: 0,
      status: 'draft'
    };
    
    const newData = [...documents, newDocument];
    setDocuments(newData);
    handleDocumentsChange(newData);
  };

  // Add new approval
  const addApproval = () => {
    const newApproval = {
      id: `app-${Date.now()}`,
      stage: '',
      approver: '',
      role: '',
      dueDate: new Date().toISOString(),
      status: 'pending'
    };
    
    const newData = [...approvals, newApproval];
    setApprovals(newData);
    handleApprovalsChange(newData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      requiredMark="optional"
    >
      <AnimatedPanel header="Tài liệu dự án">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addDocument} 
            icon={<PlusOutlined />}
            block
          >
            Thêm tài liệu
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={documentsColumns}
            dataSource={documents}
            rowKey="id"
            onChange={handleDocumentsChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Phê duyệt">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addApproval} 
            icon={<PlusOutlined />}
            block
          >
            Thêm phê duyệt
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={approvalsColumns}
            dataSource={approvals}
            rowKey="id"
            onChange={handleApprovalsChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Ghi chú">
        <Form.Item
          name="notes"
          label="Ghi chú bổ sung"
        >
          <TextArea 
            rows={4} 
            placeholder="Nhập ghi chú bổ sung" 
            showCount 
            maxLength={1000} 
          />
        </Form.Item>
      </AnimatedPanel>

      <ConfirmationContainer>
        <Checkbox 
          checked={termsAccepted} 
          onChange={handleTermsAcceptedChange}
        >
          Tôi xác nhận rằng thông tin được cung cấp là chính xác và đầy đủ theo hiểu biết tốt nhất của tôi.
        </Checkbox>
      </ConfirmationContainer>
    </Form>
  );
};

export default DocumentsInfoStep;
