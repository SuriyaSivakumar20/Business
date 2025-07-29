import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, MessageSquare, User, Users } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Sidebar: React.FC = () => {
  const { user } = useUser();

  const navItems = [
    { to: '/feed', icon: <Home className="h-5 w-5" />, label: 'Feed' },
    { to: '/explore', icon: <Search className="h-5 w-5" />, label: 'Explore' },
    { to: '/messages', icon: <MessageSquare className="h-5 w-5" />, label: 'Messages' },
    { to: `/profile/${user?.id}`, icon: <User className="h-5 w-5" />, label: 'Profile' },
  ];

  return (
    <div className="h-full p-4">
      <div className="space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {item.icon}
            <span className="ml-3 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
      
      {user?.role === 'vc' && (
        <div className="mt-8">
          <h3 className="px-4 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Top Startups</h3>
          <div className="space-y-1">
            <NavLink
              to="/explore?filter=startups"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Users className="h-4 w-4 text-accent-500" />
              <span className="ml-3">Discover Startups</span>
            </NavLink>
          </div>
        </div>
      )}
      
      {user?.role === 'startup' && (
        <div className="mt-8">
          <h3 className="px-4 mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Potential Investors</h3>
          <div className="space-y-1">
            <NavLink
              to="/explore?filter=vcs"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Users className="h-4 w-4 text-accent-500" />
              <span className="ml-3">Find Investors</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;