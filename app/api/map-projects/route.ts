import { getAllMapProjects } from '@/lib/supabase/services/projectService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await getAllMapProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.log('map-projects API error:', error);
    return NextResponse.json(
      { error: (error as Error).message }, 
      { status: 500 }
    );
  }
} 