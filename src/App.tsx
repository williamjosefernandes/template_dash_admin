import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { AppRoutes } from './routes';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-2 bg-green-800 text-white rounded-lg lg:hidden z-50"
        >
          <Menu size={24} />
        </button>
        
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="lg:ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <AppRoutes />
          </div>
        </main>

        <PWAInstallPrompt />
      </div>
    </Router>
  );
}

export default App;