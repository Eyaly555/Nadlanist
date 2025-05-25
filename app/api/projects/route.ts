import { getProjectsPaginated } from '@/lib/supabase/services/projectService';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 8;
    const { data, count } = await getProjectsPaginated({ page, pageSize });
    return Response.json({ data, count, page, pageSize });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
} 