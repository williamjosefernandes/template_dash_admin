import { useLocation } from 'react-router-dom';
import { User, Settings, LogOut, Menu } from 'lucide-react';
import { Dropdown, DropdownItem } from './ui/Dropdown';

interface TopNavbarProps {
  toggleSidebar: () => void;
}

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    default:
      return 'Dashboard';
  }
};

export function TopNavbar({ toggleSidebar }: TopNavbarProps) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
          </div>
          <div className="flex items-center">
            <Dropdown
              trigger={
                <button className="flex items-center space-x-3 group">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User avatar"
                      className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-green-500 transition-colors"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      João Silva
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-700">
                      joao.silva@email.com
                    </p>
                  </div>
                </button>
              }
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">João Silva</p>
                <p className="text-xs text-gray-500 truncate">
                  joao.silva@email.com
                </p>
              </div>
              <DropdownItem icon={<User size={16} />}>
                Minha Conta
              </DropdownItem>
              <DropdownItem icon={<Settings size={16} />}>
                Configurações
              </DropdownItem>
              <div className="border-t border-gray-100">
                <DropdownItem icon={<LogOut size={16} />} onClick={handleLogout}>
                  Sair
                </DropdownItem>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}