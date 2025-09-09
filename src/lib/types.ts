export type User = "Samila" | "Amaya";

export type Expense = {
  id: string;
  user: User;
  amount: number;
  reason: string;
  type: "Expense" | "Income";
  date: Date;
};
