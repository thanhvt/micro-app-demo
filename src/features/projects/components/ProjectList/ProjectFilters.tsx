import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Space, Collapse } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PROJECT_STATUS, 
  PROJECT_PRIORITY, 
  PROJECT_TYPE, 
  PROJECT_CATEGORY,
  ANIMATION
} from '../../constants/project.constants';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

interface ProjectFiltersProps {
  onSearch: (values: any) => void;
  onReset: () => void;
}

const FilterContainer = styled(motion.div)`
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  margin-bottom: 24px;
`;

const AdvancedFiltersContainer = styled(motion.div)`
  margin-top: 16px;
`;

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onSearch, onReset }) => {
  const [form] = Form.useForm();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <FilterContainer
      initial={ANIMATION.PAGE_TRANSITION.initial}
      animate={ANIMATION.PAGE_TRANSITION.animate}
      transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE, delay: 0.1 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSearch}
        initialValues={{}}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Form.Item name="keyword" label="Tìm kiếm">
            <Input
              placeholder="Mã dự án, tên dự án, khách hàng..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Select
              placeholder="Chọn trạng thái"
              allowClear
              options={Object.entries(PROJECT_STATUS).map(([key, value]) => ({
                label: {
                  'DRAFT': 'Nháp',
                  'PLANNING': 'Lập kế hoạch',
                  'IN_PROGRESS': 'Đang thực hiện',
                  'ON_HOLD': 'Tạm dừng',
                  'COMPLETED': 'Hoàn thành',
                  'CANCELLED': 'Đã hủy'
                }[key] || key,
                value: value
              }))}
            />
          </Form.Item>

          <Form.Item name="priority" label="Độ ưu tiên">
            <Select
              placeholder="Chọn độ ưu tiên"
              allowClear
              options={Object.entries(PROJECT_PRIORITY).map(([key, value]) => ({
                label: {
                  'LOW': 'Thấp',
                  'MEDIUM': 'Trung bình',
                  'HIGH': 'Cao',
                  'CRITICAL': 'Quan trọng'
                }[key] || key,
                value: value
              }))}
            />
          </Form.Item>

          <Form.Item name="dateRange" label="Khoảng thời gian">
            <RangePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder={['Từ ngày', 'Đến ngày']}
            />
          </Form.Item>
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="link"
            onClick={toggleAdvanced}
            icon={showAdvanced ? <UpOutlined /> : <DownOutlined />}
          >
            {showAdvanced ? 'Ẩn bộ lọc nâng cao' : 'Hiện bộ lọc nâng cao'}
          </Button>

          <Space>
            <Button onClick={handleReset} icon={<ReloadOutlined />}>
              Đặt lại
            </Button>
            <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
              Lọc
            </Button>
          </Space>
        </div>

        <AnimatePresence>
          {showAdvanced && (
            <AdvancedFiltersContainer
              initial={ANIMATION.PANEL_TRANSITION.initial}
              animate={ANIMATION.PANEL_TRANSITION.animate}
              exit={ANIMATION.PANEL_TRANSITION.exit}
              transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <Form.Item name="type" label="Loại dự án">
                  <Select
                    placeholder="Chọn loại dự án"
                    allowClear
                    options={Object.entries(PROJECT_TYPE).map(([key, value]) => ({
                      label: {
                        'SOFTWARE': 'Phần mềm',
                        'HARDWARE': 'Phần cứng',
                        'SERVICE': 'Dịch vụ',
                        'RESEARCH': 'Nghiên cứu',
                        'INFRASTRUCTURE': 'Hạ tầng',
                        'OTHER': 'Khác'
                      }[key] || key,
                      value: value
                    }))}
                  />
                </Form.Item>

                <Form.Item name="category" label="Danh mục">
                  <Select
                    placeholder="Chọn danh mục"
                    allowClear
                    options={Object.entries(PROJECT_CATEGORY).map(([key, value]) => ({
                      label: {
                        'INTERNAL': 'Nội bộ',
                        'EXTERNAL': 'Bên ngoài',
                        'CLIENT': 'Khách hàng',
                        'VENDOR': 'Nhà cung cấp',
                        'PARTNERSHIP': 'Đối tác'
                      }[key] || key,
                      value: value
                    }))}
                  />
                </Form.Item>

                <Form.Item name="budget" label="Ngân sách">
                  <Select
                    placeholder="Chọn ngân sách"
                    allowClear
                    options={[
                      { label: 'Dưới 100 triệu', value: 'under_100m' },
                      { label: '100 - 500 triệu', value: '100m_500m' },
                      { label: '500 triệu - 1 tỷ', value: '500m_1b' },
                      { label: 'Trên 1 tỷ', value: 'over_1b' }
                    ]}
                  />
                </Form.Item>

                <Form.Item name="manager" label="Quản lý dự án">
                  <Select
                    placeholder="Chọn quản lý"
                    allowClear
                    options={[
                      { label: 'Nguyễn Văn A', value: 'nguyen_van_a' },
                      { label: 'Trần Thị B', value: 'tran_thi_b' },
                      { label: 'Lê Văn C', value: 'le_van_c' }
                    ]}
                  />
                </Form.Item>
              </div>
            </AdvancedFiltersContainer>
          )}
        </AnimatePresence>
      </Form>
    </FilterContainer>
  );
};

export default ProjectFilters;
