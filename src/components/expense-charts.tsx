"use client";

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrency } from "@/contexts/currency-context";
import type { Expense, User } from "@/lib/types";

interface ExpenseChartsProps {
  allExpenses: Expense[];
  currentUser: User;
}

const COLORS = {
    Income: 'hsl(var(--chart-1))',
    Expense: 'hsl(var(--chart-2))',
    Samila: 'hsl(var(--chart-1))',
    Amaya: 'hsl(var(--chart-2))',
};

export default function ExpenseCharts({ allExpenses, currentUser }: ExpenseChartsProps) {
  const { formatAmount } = useCurrency();
  const userIO = allExpenses
    .filter((e) => e.user === currentUser)
    .reduce(
      (acc, e) => {
        const existing = acc.find((item) => item.name === e.type);
        if (existing) {
          existing.value += e.amount;
        } else {
          acc.push({ name: e.type, value: e.amount });
        }
        return acc;
      },
      [] as { name: "Income" | "Expense"; value: number }[]
    );

  const comparisonData = allExpenses
    .filter((e) => e.type === "Expense")
    .reduce(
      (acc, e) => {
        const user = e.user;
        acc[user] = (acc[user] || 0) + e.amount;
        return acc;
      },
      {} as Record<User, number>
    );
  
  const barChartData = [
      { name: 'Samila', expenses: comparisonData.Samila || 0 },
      { name: 'Amaya', expenses: comparisonData.Amaya || 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visuals</CardTitle>
        <CardDescription>A visual breakdown of your finances.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">My Overview</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={userIO} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {userIO.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatAmount(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="comparison">
             <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => formatAmount(value)} />
                        <Tooltip formatter={(value: number) => formatAmount(value)} />
                        <Bar dataKey="expenses">
                           {barChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name === "Samila" ? COLORS.Samila : COLORS.Amaya} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
