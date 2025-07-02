import React from 'react';
import AppLayout from '@/components/AppLayout';
import { BudgetProvider } from '@/contexts/BudgetContext';

const Index: React.FC = () => {
  return (
    <BudgetProvider>
      <AppLayout />
    </BudgetProvider>
  );
};

export default Index;