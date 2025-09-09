import { database } from './firebase';
import { ref, get, set, push, update, remove } from 'firebase/database';
import type { Expense, User } from '@/lib/types';

// Helper function to convert Firebase data to Expense objects
const convertFirebaseData = (data: any): Expense[] => {
  if (!data) return [];
  return Object.entries(data).map(([id, expense]: [string, any]) => ({
    id,
    ...expense,
    date: new Date(expense.date)
  }));
};

// Get all expenses
export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expensesRef = ref(database, 'expenses');
    const snapshot = await get(expensesRef);
    const data = snapshot.val();
    return convertFirebaseData(data).sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw new Error('Failed to fetch expenses');
  }
};

// Get expenses for a specific user
export const getExpensesByUser = async (user: User): Promise<Expense[]> => {
  try {
    const expensesRef = ref(database, 'expenses');
    const snapshot = await get(expensesRef);
    const data = snapshot.val();
    const allExpenses = convertFirebaseData(data);
    // Filter by user on the client side to avoid index issues
    const userExpenses = allExpenses.filter(expense => expense.user === user);
    return userExpenses.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error fetching user expenses:', error);
    throw new Error('Failed to fetch user expenses');
  }
};

// Add a new expense
export const addExpense = async (data: Omit<Expense, 'id' | 'date'>): Promise<Expense> => {
  try {
    const expensesRef = ref(database, 'expenses');
    const newExpenseRef = push(expensesRef);
    
    const expenseData = {
      ...data,
      date: new Date().toISOString()
    };
    
    await set(newExpenseRef, expenseData);
    
    return {
      id: newExpenseRef.key!,
      ...expenseData,
      date: new Date(expenseData.date)
    };
  } catch (error) {
    console.error('Error adding expense:', error);
    throw new Error('Failed to add expense');
  }
};

// Update an existing expense
export const updateExpense = async (id: string, data: Partial<Omit<Expense, 'id' | 'user' | 'date'>>): Promise<Expense | null> => {
  try {
    const expenseRef = ref(database, `expenses/${id}`);
    const snapshot = await get(expenseRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const currentData = snapshot.val();
    const updatedData = {
      ...currentData,
      ...data
    };
    
    await update(expenseRef, updatedData);
    
    return {
      id,
      ...updatedData,
      date: new Date(updatedData.date)
    };
  } catch (error) {
    console.error('Error updating expense:', error);
    throw new Error('Failed to update expense');
  }
};

// Delete an expense
export const deleteExpense = async (id: string): Promise<{ success: boolean }> => {
  try {
    const expenseRef = ref(database, `expenses/${id}`);
    const snapshot = await get(expenseRef);
    
    if (!snapshot.exists()) {
      return { success: false };
    }
    
    await remove(expenseRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw new Error('Failed to delete expense');
  }
};

// Get expense statistics for a user
export const getUserExpenseStats = async (user: User): Promise<{
  totalExpenses: number;
  totalIncome: number;
  netAmount: number;
  expenseCount: number;
  incomeCount: number;
}> => {
  try {
    const expenses = await getExpensesByUser(user);
    
    const totalExpenses = expenses
      .filter(e => e.type === 'Expense')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const totalIncome = expenses
      .filter(e => e.type === 'Income')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const netAmount = totalIncome - totalExpenses;
    const expenseCount = expenses.filter(e => e.type === 'Expense').length;
    const incomeCount = expenses.filter(e => e.type === 'Income').length;
    
    return {
      totalExpenses,
      totalIncome,
      netAmount,
      expenseCount,
      incomeCount
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw new Error('Failed to get user statistics');
  }
};
