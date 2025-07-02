import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Category, Expense, User } from '@/types';

interface DashboardProps {
  categories: Category[];
  expenses: Expense[];
  monthlyIncome: number;
  familyMembers: User[];
  onAddExpense: () => void;
  onSetIncome: () => void;
  onManageCategories: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  categories,
  expenses,
  monthlyIncome,
  familyMembers,
  onAddExpense,
  onSetIncome,
  onManageCategories
}) => {
  const getCurrentMonthExpenses = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  };

  const currentMonthExpenses = getCurrentMonthExpenses();
  const totalSpent = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const getCategoryProgress = (category: Category) => {
    const categoryExpenses = currentMonthExpenses.filter(e => e.categoryId === category.id);
    const spent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
    const percentage = category.monthlyLimit > 0 ? (spent / category.monthlyLimit) * 100 : 0;
    return { spent, percentage, isWarning: percentage >= 80 };
  };

  const getSuggestion = (category: Category, progress: { spent: number; percentage: number; isWarning: boolean }) => {
    if (progress.percentage >= 80) {
      const suggestions = {
        'Food': 'Try reducing takeaway meals and cook more at home.',
        'Transport': 'Consider carpooling or using public transport.',
        'Entertainment': 'Look for free activities and events in your area.',
        'Shopping': 'Make a list before shopping and stick to it.'
      };
      return suggestions[category.name as keyof typeof suggestions] || `You're nearing the ${category.name.toLowerCase()} budget. Consider reducing expenses.`;
    } else if (progress.percentage < 50) {
      return `${category.name} is within budget — great job!`;
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Family Budget Dashboard
        </h1>
        <div className="flex gap-2">
          <Button onClick={onAddExpense} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyIncome.toLocaleString()}</div>
            <Button variant="ghost" onClick={onSetIncome} className="text-white hover:bg-white/20 p-0 h-auto">
              Update Income
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs opacity-90">
              {monthlyIncome > 0 ? `${((totalSpent / monthlyIncome) * 100).toFixed(1)}% of income` : 'Set income first'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Family Members</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{familyMembers.length}</div>
            <p className="text-xs opacity-90">Active members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Category Progress
              <Button variant="outline" onClick={onManageCategories} size="sm">
                Manage Categories
              </Button>
            </CardTitle>
            <CardDescription>Track your spending by category</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No categories set up yet</p>
            ) : (
              categories.map(category => {
                const progress = getCategoryProgress(category);
                const suggestion = getSuggestion(category, progress);
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                        {category.name}
                        {progress.isWarning && <Badge variant="destructive">Warning</Badge>}
                      </span>
                      <span className="text-sm text-gray-600">
                        ${progress.spent.toLocaleString()} / ${category.monthlyLimit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={Math.min(progress.percentage, 100)} className="h-2" />
                    {suggestion && (
                      <p className={`text-xs ${progress.isWarning ? 'text-red-600' : 'text-green-600'}`}>
                        💡 {suggestion}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Latest spending activity</CardDescription>
          </CardHeader>
          <CardContent>
            {currentMonthExpenses.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No expenses recorded this month</p>
            ) : (
              <div className="space-y-3">
                {currentMonthExpenses.slice(0, 5).map(expense => {
                  const category = categories.find(c => c.id === expense.categoryId);
                  const member = familyMembers.find(m => m.id === expense.userId);
                  return (
                    <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">${expense.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">
                          {category?.name} • {member?.name}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;