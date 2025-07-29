import React from 'react';
import { User } from '../../types/user';
import { Briefcase, Users, DollarSign, Building, Hash } from 'lucide-react';

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  if (user.role === 'vc') {
    return (
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Investor Details</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Briefcase className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Investment Focus</h3>
              <p className="text-gray-700 dark:text-gray-300">{user.investmentFocus}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Funding Capacity</h3>
              <p className="text-gray-700 dark:text-gray-300">{user.fundingCapacity}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Users className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Portfolio</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {user.following.length} companies
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Startup Details</h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Building className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Company</h3>
            <p className="text-gray-700 dark:text-gray-300">{user.companyName}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Hash className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Industry</h3>
            <p className="text-gray-700 dark:text-gray-300">{user.industry}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <DollarSign className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Funding Needs</h3>
            <p className="text-gray-700 dark:text-gray-300">{user.fundingNeeds}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Briefcase className="h-5 w-5 text-primary-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Pitch</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{user.pitchDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;