'use server';

/**
 * @fileOverview This file defines a Genkit flow for comparing user expenses with AI-generated averages.
 *
 * It includes:
 * - `compareExpenses`: An async function to trigger the comparison flow.
 * - `CompareExpensesInput`: The input type for the compareExpenses function, including user details and expense data.
 * - `CompareExpensesOutput`: The output type for the compareExpenses function, providing an AI-driven comparison of expenses.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareExpensesInputSchema = z.object({
  user: z.string().describe('The username of the user (e.g., Samila or Amaya).'),
  location: z.string().describe('The location of the user.'),
  income: z.number().describe('The annual income of the user.'),
  totalExpenses: z.number().describe('The total expenses of the user.'),
});
export type CompareExpensesInput = z.infer<typeof CompareExpensesInputSchema>;

const CompareExpensesOutputSchema = z.object({
  comparison: z
    .string()
    .describe(
      'An AI-driven comparison of the user\'s expenses against averages for people with similar income and location, identifying potential areas of overspending or underspending.'
    ),
});
export type CompareExpensesOutput = z.infer<typeof CompareExpensesOutputSchema>;

export async function compareExpenses(input: CompareExpensesInput): Promise<CompareExpensesOutput> {
  return compareExpensesFlow(input);
}

const compareExpensesPrompt = ai.definePrompt({
  name: 'compareExpensesPrompt',
  input: {schema: CompareExpensesInputSchema},
  output: {schema: CompareExpensesOutputSchema},
  prompt: `You are an AI financial advisor. Compare the user's expenses with typical spending for someone with a similar income and location.

User: {{{user}}}
Location: {{{location}}}
Income: {{{income}}}
Total Expenses: {{{totalExpenses}}}

Provide a concise comparison, highlighting areas where the user may be overspending or underspending. Focus on providing actionable insights.`, 
});

const compareExpensesFlow = ai.defineFlow(
  {
    name: 'compareExpensesFlow',
    inputSchema: CompareExpensesInputSchema,
    outputSchema: CompareExpensesOutputSchema,
  },
  async input => {
    const {output} = await compareExpensesPrompt(input);
    return output!;
  }
);
