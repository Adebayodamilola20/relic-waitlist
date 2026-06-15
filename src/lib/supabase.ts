import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type WaitlistEntry = {
  id: string;
  full_name: string;
  email: string;
  waitlist_position?: number | null;
  status: string;
  source: string;
  created_at: string;
  referral_code?: string | null;
  invited_by?: string | null;
  tier?: string | null;
};
