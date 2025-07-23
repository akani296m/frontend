import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Studio from "./pages/Studio";
import CMOModePage from "./pages/CMOModePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/cmo" element={<CMOModePage />} />
      </Routes>
    </Router>
  );
}

export default App;
