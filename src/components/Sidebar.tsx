import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, 
  Trophy,
  LayoutDashboard,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/' },
];

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={toggleSidebar}
      />
      <aside className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Fixed Header */}
        <div className="p-5 border-b border-green-700">
          <div className="flex items-center space-x-2">
            <Trophy size={24} />
            <h2 className="text-2xl font-bold">Template</h2>
          </div>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-transparent hover:scrollbar-thumb-green-600">
          <nav className="px-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full p-3 rounded transition-colors ${
                  location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? 'bg-green-700 text-white'
                    : 'hover:bg-green-700'
                }`}
              >
                <item.icon size={20} />
                <span className="whitespace-nowrap">{item.text}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-green-700">
          <button 
            className="flex items-center space-x-3 w-full p-3 rounded hover:bg-green-700 transition-colors"
            onClick={() => {/* Handle logout */}}
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}