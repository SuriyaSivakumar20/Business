import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, DollarSign, Users, MessageSquare, Zap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <Bird className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent animate-fade-in">
            Connecting Investors & Innovators for a Smarter Future
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            B.I.R.D. is the platform where Venture Capitalists and Startups connect, share ideas, and build the future together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/feed" className="btn btn-primary px-8 py-3 text-lg">
                Go to Feed
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary px-8 py-3 text-lg">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline px-8 py-3 text-lg">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Where Innovation Meets Investment
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover:shadow-lg transition-shadow animate-fade-in">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Funding Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect directly with VCs actively seeking to invest in innovative startups across various industries.
              </p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '150ms' }}>
              <div className="flex justify-center mb-4">
                <div className="bg-secondary-100 dark:bg-secondary-900/20 p-3 rounded-full">
                  <Users className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Startup Showcase</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your vision, progress, and achievements with a community of investors looking for the next big thing.
              </p>
            </div>
            
            <div className="card p-6 text-center hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex justify-center mb-4">
                <div className="bg-accent-100 dark:bg-accent-900/20 p-3 rounded-full">
                  <MessageSquare className="h-8 w-8 text-accent-600 dark:text-accent-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Messaging</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Private conversations between startups and investors, enabling efficient communication and relationship building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-accent-100 dark:bg-accent-900/20 p-3 rounded-full">
                <Zap className="h-8 w-8 text-accent-600 dark:text-accent-400" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Ideas Into Reality?
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join B.I.R.D. today and be part of a community that's shaping the future of business and innovation.
            </p>
            
            {!isAuthenticated && (
              <Link to="/signup" className="btn btn-primary px-8 py-3 text-lg">
                Join the Community
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;