import { Expense, ExpenseCategory } from '../types';

export const mockExpenses: Expense[] = [
  {
    id: '1',
    title: 'Salary',
    amount: 5000,
    type: 'income',
    category: 'salary',
    date: new Date('2024-01-01'),
    description: 'Monthly salary',
    recurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '2',
    title: 'Rent',
    amount: 1200,
    type: 'expense',
    category: 'housing',
    date: new Date('2024-01-01'),
    description: 'Monthly rent payment',
    recurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '3',
    title: 'Groceries',
    amount: 150,
    type: 'expense',
    category: 'food',
    date: new Date('2024-01-15'),
    description: 'Weekly grocery shopping'
  },
  {
    id: '4',
    title: 'Freelance Project',
    amount: 800,
    type: 'income',
    category: 'freelance',
    date: new Date('2024-01-10'),
    description: 'Web development project'
  },
  {
    id: '5',
    title: 'Utilities',
    amount: 200,
    type: 'expense',
    category: 'utilities',
    date: new Date('2024-01-05'),
    description: 'Electricity and water bills',
    recurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '6',
    title: 'Netflix Subscription',
    amount: 15,
    type: 'expense',
    category: 'entertainment',
    date: new Date('2024-01-12'),
    description: 'Monthly streaming subscription',
    recurring: true,
    recurringPeriod: 'monthly'
  }
];

export const expenseCategories: ExpenseCategory[] = [
  { id: '1', name: 'Salary', color: '#10B981', type: 'income' },
  { id: '2', name: 'Freelance', color: '#3B82F6', type: 'income' },
  { id: '3', name: 'Investment', color: '#8B5CF6', type: 'income' },
  { id: '4', name: 'Housing', color: '#EF4444', type: 'expense' },
  { id: '5', name: 'Food', color: '#F59E0B', type: 'expense' },
  { id: '6', name: 'Transportation', color: '#06B6D4', type: 'expense' },
  { id: '7', name: 'Utilities', color: '#84CC16', type: 'expense' },
  { id: '8', name: 'Entertainment', color: '#EC4899', type: 'expense' },
  { id: '9', name: 'Healthcare', color: '#F97316', type: 'expense' },
  { id: '10', name: 'Shopping', color: '#6366F1', type: 'expense' }
];