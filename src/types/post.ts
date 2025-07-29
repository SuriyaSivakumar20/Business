import { User } from './user';

export interface Post {
  id: string;
  content: string;
  images: string[];
  authorId: string;
  author?: User;
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  createdAt: string;
}

// Mock posts for development
export const defaultPosts: Post[] = [
  {
    id: 'post-1',
    content: 'Excited to announce our new fund focusing on AI and ML startups! Looking for innovative companies solving real-world problems. #VCFunding #AI #MachineLearning',
    images: [
      'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    authorId: 'user-1',
    likes: ['user-2', 'user-3'],
    comments: [
      {
        id: 'comment-1',
        content: 'This is exactly what we\'ve been looking for! Would love to connect.',
        authorId: 'user-2',
        createdAt: '2023-06-15T14:30:00Z',
      }
    ],
    createdAt: '2023-06-15T13:00:00Z',
  },
  {
    id: 'post-2',
    content: 'Just closed our seed round! Thanks to all the investors who believed in our vision for revolutionizing customer service with AI. Looking forward to the journey ahead! #Startup #Funding #AI',
    images: [
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    authorId: 'user-2',
    likes: ['user-1'],
    comments: [
      {
        id: 'comment-2',
        content: 'Congratulations! Looking forward to seeing your growth.',
        authorId: 'user-1',
        createdAt: '2023-07-20T16:45:00Z',
      }
    ],
    createdAt: '2023-07-20T15:30:00Z',
  },
  {
    id: 'post-3',
    content: 'Our latest prototype is showing promising results! 40% more efficient than current market solutions. Seeking strategic partners for our next phase. #CleanTech #Sustainability #GreenEnergy',
    images: [
      'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    authorId: 'user-3',
    likes: ['user-1', 'user-2'],
    comments: [],
    createdAt: '2023-08-05T11:15:00Z',
  }
];