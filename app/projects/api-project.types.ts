export interface ApiProject {
  id: number;
  project_name: string;
  city: string;
  latitude: number;
  longitude: number;
  project_status: string;
  num_towers: number;
  full_address: string;
  project_description: string;
}

export interface ApiTower {
  id: number | string;
  project_id: number | string;
  tower_id?: string;
  floors: number;
  height_m: number;
  tower_status: string;
} 