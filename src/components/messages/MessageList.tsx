import React, { useEffect, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../../types/message';
import { User } from '../../types/user';
import UserAvatar from '../shared/UserAvatar';
import { defaultUser } from '../../types/user';
import { useUser } from '../../contexts/UserContext';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user: currentUser } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!messages.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Send a message to start the conversation
        </p>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  messages.forEach(message => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-3">
          <div className="flex justify-center">
            <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
              {date === new Date().toLocaleDateString() ? 'Today' : date}
            </span>
          </div>
          
          {dateMessages.map(message => {
            const isMine = message.senderId === currentUser?.id;
            const sender = defaultUser.find(u => u.id === message.senderId) as User;
            
            return (
              <div key={message.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[75%] ${isMine ? 'flex-row-reverse' : ''}`}>
                  {!isMine && <UserAvatar user={sender} size="sm" className="mt-1" />}
                  
                  <div className={`flex flex-col ${isMine ? 'mr-2 items-end' : 'ml-2 items-start'}`}>
                    <div 
                      className={`px-4 py-2 rounded-xl ${
                        isMine 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;