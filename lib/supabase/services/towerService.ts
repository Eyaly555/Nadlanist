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