import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  BarChart3,
  LogOut,
  Store
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard', href: '/' },
  { icon: Store, text: 'Merchants', href: '/merchants' },
  { icon: Users, text: 'Users', href: '/users' },
  { icon: ShoppingCart, text: 'Products', href: '/products' },
  { icon: BarChart3, text: 'Analytics', href: '/analytics' },
  { icon: Settings, text: 'Settings', href: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200 mb-1"
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.text}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200 w-full">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;