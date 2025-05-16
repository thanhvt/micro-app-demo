import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import ProjectList from '../components/ProjectList/ProjectList';
import { ANIMATION } from '../constants/project.constants';

const PageContainer = styled(motion.div)`
  // padding: 24px;
  
  // @media (max-width: 768px) {
  //   padding: 16px;
  // }
`;

const ProjectListPage: React.FC = () => {
  return (
    <PageContainer
      initial={ANIMATION.PAGE_TRANSITION.initial}
      animate={ANIMATION.PAGE_TRANSITION.animate}
      exit={ANIMATION.PAGE_TRANSITION.exit}
      transition={{ duration: ANIMATION.DURATION, ease: ANIMATION.EASE }}
    >
      <ProjectList />
    </PageContainer>
  );
};

export default ProjectListPage;
