import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Studio from "./pages/Studio";
import CMOModePage from "./pages/CMOModePage";
import CampaignsPage from './pages/CampaignsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/cmo" element={<CMOModePage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
