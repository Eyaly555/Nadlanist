import { supabase } from '@/lib/supabaseClient';

interface ProjectRow {
  id: number | string;
  project_name: string;
  city: string;
  full_address: string;
  latitude: number;
  longitude: number;
  project_description?: string;
  num_towers: number;
}

interface TowerRow {
  id: number | string;
  project_id: number | string;
  floors: number;
  height_m: number;
  tower_status: string;
}

export async function GET() {
  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('id, project_name, city, full_address, latitude, longitude, project_description, num_towers');

    if (error) {
      console.error('Supabase projects error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }
    if (!projects) {
      console.error('No projects data returned');
      return Response.json({ error: 'No projects data' }, { status: 500 });
    }
    console.log('Projects data:', projects);

    const projectIds = (projects as ProjectRow[]).map((p) => p.id);
    if (!projectIds.length) {
      console.warn('No project IDs found');
    }
    const { data: towers, error: towersError } = await supabase
      .from('towers')
      .select('id, project_id, floors, height_m, tower_status')
      .in('project_id', projectIds);

    if (towersError) {
      console.error('Supabase towers error:', towersError);
      return Response.json({ error: towersError.message }, { status: 500 });
    }
    if (!towers) {
      console.error('No towers data returned');
      return Response.json({ error: 'No towers data' }, { status: 500 });
    }
    console.log('Towers data:', towers);

    const towersByProject = (towers as TowerRow[]).reduce((acc: Record<string | number, TowerRow[]>, tower) => {
      (acc[tower.project_id] = acc[tower.project_id] || []).push(tower);
      return acc;
    }, {});

    function getOverallStatus(towers: TowerRow[]) {
      if (towers.some(t => t.tower_status === 'בבנייה')) return 'בבנייה';
      if (towers.some(t => t.tower_status === 'בתכנון')) return 'בתכנון';
      if (towers.some(t => t.tower_status === 'אושר/ברישוי')) return 'מאושר/ברישוי';
      if (towers.every(t => t.tower_status === 'הסתיים/אוכלס')) return 'הסתיים/אוכלס';
      return 'סטטוס לא מוגדר';
    }

    const result = (projects as ProjectRow[]).map((project) => ({
      ...project,
      towers: towersByProject[project.id] || [],
      overall_project_status: getOverallStatus(towersByProject[project.id] || []),
    }));

    return Response.json(result);
  } catch (err) {
    console.error('API /api/projects unexpected error:', err);
    return Response.json({ error: (err instanceof Error ? err.message : String(err)) }, { status: 500 });
  }
} 