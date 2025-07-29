import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { defaultUser, User } from '../types/user';
import { defaultPosts } from '../types/post';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileDetails from '../components/profile/ProfileDetails';
import PostCard from '../components/posts/PostCard';
import CreatePostCard from '../components/posts/CreatePostCard';
import { useUser } from '../contexts/UserContext';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch user data from an API
    const foundUser = defaultUser.find(u => u.id === id);
    setUser(foundUser || null);
    setIsCurrentUserProfile(currentUser?.id === id);
    setLoading(false);
  }, [id, currentUser]);
  
  if (loading) {
    return <div className="py-12 text-center">Loading profile...</div>;
  }
  
  if (!user) {
    return <div className="py-12 text-center">User not found</div>;
  }
  
  // Get posts by this user
  const userPosts = defaultPosts.filter(post => post.authorId === user.id);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card overflow-hidden mb-6">
        <ProfileHeader user={user} />
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileDetails user={user} />
        </div>
        
        <div className="md:col-span-2">
          {isCurrentUserProfile && (
            <CreatePostCard />
          )}
          
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          
          {userPosts.length > 0 ? (
            <div className="space-y-6">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;