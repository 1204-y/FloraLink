export interface UserProfile {
  id: number;
  email: string;
  full_name?: string;
  city?: string;
  bio?: string;
  created_at: string;
}

export interface GrowthEntry {
  id: number;
  recorded_at: string;
  notes?: string;
  photo_url?: string;
  height_cm?: number;
}

export type PlantHealthStatus = 'healthy' | 'attention';

export interface GardenPlant {
  id: number;
  garden_id: number;
  nickname?: string;
  species_id?: number;
  species_common_name?: string;
  species_scientific_name?: string;
  status: PlantHealthStatus;
  environment_notes?: string;
  next_task?: string;
  tags: string[];
  timeline: GrowthEntry[];
}

export interface GardenSummary {
  id: number;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  environment_notes?: string;
  plant_count: number;
  plants: GardenPlant[];
}

export type TaskPriority = '高' | '中' | '低';

export interface CareTaskSummary {
  id: number;
  plant_id: number;
  plant_name: string;
  action: string;
  schedule: string;
  priority: TaskPriority;
  due_at?: string | null;
}

export interface GardenStats {
  total_gardens: number;
  total_plants: number;
  due_tasks: number;
  upcoming_tasks: number;
}

export interface GardenDashboardResponse {
  gardens: GardenSummary[];
  tasks: CareTaskSummary[];
  stats: GardenStats;
}

export interface Observation {
  id: number;
  species_id?: number;
  species_common_name?: string;
  latitude: number;
  longitude: number;
  note?: string;
  observed_at?: string;
  location_name?: string;
  photo_url?: string;
  reporter_id?: number;
}

export interface PlantSpecies {
  id: number;
  common_name: string;
  scientific_name?: string;
  sunlight?: string;
  watering?: string;
  description?: string;
  bloom_season?: string;
}

export interface AssistantMessage {
  id: number;
  question: string;
  answer: string;
  created_at: string;
}

export interface AssistantResponsePayload {
  message: AssistantMessage;
  suggestions: string[];
}

export interface CommunityGroup {
  id: number;
  name: string;
  city?: string;
  description?: string;
  topic?: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  group_id: number;
  user_id?: number;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
