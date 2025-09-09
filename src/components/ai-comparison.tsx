"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiComparisonAction } from "@/app/actions";
import type { Expense, User } from "@/lib/types";

interface AiComparisonProps {
  user: User;
  expenses: Expense[];
}

export default function AiComparison({ user, expenses }: AiComparisonProps) {
  const [location, setLocation] = useState("New York, NY");
  const [income, setIncome] = useState(75000);
  const [isLoading, setIsLoading] = useState(false);
  const [comparison, setComparison] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalExpenses = expenses
    .filter((e) => e.type === "Expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const handleGetComparison = async () => {
    setIsLoading(true);
    setError(null);
    setComparison(null);

    const result = await getAiComparisonAction(user, totalExpenses, location, income);

    if (result.success) {
      setComparison(result.comparison!);
    } else {
      setError(result.error!);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Financial Check-up
        </CardTitle>
        <CardDescription>
          Compare your spending habits against others with a similar profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <Label htmlFor="location">Your Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., San Francisco, CA" />
        </div>
        <div>
            <Label htmlFor="income">Annual Income</Label>
            <Input id="income" type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} placeholder="e.g., 80000" />
        </div>

        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {comparison && (
            <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>AI Analysis</AlertTitle>
                <AlertDescription>{comparison}</AlertDescription>
            </Alert>
        )}

      </CardContent>
      <CardFooter>
        <Button onClick={handleGetComparison} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Get AI Comparison"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
