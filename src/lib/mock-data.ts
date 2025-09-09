import type { Expense, User } from "@/lib/types";

let expenses: Expense[] = [
  { id: "1", user: "Samila", amount: 75.5, reason: "Groceries", type: "Expense", date: new Date("2024-07-20T10:00:00Z") },
  { id: "2", user: "Amaya", amount: 120, reason: "Concert tickets", type: "Expense", date: new Date("2024-07-19T18:30:00Z") },
  { id: "3", user: "Samila", amount: 1500, reason: "Freelance Project", type: "Income", date: new Date("2024-07-18T12:00:00Z") },
  { id: "4", user: "Amaya", amount: 50.25, reason: "Dinner with friends", type: "Expense", date: new Date("2024-07-17T20:00:00Z") },
  { id: "5", user: "Amaya", amount: 2000, reason: "Salary", type: "Income", date: new Date("2024-07-15T09:00:00Z") },
  { id: "6", user: "Samila", amount: 30.0, reason: "Coffee supplies", type: "Expense", date: new Date("2024-07-16T14:00:00Z") },
  { id: "7", user: "Samila", amount: 45.0, reason: "Gasoline", type: "Expense", date: new Date("2024-07-21T09:30:00Z") },
  { id: "8", user: "Amaya", amount: 25.0, reason: "Movie night", type: "Expense", date: new Date("2024-07-22T21:00:00Z") },
];

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getExpenses = async (): Promise<Expense[]> => {
  await delay(100);
  return [...expenses].sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const addExpense = async (data: Omit<Expense, "id" | "date">): Promise<Expense> => {
  await delay(100);
  const newExpense: Expense = {
    ...data,
    id: Date.now().toString(),
    date: new Date(),
  };
  expenses.push(newExpense);
  return newExpense;
};

export const updateExpense = async (id: string, data: Partial<Omit<Expense, "id" | "user" | "date">>): Promise<Expense | null> => {
  await delay(100);
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) {
    return null;
  }
  expenses[index] = { ...expenses[index], ...data };
  return expenses[index];
};

export const deleteExpense = async (id: string): Promise<{ success: boolean }> => {
  await delay(100);
  const initialLength = expenses.length;
  expenses = expenses.filter(e => e.id !== id);
  return { success: expenses.length < initialLength };
};
