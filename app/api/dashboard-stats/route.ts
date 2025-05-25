// app/api/dashboard-stats/route.ts
import { getDashboardStats } from '@/lib/supabase/services/towerService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.log('dashboard-stats API error:', error);
    return NextResponse.json(
      { error: (error as Error).message }, 
      { status: 500 }
    );
  }
}