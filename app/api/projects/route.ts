import { getAllProjects } from '@/lib/supabase/services/projectService';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return Response.json(projects);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
} 