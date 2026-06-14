-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting',
  source TEXT NOT NULL DEFAULT 'website',
  referral_code TEXT UNIQUE,
  invited_by UUID REFERENCES waitlist(id),
  tier TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_waitlist_updated_at ON waitlist;
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Public can insert (for waitlist signup)
CREATE POLICY "Public can insert waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read (for admin dashboard)
CREATE POLICY "Authenticated users can read waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can do everything (for serverless functions)
CREATE POLICY "Service role full access" ON waitlist
  FOR ALL USING (auth.role() = 'service_role');

-- Analytics view
CREATE OR REPLACE VIEW waitlist_analytics AS
SELECT
  COUNT(*) as total_signups,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '1 day') as daily_signups,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as weekly_signups,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as monthly_signups,
  COUNT(*) FILTER (WHERE status = 'waiting') as waiting_count,
  COUNT(*) FILTER (WHERE status = 'invited') as invited_count,
  COUNT(*) FILTER (WHERE status = 'active') as active_count
FROM waitlist;

-- Function to get waitlist stats
CREATE OR REPLACE FUNCTION get_waitlist_stats()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_signups', total_signups,
    'daily_signups', daily_signups,
    'weekly_signups', weekly_signups,
    'monthly_signups', monthly_signups,
    'waiting_count', waiting_count,
    'invited_count', invited_count,
    'active_count', active_count
  ) INTO result
  FROM waitlist_analytics;
  
  RETURN result;
END;
$$;