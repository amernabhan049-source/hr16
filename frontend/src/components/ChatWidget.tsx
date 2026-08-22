import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types";
import styles from "./ChatWidget.module.css";

const GREETING: ChatMessage = {
  role: "assistant",
  content: "Hi, I'm your HR assistant. Ask me about leave, payroll, or policies.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const history = messages;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't reach the HR assistant right now. Please try again shortly.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-label="Ask HR chat">
          <div className={styles.chatHeader}>
            <span>Ask HR</span>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className={styles.messageList}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? styles.userBubble : styles.assistantBubble}
              >
                {m.content}
              </div>
            ))}
            {isTyping && (
              <div className={styles.assistantBubble}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.sendButton} onClick={sendMessage} disabled={isTyping}>
              Send
            </button>
          </div>
        </div>
      )}
      <button
        className={styles.launcher}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Ask HR"
      >
        Ask HR
      </button>
    </>
  );
}
