import React from 'react';
import { motion } from 'framer-motion';
import ContractList from '../components/ContractList';
import { ANIMATION } from '../constants/contract.constants';

const ContractListPage: React.FC = () => {
  return (
    <motion.div
      initial={ANIMATION.PAGE_TRANSITION.initial}
      animate={ANIMATION.PAGE_TRANSITION.animate}
      exit={ANIMATION.PAGE_TRANSITION.exit}
      transition={{
        duration: ANIMATION.DURATION,
        ease: ANIMATION.EASE
      }}
    >
      <ContractList />
    </motion.div>
  );
};

export default ContractListPage;
