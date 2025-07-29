import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useUser } from '../../contexts/UserContext';

const Layout: React.FC = () => {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        {isAuthenticated && (
          <aside className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-800">
            <Sidebar />
          </aside>
        )}
        
        <main className={`flex-1 ${isAuthenticated ? 'md:ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;