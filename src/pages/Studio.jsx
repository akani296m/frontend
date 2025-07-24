import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Studio() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("ad_copy");
  const isActive = input.trim().length > 0;

  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧠 You: ${userMessage}`]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://marketable.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt_type: mode,
          user_input: userMessage,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch response from API.");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        `🤖 Marketable: ${data.content || "No response"}`,
      ]);
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputArea = (
    <div className="w-full max-w-2xl border-t border-[#EBECEE] bg-[#F9FAFB] px-4 py-3">
      <div className="flex flex-col gap-2">
        {showWelcome && (
          <>
            <h2 className="text-lg font-semibold text-[#111827]">
              Welcome, what do you want to work on?
            </h2>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="mb-1 w-56 p-2 rounded border border-[#EBECEE] bg-white text-[#111827] font-[Arial] text-sm"
            >
              <option value="ad_copy">Ad Copy</option>
              <option value="product_page_copy">Product Page Copy</option>
            </select>
          </>
        )}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={
              mode === "ad_copy"
                ? "let's build your next campaign"
                : "describe your product or paste product info"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border border-[#EBECEE] bg-white px-4 py-3 text-[#75787D] font-[Arial] placeholder-[#75787D] focus:outline-none"
          />
          <button
            className={`p-3 rounded-xl ${isActive ? 'bg-[#328DF1]' : 'bg-[#EBECEE]'}`}
            onClick={handleSend}
            disabled={loading}
          >
            <ArrowUpRight className={`${isActive ? 'text-[#FFFFFF]' : 'text-[#111827]'} w-5 h-5`} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen" style={{ filter: darkMode ? "invert(1)" : "none" }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 flex flex-col bg-[#F9FAFB]">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">{InputArea}</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* message rendering logic remains unchanged */}
            </div>
            {InputArea}
          </>
        )}
      </main>
    </div>
  );
}
