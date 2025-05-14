import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Collapse } from 'antd';
import styled from '@emotion/styled';
import { ANIMATION } from '../../../contracts/constants/contract.constants';

const { Panel } = Collapse;

interface AnimatedPanelProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

const StyledPanel = styled(motion.div)`
  margin-bottom: 16px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const PanelContent = styled(motion.div)`
  padding: 16px;

  @media (max-width: 576px) {
    padding: 12px 8px;
  }
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f9f9f9;
    }

    &:focus-visible {
      outline: 2px solid #1890ff;
      outline-offset: -2px;
    }
  }

  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const AnimatedPanel: React.FC<AnimatedPanelProps> = ({
  header,
  children,
  defaultExpanded = true,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <StyledPanel
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StyledCollapse
        activeKey={isExpanded ? ['1'] : []}
        onChange={() => setIsExpanded(!isExpanded)}
      >
        <Panel header={header} key="1">
          <AnimatePresence mode="wait">
            <PanelContent
              key="content"
              initial={ANIMATION.PANEL_TRANSITION.initial}
              animate={ANIMATION.PANEL_TRANSITION.animate}
              exit={ANIMATION.PANEL_TRANSITION.exit}
              transition={{
                duration: ANIMATION.DURATION,
                ease: ANIMATION.EASE
              }}
            >
              {children}
            </PanelContent>
          </AnimatePresence>
        </Panel>
      </StyledCollapse>
    </StyledPanel>
  );
};

export default AnimatedPanel;
