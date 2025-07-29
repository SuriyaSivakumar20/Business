export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message | null;
  createdAt: string;
  updatedAt: string;
}

// Mock conversations for development
export const defaultConversations: Conversation[] = [
  {
    id: 'conversation-1',
    participants: ['user-1', 'user-2'],
    lastMessage: {
      id: 'message-3',
      conversationId: 'conversation-1',
      senderId: 'user-2',
      content: 'I\'ll prepare a detailed pitch deck and send it over for your review.',
      createdAt: '2023-07-22T10:30:00Z',
      read: true,
    },
    createdAt: '2023-07-20T15:45:00Z',
    updatedAt: '2023-07-22T10:30:00Z',
  },
  {
    id: 'conversation-2',
    participants: ['user-1', 'user-3'],
    lastMessage: {
      id: 'message-5',
      conversationId: 'conversation-2',
      senderId: 'user-1',
      content: 'Your technology sounds promising. Let\'s schedule a call next week to discuss further.',
      createdAt: '2023-08-06T09:15:00Z',
      read: false,
    },
    createdAt: '2023-08-05T14:20:00Z',
    updatedAt: '2023-08-06T09:15:00Z',
  }
];

// Mock messages for development
export const defaultMessages: Record<string, Message[]> = {
  'conversation-1': [
    {
      id: 'message-1',
      conversationId: 'conversation-1',
      senderId: 'user-1',
      content: 'Hello, I saw your post about your AI customer service solution. I\'d like to learn more.',
      createdAt: '2023-07-20T15:45:00Z',
      read: true,
    },
    {
      id: 'message-2',
      conversationId: 'conversation-1',
      senderId: 'user-2',
      content: 'Hi! Thank you for reaching out. We\'d be happy to share more details about our technology and growth plans.',
      createdAt: '2023-07-20T16:00:00Z',
      read: true,
    },
    {
      id: 'message-3',
      conversationId: 'conversation-1',
      senderId: 'user-2',
      content: 'I\'ll prepare a detailed pitch deck and send it over for your review.',
      createdAt: '2023-07-22T10:30:00Z',
      read: true,
    }
  ],
  'conversation-2': [
    {
      id: 'message-4',
      conversationId: 'conversation-2',
      senderId: 'user-3',
      content: 'Hi, I saw you\'re interested in clean energy solutions. Our battery technology could be a great fit for your portfolio.',
      createdAt: '2023-08-05T14:20:00Z',
      read: true,
    },
    {
      id: 'message-5',
      conversationId: 'conversation-2',
      senderId: 'user-1',
      content: 'Your technology sounds promising. Let\'s schedule a call next week to discuss further.',
      createdAt: '2023-08-06T09:15:00Z',
      read: false,
    }
  ]
};