import React from 'react';
import { Link } from 'react-router-dom';
import { Bird, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-6 bg-primary-100 dark:bg-primary-900/20 p-4 rounded-full">
        <Bird className="h-12 w-12 text-primary-600" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link
        to="/"
        className="btn btn-primary flex items-center"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;