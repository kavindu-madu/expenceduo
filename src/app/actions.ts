"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as firebaseDb from "@/lib/firebase-db";
import { compareExpenses } from "@/ai/flows/compare-expenses";
import type { User } from "@/lib/types";

const expenseSchema = z.object({
  user: z.enum(["Samila", "Amaya"]),
  amount: z.coerce.number().positive("Amount must be a positive number."),
  reason: z.string().min(1, "Reason cannot be empty."),
  type: z.enum(["Expense", "Income"]),
});

export async function addExpenseAction(formData: FormData) {
  const validatedFields = expenseSchema.safeParse({
    user: formData.get("user"),
    amount: formData.get("amount"),
    reason: formData.get("reason"),
    type: formData.get("type"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid data provided." };
  }

  await firebaseDb.addExpense(validatedFields.data);
  revalidatePath(`/dashboard/${validatedFields.data.user}`);
  return { success: "Entry added successfully." };
}

export async function updateExpenseAction(id: string, formData: FormData) {
  const user = formData.get("user") as User;
  const validatedFields = expenseSchema.omit({ user: true }).safeParse({
    amount: formData.get("amount"),
    reason: formData.get("reason"),
    type: formData.get("type"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid data provided." };
  }

  await firebaseDb.updateExpense(id, validatedFields.data);
  revalidatePath(`/dashboard/${user}`);
  return { success: "Entry updated successfully." };
}

export async function deleteExpenseAction(id: string, user: User) {
  await firebaseDb.deleteExpense(id);
  revalidatePath(`/dashboard/${user}`);
  return { success: "Entry deleted successfully." };
}

export async function getAiComparisonAction(user: User, totalExpenses: number, location: string, income: number) {
  try {
    const result = await compareExpenses({
      user,
      totalExpenses,
      location,
      income,
    });
    return { success: true, comparison: result.comparison };
  } catch (error) {
    console.error("AI comparison failed:", error);
    return { success: false, error: "Failed to get AI comparison. Please try again." };
  }
}
