import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Result, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import ProjectForm from '../components/ProjectForm/ProjectForm';
import { mockProjects } from '../mock/project.mock';
import { Project } from '../types/project.types';
import { ANIMATION } from '../constants/project.constants';

const PageContainer = styled(motion.div)`
  // padding: 24px;
  
  // @media (max-width: 768px) {
  //   padding: 16px;
  // }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ProjectFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = id && id !== 'new';

  useEffect(() => {
    if (isEditMode) {
      // Simulate API call to fetch project
      setLoading(true);
      setTimeout(() => {
        try {
          const foundProject = mockProjects.find(p => p.id === id);
          if (foundProject) {
            setProject(foundProject);
            setError(null);
          } else {
            setError('Không tìm thấy dự án');
          }
        } catch (err) {
          setError('Đã xảy ra lỗi khi tải dữ liệu');
        } finally {
          setLoading(false);
        }
      }, 800);
    } else {
      // New project
      setProject({});
      setLoading(false);
    }
  }, [id, isEditMode]);

  const handleSubmit = (data: Project) => {
    // Simulate API call to save project
    setTimeout(() => {
      try {
        if (isEditMode) {
          // Update existing project in mock data
          const index = mockProjects.findIndex(p => p.id === id);
          if (index !== -1) {
            mockProjects[index] = data;
          }
        } else {
          // Add new project to mock data
          mockProjects.push(data);
        }
        
        // Navigate back to project list or detail
        navigate(`/projects/${data.id}`);
      } catch (err) {
        message.error('Đã xảy ra lỗi khi lưu dự án');
      }
    }, 1000);
  };

  if (loading) {
    return (
      <PageContainer
        initial={ANIMATION.PAGE_TRANSITION.initial}
        animate={ANIMATION.PAGE_TRANSITION.animate}
        exit={ANIMATION.PAGE_TRANSITION.exit}
        transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
      >
        <LoadingContainer>
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer
        initial={ANIMATION.PAGE_TRANSITION.initial}
        animate={ANIMATION.PAGE_TRANSITION.animate}
        exit={ANIMATION.PAGE_TRANSITION.exit}
        transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
      >
        <Result
          status="404"
          title="404"
          subTitle={error}
          extra={
            <Button type="primary" onClick={() => navigate('/projects')}>
              Quay lại danh sách
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      initial={ANIMATION.PAGE_TRANSITION.initial}
      animate={ANIMATION.PAGE_TRANSITION.animate}
      exit={ANIMATION.PAGE_TRANSITION.exit}
      transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
    >
      <HeaderContainer>
        <PageTitle>{isEditMode ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}</PageTitle>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/projects')}
        >
          Quay lại danh sách
        </Button>
      </HeaderContainer>
      
      <ProjectForm 
        initialData={project || {}} 
        onSubmit={handleSubmit}
        isEditMode={isEditMode}
      />
    </PageContainer>
  );
};

export default ProjectFormPage;
