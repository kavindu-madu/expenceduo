"use client";

import { ArrowDownLeft, ArrowUpRight, Scale, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/contexts/currency-context";
import type { Expense, User } from "@/lib/types";

interface DashboardSummaryProps {
  allExpenses: Expense[];
  currentUser: User;
}

export default function DashboardSummary({ allExpenses, currentUser }: DashboardSummaryProps) {
  const { formatAmount } = useCurrency();
  const calculations = allExpenses.reduce(
    (acc, expense) => {
      if (expense.type === "Income") {
        acc.totalIncome += expense.amount;
        if (expense.user === "Samila") acc.samilaIncome += expense.amount;
        if (expense.user === "Amaya") acc.amayaIncome += expense.amount;
      } else {
        acc.totalExpenses += expense.amount;
        if (expense.user === "Samila") acc.samilaExpenses += expense.amount;
        if (expense.user === "Amaya") acc.amayaExpenses += expense.amount;
      }
      return acc;
    },
    {
      totalIncome: 0,
      totalExpenses: 0,
      samilaIncome: 0,
      samilaExpenses: 0,
      amayaIncome: 0,
      amayaExpenses: 0,
    }
  );

  const balance = calculations.totalIncome - calculations.totalExpenses;
  const samilaShare = calculations.samilaExpenses;
  const amayaShare = calculations.amayaExpenses;
  
  const summaryCards = [
    { title: "Total Income", value: formatAmount(calculations.totalIncome), Icon: ArrowUpRight, color: "text-green-500" },
    { title: "Total Expenses", value: formatAmount(calculations.totalExpenses), Icon: ArrowDownLeft, color: "text-red-500" },
    { title: "Balance", value: formatAmount(balance), Icon: Scale, color: "text-blue-500" },
  ];

  const shareCards = [
    { name: "Samila", share: formatAmount(samilaShare) },
    { name: "Amaya", share: formatAmount(amayaShare) },
  ]

  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {summaryCards.map(({ title, value, Icon, color }) => (
                <Card key={title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {shareCards.map(({ name, share }) => (
                <Card key={name} className={currentUser === name ? 'border-primary' : ''}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{name}'s Share</CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{share}</div>
                        <p className="text-xs text-muted-foreground">Total expenses contributed by {name}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
