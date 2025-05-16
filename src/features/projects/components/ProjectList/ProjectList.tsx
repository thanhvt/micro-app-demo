import React, { useState, useCallback } from 'react';
import { Table, Button, Tag, Tooltip, Space, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExportOutlined
} from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Project } from '../../types/project.types';
import { mockProjects } from '../../mock/project.mock';
import ProjectFilters from './ProjectFilters';
import {
  PROJECT_STATUS_COLORS,
  PROJECT_PRIORITY_COLORS,
  ANIMATION
} from '../../constants/project.constants';

const TableContainer = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

const ActionButton = styled(Button)`
  margin-right: 8px;
  
  &:last-child {
    margin-right: 0;
  }
`;

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle search and filtering
  const handleSearch = useCallback((values: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = [...projects];
      
      // Filter by keyword
      if (values.keyword) {
        const keyword = values.keyword.toLowerCase();
        filtered = filtered.filter(
          project =>
            project.basicInfo.projectCode.toLowerCase().includes(keyword) ||
            project.basicInfo.projectName.toLowerCase().includes(keyword) ||
            project.basicInfo.client.name.toLowerCase().includes(keyword)
        );
      }
      
      // Filter by status
      if (values.status) {
        filtered = filtered.filter(project => project.basicInfo.status === values.status);
      }
      
      // Filter by priority
      if (values.priority) {
        filtered = filtered.filter(project => project.basicInfo.priority === values.priority);
      }
      
      // Filter by type
      if (values.type) {
        filtered = filtered.filter(project => project.basicInfo.projectType === values.type);
      }
      
      // Filter by date range
      if (values.dateRange && values.dateRange[0] && values.dateRange[1]) {
        const startDate = values.dateRange[0].startOf('day').toISOString();
        const endDate = values.dateRange[1].endOf('day').toISOString();
        
        filtered = filtered.filter(
          project =>
            (project.basicInfo.startDate >= startDate && project.basicInfo.startDate <= endDate) ||
            (project.basicInfo.endDate >= startDate && project.basicInfo.endDate <= endDate)
        );
      }
      
      setFilteredProjects(filtered);
      setLoading(false);
    }, 500);
  }, [projects]);

  // Reset filters
  const handleReset = useCallback(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Delete project
  const handleDelete = useCallback((id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa dự án này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          const updatedProjects = projects.filter(project => project.id !== id);
          setProjects(updatedProjects);
          setFilteredProjects(updatedProjects);
          message.success('Xóa dự án thành công');
          setLoading(false);
        }, 500);
      }
    });
  }, [projects]);

  // Table columns
  const columns = [
    {
      title: 'Mã dự án',
      dataIndex: ['basicInfo', 'projectCode'],
      key: 'projectCode',
      render: (text: string, record: Project) => (
        <Link to={`/projects/${record.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
          {text}
        </Link>
      ),
    },
    {
      title: 'Tên dự án',
      dataIndex: ['basicInfo', 'projectName'],
      key: 'projectName',
      render: (text: string) => (
        <span className="font-medium">{text}</span>
      ),
    },
    {
      title: 'Khách hàng',
      dataIndex: ['basicInfo', 'client', 'name'],
      key: 'clientName',
    },
    {
      title: 'Trạng thái',
      dataIndex: ['basicInfo', 'status'],
      key: 'status',
      render: (status: string) => {
        const color = PROJECT_STATUS_COLORS[status] || 'default';
        const statusText = {
          'draft': 'Nháp',
          'planning': 'Lập kế hoạch',
          'in_progress': 'Đang thực hiện',
          'on_hold': 'Tạm dừng',
          'completed': 'Hoàn thành',
          'cancelled': 'Đã hủy'
        }[status] || status;
        
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: ['basicInfo', 'priority'],
      key: 'priority',
      render: (priority: string) => {
        const color = PROJECT_PRIORITY_COLORS[priority] || 'default';
        const priorityText = {
          'low': 'Thấp',
          'medium': 'Trung bình',
          'high': 'Cao',
          'critical': 'Quan trọng'
        }[priority] || priority;
        
        return <Tag color={color}>{priorityText}</Tag>;
      },
    },
    {
      title: 'Ngân sách',
      dataIndex: ['financialInfo', 'budget'],
      key: 'budget',
      render: (budget: number, record: Project) => (
        <span>
          {budget.toLocaleString()} {record.financialInfo.currency}
        </span>
      ),
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: ['basicInfo', 'startDate'],
      key: 'startDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: ['basicInfo', 'endDate'],
      key: 'endDate',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_: any, record: Project) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <ActionButton
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/projects/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <ActionButton
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/projects/edit/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <ActionButton
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="micro-app-container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="page-title">Quản lý dự án</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => navigate('/projects/new')}
        >
          Thêm dự án mới
        </Button>
      </div>

      <ProjectFilters onSearch={handleSearch} onReset={handleReset} />

      <TableContainer
        initial={ANIMATION.PAGE_TRANSITION.initial}
        animate={ANIMATION.PAGE_TRANSITION.animate}
        transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
      >
        <Table
          dataSource={filteredProjects}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} dự án`
          }}
          scroll={{ x: 1200 }}
        />
      </TableContainer>
    </div>
  );
};

export default ProjectList;
