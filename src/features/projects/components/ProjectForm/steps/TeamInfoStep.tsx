import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Collapse, Row, Col, Tag, Space } from 'antd';
import { PlusOutlined, UserOutlined, MailOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Project, StakeholderRole } from '../../../types/project.types';
import { STAKEHOLDER_ROLE } from '../../../constants/project.constants';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface TeamInfoStepProps {
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

const SkillTag = styled(Tag)`
  margin: 2px;
`;

const TeamInfoStep: React.FC<TeamInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  const [form] = Form.useForm();
  const [teamMembers, setTeamMembers] = useState(data.teamInfo?.teamMembers || []);
  const [stakeholders, setStakeholders] = useState(data.teamInfo?.stakeholders || []);
  const [resourceRequirements, setResourceRequirements] = useState(data.teamInfo?.resourceRequirements || []);
  
  // Set initial values
  useEffect(() => {
    form.setFieldsValue({
      projectManagerName: data.teamInfo?.projectManager.name || '',
      projectManagerEmail: data.teamInfo?.projectManager.email || '',
      projectManagerPhone: data.teamInfo?.projectManager.phone || '',
      projectManagerDepartment: data.teamInfo?.projectManager.department || '',
      projectManagerRole: data.teamInfo?.projectManager.role || ''
    });
    
    setTeamMembers(data.teamInfo?.teamMembers || []);
    setStakeholders(data.teamInfo?.stakeholders || []);
    setResourceRequirements(data.teamInfo?.resourceRequirements || []);
  }, [form, data]);

  // Handle form changes
  const handleValuesChange = (_: any, allValues: any) => {
    // Update data
    onChange({
      teamInfo: {
        ...data.teamInfo,
        projectManager: {
          id: data.teamInfo?.projectManager.id || `pm-${Date.now()}`,
          name: allValues.projectManagerName,
          email: allValues.projectManagerEmail,
          phone: allValues.projectManagerPhone,
          department: allValues.projectManagerDepartment,
          role: allValues.projectManagerRole
        },
        teamMembers,
        stakeholders,
        resourceRequirements
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

  // Handle team members changes
  const handleTeamMembersChange = (newData: any[]) => {
    setTeamMembers(newData);
    onChange({
      teamInfo: {
        ...data.teamInfo,
        teamMembers: newData
      }
    });
  };

  // Handle stakeholders changes
  const handleStakeholdersChange = (newData: any[]) => {
    setStakeholders(newData);
    onChange({
      teamInfo: {
        ...data.teamInfo,
        stakeholders: newData
      }
    });
  };

  // Handle resource requirements changes
  const handleResourceRequirementsChange = (newData: any[]) => {
    setResourceRequirements(newData);
    onChange({
      teamInfo: {
        ...data.teamInfo,
        resourceRequirements: newData
      }
    });
  };

  // Team members columns
  const teamMembersColumns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      editable: true,
      inputType: 'text',
      width: '10%',
    },
    {
      title: 'Phân bổ (%)',
      dataIndex: 'allocation',
      key: 'allocation',
      editable: true,
      inputType: 'number',
      width: '10%',
    },
    {
      title: 'Kỹ năng',
      dataIndex: 'skills',
      key: 'skills',
      editable: true,
      inputType: 'text',
      width: '15%',
      render: (skills: string[]) => (
        <div>
          {skills && skills.map(skill => (
            <SkillTag key={skill} color="blue">{skill}</SkillTag>
          ))}
        </div>
      ),
    },
  ];

  // Stakeholders columns
  const stakeholdersColumns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Tổ chức',
      dataIndex: 'organization',
      key: 'organization',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(STAKEHOLDER_ROLE).map(([key, value]) => ({
        label: {
          'SPONSOR': 'Nhà tài trợ',
          'MANAGER': 'Quản lý',
          'TEAM_MEMBER': 'Thành viên',
          'CLIENT': 'Khách hàng',
          'VENDOR': 'Nhà cung cấp',
          'ADVISOR': 'Cố vấn'
        }[key] || key,
        value
      })),
      render: (role: StakeholderRole) => {
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Ảnh hưởng',
      dataIndex: 'influence',
      key: 'influence',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: [
        { label: 'Thấp', value: 'low' },
        { label: 'Trung bình', value: 'medium' },
        { label: 'Cao', value: 'high' }
      ],
    },
    {
      title: 'Quan tâm',
      dataIndex: 'interest',
      key: 'interest',
      editable: true,
      inputType: 'select',
      width: '10%',
      options: [
        { label: 'Thấp', value: 'low' },
        { label: 'Trung bình', value: 'medium' },
        { label: 'Cao', value: 'high' }
      ],
    },
    {
      title: 'Tần suất liên lạc',
      dataIndex: 'communicationFrequency',
      key: 'communicationFrequency',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: [
        { label: 'Hàng ngày', value: 'daily' },
        { label: 'Hàng tuần', value: 'weekly' },
        { label: 'Hàng tháng', value: 'monthly' },
        { label: 'Hàng quý', value: 'quarterly' },
        { label: 'Khi cần', value: 'as_needed' }
      ],
      render: (frequency: string) => {
        const frequencyText = {
          'daily': 'Hàng ngày',
          'weekly': 'Hàng tuần',
          'monthly': 'Hàng tháng',
          'quarterly': 'Hàng quý',
          'as_needed': 'Khi cần'
        }[frequency] || frequency;
        
        return frequencyText;
      },
    },
  ];

  // Resource requirements columns
  const resourceRequirementsColumns = [
    {
      title: 'Loại nguồn lực',
      dataIndex: 'resourceType',
      key: 'resourceType',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      editable: true,
      inputType: 'number',
      width: '10%',
    },
    {
      title: 'Kỹ năng',
      dataIndex: 'skills',
      key: 'skills',
      editable: true,
      inputType: 'text',
      width: '20%',
      render: (skills: string[]) => (
        <div>
          {skills && skills.map(skill => (
            <SkillTag key={skill} color="blue">{skill}</SkillTag>
          ))}
        </div>
      ),
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      editable: true,
      inputType: 'date',
      width: '15%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
  ];

  // Add new team member
  const addTeamMember = () => {
    const newMember = {
      id: `tm-${Date.now()}`,
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      startDate: new Date().toISOString(),
      allocation: 100,
      skills: [],
      responsibilities: ''
    };
    
    const newData = [...teamMembers, newMember];
    setTeamMembers(newData);
    handleTeamMembersChange(newData);
  };

  // Add new stakeholder
  const addStakeholder = () => {
    const newStakeholder = {
      id: `sh-${Date.now()}`,
      name: '',
      organization: '',
      role: 'client',
      email: '',
      phone: '',
      influence: 'medium',
      interest: 'medium',
      expectations: '',
      communicationFrequency: 'monthly'
    };
    
    const newData = [...stakeholders, newStakeholder];
    setStakeholders(newData);
    handleStakeholdersChange(newData);
  };

  // Add new resource requirement
  const addResourceRequirement = () => {
    const newRequirement = {
      id: `rr-${Date.now()}`,
      resourceType: '',
      quantity: 1,
      skills: [],
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      notes: ''
    };
    
    const newData = [...resourceRequirements, newRequirement];
    setResourceRequirements(newData);
    handleResourceRequirementsChange(newData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      requiredMark="optional"
    >
      <AnimatedPanel header="Quản lý dự án">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              name="projectManagerName"
              label="Tên quản lý dự án"
              rules={[{ required: true, message: 'Vui lòng nhập tên quản lý dự án' }]}
            >
              <Input 
                placeholder="Nhập tên quản lý dự án" 
                prefix={<UserOutlined />} 
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              name="projectManagerEmail"
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
              name="projectManagerPhone"
              label="Điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input 
                placeholder="Nhập số điện thoại" 
                prefix={<PhoneOutlined />} 
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="projectManagerDepartment"
              label="Phòng ban"
              rules={[{ required: true, message: 'Vui lòng nhập phòng ban' }]}
            >
              <Input 
                placeholder="Nhập phòng ban" 
                prefix={<TeamOutlined />} 
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="projectManagerRole"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng nhập vai trò' }]}
            >
              <Input 
                placeholder="Nhập vai trò" 
              />
            </Form.Item>
          </Col>
        </Row>
      </AnimatedPanel>

      <AnimatedPanel header="Thành viên dự án">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addTeamMember} 
            icon={<PlusOutlined />}
            block
          >
            Thêm thành viên
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={teamMembersColumns}
            dataSource={teamMembers}
            rowKey="id"
            onChange={handleTeamMembersChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Các bên liên quan">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addStakeholder} 
            icon={<PlusOutlined />}
            block
          >
            Thêm bên liên quan
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={stakeholdersColumns}
            dataSource={stakeholders}
            rowKey="id"
            onChange={handleStakeholdersChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Yêu cầu nguồn lực">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addResourceRequirement} 
            icon={<PlusOutlined />}
            block
          >
            Thêm yêu cầu nguồn lực
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={resourceRequirementsColumns}
            dataSource={resourceRequirements}
            rowKey="id"
            onChange={handleResourceRequirementsChange}
          />
        </TableContainer>
      </AnimatedPanel>
    </Form>
  );
};

export default TeamInfoStep;
