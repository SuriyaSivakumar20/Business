import React, { useState } from 'react';
import { Send, Image, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800"
    >
      <div className="flex items-center">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-2"
        >
          <Image className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-3"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <input
          type="text"
          placeholder="Type a message..."
          className="input flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <button
          type="submit"
          disabled={!message.trim()}
          className="ml-3 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;