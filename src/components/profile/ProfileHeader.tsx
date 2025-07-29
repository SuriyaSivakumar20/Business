import React from 'react';
import { MessageSquare, UserPlus, UserCheck } from 'lucide-react';
import { User } from '../../types/user';
import UserAvatar from '../shared/UserAvatar';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { user: currentUser } = useUser();
  const navigate = useNavigate();
  const isCurrentUser = currentUser?.id === user.id;
  const isFollowing = user.followers.includes(currentUser?.id || '');
  
  const handleMessage = () => {
    // In a real app, we would create or find an existing conversation
    // For now, let's assume conversation-1 is with this user
    navigate('/messages/conversation-1');
  };
  
  const handleFollow = () => {
    // In a real app, this would call an API to update the follow status
    console.log(isFollowing ? 'Unfollow' : 'Follow', user.id);
  };
  
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-t-xl"></div>
      
      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end -mt-16 mb-4">
          <UserAvatar user={user} size="xl" className="border-4 border-white dark:border-gray-800" />
          
          <div className="mt-4 sm:mt-0 sm:ml-6 sm:mb-4 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
            
            <div className="flex items-center mt-1 text-gray-600 dark:text-gray-300">
              <span className="text-sm">
                {user.role === 'vc' ? 'Venture Capitalist' : 'Startup'}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm">
                {user.followers.length} {user.followers.length === 1 ? 'Follower' : 'Followers'}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm">
                {user.following.length} Following
              </span>
            </div>
          </div>
          
          {!isCurrentUser && (
            <div className="flex mt-4 sm:mt-0 space-x-3">
              <button 
                onClick={handleMessage}
                className="btn btn-outline flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </button>
              
              <button 
                onClick={handleFollow}
                className={`btn ${isFollowing ? 'btn-outline' : 'btn-primary'} flex items-center`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;