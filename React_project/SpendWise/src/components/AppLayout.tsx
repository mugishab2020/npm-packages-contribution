import React, { useState } from 'react';
import { useBudget } from '@/contexts/BudgetContext';
import AuthForm from './AuthForm';
import Dashboard from './Dashboard';
import ExpenseForm from './ExpenseForm';
import CategoryManager from './CategoryManager';
import IncomeModal from './IncomeModal';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const AppLayout: React.FC = () => {
  const {
    isAuthenticated,
    user,
    family,
    monthlyIncome,
    categories,
    expenses,
    login,
    register,
    logout,
    setMonthlyIncome,
    addCategory,
    deleteCategory,
    addExpense
  } = useBudget();

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  if (!isAuthenticated) {
    return <AuthForm onLogin={login} onRegister={register} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Family Budget
              </h1>
              <div className="text-sm text-gray-600">
                {family?.name} • {user?.name}
              </div>
            </div>
            <Button variant="ghost" onClick={logout} className="text-gray-600 hover:text-gray-900">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Dashboard
          categories={categories}
          expenses={expenses}
          monthlyIncome={monthlyIncome}
          familyMembers={family?.members || []}
          onAddExpense={() => setShowExpenseForm(true)}
          onSetIncome={() => setShowIncomeModal(true)}
          onManageCategories={() => setShowCategoryManager(true)}
        />
      </main>

      {showExpenseForm && (
        <ExpenseForm
          categories={categories}
          familyMembers={family?.members || []}
          onSubmit={(expense) => {
            addExpense(expense);
            setShowExpenseForm(false);
          }}
          onCancel={() => setShowExpenseForm(false)}
        />
      )}

      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onAddCategory={addCategory}
          onDeleteCategory={deleteCategory}
          onClose={() => setShowCategoryManager(false)}
        />
      )}

      {showIncomeModal && (
        <IncomeModal
          currentIncome={monthlyIncome}
          onSave={setMonthlyIncome}
          onClose={() => setShowIncomeModal(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;