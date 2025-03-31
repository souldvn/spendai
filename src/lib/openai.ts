import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeFinancesWithAI(
  totalIncome: number,
  totalExpenses: number,
  expensesByCategory: Record<string, number>
) {
  const prompt = `As a financial advisor, analyze the following financial data and provide personalized recommendations:

Total Income: $${totalIncome}
Total Expenses: $${totalExpenses}
Expenses by Category:
${Object.entries(expensesByCategory)
  .map(([category, amount]) => `${category}: $${amount}`)
  .join('\n')}

Please provide:
1. A brief overview of the financial situation
2. Specific recommendations for optimizing expenses
3. Suggestions for improving financial health
4. Any potential areas of concern

Please be specific and practical in your recommendations.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful and knowledgeable financial advisor. Provide clear, actionable advice based on the user's financial data. Be encouraging but honest about areas of concern."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return response.choices[0].message.content;
}

export async function chatWithAI(
  userMessage: string,
  financialContext: string
) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful financial advisor. Use this financial context to provide relevant advice: ${financialContext}`
      },
      {
        role: "user",
        content: userMessage
      }
    ],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0].message.content;
} 