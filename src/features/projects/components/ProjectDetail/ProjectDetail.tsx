import React, { useState } from 'react';
import { Tabs, Card, Descriptions, Button, Tag, Table, Space, Typography, Progress, Timeline, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  EditOutlined, 
  ArrowLeftOutlined, 
  TeamOutlined, 
  DollarOutlined, 
  BarChartOutlined, 
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { Project } from '../../types/project.types';
import { 
  PROJECT_STATUS_COLORS, 
  PROJECT_PRIORITY_COLORS,
  TASK_STATUS_COLORS,
  RISK_LEVEL_COLORS,
  ANIMATION
} from '../../constants/project.constants';

const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

interface ProjectDetailProps {
  project: Project;
}

const DetailContainer = styled(motion.div)`
  margin-bottom: 24px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 16px;
  }
`;

const StatusTag = styled(Tag)`
  font-weight: 500;
`;

const SectionTitle = styled(Title)`
  font-size: 16px !important;
  margin-bottom: 16px !important;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
  
  .label {
    font-weight: 500;
    margin-right: 8px;
    color: #666;
  }
  
  .value {
    color: #333;
  }
`;

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('1');

  // Format status and priority tags
  const renderStatus = (status: string) => {
    const color = PROJECT_STATUS_COLORS[status] || 'default';
    const statusText = {
      'draft': 'Nháp',
      'planning': 'Lập kế hoạch',
      'in_progress': 'Đang thực hiện',
      'on_hold': 'Tạm dừng',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy'
    }[status] || status;
    
    return <StatusTag color={color}>{statusText}</StatusTag>;
  };
  
  const renderPriority = (priority: string) => {
    const color = PROJECT_PRIORITY_COLORS[priority] || 'default';
    const priorityText = {
      'low': 'Thấp',
      'medium': 'Trung bình',
      'high': 'Cao',
      'critical': 'Quan trọng'
    }[priority] || priority;
    
    return <StatusTag color={color}>{priorityText}</StatusTag>;
  };

  // Calculate project progress
  const calculateProgress = () => {
    const completedTasks = project.progressInfo.tasks.filter(task => task.status === 'completed').length;
    const totalTasks = project.progressInfo.tasks.length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  // Task status icon
  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'not_started':
        return <ClockCircleOutlined style={{ color: '#8c8c8c' }} />;
      case 'in_progress':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'blocked':
        return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  // Risk level icon
  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'low':
        return <InfoCircleOutlined style={{ color: '#52c41a' }} />;
      case 'medium':
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
      case 'high':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'critical':
        return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  // Task columns for table
  const taskColumns = [
    {
      title: 'Tên công việc',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {getTaskStatusIcon(record.status)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = TASK_STATUS_COLORS[status] || 'default';
        const statusText = {
          'not_started': 'Chưa bắt đầu',
          'in_progress': 'Đang thực hiện',
          'completed': 'Hoàn thành',
          'blocked': 'Bị chặn'
        }[status] || status;
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Tiến độ',
      dataIndex: 'completionPercentage',
      key: 'completionPercentage',
      render: (percentage: number) => <Progress percent={percentage} size="small" />,
    },
    {
      title: 'Hạn hoàn thành',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  // Risk columns for table
  const riskColumns = [
    {
      title: 'Rủi ro',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {getRiskLevelIcon(record.level)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        const color = RISK_LEVEL_COLORS[level] || 'default';
        const levelText = {
          'low': 'Thấp',
          'medium': 'Trung bình',
          'high': 'Cao',
          'critical': 'Nghiêm trọng'
        }[level] || level;
        
        return <Tag color={color}>{levelText}</Tag>;
      },
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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

  return (
    <DetailContainer
      initial={ANIMATION.PAGE_TRANSITION.initial}
      animate={ANIMATION.PAGE_TRANSITION.animate}
      transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
    >
      <div className="flex justify-between items-center mb-4">
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/projects')}
          >
            Quay lại
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            {project.basicInfo.projectName}
          </Title>
          {renderStatus(project.basicInfo.status)}
          {renderPriority(project.basicInfo.priority)}
        </Space>
        
        <Button 
          type="primary" 
          icon={<EditOutlined />}
          onClick={() => navigate(`/projects/edit/${project.id}`)}
        >
          Chỉnh sửa
        </Button>
      </div>

      <StyledCard>
        <Descriptions title="Thông tin cơ bản" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Mã dự án">{project.basicInfo.projectCode}</Descriptions.Item>
          <Descriptions.Item label="Loại dự án">
            {
              {
                'software': 'Phần mềm',
                'hardware': 'Phần cứng',
                'service': 'Dịch vụ',
                'research': 'Nghiên cứu',
                'infrastructure': 'Hạ tầng',
                'other': 'Khác'
              }[project.basicInfo.projectType] || project.basicInfo.projectType
            }
          </Descriptions.Item>
          <Descriptions.Item label="Danh mục">
            {
              {
                'internal': 'Nội bộ',
                'external': 'Bên ngoài',
                'client': 'Khách hàng',
                'vendor': 'Nhà cung cấp',
                'partnership': 'Đối tác'
              }[project.basicInfo.projectCategory] || project.basicInfo.projectCategory
            }
          </Descriptions.Item>
          <Descriptions.Item label="Quy mô">
            {
              {
                'small': 'Nhỏ',
                'medium': 'Trung bình',
                'large': 'Lớn',
                'enterprise': 'Doanh nghiệp'
              }[project.basicInfo.projectSize] || project.basicInfo.projectSize
            }
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">{dayjs(project.basicInfo.startDate).format('DD/MM/YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">{dayjs(project.basicInfo.endDate).format('DD/MM/YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Khách hàng">{project.basicInfo.client.name}</Descriptions.Item>
          <Descriptions.Item label="Người liên hệ">{project.basicInfo.client.contactPerson}</Descriptions.Item>
          <Descriptions.Item label="Tiến độ" span={2}>
            <Progress percent={calculateProgress()} status="active" />
          </Descriptions.Item>
        </Descriptions>
      </StyledCard>

      <StyledTabs defaultActiveKey="1" onChange={setActiveTab}>
        <TabPane 
          tab={<span><InfoCircleOutlined />Tổng quan</span>} 
          key="1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledCard title="Mô tả dự án">
              <Paragraph>{project.basicInfo.description}</Paragraph>
              
              <SectionTitle level={5}>Mục tiêu</SectionTitle>
              <Paragraph>{project.basicInfo.objectives}</Paragraph>
              
              <SectionTitle level={5}>Phạm vi</SectionTitle>
              <Paragraph>{project.basicInfo.scope}</Paragraph>
              
              <SectionTitle level={5}>Ràng buộc</SectionTitle>
              <Paragraph>{project.basicInfo.constraints}</Paragraph>
              
              <SectionTitle level={5}>Giả định</SectionTitle>
              <Paragraph>{project.basicInfo.assumptions}</Paragraph>
            </StyledCard>
            
            <StyledCard title="Thông tin khách hàng">
              <InfoItem>
                <span className="label">Tên công ty:</span>
                <span className="value">{project.basicInfo.client.name}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Người liên hệ:</span>
                <span className="value">{project.basicInfo.client.contactPerson}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Email:</span>
                <span className="value">{project.basicInfo.client.email}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Điện thoại:</span>
                <span className="value">{project.basicInfo.client.phone}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Địa chỉ:</span>
                <span className="value">{project.basicInfo.client.address}</span>
              </InfoItem>
            </StyledCard>
          </div>
        </TabPane>
        
        <TabPane 
          tab={<span><TeamOutlined />Nhân sự</span>} 
          key="2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StyledCard title="Quản lý dự án">
              <InfoItem>
                <span className="label">Tên:</span>
                <span className="value">{project.teamInfo.projectManager.name}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Email:</span>
                <span className="value">{project.teamInfo.projectManager.email}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Điện thoại:</span>
                <span className="value">{project.teamInfo.projectManager.phone}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Phòng ban:</span>
                <span className="value">{project.teamInfo.projectManager.department}</span>
              </InfoItem>
              <InfoItem>
                <span className="label">Vai trò:</span>
                <span className="value">{project.teamInfo.projectManager.role}</span>
              </InfoItem>
            </StyledCard>
            
            <StyledCard title="Thành viên dự án" style={{ gridColumn: 'span 2' }}>
              <Table
                dataSource={project.teamInfo.teamMembers}
                rowKey="id"
                pagination={false}
                size="small"
                columns={[
                  {
                    title: 'Tên',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Vai trò',
                    dataIndex: 'role',
                    key: 'role',
                  },
                  {
                    title: 'Phòng ban',
                    dataIndex: 'department',
                    key: 'department',
                  },
                  {
                    title: 'Phân bổ',
                    dataIndex: 'allocation',
                    key: 'allocation',
                    render: (allocation: number) => `${allocation}%`,
                  },
                ]}
              />
            </StyledCard>
          </div>
          
          <StyledCard title="Các bên liên quan" className="mt-4">
            <Table
              dataSource={project.teamInfo.stakeholders}
              rowKey="id"
              pagination={false}
              columns={[
                {
                  title: 'Tên',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Tổ chức',
                  dataIndex: 'organization',
                  key: 'organization',
                },
                {
                  title: 'Vai trò',
                  dataIndex: 'role',
                  key: 'role',
                  render: (role: string) => {
                    const roleText = {
                      'sponsor': 'Nhà tài trợ',
                      'manager': 'Quản lý',
                      'team_member': 'Thành viên',
                      'client': 'Khách hàng',
                      'vendor': 'Nhà cung cấp',
                      'advisor': 'Cố vấn'
                    }[role] || role;
                    
                    return roleText;
                  },
                },
                {
                  title: 'Ảnh hưởng',
                  dataIndex: 'influence',
                  key: 'influence',
                  render: (influence: string) => {
                    const color = {
                      'low': 'green',
                      'medium': 'blue',
                      'high': 'orange'
                    }[influence] || 'default';
                    
                    const text = {
                      'low': 'Thấp',
                      'medium': 'Trung bình',
                      'high': 'Cao'
                    }[influence] || influence;
                    
                    return <Tag color={color}>{text}</Tag>;
                  },
                },
                {
                  title: 'Quan tâm',
                  dataIndex: 'interest',
                  key: 'interest',
                  render: (interest: string) => {
                    const color = {
                      'low': 'green',
                      'medium': 'blue',
                      'high': 'orange'
                    }[interest] || 'default';
                    
                    const text = {
                      'low': 'Thấp',
                      'medium': 'Trung bình',
                      'high': 'Cao'
                    }[interest] || interest;
                    
                    return <Tag color={color}>{text}</Tag>;
                  },
                },
              ]}
            />
          </StyledCard>
        </TabPane>
        
        <TabPane 
          tab={<span><DollarOutlined />Tài chính</span>} 
          key="3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledCard title="Tổng quan tài chính">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Ngân sách">
                  {project.financialInfo.budget.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
                <Descriptions.Item label="Chi phí thực tế">
                  {project.financialInfo.actualCost.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
                <Descriptions.Item label="Chi phí ước tính">
                  {project.financialInfo.estimatedCost.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
                <Descriptions.Item label="Chênh lệch chi phí">
                  {project.financialInfo.costVariance.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
                <Descriptions.Item label="Dự phòng rủi ro">
                  {project.financialInfo.contingencyReserve.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
                <Descriptions.Item label="Dự phòng quản lý">
                  {project.financialInfo.managementReserve.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
              </Descriptions>
            </StyledCard>
            
            <StyledCard title="Chỉ số tài chính">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="ROI (Lợi nhuận đầu tư)">
                  {(project.financialInfo.roi * 100).toFixed(2)}%
                </Descriptions.Item>
                <Descriptions.Item label="NPV (Giá trị hiện tại ròng)">
                  {project.financialInfo.npv.toLocaleString()} {project.financialInfo.currency}
                </Descriptions.Item>
                <Descriptions.Item label="IRR (Tỷ suất hoàn vốn nội bộ)">
                  {(project.financialInfo.irr * 100).toFixed(2)}%
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian hoàn vốn">
                  {project.financialInfo.paybackPeriod} tháng
                </Descriptions.Item>
                {project.financialInfo.exchangeRate && (
                  <Descriptions.Item label="Tỷ giá">
                    {project.financialInfo.exchangeRate.toLocaleString()}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </StyledCard>
          </div>
          
          <StyledCard title="Lịch thanh toán" className="mt-4">
            <Table
              dataSource={project.financialInfo.paymentSchedules}
              rowKey="id"
              pagination={false}
              columns={[
                {
                  title: 'Đợt',
                  dataIndex: 'installment',
                  key: 'installment',
                },
                {
                  title: 'Ngày đến hạn',
                  dataIndex: 'dueDate',
                  key: 'dueDate',
                  render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
                },
                {
                  title: 'Số tiền',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (amount: number) => `${amount.toLocaleString()} ${project.financialInfo.currency}`,
                },
                {
                  title: 'Phương thức',
                  dataIndex: 'method',
                  key: 'method',
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
                  render: (status: string) => {
                    const statusText = {
                      'pending': 'Chờ thanh toán',
                      'paid': 'Đã thanh toán',
                      'overdue': 'Quá hạn',
                      'cancelled': 'Đã hủy'
                    }[status] || status;
                    
                    const color = {
                      'pending': 'processing',
                      'paid': 'success',
                      'overdue': 'error',
                      'cancelled': 'default'
                    }[status] || 'default';
                    
                    return <Tag color={color}>{statusText}</Tag>;
                  },
                },
              ]}
            />
          </StyledCard>
        </TabPane>
        
        <TabPane 
          tab={<span><BarChartOutlined />Tiến độ</span>} 
          key="4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledCard title="Cột mốc dự án">
              <Timeline mode="left">
                {project.progressInfo.milestones.map(milestone => (
                  <Timeline.Item 
                    key={milestone.id}
                    color={
                      milestone.status === 'completed' ? 'green' :
                      milestone.status === 'in_progress' ? 'blue' :
                      milestone.status === 'delayed' ? 'red' : 'gray'
                    }
                    label={dayjs(milestone.dueDate).format('DD/MM/YYYY')}
                  >
                    <div>
                      <Text strong>{milestone.name}</Text>
                      <div>
                        <Tag color={
                          milestone.status === 'completed' ? 'success' :
                          milestone.status === 'in_progress' ? 'processing' :
                          milestone.status === 'delayed' ? 'error' : 'default'
                        }>
                          {
                            {
                              'not_started': 'Chưa bắt đầu',
                              'in_progress': 'Đang thực hiện',
                              'completed': 'Hoàn thành',
                              'delayed': 'Bị trễ'
                            }[milestone.status] || milestone.status
                          }
                        </Tag>
                      </div>
                      <Text type="secondary">{milestone.description}</Text>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </StyledCard>
            
            <StyledCard title="Rủi ro">
              <Table
                dataSource={project.progressInfo.risks}
                rowKey="id"
                pagination={false}
                size="small"
                columns={riskColumns}
              />
            </StyledCard>
          </div>
          
          <StyledCard title="Công việc" className="mt-4">
            <Table
              dataSource={project.progressInfo.tasks}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              columns={taskColumns}
            />
          </StyledCard>
        </TabPane>
        
        <TabPane 
          tab={<span><FileTextOutlined />Tài liệu</span>} 
          key="5"
        >
          <StyledCard title="Tài liệu dự án">
            <Table
              dataSource={project.documentsInfo.documents}
              rowKey="id"
              pagination={false}
              columns={[
                {
                  title: 'Tên tài liệu',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text: string, record: any) => (
                    <a href={record.url} target="_blank" rel="noopener noreferrer">
                      {text}
                    </a>
                  ),
                },
                {
                  title: 'Loại',
                  dataIndex: 'type',
                  key: 'type',
                  render: (type: string) => {
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
                },
                {
                  title: 'Ngày tải lên',
                  dataIndex: 'uploadDate',
                  key: 'uploadDate',
                  render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
                },
                {
                  title: 'Người tải lên',
                  dataIndex: 'uploadedBy',
                  key: 'uploadedBy',
                },
                {
                  title: 'Trạng thái',
                  dataIndex: 'status',
                  key: 'status',
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
              ]}
            />
          </StyledCard>
        </TabPane>
      </StyledTabs>
    </DetailContainer>
  );
};

export default ProjectDetail;
