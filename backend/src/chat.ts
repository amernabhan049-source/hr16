// The official Azure OpenAI SDK: "@azure/openai" augments the "openai" package's
// types, while the AzureOpenAI client itself is exported from "openai".
import "@azure/openai/types";
import { AzureOpenAI } from "openai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT =
  "You are the PeopleHub HR assistant. You help employees with questions about " +
  "leave/time off, payroll, benefits, and company policies. Keep answers concise, " +
  "friendly, and professional. If a question is not related to HR topics " +
  "(leave, payroll, benefits, or policies), politely say that you can only help " +
  "with HR-related topics and redirect the user back to those areas.";

const API_VERSION = "2024-05-01-preview";

function isAzureConfigured(): boolean {
  return Boolean(
    process.env.AZURE_OPENAI_ENDPOINT &&
      process.env.AZURE_OPENAI_API_KEY &&
      process.env.AZURE_OPENAI_DEPLOYMENT
  );
}

function getMockReply(message: string): string {
  return (
    `(Demo mode — Azure OpenAI is not configured) Thanks for your question: "${message}". ` +
    "In a fully configured deployment, I'd give you a tailored answer about leave, payroll, " +
    "benefits, or policies. Please set AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, and " +
    "AZURE_OPENAI_DEPLOYMENT to enable live responses."
  );
}

export async function getChatReply(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  if (!isAzureConfigured()) {
    return getMockReply(message);
  }

  try {
    const client = new AzureOpenAI({
      endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
      apiKey: process.env.AZURE_OPENAI_API_KEY!,
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT!,
      apiVersion: API_VERSION,
    });

    const result = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT!,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    const reply = result.choices[0]?.message?.content;
    return reply ?? "Sorry, I couldn't generate a response. Please try again.";
  } catch (err) {
    console.error("Azure OpenAI request failed:", err);
    return "Sorry, I'm having trouble reaching the HR assistant service right now. Please try again shortly.";
  }
}
