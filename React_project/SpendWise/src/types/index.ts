export interface User {
  id: string;
  name: string;
  email: string;
  familyId: string;
}

export interface Family {
  id: string;
  name: string;
  members: User[];
}

export interface Category {
  id: string;
  name: string;
  monthlyLimit: number;
  color: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  date: string;
  userId: string;
  description?: string;
}

export interface AuthState {
  user: User | null;
  family: Family | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface BudgetData {
  monthlyIncome: number;
  categories: Category[];
  expenses: Expense[];
}