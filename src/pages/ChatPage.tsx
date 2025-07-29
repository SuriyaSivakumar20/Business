import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Video, Info } from 'lucide-react';
import MessageList from '../components/messages/MessageList';
import MessageInput from '../components/messages/MessageInput';
import UserAvatar from '../components/shared/UserAvatar';
import { defaultMessages, defaultConversations, Message } from '../types/message';
import { defaultUser, User } from '../types/user';
import { useUser } from '../contexts/UserContext';

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useUser();
  const [conversation, setConversation] = useState(
    defaultConversations.find(c => c.id === id)
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (conversation) {
      // Find the other user in the conversation
      const otherUserId = conversation.participants.find(uid => uid !== currentUser?.id);
      const foundUser = defaultUser.find(u => u.id === otherUserId);
      setOtherUser(foundUser || null);
      
      // Get messages for this conversation
      setMessages(defaultMessages[conversation.id] || []);
    }
  }, [conversation, currentUser]);
  
  const handleSendMessage = (content: string) => {
    if (!conversation || !currentUser) return;
    
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      conversationId: conversation.id,
      senderId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    // In a real app, this would call an API to send the message
    // For now, we'll just update the local state
    setMessages([...messages, newMessage]);
  };
  
  if (!conversation || !otherUser) {
    return <div className="py-12 text-center">Conversation not found</div>;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Link to="/messages" className="mr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <Link to={`/profile/${otherUser.id}`} className="flex items-center">
              <UserAvatar user={otherUser} size="md" />
              <div className="ml-3">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">{otherUser.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {otherUser.role === 'startup' ? otherUser.companyName : 'Venture Capitalist'}
                </p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Messages */}
        <MessageList messages={messages} />
        
        {/* Message Input */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;