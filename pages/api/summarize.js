import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {  // Убрали аннотации
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "MISTRAL_API_KEY not found" });
  }

  try {
    const { text, isExpenseAnalysis } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const systemMessage = isExpenseAnalysis
      ? "Ты финансовый аналитик. Дай совет по расходам."
      : "Ты умный помощник. Отвечай на вопросы пользователя дружелюбно и понятно.";

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: text },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Ошибка API");
    }

    res.status(200).json({ summary: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Ошибка API", details: error.message });
  }
}
