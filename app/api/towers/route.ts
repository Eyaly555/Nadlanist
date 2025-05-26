import { getTowersPaginated, getAllTowers } from '@/lib/supabase/services/towerService';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('all') === 'true') {
    try {
      const data = await getAllTowers();
      return Response.json({ data });
    } catch {
      return Response.json({ error: 'שגיאה בטעינת כל המגדלים' }, { status: 500 });
    }
  }
  try {
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 8;
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    const status = searchParams.get('status') || '';
    const minHeight = Number(searchParams.get('minHeight')) || 0;
    const sortBy = searchParams.get('sortBy') || 'height_m';
    const sortOrderParam = searchParams.get('sortOrder');
    const sortOrder = sortOrderParam === 'asc' || sortOrderParam === 'desc' ? sortOrderParam : 'desc';

    const { data, count } = await getTowersPaginated({
      page,
      pageSize,
      search,
      city,
      status,
      minHeight,
      sortBy,
      sortOrder,
    });
    return Response.json({ data, count, page, pageSize });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
} 