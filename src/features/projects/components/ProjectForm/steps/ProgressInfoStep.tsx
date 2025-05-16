import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Progress, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Project, MilestoneStatus, TaskStatus, ProjectPriority, RiskLevel } from '../../../types/project.types';
import { 
  MILESTONE_STATUS, 
  TASK_STATUS, 
  PROJECT_PRIORITY, 
  RISK_LEVEL,
  APPROVAL_STATUS
} from '../../../constants/project.constants';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';

const { TextArea } = Input;
const { Option } = Select;

interface ProgressInfoStepProps {
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

const ProgressInfoStep: React.FC<ProgressInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  const [form] = Form.useForm();
  const [milestones, setMilestones] = useState(data.progressInfo?.milestones || []);
  const [tasks, setTasks] = useState(data.progressInfo?.tasks || []);
  const [risks, setRisks] = useState(data.progressInfo?.risks || []);
  const [issues, setIssues] = useState(data.progressInfo?.issues || []);
  const [changes, setChanges] = useState(data.progressInfo?.changes || []);
  
  // Set initial values
  useEffect(() => {
    setMilestones(data.progressInfo?.milestones || []);
    setTasks(data.progressInfo?.tasks || []);
    setRisks(data.progressInfo?.risks || []);
    setIssues(data.progressInfo?.issues || []);
    setChanges(data.progressInfo?.changes || []);
    
    // Validate form
    onValidationChange?.(true);
  }, [data, onValidationChange]);

  // Handle milestones changes
  const handleMilestonesChange = (newData: any[]) => {
    setMilestones(newData);
    onChange({
      progressInfo: {
        ...data.progressInfo,
        milestones: newData,
        tasks,
        risks,
        issues,
        changes
      }
    });
  };

  // Handle tasks changes
  const handleTasksChange = (newData: any[]) => {
    setTasks(newData);
    onChange({
      progressInfo: {
        ...data.progressInfo,
        milestones,
        tasks: newData,
        risks,
        issues,
        changes
      }
    });
  };

  // Handle risks changes
  const handleRisksChange = (newData: any[]) => {
    setRisks(newData);
    onChange({
      progressInfo: {
        ...data.progressInfo,
        milestones,
        tasks,
        risks: newData,
        issues,
        changes
      }
    });
  };

  // Handle issues changes
  const handleIssuesChange = (newData: any[]) => {
    setIssues(newData);
    onChange({
      progressInfo: {
        ...data.progressInfo,
        milestones,
        tasks,
        risks,
        issues: newData,
        changes
      }
    });
  };

  // Handle changes changes
  const handleChangesChange = (newData: any[]) => {
    setChanges(newData);
    onChange({
      progressInfo: {
        ...data.progressInfo,
        milestones,
        tasks,
        risks,
        issues,
        changes: newData
      }
    });
  };

