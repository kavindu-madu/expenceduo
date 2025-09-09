import { notFound } from "next/navigation";
import { getExpensesByUser } from "@/lib/firebase-db";
import type { User } from "@/lib/types";

import DashboardHeader from "@/components/dashboard-header";
import DashboardSummary from "@/components/dashboard-summary";
import ExpenseList from "@/components/expense-list";
import AddExpense from "@/components/add-expense";
import ExpenseCharts from "@/components/expense-charts";
import AiComparison from "@/components/ai-comparison";

interface DashboardPageProps {
  params: Promise<{
    user: string;
  }>;
}

const validUsers: User[] = ["Samila", "Amaya"];

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { user } = await params;
  const currentUser = user as User;

  if (!validUsers.includes(currentUser)) {
    notFound();
  }

  const userExpenses = await getExpensesByUser(currentUser);
  const allExpenses = userExpenses; // For components that need all expenses, we'll use user expenses for now

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader user={currentUser} />
      <main className="flex-1 container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <DashboardSummary allExpenses={allExpenses} currentUser={currentUser} />
            <ExpenseList initialExpenses={userExpenses} user={currentUser} />
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-2 space-y-8">
            <AddExpense user={currentUser} />
            <ExpenseCharts allExpenses={allExpenses} currentUser={currentUser} />
            <AiComparison user={currentUser} expenses={userExpenses} />
          </div>
        </div>
      </main>
    </div>
  );
}
