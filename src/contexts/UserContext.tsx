import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, defaultUser } from '../types/user';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in a real app, this would call an API
    try {
      // Find user in mock data
      const mockUser = defaultUser.find(u => u.email === email);
      
      if (mockUser && password === 'password') { // Simple mock password check
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // Mock signup - in a real app, this would call an API
    try {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: userData.name || 'New User',
        email: userData.email || '',
        role: userData.role || 'startup',
        avatar: userData.avatar || null,
        bio: userData.bio || '',
        followers: [],
        following: [],
        createdAt: new Date().toISOString(),
        ...(userData.role === 'startup' 
          ? {
              companyName: userData.companyName || '',
              industry: userData.industry || '',
              fundingNeeds: userData.fundingNeeds || '',
              pitchDetails: userData.pitchDetails || '',
            } 
          : {
              investmentFocus: userData.investmentFocus || '',
              fundingCapacity: userData.fundingCapacity || '',
            })
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};