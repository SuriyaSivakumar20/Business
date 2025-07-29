import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Send, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post, Comment } from '../../types/post';
import { User } from '../../types/user';
import UserAvatar from '../shared/UserAvatar';
import ImageGallery from '../shared/ImageGallery';
import { defaultUser } from '../../types/user';
import { useUser } from '../../contexts/UserContext';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user: currentUser } = useUser();
  const [liked, setLiked] = useState(post.likes.includes(currentUser?.id || ''));
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  
  // Find author from our mock data
  const author = defaultUser.find(u => u.id === post.authorId) as User;
  
  const handleLike = () => {
    setLiked(!liked);
    // In a real app, this would call an API to update the like status
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // In a real app, this would call an API to add the comment
    // For now, we'll just reset the form
    setCommentText('');
  };
  
  const toggleComments = () => {
    if (commentsVisible) {
      setCommentsVisible(false);
      setTimeout(() => setShowComments(false), 300); // Wait for animation to complete
    } else {
      setShowComments(true);
      setTimeout(() => setCommentsVisible(true), 10); // Small delay to trigger animation
    }
  };

  return (
    <article className="card mb-6 animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link to={`/profile/${author.id}`} className="flex items-center">
          <UserAvatar user={author} size="md" />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{author.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </Link>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      
      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.content}</p>
        
        {post.images.length > 0 && (
          <ImageGallery images={post.images} alt={`Post by ${author.name}`} />
        )}
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleLike}
          className={`flex items-center mr-6 ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
          <span className="ml-2">{post.likes.length + (liked && !post.likes.includes(currentUser?.id || '') ? 1 : 0)}</span>
        </button>
        
        <button 
          onClick={toggleComments}
          className="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="ml-2">{post.comments.length}</span>
        </button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className={`border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
          commentsVisible ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="p-4 space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment: Comment) => {
                const commentAuthor = defaultUser.find(u => u.id === comment.authorId) as User;
                return (
                  <div key={comment.id} className="flex space-x-3">
                    <UserAvatar user={commentAuthor} size="sm" />
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                        <Link to={`/profile/${commentAuthor.id}`} className="font-medium text-gray-900 dark:text-gray-100">
                          {commentAuthor.name}
                        </Link>
                        <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No comments yet</p>
            )}
          </div>
          
          <form onSubmit={handleComment} className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
            <UserAvatar user={currentUser} size="sm" />
            <input
              type="text"
              placeholder="Add a comment..."
              className="input ml-3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="ml-2 text-primary-600 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};

export default PostCard;