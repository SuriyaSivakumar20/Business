import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Type as UserType, UserCheck, Mail, Lock, User, Building } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { UserRole } from '../types/user';

const SignupPage: React.FC = () => {
  const { signup } = useUser();
  const navigate = useNavigate();
  
  const [role, setRole] = useState<UserRole>('startup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [investmentFocus, setInvestmentFocus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await signup({
        name,
        email,
        role,
        ...(role === 'startup' 
          ? { companyName, industry }
          : { investmentFocus })
      }, password);
      
      if (success) {
        navigate('/feed');
      } else {
        setError('Failed to create account');
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
        <h1 className="text-3xl font-bold mb-2">Join B.I.R.D.</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Create an account to connect with VCs and startups
        </p>
      </div>
      
      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">I am a:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('startup')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                  role === 'startup'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
                }`}
              >
                <Building className="h-6 w-6 mb-2" />
                <span className="font-medium">Startup</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('vc')}
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                  role === 'vc'
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
                }`}
              >
                <UserType className="h-6 w-6 mb-2" />
                <span className="font-medium">Venture Capitalist</span>
              </button>
            </div>
          </div>
          
          {/* Basic Info */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <User className="h-5 w-5" />
              </span>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          
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
                minLength={6}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <UserCheck className="h-5 w-5" />
              </span>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input pl-10"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>
          
          {/* Role Specific Fields */}
          {role === 'startup' && (
            <>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="input"
                  placeholder="Your Startup Name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-1">
                  Industry
                </label>
                <input
                  id="industry"
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="input"
                  placeholder="e.g., Fintech, AI, Healthcare"
                  required
                />
              </div>
            </>
          )}
          
          {role === 'vc' && (
            <div>
              <label htmlFor="investmentFocus" className="block text-sm font-medium mb-1">
                Investment Focus
              </label>
              <input
                id="investmentFocus"
                type="text"
                value={investmentFocus}
                onChange={(e) => setInvestmentFocus(e.target.value)}
                className="input"
                placeholder="e.g., SaaS, AI, Fintech"
                required
              />
            </div>
          )}
          
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;