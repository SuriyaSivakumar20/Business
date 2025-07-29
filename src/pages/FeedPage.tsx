import React from 'react';
import PostCard from '../components/posts/PostCard';
import CreatePostCard from '../components/posts/CreatePostCard';
import { defaultPosts } from '../types/post';

const FeedPage: React.FC = () => {
  const [posts, setPosts] = React.useState(defaultPosts);

  // Sort posts by created date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handlePostCreated = () => {
    // In a real app, this would fetch the latest posts from the server
    console.log('Post created');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feed</h1>
      
      <CreatePostCard onPostCreated={handlePostCreated} />
      
      <div>
        {sortedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;