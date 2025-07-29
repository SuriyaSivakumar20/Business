import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const LoginPage: React.FC = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/feed');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Log in to your B.I.R.D. account
        </p>
      </div>
      
      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="mt-1 text-right">
              <a href="#" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-300 dark:border-gray-700 absolute w-full"></div>
            <div className="bg-white dark:bg-gray-800 px-3 relative z-10 text-sm text-gray-500 dark:text-gray-400">
              Or continue with
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="btn btn-outline flex items-center justify-center"
            >
              <span>Demo VC</span>
            </button>
            <button
              type="button"
              className="btn btn-outline flex items-center justify-center"
            >
              <span>Demo Startup</span>
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>For demo, use any of these credentials:</p>
        <ul className="mt-2 space-y-1">
          <li>VC: vc@example.com / password</li>
          <li>Startup: startup@example.com / password</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;