/** @server-only - Do not import in client code! */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and Service Role Key are required.');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey); 