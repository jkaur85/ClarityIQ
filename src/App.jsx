import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Customers from './pages/Customers';
import CustomerAssetsTracker from './pages/CustomerAssetsTracker';
import ArchivedAssets from './pages/ArchivedAssets';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <div className="app-main">
          <TopBar />
          <main className="app-content">
            <Routes>
              <Route path="/"            element={<Dashboard />} />
              <Route path="/onboarding"  element={<Onboarding />} />
              <Route path="/customers"   element={<Customers />} />
              <Route path="/customer-assets" element={<CustomerAssetsTracker />} />
              <Route path="/archived-assets" element={<ArchivedAssets />} />
              <Route path="/reports"     element={<Reports />} />
              <Route path="/settings"    element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
