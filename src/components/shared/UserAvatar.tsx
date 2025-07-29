import React from 'react';
import { User } from '../../types/user';
import { UserIcon } from 'lucide-react';

interface UserAvatarProps {
  user: User | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  user, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-xl',
  };

  if (!user) {
    return (
      <div className={`avatar ${sizeClasses[size]} ${className}`}>
        <UserIcon className="h-1/2 w-1/2" />
      </div>
    );
  }

  if (user.avatar) {
    return (
      <div className={`avatar ${sizeClasses[size]} ${className}`}>
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // If image fails to load, replace with initials or icon
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = user.name.charAt(0).toUpperCase();
          }}
        />
      </div>
    );
  }

  return (
    <div className={`avatar ${sizeClasses[size]} ${className}`}>
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default UserAvatar;