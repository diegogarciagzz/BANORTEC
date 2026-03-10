import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Header from "./components/Header";
import ExpensesChart from "./components/ExpensesChart";
import StocksPanel from "./components/StocksPanel";
import Chatbot from "./components/Chatbot";
import "./App.css";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="app">
      <Header />
      <main className="dashboard">
        <ExpensesChart />
        <StocksPanel />
      </main>

      {!chatOpen && (
        <button className="fab" onClick={() => setChatOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}

      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
