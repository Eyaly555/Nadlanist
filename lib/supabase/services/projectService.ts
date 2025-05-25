/* eslint-disable no-restricted-imports */
import { supabase } from '@/lib/supabase/serverClient';

export async function getAllProjects() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function getProjectById(id: string | number) {
  const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

// פילוח לפי עיר עם נורמליזציה
export async function getProjectsByCityNormalized() {
  const { data, error } = await supabase.rpc('get_projects_by_city_normalized');
  if (error) throw new Error(error.message);
  return data;
}

/**
 * מחזיר את כל הפרויקטים עבור המפה בלבד (שדות מינימליים)
 */
export async function getAllProjectsForMap() {
  const selectMapFields = [
    'id',
    'project_name_il',
    'latitude',
    'longitude',
    'effective_city',
    'project_status',
  ].join(', ');

  const { data, error } = await supabase
    .from('projects_normalized')
    .select(selectMapFields);

  if (error) {
    console.error('Error fetching all projects for map:', error);
    throw new Error(error.message || 'שגיאה בטעינת נתוני פרויקטים למפה');
  }
  return data || [];
}

export async function getProjectsPaginated({ page, pageSize }: { page: number; pageSize: number }) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('projects_api_view')
    .select('*', { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) {
    console.log('getProjectsPaginated error:', error);
    throw error;
  }
  return { data, count };
}

export async function getAllMapProjects() {
  const { data, error } = await supabase
    .from('map_projects_view')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.log('getAllMapProjects error:', error);
    throw error;
  }
  return data;
} 