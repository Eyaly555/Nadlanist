import { getAllTowers } from '@/lib/supabase/services/towerService';

export async function GET() {
  try {
    const towers = await getAllTowers();
    return Response.json(towers);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
} 