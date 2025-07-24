// src/pages/CampaignsPage.jsx
import React, { useState, useMemo } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout';

const INITIAL_CAMPAIGNS = [
  {
    id: 1,
    name: 'Collagen Mask Ad Campaign',
    owner: 'Me',
    lastModified: '4 minutes ago',
    visibility: 'private',
  },
  {
    id: 2,
    name: 'Facebook Ad Campaign',
    owner: 'Me',
    lastModified: '6 minutes ago',
    visibility: 'private',
  },
];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('my');
  const [search, setSearch] = useState('');
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const navigate = useNavigate();

  // filter campaigns by tab & search
  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      const matchesTab = activeTab === 'all' || c.owner === 'Me';
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [campaigns, activeTab, search]);

  const handleCreate = () => {
    if (!newName.trim() || !newGoal.trim()) return;
    const newCampaign = {
      id: Date.now(),
      name: newName.trim(),
      owner: 'Me',
      lastModified: 'Just now',
      visibility: 'private',
      goal: newGoal.trim(),
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setNewName('');
    setNewGoal('');
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="flex-1 p-8 space-y-6">
        {/* breadcrumbs */}
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center space-x-1">
            <li><span>Home</span></li>
            <li className="before:content-['/'] before:mx-2 text-gray-300" />
            <li className="font-medium text-gray-900">Campaigns</li>
          </ol>
        </nav>

        {/* header + create button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-500">Any projects you have created will appear here.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            + Create new campaign
          </button>
        </div>

        {/* tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'my', label: 'My Projects' },
              { key: 'all', label: 'All Campaigns' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* search */}
        <div>
          <div className="relative max-w-xs">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Owner', 'Last modified', 'Visibility', ''].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/campaigns/${c.id}`)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.owner}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center">
                    <Lock className="mr-1" size={14} /> {c.visibility}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">•••</button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* modal overlay */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">New Campaign</h2>
              <input
                type="text"
                placeholder="Campaign Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <input
                type="text"
                placeholder="Goal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
