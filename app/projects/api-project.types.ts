export interface ApiProject {
  id: number;
  project_name: string;
  city: string;
  latitude: number;
  longitude: number;
  towers: Array<{
    floors: number;
    height_m: number;
    tower_status: string;
  }>;
} 