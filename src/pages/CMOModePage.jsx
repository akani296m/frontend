import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // adjust path if needed

export default function CMOModePage() {
  const [darkMode, setDarkMode] = useState(true); // default to dark if preferred

  return (
    <div
      className="flex min-h-screen"
      style={{ filter: darkMode ? 'invert(1)' : 'none' }}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-1 bg-black text-white font-inter flex flex-col p-6">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-semibold">CMO Mode</h1>
          <p className="mt-2 text-lg text-gray-300">(powered by BetterInsights™)</p>
          <p className="mt-4 text-base text-gray-400">Your on-demand Chief Marketing Officer</p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button className="bg-white text-black py-3 px-4 rounded-lg hover:opacity-90">
            Review my last Meta campaign
          </button>
          <button className="bg-white text-black py-3 px-4 rounded-lg hover:opacity-90">
            Give me a 7-day launch plan for this product
          </button>
          <button className="bg-white text-black py-3 px-4 rounded-lg hover:opacity-90">
            Why didn't this campaign convert?
          </button>
          <button className="bg-white text-black py-3 px-4 rounded-lg hover:opacity-90">
            What hooks should I test next?
          </button>
        </div>

        {/* Chat Interface */}
        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 bg-gray-800 text-white placeholder-gray-500 py-3 px-4 rounded-l-lg focus:outline-none"
            />
            <button className="bg-white text-black py-3 px-6 rounded-r-lg hover:opacity-90">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
