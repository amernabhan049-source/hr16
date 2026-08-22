import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getChatReply, ChatMessage } from "./chat";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body as {
      message?: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "'message' is required and must be a string." });
    }

    const reply = await getChatReply(message, Array.isArray(history) ? history : []);
    res.json({ reply });
  } catch (err) {
    console.error("Chat endpoint error:", err);
    res.status(500).json({ error: "Something went wrong processing your message." });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`PeopleHub backend listening on http://localhost:${PORT}`);
});
