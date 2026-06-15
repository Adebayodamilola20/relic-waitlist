-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  waitlist_position INTEGER UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting',
  source TEXT NOT NULL DEFAULT 'website',
  referral_code TEXT UNIQUE,
  invited_by UUID REFERENCES waitlist(id),
  tier TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Upgrade older waitlist tables to the current shape.
ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'waiting',
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website',
  ADD COLUMN IF NOT EXISTS referral_code TEXT,
  ADD COLUMN IF NOT EXISTS invited_by UUID,
  ADD COLUMN IF NOT EXISTS tier TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS waitlist_position INTEGER;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'waitlist'
      AND column_name = 'name'
  ) THEN
    EXECUTE 'UPDATE waitlist SET full_name = COALESCE(NULLIF(TRIM(full_name), ''''), NULLIF(TRIM(name), ''''), ''Unknown'') WHERE full_name IS NULL OR TRIM(full_name) = ''''';
  ELSE
    UPDATE waitlist SET full_name = 'Unknown' WHERE full_name IS NULL OR TRIM(full_name) = '';
  END IF;
END;
$$;

UPDATE waitlist SET status = 'waiting' WHERE status IS NULL OR TRIM(status) = '';
UPDATE waitlist SET source = 'website' WHERE source IS NULL OR TRIM(source) = '';
UPDATE waitlist SET created_at = NOW() WHERE created_at IS NULL;
UPDATE waitlist SET updated_at = NOW() WHERE updated_at IS NULL;

ALTER TABLE waitlist
  ALTER COLUMN full_name SET NOT NULL,
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN source SET NOT NULL,
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET NOT NULL;

-- Indexes for performance
ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS waitlist_position INTEGER;

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email_normalized ON waitlist (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_position ON waitlist(waitlist_position);

CREATE SEQUENCE IF NOT EXISTS waitlist_position_seq START WITH 1208;

ALTER TABLE waitlist
  ALTER COLUMN waitlist_position SET DEFAULT nextval('waitlist_position_seq');

WITH numbered_waitlist AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC, id ASC) + 1207 AS position
  FROM waitlist
  WHERE waitlist_position IS NULL
)
UPDATE waitlist
SET waitlist_position = numbered_waitlist.position
FROM numbered_waitlist
WHERE waitlist.id = numbered_waitlist.id;

SELECT setval(
  'waitlist_position_seq',
  GREATEST(1207, COALESCE((SELECT MAX(waitlist_position) FROM waitlist), 1207)),
  true
);

ALTER TABLE waitlist
  ALTER COLUMN waitlist_position SET NOT NULL;

ALTER TABLE waitlist
  DROP CONSTRAINT IF EXISTS waitlist_email_format;

ALTER TABLE waitlist
  ADD CONSTRAINT waitlist_email_format
  CHECK (LOWER(TRIM(email)) ~ '^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$')
  NOT VALID;

-- Public counter used by the website for realtime waitlist count updates.
-- It intentionally stores only an aggregate number, never signup names or emails.
CREATE TABLE IF NOT EXISTS waitlist_public_stats (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id),
  current_count INTEGER NOT NULL DEFAULT 1207 CHECK (current_count >= 1207),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO waitlist_public_stats (id, current_count, updated_at)
VALUES (
  TRUE,
  GREATEST(1207, COALESCE((SELECT MAX(waitlist_position) FROM waitlist), 1207)),
  NOW()
)
ON CONFLICT (id) DO UPDATE
SET
  current_count = EXCLUDED.current_count,
  updated_at = NOW();

ALTER TABLE waitlist_public_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read waitlist public stats" ON waitlist_public_stats;
CREATE POLICY "Public can read waitlist public stats" ON waitlist_public_stats
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can manage waitlist public stats" ON waitlist_public_stats;
CREATE POLICY "Service role can manage waitlist public stats" ON waitlist_public_stats
  FOR ALL USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION sync_waitlist_public_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO waitlist_public_stats (id, current_count, updated_at)
  VALUES (
    TRUE,
    GREATEST(1207, COALESCE((SELECT MAX(waitlist_position) FROM waitlist), 1207)),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    current_count = EXCLUDED.current_count,
    updated_at = NOW();

  RETURN NULL;
END;
$$ language 'plpgsql'
SECURITY DEFINER
SET search_path = public;

DROP TRIGGER IF EXISTS sync_waitlist_public_stats_after_change ON waitlist;
CREATE TRIGGER sync_waitlist_public_stats_after_change
  AFTER INSERT OR UPDATE OR DELETE ON waitlist
  FOR EACH STATEMENT
  EXECUTE FUNCTION sync_waitlist_public_stats();

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE waitlist_public_stats;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END;
$$;

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
DROP POLICY IF EXISTS "Public can insert waitlist entries" ON waitlist;
CREATE POLICY "Public can insert waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read (for admin dashboard)
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON waitlist;
CREATE POLICY "Authenticated users can read waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can do everything (for serverless functions)
DROP POLICY IF EXISTS "Service role full access" ON waitlist;
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

CREATE OR REPLACE FUNCTION register_waitlist_entry(
  input_full_name TEXT,
  input_email TEXT,
  input_source TEXT DEFAULT 'website'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_email TEXT;
  inserted_entry waitlist%ROWTYPE;
BEGIN
  normalized_email := LOWER(TRIM(input_email));

  IF TRIM(COALESCE(input_full_name, '')) = '' THEN
    RETURN jsonb_build_object(
      'ok', false,
      'reason', 'invalid_name',
      'message', 'Please enter your full name.'
    );
  END IF;

  IF normalized_email !~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$' THEN
    RETURN jsonb_build_object(
      'ok', false,
      'reason', 'invalid_email',
      'message', 'Please enter a valid email address.'
    );
  END IF;

  IF EXISTS (SELECT 1 FROM waitlist WHERE LOWER(email) = normalized_email) THEN
    RETURN jsonb_build_object(
      'ok', false,
      'reason', 'duplicate_email',
      'message', 'This email is already on the waitlist. Please use a different email address.'
    );
  END IF;

  INSERT INTO waitlist (
    full_name,
    email,
    waitlist_position,
    source,
    status
  )
  VALUES (
    TRIM(input_full_name),
    normalized_email,
    nextval('waitlist_position_seq'),
    COALESCE(NULLIF(TRIM(input_source), ''), 'website'),
    'waiting'
  )
  RETURNING * INTO inserted_entry;

  RETURN jsonb_build_object(
    'ok', true,
    'id', inserted_entry.id,
    'email', inserted_entry.email,
    'fullName', inserted_entry.full_name,
    'queuePosition', inserted_entry.waitlist_position
  );
EXCEPTION
  WHEN unique_violation THEN
    RETURN jsonb_build_object(
      'ok', false,
      'reason', 'duplicate_email',
      'message', 'This email is already on the waitlist. Please use a different email address.'
    );
END;
$$;

GRANT EXECUTE ON FUNCTION register_waitlist_entry(TEXT, TEXT, TEXT) TO anon, authenticated;