  // Milestones columns
  const milestonesColumns = [
    {
      title: 'Tên cột mốc',
      dataIndex: 'name',
      key: 'name',
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
      width: '25%',
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
      options: Object.entries(MILESTONE_STATUS).map(([key, value]) => ({
        label: {
          'NOT_STARTED': 'Chưa bắt đầu',
          'IN_PROGRESS': 'Đang thực hiện',
          'COMPLETED': 'Hoàn thành',
          'DELAYED': 'Bị trễ'
        }[key] || key,
        value
      })),
      render: (status: MilestoneStatus) => {
        const statusText = {
          'not_started': 'Chưa bắt đầu',
          'in_progress': 'Đang thực hiện',
          'completed': 'Hoàn thành',
          'delayed': 'Bị trễ'
        }[status] || status;
        
        const color = {
          'not_started': 'default',
          'in_progress': 'processing',
          'completed': 'success',
          'delayed': 'error'
        }[status] || 'default';
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Ngày hoàn thành',
      dataIndex: 'completionDate',
      key: 'completionDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Thành phẩm',
      dataIndex: 'deliverables',
      key: 'deliverables',
      editable: true,
      inputType: 'text',
      width: '10%',
      render: (deliverables: string[]) => (
        <div>
          {deliverables && deliverables.map(deliverable => (
            <Tag key={deliverable}>{deliverable}</Tag>
          ))}
        </div>
      ),
    },
  ];

  // Tasks columns
  const tasksColumns = [
    {
      title: 'Tên công việc',
      dataIndex: 'name',
      key: 'name',
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
      width: '20%',
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'assignee',
      key: 'assignee',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      editable: true,
      inputType: 'date',
      width: '10%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'dueDate',
      key: 'dueDate',
      editable: true,
      inputType: 'date',
      width: '10%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: Object.entries(TASK_STATUS).map(([key, value]) => ({
        label: {
          'NOT_STARTED': 'Chưa bắt đầu',
          'IN_PROGRESS': 'Đang thực hiện',
          'COMPLETED': 'Hoàn thành',
          'BLOCKED': 'Bị chặn'
        }[key] || key,
        value
      })),
      render: (status: TaskStatus) => {
        const statusText = {
          'not_started': 'Chưa bắt đầu',
          'in_progress': 'Đang thực hiện',
          'completed': 'Hoàn thành',
          'blocked': 'Bị chặn'
        }[status] || status;
        
        const color = {
          'not_started': 'default',
          'in_progress': 'processing',
          'completed': 'success',
          'blocked': 'error'
        }[status] || 'default';
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Tiến độ',
      dataIndex: 'completionPercentage',
      key: 'completionPercentage',
      editable: true,
      inputType: 'number',
      width: '10%',
      render: (percentage: number) => <Progress percent={percentage} size="small" />,
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: Object.entries(PROJECT_PRIORITY).map(([key, value]) => ({
        label: {
          'LOW': 'Thấp',
          'MEDIUM': 'Trung bình',
          'HIGH': 'Cao',
          'CRITICAL': 'Quan trọng'
        }[key] || key,
        value
      })),
      render: (priority: ProjectPriority) => {
        const priorityText = {
          'low': 'Thấp',
          'medium': 'Trung bình',
          'high': 'Cao',
          'critical': 'Quan trọng'
        }[priority] || priority;
        
        const color = {
          'low': 'success',
          'medium': 'processing',
          'high': 'warning',
          'critical': 'error'
        }[priority] || 'default';
        
        return <Tag color={color}>{priorityText}</Tag>;
      },
    },
  ];

  // Risks columns
  const risksColumns = [
    {
      title: 'Tên rủi ro',
      dataIndex: 'name',
      key: 'name',
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
      width: '20%',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
      key: 'level',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: Object.entries(RISK_LEVEL).map(([key, value]) => ({
        label: {
          'LOW': 'Thấp',
          'MEDIUM': 'Trung bình',
          'HIGH': 'Cao',
          'CRITICAL': 'Nghiêm trọng'
        }[key] || key,
        value
      })),
      render: (level: RiskLevel) => {
        const levelText = {
          'low': 'Thấp',
          'medium': 'Trung bình',
          'high': 'Cao',
          'critical': 'Nghiêm trọng'
        }[level] || level;
        
        const color = {
          'low': 'success',
          'medium': 'processing',
          'high': 'warning',
          'critical': 'error'
        }[level] || 'default';
        
        return <Tag color={color}>{levelText}</Tag>;
      },
    },
    {
      title: 'Kế hoạch giảm thiểu',
      dataIndex: 'mitigationPlan',
      key: 'mitigationPlan',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'owner',
      key: 'owner',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: [
        { label: 'Đang mở', value: 'open' },
        { label: 'Đã giảm thiểu', value: 'mitigated' },
        { label: 'Đã đóng', value: 'closed' },
        { label: 'Đã xảy ra', value: 'occurred' }
      ],
      render: (status: string) => {
        const statusText = {
          'open': 'Đang mở',
          'mitigated': 'Đã giảm thiểu',
          'closed': 'Đã đóng',
          'occurred': 'Đã xảy ra'
        }[status] || status;
        
        const color = {
          'open': 'processing',
          'mitigated': 'success',
          'closed': 'default',
          'occurred': 'error'
        }[status] || 'default';
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
  ];

  // Issues columns
  const issuesColumns = [
    {
      title: 'Tên vấn đề',
      dataIndex: 'name',
      key: 'name',
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
      width: '20%',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: Object.entries(PROJECT_PRIORITY).map(([key, value]) => ({
        label: {
          'LOW': 'Thấp',
          'MEDIUM': 'Trung bình',
          'HIGH': 'Cao',
          'CRITICAL': 'Quan trọng'
        }[key] || key,
        value
      })),
      render: (priority: ProjectPriority) => {
        const priorityText = {
          'low': 'Thấp',
          'medium': 'Trung bình',
          'high': 'Cao',
          'critical': 'Quan trọng'
        }[priority] || priority;
        
        const color = {
          'low': 'success',
          'medium': 'processing',
          'high': 'warning',
          'critical': 'error'
        }[priority] || 'default';
        
        return <Tag color={color}>{priorityText}</Tag>;
      },
    },
    {
      title: 'Người báo cáo',
      dataIndex: 'reportedBy',
      key: 'reportedBy',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Người xử lý',
      dataIndex: 'assignee',
      key: 'assignee',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: [
        { label: 'Đang mở', value: 'open' },
        { label: 'Đang xử lý', value: 'in_progress' },
        { label: 'Đã giải quyết', value: 'resolved' },
        { label: 'Đã đóng', value: 'closed' }
      ],
      render: (status: string) => {
        const statusText = {
          'open': 'Đang mở',
          'in_progress': 'Đang xử lý',
          'resolved': 'Đã giải quyết',
          'closed': 'Đã đóng'
        }[status] || status;
        
        const color = {
          'open': 'processing',
          'in_progress': 'warning',
          'resolved': 'success',
          'closed': 'default'
        }[status] || 'default';
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
  ];

  // Changes columns
  const changesColumns = [
    {
      title: 'Tên thay đổi',
      dataIndex: 'name',
      key: 'name',
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
      width: '20%',
    },
    {
      title: 'Người yêu cầu',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Ngày yêu cầu',
      dataIndex: 'requestedDate',
      key: 'requestedDate',
      editable: true,
      inputType: 'date',
      width: '10%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Ảnh hưởng',
      dataIndex: 'impact',
      key: 'impact',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: Object.entries(PROJECT_PRIORITY).map(([key, value]) => ({
        label: {
          'LOW': 'Thấp',
          'MEDIUM': 'Trung bình',
          'HIGH': 'Cao',
          'CRITICAL': 'Quan trọng'
        }[key] || key,
        value
      })),
      render: (priority: ProjectPriority) => {
        const priorityText = {
          'low': 'Thấp',
          'medium': 'Trung bình',
          'high': 'Cao',
          'critical': 'Quan trọng'
        }[priority] || priority;
        
        const color = {
          'low': 'success',
          'medium': 'processing',
          'high': 'warning',
          'critical': 'error'
        }[priority] || 'default';
        
        return <Tag color={color}>{priorityText}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: Object.entries(APPROVAL_STATUS).map(([key, value]) => ({
        label: {
          'PENDING': 'Chờ phê duyệt',
          'APPROVED': 'Đã phê duyệt',
          'REJECTED': 'Đã từ chối',
          'CHANGES_REQUESTED': 'Yêu cầu thay đổi'
        }[key] || key,
        value
      })),
      render: (status: string) => {
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
  ];

  // Add new milestone
  const addMilestone = () => {
    const newMilestone = {
      id: `ms-${Date.now()}`,
      name: '',
      description: '',
      dueDate: new Date().toISOString(),
      status: 'not_started',
      deliverables: []
    };
    
    const newData = [...milestones, newMilestone];
    setMilestones(newData);
    handleMilestonesChange(newData);
  };

  // Add new task
  const addTask = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: '',
      description: '',
      assignee: '',
      startDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      status: 'not_started',
      completionPercentage: 0,
      priority: 'medium',
      dependencies: [],
      notes: ''
    };
    
    const newData = [...tasks, newTask];
    setTasks(newData);
    handleTasksChange(newData);
  };

  // Add new risk
  const addRisk = () => {
    const newRisk = {
      id: `risk-${Date.now()}`,
      name: '',
      description: '',
      category: '',
      probability: 'medium',
      impact: 'medium',
      level: 'medium',
      mitigationPlan: '',
      contingencyPlan: '',
      owner: '',
      status: 'open'
    };
    
    const newData = [...risks, newRisk];
    setRisks(newData);
    handleRisksChange(newData);
  };

  // Add new issue
  const addIssue = () => {
    const newIssue = {
      id: `issue-${Date.now()}`,
      name: '',
      description: '',
      category: '',
      priority: 'medium',
      severity: 'medium',
      reportedDate: new Date().toISOString(),
      reportedBy: '',
      assignee: '',
      status: 'open'
    };
    
    const newData = [...issues, newIssue];
    setIssues(newData);
    handleIssuesChange(newData);
  };

  // Add new change
  const addChange = () => {
    const newChange = {
      id: `change-${Date.now()}`,
      name: '',
      description: '',
      requestedBy: '',
      requestedDate: new Date().toISOString(),
      impact: '',
      priority: 'medium',
      status: 'pending',
      notes: ''
    };
    
    const newData = [...changes, newChange];
    setChanges(newData);
    handleChangesChange(newData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark="optional"
    >
      <AnimatedPanel header="Cột mốc dự án">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addMilestone} 
            icon={<PlusOutlined />}
            block
          >
            Thêm cột mốc
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={milestonesColumns}
            dataSource={milestones}
            rowKey="id"
            onChange={handleMilestonesChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Công việc">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addTask} 
            icon={<PlusOutlined />}
            block
          >
            Thêm công việc
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={tasksColumns}
            dataSource={tasks}
            rowKey="id"
            onChange={handleTasksChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Rủi ro">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addRisk} 
            icon={<PlusOutlined />}
            block
          >
            Thêm rủi ro
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={risksColumns}
            dataSource={risks}
            rowKey="id"
            onChange={handleRisksChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Vấn đề">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addIssue} 
            icon={<PlusOutlined />}
            block
          >
            Thêm vấn đề
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={issuesColumns}
            dataSource={issues}
            rowKey="id"
            onChange={handleIssuesChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Thay đổi">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addChange} 
            icon={<PlusOutlined />}
            block
          >
            Thêm thay đổi
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={changesColumns}
            dataSource={changes}
            rowKey="id"
            onChange={handleChangesChange}
          />
        </TableContainer>
      </AnimatedPanel>
    </Form>
  );
};

export default ProgressInfoStep;
