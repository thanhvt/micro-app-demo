import React from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Contract } from '../../../types/contract.types';
import { APPROVAL_STATUS } from '../../../constants/contract.constants';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';

// Define props interface
interface AttachmentStepProps {
  data: Partial<Contract>;
  onChange: (values: any) => void;
}

// Styled components
const TableSection = styled(AnimatedPanel)`
  margin-top: 24px;
`;

// Main component
const AttachmentStep: React.FC<AttachmentStepProps> = (props) => {
  const { data, onChange } = props;
  const [form] = Form.useForm();

  // Handle notes changes
  const handleValuesChange = (_: any, allValues: any) => {
    if (allValues.attachments?.notes) {
      onChange({
        ...data,
        attachments: {
          ...data.attachments || {},
          notes: allValues.attachments.notes
        }
      });
    }
  };

  // Column definitions for appendix table
  const appendixColumns = [
    {
      title: 'Số phụ lục',
      dataIndex: 'number',
      key: 'number',
      editable: true,
      width: '120px',
    },
    {
      title: 'Ngày ký',
      dataIndex: 'date',
      key: 'date',
      editable: true,
      inputType: 'date',
      width: '150px',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
  ];

  // Column definitions for approval table
  const approvalColumns = [
    {
      title: 'Cấp phê duyệt',
      dataIndex: 'level',
      key: 'level',
      editable: true,
      inputType: 'number',
      width: '120px',
    },
    {
      title: 'Người phê duyệt',
      dataIndex: 'approver',
      key: 'approver',
      editable: true,
    },
    {
      title: 'Hạn phê duyệt',
      dataIndex: 'dueDate',
      key: 'dueDate',
      editable: true,
      inputType: 'date',
      width: '150px',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '150px',
      options: Object.entries(APPROVAL_STATUS).map(([key, value]) => ({
        label: key,
        value: value
      })),
    },
    {
      title: 'Nhận xét',
      dataIndex: 'comment',
      key: 'comment',
      editable: true,
    },
  ];

  // Handle appendix changes
  const handleAppendixChange = (appendices: any[]) => {
    onChange({
      ...data,
      attachments: {
        ...data.attachments || {},
        appendices
      }
    });
  };

  // Handle approval changes
  const handleApprovalChange = (approvals: any[]) => {
    onChange({
      ...data,
      attachments: {
        ...data.attachments || {},
        approvals
      }
    });
  };

  // Handle file upload
  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      const documents = [...(data.attachments?.documents || []), {
        id: info.file.uid,
        name: info.file.name,
        type: info.file.type,
        size: info.file.size,
        uploadDate: new Date().toISOString(),
        uploadedBy: 'Current User', // Should be replaced with actual user
        url: info.file.response?.url || ''
      }];

      onChange({
        ...data,
        attachments: {
          ...data.attachments || {},
          documents
        }
      });
    }
  };

  // Add a new appendix
  const addAppendix = () => {
    handleAppendixChange([
      ...(data.attachments?.appendices || []),
      {
        id: Date.now().toString(),
        number: `PL${(data.attachments?.appendices?.length || 0) + 1}`,
        date: new Date().toISOString(),
        description: ''
      }
    ]);
  };

  // Add a new approval
  const addApproval = () => {
    handleApprovalChange([
      ...(data.attachments?.approvals || []),
      {
        level: (data.attachments?.approvals?.length || 0) + 1,
        approver: '',
        dueDate: new Date().toISOString(),
        status: APPROVAL_STATUS.PENDING,
        comment: ''
      }
    ]);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onValuesChange={handleValuesChange}
    >
      <AnimatedPanel header="Tài liệu đính kèm">
        <Upload
          action="/api/upload"
          onChange={handleUpload}
          multiple
          listType="text"
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Tải lên tài liệu</Button>
        </Upload>
      </AnimatedPanel>

      <TableSection header="Phụ lục hợp đồng">
        <EditableTable
          columns={appendixColumns}
          dataSource={data.attachments?.appendices || []}
          rowKey="id"
          onChange={handleAppendixChange}
        />
        <Button
          type="dashed"
          onClick={addAppendix}
          style={{ marginTop: 16 }}
          icon={<PlusOutlined />}
        >
          Thêm phụ lục
        </Button>
      </TableSection>

      <TableSection header="Phê duyệt">
        <EditableTable
          columns={approvalColumns}
          dataSource={data.attachments?.approvals || []}
          rowKey="level"
          onChange={handleApprovalChange}
        />
        <Button
          type="dashed"
          onClick={addApproval}
          style={{ marginTop: 16 }}
          icon={<PlusOutlined />}
        >
          Thêm cấp phê duyệt
        </Button>
      </TableSection>

      <AnimatedPanel header="Ghi chú">
        <Form.Item name={["attachments", "notes"]}>
          <Input.TextArea
            rows={4}
            placeholder="Nhập ghi chú (nếu có)"
          />
        </Form.Item>
      </AnimatedPanel>
    </Form>
  );
};

export default AttachmentStep;
