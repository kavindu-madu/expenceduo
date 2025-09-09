"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addExpenseAction, updateExpenseAction } from "@/app/actions";
import type { Expense, User } from "@/lib/types";

interface ExpenseFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  expense?: Expense | null;
  user: User;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : isEditing ? "Update Entry" : "Add Entry"}
    </Button>
  );
}

export default function ExpenseForm({ isOpen, setIsOpen, expense, user }: ExpenseFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const isEditing = !!expense;

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
    }
  }, [isOpen]);

  const handleSubmit = async (formData: FormData) => {
    const action = isEditing ? updateExpenseAction.bind(null, expense.id) : addExpenseAction;
    const result = await action(formData);

    if (result?.success) {
      toast({
        title: "Success",
        description: result.success,
      });
      setIsOpen(false);
    } else if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Entry" : "Add New Entry"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the details of your transaction." : "Fill in the details for your new transaction."}
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} ref={formRef}>
          <input type="hidden" name="user" value={user} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">Reason</Label>
              <Input id="reason" name="reason" defaultValue={expense?.reason} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <Input id="amount" name="amount" type="number" step="0.01" defaultValue={expense?.amount} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <Select name="type" defaultValue={expense?.type || "Expense"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
