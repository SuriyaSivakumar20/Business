export type UserRole = 'vc' | 'startup';

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  bio: string;
  followers: string[];
  following: string[];
  createdAt: string;
}

export interface StartupUser extends BaseUser {
  role: 'startup';
  companyName: string;
  industry: string;
  fundingNeeds: string;
  pitchDetails: string;
}

export interface VCUser extends BaseUser {
  role: 'vc';
  investmentFocus: string;
  fundingCapacity: string;
}

export type User = StartupUser | VCUser;

// Mock users for development
export const defaultUser: User[] = [
  {
    id: 'user-1',
    name: 'TechVentures Capital',
    email: 'vc@example.com',
    role: 'vc',
    avatar: 'https://images.pexels.com/photos/840996/pexels-photo-840996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'We invest in innovative tech startups with high growth potential.',
    followers: ['user-2', 'user-3'],
    following: ['user-3'],
    createdAt: '2023-01-15T12:00:00Z',
    investmentFocus: 'AI, Blockchain, SaaS',
    fundingCapacity: '$5M - $20M',
  },
  {
    id: 'user-2',
    name: 'InnoTech Solutions',
    email: 'startup@example.com',
    role: 'startup',
    avatar: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Building the next generation of AI-powered customer service solutions.',
    followers: ['user-1'],
    following: ['user-1'],
    createdAt: '2023-02-20T10:30:00Z',
    companyName: 'InnoTech Solutions',
    industry: 'Artificial Intelligence',
    fundingNeeds: 'Series A - $5M',
    pitchDetails: 'Our AI platform reduces customer service costs by 60% while improving satisfaction scores.',
  },
  {
    id: 'user-3',
    name: 'Green Energy Innovations',
    email: 'green@example.com',
    role: 'startup',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Revolutionizing renewable energy with cutting-edge battery technology.',
    followers: ['user-1'],
    following: ['user-1', 'user-2'],
    createdAt: '2023-03-10T09:45:00Z',
    companyName: 'Green Energy Innovations',
    industry: 'CleanTech',
    fundingNeeds: 'Seed - $2M',
    pitchDetails: 'Our patented battery technology extends the life of batteries by 40% and reduces charging time by half.',
  }
];