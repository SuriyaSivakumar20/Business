import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, MapPin, Calendar, ExternalLink, Users, MessageSquare } from 'lucide-react';
import { defaultUser, User } from '../types/user';
import { defaultPosts } from '../types/post';
import PostCard from '../components/posts/PostCard';
import CreatePostCard from '../components/posts/CreatePostCard';
import UserAvatar from '../components/shared/UserAvatar';
import { useUser } from '../contexts/UserContext';
import { formatDistanceToNow } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    companyName: '',
    industry: '',
    fundingNeeds: '',
    pitchDetails: '',
    investmentFocus: '',
    fundingCapacity: ''
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const foundUser = defaultUser.find(u => u.id === id);
    setUser(foundUser || null);
    setIsCurrentUserProfile(currentUser?.id === id);
    
    if (foundUser) {
      setEditForm({
        name: foundUser.name,
        bio: foundUser.bio,
        companyName: foundUser.role === 'startup' ? foundUser.companyName : '',
        industry: foundUser.role === 'startup' ? foundUser.industry : '',
        fundingNeeds: foundUser.role === 'startup' ? foundUser.fundingNeeds : '',
        pitchDetails: foundUser.role === 'startup' ? foundUser.pitchDetails : '',
        investmentFocus: foundUser.role === 'vc' ? foundUser.investmentFocus : '',
        fundingCapacity: foundUser.role === 'vc' ? foundUser.fundingCapacity : ''
      });
    }
    
    setLoading(false);
  }, [id, currentUser]);
  
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // In a real app, this would call an API to update the user
    const updatedUser = {
      ...user,
      name: editForm.name,
      bio: editForm.bio,
      ...(user.role === 'startup' ? {
        companyName: editForm.companyName,
        industry: editForm.industry,
        fundingNeeds: editForm.fundingNeeds,
        pitchDetails: editForm.pitchDetails
      } : {
        investmentFocus: editForm.investmentFocus,
        fundingCapacity: editForm.fundingCapacity
      })
    };
    
    setUser(updatedUser);
    setIsEditing(false);
  };
  
  const handleMessage = () => {
    // In a real app, this would create or find a conversation
    window.location.href = '/messages';
  };
  
  const handleFollow = () => {
    // In a real app, this would call an API
    console.log('Follow/Unfollow user');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">User not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The profile you're looking for doesn't exist.</p>
        <Link to="/explore" className="btn btn-primary">
          Explore Users
        </Link>
      </div>
    );
  }
  
  const userPosts = defaultPosts.filter(post => post.authorId === user.id);
  const isFollowing = user.followers.includes(currentUser?.id || '');
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="card overflow-hidden mb-6 animate-fade-in">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-6">
            <div className="relative">
              <UserAvatar 
                user={user} 
                size="xl" 
                className="border-4 border-white dark:border-gray-800 shadow-lg" 
              />
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                {user.role === 'vc' ? (
                  <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                ) : (
                  <div className="w-4 h-4 bg-secondary-600 rounded-full"></div>
                )}
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 md:mb-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                    {user.role === 'vc' ? 'Venture Capitalist' : `${user.companyName} • Startup`}
                  </p>
                </div>
                
                {!isCurrentUserProfile && (
                  <div className="flex mt-4 md:mt-0 space-x-3">
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
                      <Users className="h-4 w-4 mr-2" />
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                )}
                
                {isCurrentUserProfile && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline flex items-center mt-4 md:mt-0"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
              
              <div className="flex items-center mt-4 space-x-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="font-medium">{user.followers.length}</span>
                  <span className="ml-1">Followers</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">{user.following.length}</span>
                  <span className="ml-1">Following</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</span>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {user.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar - User Details */}
        <div className="lg:col-span-1">
          <div className="card p-6 mb-6 animate-slide-up">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {user.role === 'vc' ? 'Investment Details' : 'Startup Details'}
            </h2>
            
            <div className="space-y-4">
              {user.role === 'vc' ? (
                <>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Investment Focus</h3>
                    <p className="text-gray-700 dark:text-gray-300">{user.investmentFocus}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Funding Capacity</h3>
                    <p className="text-gray-700 dark:text-gray-300">{user.fundingCapacity}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Industry</h3>
                    <p className="text-gray-700 dark:text-gray-300">{user.industry}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Funding Needs</h3>
                    <p className="text-gray-700 dark:text-gray-300">{user.fundingNeeds}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Pitch</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{user.pitchDetails}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Activity Stats */}
          <div className="card p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Activity</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Posts</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{userPosts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Likes Received</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {userPosts.reduce((total, post) => total + post.likes.length, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Comments</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {userPosts.reduce((total, post) => total + post.comments.length, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content - Posts */}
        <div className="lg:col-span-2">
          {isCurrentUserProfile && (
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CreatePostCard onPostCreated={() => window.location.reload()} />
            </div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {isCurrentUserProfile ? 'Your Posts' : `${user.name.split(' ')[0]}'s Posts`}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
          
          {userPosts.length > 0 ? (
            <div className="space-y-6 animate-fade-in">
              {userPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {isCurrentUserProfile ? 'Share your first post' : 'No posts yet'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {isCurrentUserProfile 
                  ? 'Start sharing updates about your work and connect with the community.'
                  : `${user.name.split(' ')[0]} hasn't shared any posts yet.`
                }
              </p>
              {isCurrentUserProfile && (
                <button 
                  onClick={() => document.querySelector('textarea')?.focus()}
                  className="btn btn-primary"
                >
                  Create Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Edit Profile</h2>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="input"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  className="input min-h-[100px]"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              {user.role === 'startup' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <input
                      type="text"
                      className="input"
                      value={editForm.companyName}
                      onChange={(e) => setEditForm({...editForm, companyName: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Industry</label>
                    <input
                      type="text"
                      className="input"
                      value={editForm.industry}
                      onChange={(e) => setEditForm({...editForm, industry: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Funding Needs</label>
                    <input
                      type="text"
                      className="input"
                      value={editForm.fundingNeeds}
                      onChange={(e) => setEditForm({...editForm, fundingNeeds: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Pitch Details</label>
                    <textarea
                      className="input min-h-[100px]"
                      value={editForm.pitchDetails}
                      onChange={(e) => setEditForm({...editForm, pitchDetails: e.target.value})}
                      placeholder="Describe your startup and what makes it unique..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Investment Focus</label>
                    <input
                      type="text"
                      className="input"
                      value={editForm.investmentFocus}
                      onChange={(e) => setEditForm({...editForm, investmentFocus: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Funding Capacity</label>
                    <input
                      type="text"
                      className="input"
                      value={editForm.fundingCapacity}
                      onChange={(e) => setEditForm({...editForm, fundingCapacity: e.target.value})}
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;