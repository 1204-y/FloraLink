export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  photoUrl?: string;
}

export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  imageUrl: string;
  status: '健康' | '需关注' | '待播种';
  environment: string;
  nextTask: string;
  tags: string[];
  timeline: TimelineEvent[];
}

export interface ObservationPoint {
  id: string;
  name: string;
  city: string;
  coordinates: string;
  bloomWindow: string;
  highlight: string;
  contributor: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  description: string;
  trendingTopics: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  group: string;
  createdAt: string;
  title: string;
  excerpt: string;
  reactions: number;
  comments: number;
}

export interface CareTask {
  id: string;
  plantName: string;
  action: string;
  schedule: string;
  priority: '高' | '中' | '低';
}

export interface EncyclopediaEntry {
  id: string;
  name: string;
  latinName: string;
  climate: string;
  difficulty: string;
  highlights: string[];
  bestSeason: string;
}

export interface AssistantSuggestion {
  id: string;
  question: string;
  answer: string;
  related: string[];
}
