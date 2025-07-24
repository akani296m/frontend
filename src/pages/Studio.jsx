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
        body: JSON.stringify({ prompt_type: mode, user_input: userMessage }),
      });

      if (!res.ok) throw new Error("Failed to fetch response from API.");
      const data = await res.json();
      setMessages((prev) => [...prev, `🤖 Marketable: ${data.content || "No response"}`]);
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
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => {
            if (msg.startsWith("🤖 Marketable:")) {
              const content = msg.replace("🤖 Marketable:", "").trim();

              let parsed;
              try {
                parsed = JSON.parse(content);
              } catch (e) {
                return (
                  <div
                    key={i}
                    className="max-w-md px-4 py-3 rounded-2xl bg-[#EBECEE] text-[#111827] font-[Arial]"
                  >
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </div>
                );
              }

              // Custom renderer for ad_copy mode
              if (mode === "ad_copy") {
                return (
                  <div key={i} className="w-full max-w-2xl p-6 bg-white rounded-xl shadow space-y-4 font-[Arial]">
                    <div>
                      <h2 className="text-lg font-bold">Headline</h2>
                      <p>{parsed.headline}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Ad Copy</h2>
                      <p>{parsed.primary_texts.short_form}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Description</h2>
                      <p>{parsed.primary_texts.long_form}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Call to Action</h2>
                      <p>[{parsed.call_to_action}]</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">Visual Concept</h2>
                      <p>{parsed.visual_hook}</p>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">URL</h2>
                      <p>www.example.com/xbox</p>
                    </div>
                  </div>
                );
              }

              // Fallback rendering for other modes
              return (
                <div key={i} className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-md space-y-6 font-[Arial]">
                  {/* Example: product_page_copy rendering */}
                  <section>
                    <h1 className="text-2xl font-bold">{parsed.headline}</h1>
                    <p className="text-lg text-gray-600">{parsed.subheadline}</p>
                    <div className="my-3 text-sm italic text-gray-500">{parsed.visual_placeholder}</div>
                    <button className="bg-[#111827] text-white py-2 px-4 rounded-lg">{parsed.cta_hero}</button>
                  </section>

                  <section>
                    <p className="text-base">{parsed.relatable_story}</p>
                    <p className="mt-2 font-medium">{parsed.product_reveal}</p>
                  </section>

                  <section>
                    <h2 className="font-semibold">Key Benefits</h2>
                    <ul className="list-disc ml-5 text-sm text-gray-800">
                      {parsed.key_benefits.map((b, idx) => <li key={idx}>{b}</li>)}
                    </ul>
                  </section>

                  <section>
                    <h2 className="font-semibold">Testimonials</h2>
                    {parsed.testimonials.map((t, idx) => (
                      <blockquote key={idx} className="text-sm italic text-gray-700">"{t}"</blockquote>
                    ))}
                  </section>

                  <section>
                    <h2 className="font-semibold">Trust Badges</h2>
                    <div className="flex flex-wrap gap-2">
                      {parsed.trust_badges.map((badge, idx) => (
                        <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">{badge}</span>
                      ))}
                    </div>
                  </section>

                  <section className="text-sm font-medium">
                    <p>{parsed.guarantee}</p>
                    <p className="text-red-600 mt-2">{parsed.urgency_text}</p>
                    <button className="mt-2 bg-blue-600 text-white py-2 px-6 rounded">{parsed.cta_final}</button>
                  </section>

                  <section>
                    <h2 className="font-semibold">FAQs</h2>
                    {parsed.faq.map((item, idx) => (
                      <div key={idx} className="mt-2">
                        <strong>Q: {item.question}</strong>
                        <p>A: {item.answer}</p>
                      </div>
                    ))}
                  </section>

                  <div className="mt-4 text-center text-sm text-green-700 font-semibold">
                    {parsed.sticky_cart_note}
                  </div>
                </div>
              );
            }

            // User messages or error/loading blocks
            return (
              <div
                key={i}
                className="max-w-md px-4 py-3 rounded-2xl bg-[#DBEAFE] text-[#111827] font-[Arial]"
              >
                {msg}
              </div>
            );
          })}

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
      </main>
    </div>
  );
}
