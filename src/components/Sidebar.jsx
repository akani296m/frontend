import React, { useState } from 'react';
import {
  Paperclip,
  ChevronDown,
  ArrowRight,
  LayoutGrid,
  Bell,
  FileText,
  DollarSign,
  LineChart,
  Home,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ darkMode, setDarkMode }) {
  const navItems = [
    { label: 'Dashboard', icon: LayoutGrid, to: '/' },
    { label: 'Campaigns', icon: Bell, to: '/campaigns', badge: '99+' },
    { label: 'Assets', icon: FileText, to: '/assets' },
    { label: 'Studio', icon: DollarSign, to: '/studio' },
    { label: 'Performance', icon: LineChart, to: '/performance' },
  ];

  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Campaign 1', isEditing: false },
    { id: 2, name: 'Campaign 2', isEditing: false },
    { id: 3, name: 'Campaign 3', isEditing: false },
  ]);

  const handleEdit = (id) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === id ? { ...fav, isEditing: true } : fav))
    );
  };

  const handleChange = (id, newName) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === id ? { ...fav, name: newName } : fav))
    );
  };

  const handleSave = (id) => {
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === id ? { ...fav, isEditing: false } : fav))
    );
  };

  return (
    <aside className="w-[260px] min-w-[260px] bg-[#F9FAFB] h-screen rounded-tr-lg rounded-br-lg flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        <div className="flex items-center mb-6">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A770EF] to-[#FDB99B] flex items-center justify-center mr-2" />
          <span className="font-semibold text-base text-[#111827] mr-1">Marketable</span>
          <ChevronDown className="text-gray-500" size={12} />
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full py-3 px-4 pl-10 border border-[#E5E7EB] rounded-lg bg-white text-sm placeholder-[#6B7280]"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        <ul>
          {navItems.map(({ label, icon: Icon, to, badge }) => (
            <li key={label} className="mb-2">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center w-full py-2 px-4 rounded-lg transition-all ${
                    isActive
                    ? 'bg-[#EFEAFE] text-[#7355FF] border-l-4 border-[#7355FF]'
                    : 'text-[#4B5563] hover:bg-gray-100'
                  }`
                }
              >
                <div className="relative mr-3">
                  <Icon size={24} />
                  {badge && (
                    <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[10px] rounded-full px-1">
                      {badge}
                    </span>
                  )}
                </div>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Favorites */}
        <div className="mt-6">
          <p className="px-4 text-[11px] text-[#9CA3AF] tracking-wide mb-2">FAVORITES</p>
          <ul>
            {favorites.map((fav) => (
              <li key={fav.id} className="mb-1">
                <div className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-100">
                  {fav.isEditing ? (
                    <input
                      type="text"
                      value={fav.name}
                      onChange={(e) => handleChange(fav.id, e.target.value)}
                      onBlur={() => handleSave(fav.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSave(fav.id);
                          e.preventDefault();
                        }
                      }}
                      autoFocus
                      className="w-full bg-white border border-gray-300 rounded shadow-sm p-1 text-sm focus:outline-none"
                    />
                  ) : (
                    <span className="text-[#6B7280] text-sm font-medium">{fav.name}</span>
                  )}
                  {!fav.isEditing && (
                    <button
                      onClick={() => handleEdit(fav.id)}
                      className="text-[#6B7280] text-xl font-bold focus:outline-none"
                    >
                      ...
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer Links */}
      <div>
        <ul>
          {[
            { label: 'Home', icon: Home },
            { label: 'Settings', icon: Settings },
            { label: 'Help Center', icon: HelpCircle },
          ].map(({ label, icon: Icon }) => (
            <li key={label} className="mb-2">
              <button className="flex items-center w-full py-2 px-4 text-[#6B7280] rounded-lg hover:bg-gray-100">
                <Icon size={20} className="mr-3" />
                <span className="text-sm">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <div className="mt-4 px-4">
          <p className="text-[11px] text-[#9CA3AF] tracking-wide mb-2">Mode</p>
          <div className="flex items-center justify-between py-2 px-2">
            <span className="text-sm text-[#6B7280]">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <div
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer"
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md absolute top-0.5 transition-all ${
                  darkMode ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
