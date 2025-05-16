import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result, Button, Spin } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import ProjectDetail from '../components/ProjectDetail/ProjectDetail';
import { mockProjects } from '../mock/project.mock';
import { ANIMATION } from '../constants/project.constants';

const PageContainer = styled(motion.div)`
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
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
  }, [id]);

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

  if (error || !project) {
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
          subTitle={error || 'Không tìm thấy dự án'}
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
      <ProjectDetail project={project} />
    </PageContainer>
  );
};

export default ProjectDetailPage;
