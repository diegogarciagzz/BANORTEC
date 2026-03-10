import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL = "llama3";

const SYSTEM_PROMPT = `Eres Aura, el asistente virtual inteligente de Banorte.
Ayudas a los clientes con consultas sobre sus cuentas bancarias, gastos, inversiones y servicios financieros.
Responde siempre en español, de forma clara y concisa. Eres amigable y profesional.`;

export default function Chatbot({ open, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Aura, tu asistente virtual de Banorte. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          stream: false,
        }),
      });

      if (!res.ok) throw new Error("Error al conectar con Ollama");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, no pude conectarme al servidor de IA. Verifica que Ollama esté corriendo en localhost:11434.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-panel">
        <div className="chatbot-header">
          <button className="chatbot-close" onClick={onClose}>
            <X size={20} />
          </button>
          <span className="chatbot-title">Habla con Aura</span>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${msg.role === "user" ? "user" : "bot"}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="chat-bubble bot">
              <span className="typing-indicator">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Escribe aquí..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="chatbot-send"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
