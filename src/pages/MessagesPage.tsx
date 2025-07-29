import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenSquare, Search } from 'lucide-react';
import ConversationList from '../components/messages/ConversationList';
import { defaultConversations } from '../types/message';

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredConversations = defaultConversations.filter(conversation => {
    if (!searchQuery) return true;
    
    // In a real app, this would search user names, last message content, etc.
    // For now, we'll just return all conversations
    return true;
  });
  
  const handleNewMessage = () => {
    // In a real app, this would open a modal or navigate to a new message page
    // For now, we'll just navigate to the explore page
    navigate('/explore');
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        
        <button 
          onClick={handleNewMessage}
          className="btn btn-primary flex items-center"
        >
          <PenSquare className="h-4 w-4 mr-2" />
          New Message
        </button>
      </div>
      
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="input pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <Search className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        <div className="max-h-[600px] overflow-y-auto">
          <ConversationList conversations={filteredConversations} />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;