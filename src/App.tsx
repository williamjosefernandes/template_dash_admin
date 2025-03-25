import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AppRoutes } from './routes';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { TopNavbar } from './components/TopNavbar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="lg:ml-64">
          <TopNavbar toggleSidebar={toggleSidebar} />
          <main className="p-8">
            <div className="max-w-7xl mx-auto">
              <AppRoutes />
            </div>
          </main>
        </div>

        <PWAInstallPrompt />
      </div>
    </Router>
  );
}

export default App;