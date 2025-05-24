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