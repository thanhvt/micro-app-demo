import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Row, Col, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { Project, TechnologyCategory, ProjectPriority } from '../../../types/project.types';
import { TECHNOLOGY_CATEGORY, PROJECT_PRIORITY } from '../../../constants/project.constants';
import EditableTable from '../../../../shared/components/EditableTable/EditableTable';
import AnimatedPanel from '../../../../shared/components/AnimatedPanel/AnimatedPanel';

const { TextArea } = Input;
const { Option } = Select;

interface TechnicalInfoStepProps {
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

const TechnicalInfoStep: React.FC<TechnicalInfoStepProps> = ({ data, onChange, onValidationChange }) => {
  const [form] = Form.useForm();
  const [technologies, setTechnologies] = useState(data.technicalInfo?.technologies || []);
  const [infrastructure, setInfrastructure] = useState(data.technicalInfo?.infrastructure || []);
  const [components, setComponents] = useState(data.technicalInfo?.architecture.components || []);
  const [integrations, setIntegrations] = useState(data.technicalInfo?.integrations || []);
  const [securityRequirements, setSecurityRequirements] = useState(data.technicalInfo?.securityRequirements || []);
  const [performanceRequirements, setPerformanceRequirements] = useState(data.technicalInfo?.performanceRequirements || []);
  
  // Set initial values
  useEffect(() => {
    form.setFieldsValue({
      architectureDescription: data.technicalInfo?.architecture.description || '',
      architectureDiagrams: data.technicalInfo?.architecture.diagrams?.join(', ') || ''
    });
    
    setTechnologies(data.technicalInfo?.technologies || []);
    setInfrastructure(data.technicalInfo?.infrastructure || []);
    setComponents(data.technicalInfo?.architecture.components || []);
    setIntegrations(data.technicalInfo?.integrations || []);
    setSecurityRequirements(data.technicalInfo?.securityRequirements || []);
    setPerformanceRequirements(data.technicalInfo?.performanceRequirements || []);
  }, [form, data]);

  // Handle form changes
  const handleValuesChange = (_: any, allValues: any) => {
    // Update data
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies,
        infrastructure,
        architecture: {
          description: allValues.architectureDescription,
          diagrams: allValues.architectureDiagrams.split(',').map((item: string) => item.trim()).filter(Boolean),
          components
        },
        integrations,
        securityRequirements,
        performanceRequirements
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

  // Handle technologies changes
  const handleTechnologiesChange = (newData: any[]) => {
    setTechnologies(newData);
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies: newData,
        infrastructure,
        architecture: data.technicalInfo?.architecture || { description: '', diagrams: [], components },
        integrations,
        securityRequirements,
        performanceRequirements
      }
    });
  };

  // Handle infrastructure changes
  const handleInfrastructureChange = (newData: any[]) => {
    setInfrastructure(newData);
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies,
        infrastructure: newData,
        architecture: data.technicalInfo?.architecture || { description: '', diagrams: [], components },
        integrations,
        securityRequirements,
        performanceRequirements
      }
    });
  };

  // Handle components changes
  const handleComponentsChange = (newData: any[]) => {
    setComponents(newData);
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies,
        infrastructure,
        architecture: {
          ...data.technicalInfo?.architecture,
          components: newData
        },
        integrations,
        securityRequirements,
        performanceRequirements
      }
    });
  };

  // Handle integrations changes
  const handleIntegrationsChange = (newData: any[]) => {
    setIntegrations(newData);
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies,
        infrastructure,
        architecture: data.technicalInfo?.architecture || { description: '', diagrams: [], components },
        integrations: newData,
        securityRequirements,
        performanceRequirements
      }
    });
  };

  // Handle security requirements changes
  const handleSecurityRequirementsChange = (newData: any[]) => {
    setSecurityRequirements(newData);
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies,
        infrastructure,
        architecture: data.technicalInfo?.architecture || { description: '', diagrams: [], components },
        integrations,
        securityRequirements: newData,
        performanceRequirements
      }
    });
  };

  // Handle performance requirements changes
  const handlePerformanceRequirementsChange = (newData: any[]) => {
    setPerformanceRequirements(newData);
    onChange({
      technicalInfo: {
        ...data.technicalInfo,
        technologies,
        infrastructure,
        architecture: data.technicalInfo?.architecture || { description: '', diagrams: [], components },
        integrations,
        securityRequirements,
        performanceRequirements: newData
      }
    });
  };

  // Technologies columns
  const technologiesColumns = [
    {
      title: 'Tên công nghệ',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      editable: true,
      inputType: 'select',
      width: '15%',
      options: Object.entries(TECHNOLOGY_CATEGORY).map(([key, value]) => ({
        label: {
          'FRONTEND': 'Frontend',
          'BACKEND': 'Backend',
          'DATABASE': 'Database',
          'INFRASTRUCTURE': 'Hạ tầng',
          'MOBILE': 'Mobile',
          'DESKTOP': 'Desktop',
          'OTHER': 'Khác'
        }[key] || key,
        value
      })),
      render: (category: TechnologyCategory) => {
        const categoryText = {
          'frontend': 'Frontend',
          'backend': 'Backend',
          'database': 'Database',
          'infrastructure': 'Hạ tầng',
          'mobile': 'Mobile',
          'desktop': 'Desktop',
          'other': 'Khác'
        }[category] || category;
        
        return categoryText;
      },
    },
    {
      title: 'Phiên bản',
      dataIndex: 'version',
      key: 'version',
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
      width: '25%',
    },
    {
      title: 'Mục đích sử dụng',
      dataIndex: 'purpose',
      key: 'purpose',
      editable: true,
      inputType: 'text',
      width: '25%',
    },
  ];

  // Infrastructure columns
  const infrastructureColumns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'provider',
      key: 'provider',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Thông số kỹ thuật',
      dataIndex: 'specifications',
      key: 'specifications',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
    {
      title: 'Chi phí',
      dataIndex: 'cost',
      key: 'cost',
      editable: true,
      inputType: 'number',
      width: '10%',
      render: (cost: number) => cost?.toLocaleString() || 0,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      editable: true,
      inputType: 'date',
      width: '12.5%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      editable: true,
      inputType: 'date',
      width: '12.5%',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
  ];

  // Components columns
  const componentsColumns = [
    {
      title: 'Tên thành phần',
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
      width: '40%',
    },
    {
      title: 'Phụ thuộc',
      dataIndex: 'dependencies',
      key: 'dependencies',
      editable: true,
      inputType: 'text',
      width: '40%',
      render: (dependencies: string[]) => (
        <div>
          {dependencies && dependencies.map(dep => (
            <Tag key={dep} color="blue">{dep}</Tag>
          ))}
        </div>
      ),
    },
  ];

  // Integrations columns
  const integrationsColumns = [
    {
      title: 'Hệ thống',
      dataIndex: 'system',
      key: 'system',
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
      title: 'Phương thức tích hợp',
      dataIndex: 'integrationMethod',
      key: 'integrationMethod',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
    {
      title: 'Luồng dữ liệu',
      dataIndex: 'dataFlow',
      key: 'dataFlow',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      inputType: 'text',
      width: '15%',
    },
  ];

  // Security requirements columns
  const securityRequirementsColumns = [
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
      width: '40%',
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      editable: true,
      inputType: 'select',
      width: '20%',
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
        
        return priorityText;
      },
    },
    {
      title: 'Trạng thái triển khai',
      dataIndex: 'implementationStatus',
      key: 'implementationStatus',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
  ];

  // Performance requirements columns
  const performanceRequirementsColumns = [
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
      width: '40%',
    },
    {
      title: 'Chỉ số đo lường',
      dataIndex: 'metrics',
      key: 'metrics',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
    {
      title: 'Giá trị mục tiêu',
      dataIndex: 'targetValues',
      key: 'targetValues',
      editable: true,
      inputType: 'text',
      width: '20%',
    },
  ];

  // Add new technology
  const addTechnology = () => {
    const newTechnology = {
      id: `tech-${Date.now()}`,
      name: '',
      category: 'frontend',
      version: '',
      description: '',
      purpose: ''
    };
    
    const newData = [...technologies, newTechnology];
    setTechnologies(newData);
    handleTechnologiesChange(newData);
  };

  // Add new infrastructure
  const addInfrastructure = () => {
    const newInfrastructure = {
      id: `infra-${Date.now()}`,
      name: '',
      type: '',
      provider: '',
      specifications: '',
      cost: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    };
    
    const newData = [...infrastructure, newInfrastructure];
    setInfrastructure(newData);
    handleInfrastructureChange(newData);
  };

  // Add new component
  const addComponent = () => {
    const newComponent = {
      id: `comp-${Date.now()}`,
      name: '',
      description: '',
      dependencies: []
    };
    
    const newData = [...components, newComponent];
    setComponents(newData);
    handleComponentsChange(newData);
  };

  // Add new integration
  const addIntegration = () => {
    const newIntegration = {
      id: `int-${Date.now()}`,
      system: '',
      description: '',
      integrationMethod: '',
      dataFlow: '',
      status: ''
    };
    
    const newData = [...integrations, newIntegration];
    setIntegrations(newData);
    handleIntegrationsChange(newData);
  };

  // Add new security requirement
  const addSecurityRequirement = () => {
    const newRequirement = {
      id: `sec-${Date.now()}`,
      category: '',
      description: '',
      priority: 'medium',
      implementationStatus: ''
    };
    
    const newData = [...securityRequirements, newRequirement];
    setSecurityRequirements(newData);
    handleSecurityRequirementsChange(newData);
  };

  // Add new performance requirement
  const addPerformanceRequirement = () => {
    const newRequirement = {
      id: `perf-${Date.now()}`,
      category: '',
      description: '',
      metrics: '',
      targetValues: ''
    };
    
    const newData = [...performanceRequirements, newRequirement];
    setPerformanceRequirements(newData);
    handlePerformanceRequirementsChange(newData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      requiredMark="optional"
    >
      <AnimatedPanel header="Công nghệ">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addTechnology} 
            icon={<PlusOutlined />}
            block
          >
            Thêm công nghệ
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={technologiesColumns}
            dataSource={technologies}
            rowKey="id"
            onChange={handleTechnologiesChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Hạ tầng">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addInfrastructure} 
            icon={<PlusOutlined />}
            block
          >
            Thêm hạ tầng
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={infrastructureColumns}
            dataSource={infrastructure}
            rowKey="id"
            onChange={handleInfrastructureChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Kiến trúc">
        <Form.Item
          name="architectureDescription"
          label="Mô tả kiến trúc"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả kiến trúc' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Nhập mô tả kiến trúc" 
            showCount 
            maxLength={1000} 
          />
        </Form.Item>

        <Form.Item
          name="architectureDiagrams"
          label="Sơ đồ kiến trúc"
          tooltip="Nhập tên các file sơ đồ, phân cách bằng dấu phẩy"
        >
          <Input 
            placeholder="Ví dụ: architecture-diagram.png, data-flow.png" 
          />
        </Form.Item>

        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addComponent} 
            icon={<PlusOutlined />}
            block
          >
            Thêm thành phần
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={componentsColumns}
            dataSource={components}
            rowKey="id"
            onChange={handleComponentsChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Tích hợp">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addIntegration} 
            icon={<PlusOutlined />}
            block
          >
            Thêm tích hợp
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={integrationsColumns}
            dataSource={integrations}
            rowKey="id"
            onChange={handleIntegrationsChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Yêu cầu bảo mật">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addSecurityRequirement} 
            icon={<PlusOutlined />}
            block
          >
            Thêm yêu cầu bảo mật
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={securityRequirementsColumns}
            dataSource={securityRequirements}
            rowKey="id"
            onChange={handleSecurityRequirementsChange}
          />
        </TableContainer>
      </AnimatedPanel>

      <AnimatedPanel header="Yêu cầu hiệu năng">
        <div className="mb-4">
          <Button 
            type="dashed" 
            onClick={addPerformanceRequirement} 
            icon={<PlusOutlined />}
            block
          >
            Thêm yêu cầu hiệu năng
          </Button>
        </div>
        
        <TableContainer>
          <EditableTable
            columns={performanceRequirementsColumns}
            dataSource={performanceRequirements}
            rowKey="id"
            onChange={handlePerformanceRequirementsChange}
          />
        </TableContainer>
      </AnimatedPanel>
    </Form>
  );
};

export default TechnicalInfoStep;
