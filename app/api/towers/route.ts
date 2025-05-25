import { getTowersPaginated } from '@/lib/supabase/services/towerService';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 8;
    const { data, count } = await getTowersPaginated({ page, pageSize });
    return Response.json({ data, count, page, pageSize });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
} 