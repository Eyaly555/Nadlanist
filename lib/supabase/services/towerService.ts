/* eslint-disable no-restricted-imports */
import { supabase } from '@/lib/supabase/serverClient';

export async function getAllTowers() {
  const { data, error } = await supabase.from('towers').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function getTowersByProjectId(projectId: string | number) {
  const { data, error } = await supabase.from('towers').select('*').eq('project_id', projectId);
  if (error) throw new Error(error.message);
  return data;
}

export interface GetTowersPaginatedParams {
  page?: number;
  pageSize?: number;
}

export async function getTowersPaginated({ page = 1, pageSize = 8 }: GetTowersPaginatedParams = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const selectFields = [
    'id',
    'created_at',
    'updated_at',
    'project_id',
    'floors',
    'height_m',
    'tower_specific_count_field',
    'tower_status',
    'tower_identifier',
    'project_name',
    'project_name_il',
    'effective_city',
    'original_city',
    'project_status'
  ].join(', ');
  const { data, error, count } = await supabase
    .from('towers_normalized')
    .select(selectFields, { count: 'exact' })
    .order('id')
    .range(from, to);
  if (error) throw new Error(error.message);
  return { data, count };
}

// סטטיסטיקות SQL בלבד
export async function getTowersStats() {
  const { data, error } = await supabase.rpc('get_towers_stats');
  if (error) throw new Error(error.message);
  return data;
}

// פילוח לפי עיר עם נורמליזציה
export async function getTowersByCityNormalized() {
  const { data, error } = await supabase.rpc('get_towers_by_city_normalized');
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Fetches tower statistics using the get_tower_statistics_v2 RPC.
 * @returns {Promise<any>} JSONB object with tower statistics
 */
export async function getTowerStatistics() {
  const { data, error } = await supabase.rpc('get_tower_statistics_v2');
  if (error) throw new Error(error.message);
  return data;
}

export interface GetTowersAboveHeightParams {
  minHeight: number;
  page?: number;
  pageSize?: number;
}

export async function getTowersAboveHeight({
  minHeight,
  page = 1,
  pageSize = 10,
}: GetTowersAboveHeightParams) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const selectDialogFields = [
    'id',
    'height_m',
    'floors',
    'tower_status',
    'project_name',
    'project_name_il',
    'effective_city',
    'project_id',
  ].join(', ');

  const query = supabase
    .from('towers_normalized')
    .select(selectDialogFields, { count: 'exact' })
    .gt('height_m', minHeight)
    .order('height_m', { ascending: false })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error(`Error fetching towers above height ${minHeight}:`, error);
    throw new Error(error.message || `שגיאה בטעינת מגדלים מעל גובה ${minHeight}`);
  }
  return { data: data || [], count: count || 0, page, pageSize };
}

export async function getDashboardStats() {
  const { data, error } = await supabase
    .rpc('get_dashboard_stats');

  if (error) {
    console.log('getDashboardStats error:', error);
    throw error;
  }
  return data;
} 