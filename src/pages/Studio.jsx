import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { ArrowUpRight } from "lucide-react";

export default function Studio() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handleSend will post user input and append both user and bot messages
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
          prompt_type: "ad_copy",       // 🔁 You can make this dynamic later
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

  // Extracted InputArea; width expanded to max-w-2xl
  const InputArea = (
    <div className="w-full max-w-2xl border-t border-[#EBECEE] bg-[#F9FAFB] px-4 py-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="let's build your next campaign"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="
            flex-1
            rounded-xl
            border border-[#EBECEE]
            bg-white
            px-4 py-3
            text-[#75787D]
            font-[Arial]
            placeholder-[#75787D]
            focus:outline-none
          "
        />
        <button
          className="bg-[#EBECEE] p-3 rounded-xl"
          onClick={handleSend}
          disabled={loading}
        >
          <ArrowUpRight className="text-white w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="flex min-h-screen"
      style={{ filter: darkMode ? "invert(1)" : "none" }}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 flex flex-col bg-[#F9FAFB]">
        {messages.length === 0 ? (
          // No chat yet: center the input
          <div className="flex-1 flex items-center justify-center">
            {InputArea}
          </div>
        ) : (
          // Chat started: show messages above, input at bottom
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="max-w-md px-4 py-3 rounded-2xl bg-[#EBECEE] text-[#111827] font-[Arial]"
                >
                  {msg}
                </div>
              ))}
              {loading && (
                <div className="max-w-md px-4 py-3 rounded-2xl bg-[#EBECEE] text-[#6B7280] font-[Arial] italic">
                  Thinking...
                </div>
              )}
              {error && (
                <div className="max-w-md px-4 py-3 rounded-2xl bg-red-100 text-red-700 font-[Arial]">
                  {error}
                </div>
              )}
            </div>
            {InputArea}
          </>
        )}
      </main>
    </div>
  );
}
