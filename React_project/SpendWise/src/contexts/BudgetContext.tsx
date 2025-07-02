import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { User, Family, Category, Expense, AuthState, BudgetData } from '@/types';

interface BudgetContextType extends AuthState, BudgetData {
  login: (email: string, password: string, familyCode?: string) => void;
  register: (name: string, email: string, password: string, familyName: string) => void;
  logout: () => void;
  setMonthlyIncome: (income: number) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (categoryId: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
}

const BudgetContext = createContext<BudgetContextType | null>(null);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    family: null,
    token: null,
    isAuthenticated: false
  });
  
  const [budgetData, setBudgetData] = useState<BudgetData>({
    monthlyIncome: 0,
    categories: [],
    expenses: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('budgetAuth');
    const savedBudget = localStorage.getItem('budgetData');
    
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth);
        if (auth.token) {
          setAuthState(auth);
        }
      } catch (e) {
        console.error('Failed to parse auth data');
      }
    }
    
    if (savedBudget) {
      try {
        const budget = JSON.parse(savedBudget);
        setBudgetData(budget);
      } catch (e) {
        console.error('Failed to parse budget data');
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem('budgetAuth', JSON.stringify(authState));
    }
  }, [authState]);

  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  }, [budgetData]);

  const login = (email: string, password: string, familyCode?: string) => {
    // Simulate JWT authentication
    const token = `jwt_${uuidv4()}`;
    const userId = uuidv4();
    const familyId = familyCode || uuidv4();
    
    const user: User = {
      id: userId,
      name: email.split('@')[0],
      email,
      familyId
    };
    
    const family: Family = {
      id: familyId,
      name: familyCode ? 'Joined Family' : `${user.name}'s Family`,
      members: [user]
    };
    
    setAuthState({
      user,
      family,
      token,
      isAuthenticated: true
    });
    
    toast({
      title: "Welcome back!",
      description: "You've successfully logged in."
    });
  };

  const register = (name: string, email: string, password: string, familyName: string) => {
    const token = `jwt_${uuidv4()}`;
    const userId = uuidv4();
    const familyId = uuidv4();
    
    const user: User = {
      id: userId,
      name,
      email,
      familyId
    };
    
    const family: Family = {
      id: familyId,
      name: familyName,
      members: [user]
    };
    
    setAuthState({
      user,
      family,
      token,
      isAuthenticated: true
    });
    
    // Add default categories
    const defaultCategories: Category[] = [
      { id: uuidv4(), name: 'Food', monthlyLimit: 500, color: '#10B981' },
      { id: uuidv4(), name: 'Transport', monthlyLimit: 200, color: '#3B82F6' },
      { id: uuidv4(), name: 'Entertainment', monthlyLimit: 150, color: '#8B5CF6' },
      { id: uuidv4(), name: 'Shopping', monthlyLimit: 300, color: '#F59E0B' }
    ];
    
    setBudgetData(prev => ({ ...prev, categories: defaultCategories }));
    
    toast({
      title: "Account created!",
      description: "Welcome to Family Budget Tracker."
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      family: null,
      token: null,
      isAuthenticated: false
    });
    localStorage.removeItem('budgetAuth');
    toast({
      title: "Logged out",
      description: "See you next time!"
    });
  };

  const setMonthlyIncome = (income: number) => {
    setBudgetData(prev => ({ ...prev, monthlyIncome: income }));
    toast({
      title: "Income updated",
      description: `Monthly income set to $${income.toLocaleString()}`
    });
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: uuidv4()
    };
    setBudgetData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
    toast({
      title: "Category added",
      description: `${categoryData.name} category created`
    });
  };

  const deleteCategory = (categoryId: string) => {
    setBudgetData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== categoryId),
      expenses: prev.expenses.filter(e => e.categoryId !== categoryId)
    }));
    toast({
      title: "Category deleted",
      description: "Category and related expenses removed"
    });
  };

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: uuidv4()
    };
    setBudgetData(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense]
    }));
    toast({
      title: "Expense added",
      description: `$${expenseData.amount} expense recorded`
    });
  };

  return (
    <BudgetContext.Provider
      value={{
        ...authState,
        ...budgetData,
        login,
        register,
        logout,
        setMonthlyIncome,
        addCategory,
        deleteCategory,
        addExpense
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};