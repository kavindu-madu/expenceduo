"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExpenseForm from "@/components/expense-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/lib/types";

interface AddExpenseProps {
  user: User;
}

export default function AddExpense({ user }: AddExpenseProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription>Add a new income or expense record.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsOpen(true)} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Entry
          </Button>
        </CardContent>
      </Card>
      <ExpenseForm isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
    </>
  );
}
