import React, { useState, useRef } from 'react';
import { Image, X } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import UserAvatar from '../shared/UserAvatar';

interface CreatePostCardProps {
  onPostCreated?: () => void;
}

const CreatePostCard: React.FC<CreatePostCardProps> = ({ onPostCreated }) => {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: string[] = [];
      const files = Array.from(e.target.files);
      
      files.forEach(file => {
        // In a real app, these would be uploaded to a server
        // For this demo, we'll use local URLs
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      });

      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    const removedUrl = newImages.splice(index, 1)[0];
    setSelectedImages(newImages);
    
    // Cleanup object URL to prevent memory leaks
    URL.revokeObjectURL(removedUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && selectedImages.length === 0) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would call an API to create the post
    setTimeout(() => {
      setContent('');
      setSelectedImages([]);
      setIsSubmitting(false);
      if (onPostCreated) onPostCreated();
    }, 1000);
  };

  return (
    <div className="card mb-6">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex space-x-3">
          <UserAvatar user={user} size="md" />
          <div className="flex-1">
            <textarea
              placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'there'}?`}
              className="w-full border-0 focus:ring-0 text-gray-800 dark:text-gray-200 bg-transparent resize-none min-h-[80px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {selectedImages.map((src, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden aspect-square">
                    <img
                      src={src}
                      alt={`Selected image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 text-white hover:bg-opacity-80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Image className="h-5 w-5" />
              <span className="ml-2 text-sm">Add Image</span>
            </button>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || (!content.trim() && selectedImages.length === 0)}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostCard;