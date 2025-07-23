import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection';

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex min-h-screen bg-white" style={{ filter: darkMode ? 'invert(1)' : 'none' }}>
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 p-8">
        <HeroSection />
      </main>
    </div>
  );
}
