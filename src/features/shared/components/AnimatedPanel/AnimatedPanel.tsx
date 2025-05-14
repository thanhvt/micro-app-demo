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
`;

const PanelContent = styled(motion.div)`
  padding: 16px;
`;

const AnimatedPanel: React.FC<AnimatedPanelProps> = ({
  header,
  children,
  defaultExpanded = true,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <StyledPanel className={className}>
      <Collapse
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
      </Collapse>
    </StyledPanel>
  );
};

export default AnimatedPanel;
