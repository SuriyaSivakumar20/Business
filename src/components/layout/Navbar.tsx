import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Bird, X, Moon, Sun } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';
import UserAvatar from '../shared/UserAvatar';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Bird className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-600">B.I.R.D.</span>
            </Link>
          </div>

          {/* Search Bar - Hide on mobile */}
          {isAuthenticated && (
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for VCs, startups, or posts..."
                  className="input pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}

          {/* Nav Links and Profile - Hide on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/messages" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center">
                    <UserAvatar user={user} size="sm" />
                  </button>
                  
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to={`/profile/${user?.id}`} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Log in
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
          {isAuthenticated && (
            <div className="px-4 py-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>
          )}
          
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 flex items-center">
                  <UserAvatar user={user} size="sm" />
                  <span className="ml-3 font-medium">{user?.name}</span>
                </div>
                <Link to="/feed" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Feed</Link>
                <Link to="/explore" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Explore</Link>
                <Link to="/messages" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Messages</Link>
                <Link to={`/profile/${user?.id}`} className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Log in</Link>
                <Link to="/signup" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;