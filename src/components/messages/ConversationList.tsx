import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '../../types/message';
import { User } from '../../types/user';
import UserAvatar from '../shared/UserAvatar';
import { defaultUser } from '../../types/user';
import { useUser } from '../../contexts/UserContext';

interface ConversationListProps {
  conversations: Conversation[];
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations }) => {
  const { user: currentUser } = useUser();
  
  if (!conversations.length) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">No conversations yet</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Start a conversation by visiting a user's profile
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map(conversation => {
        // Find the other user in the conversation
        const otherUserId = conversation.participants.find(id => id !== currentUser?.id);
        const otherUser = defaultUser.find(u => u.id === otherUserId) as User;
        
        const hasUnread = conversation.lastMessage && 
          !conversation.lastMessage.read && 
          conversation.lastMessage.senderId !== currentUser?.id;
        
        return (
          <NavLink
            key={conversation.id}
            to={`/messages/${conversation.id}`}
            className={({ isActive }) => `
              flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
              ${isActive ? 'bg-gray-50 dark:bg-gray-800' : ''}
              ${hasUnread ? 'font-semibold' : ''}
            `}
          >
            <UserAvatar user={otherUser} size="md" />
            
            <div className="ml-3 flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {otherUser.name}
                </h3>
                {conversation.lastMessage && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                    {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { addSuffix: true })}
                  </span>
                )}
              </div>
              
              {conversation.lastMessage && (
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {conversation.lastMessage.senderId === currentUser?.id ? 'You: ' : ''}
                  {conversation.lastMessage.content}
                </p>
              )}
            </div>
            
            {hasUnread && (
              <div className="ml-2 w-3 h-3 rounded-full bg-primary-600"></div>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default ConversationList;