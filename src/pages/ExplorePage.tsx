import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Users, Type as UserType, Building, X } from 'lucide-react';
import PostCard from '../components/posts/PostCard';
import UserAvatar from '../components/shared/UserAvatar';
import { defaultPosts } from '../types/post';
import { defaultUser, User, UserRole } from '../types/user';
import { Link } from 'react-router-dom';

const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'startups' | 'vcs'>('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filter, setFilter] = useState<UserRole | 'all'>(
    (searchParams.get('filter') as UserRole) || 'all'
  );

  // Update search params when filter changes
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (filter !== 'all') params.filter = filter;
    setSearchParams(params);
  }, [filter, searchQuery, setSearchParams]);

  // Update active tab based on filter
  useEffect(() => {
    if (filter === 'startup') setActiveTab('startups');
    else if (filter === 'vc') setActiveTab('vcs');
    else setActiveTab('all');
  }, [filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update search params
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (filter !== 'all') params.filter = filter;
    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter posts and users based on search query and filter
  const filteredPosts = defaultPosts.filter(post => {
    const matchesQuery = !searchQuery || post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const author = defaultUser.find(u => u.id === post.authorId);
    const matchesFilter = filter === 'all' || (author && author.role === filter);
    return matchesQuery && matchesFilter;
  });

  const filteredUsers = defaultUser.filter(user => {
    const matchesQuery = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.role === 'startup' && user.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.role === 'vc' && user.investmentFocus.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'all' || user.role === filter;
    return matchesQuery && matchesFilter;
  });

  const filteredStartups = filteredUsers.filter(user => user.role === 'startup');
  const filteredVCs = filteredUsers.filter(user => user.role === 'vc');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>
        
        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            placeholder="Search for VCs, startups, or posts..."
            className="input pr-20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {setActiveTab('all'); setFilter('all');}}
            className={`flex items-center px-4 py-2 font-medium border-b-2 ${
              activeTab === 'all'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            <Users className="h-5 w-5 mr-2" />
            All
          </button>
          
          <button
            onClick={() => {setActiveTab('posts'); setFilter('all');}}
            className={`flex items-center px-4 py-2 font-medium border-b-2 ${
              activeTab === 'posts'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            Posts
          </button>
          
          <button
            onClick={() => {setActiveTab('startups'); setFilter('startup');}}
            className={`flex items-center px-4 py-2 font-medium border-b-2 ${
              activeTab === 'startups'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            <Building className="h-5 w-5 mr-2" />
            Startups
          </button>
          
          <button
            onClick={() => {setActiveTab('vcs'); setFilter('vc');}}
            className={`flex items-center px-4 py-2 font-medium border-b-2 ${
              activeTab === 'vcs'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            <UserType className="h-5 w-5 mr-2" />
            VCs
          </button>
        </div>
      </div>
      
      <div>
        {/* All Tab */}
        {activeTab === 'all' && (
          <>
            {filteredPosts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Posts</h2>
                <div className="space-y-6">
                  {filteredPosts.slice(0, 2).map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
            
            {filteredStartups.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Startups</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredStartups.slice(0, 4).map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}
            
            {filteredVCs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Venture Capitalists</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredVCs.slice(0, 4).map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}
            
            {filteredPosts.length === 0 && filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No results found</p>
              </div>
            )}
          </>
        )}
        
        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <>
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No posts found</p>
              </div>
            )}
          </>
        )}
        
        {/* Startups Tab */}
        {activeTab === 'startups' && (
          <>
            {filteredStartups.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredStartups.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No startups found</p>
              </div>
            )}
          </>
        )}
        
        {/* VCs Tab */}
        {activeTab === 'vcs' && (
          <>
            {filteredVCs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredVCs.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No VCs found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Link to={`/profile/${user.id}`} className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <UserAvatar user={user} size="lg" />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{user.name}</h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.role === 'startup' ? 'Startup' : 'Venture Capitalist'}
          </p>
          
          {user.role === 'startup' && (
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate">
              <span className="font-medium">Industry:</span> {user.industry}
            </p>
          )}
          
          {user.role === 'vc' && (
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate">
              <span className="font-medium">Focus:</span> {user.investmentFocus}
            </p>
          )}
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {user.bio}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ExplorePage;