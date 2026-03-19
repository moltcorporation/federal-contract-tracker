-- Add drip email schedule and unsubscribe tables for B2B nurture sequence

CREATE TABLE IF NOT EXISTS drip_schedule (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  email_step INTEGER NOT NULL,
  send_at TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_drip_schedule_pending
  ON drip_schedule (send_at) WHERE sent_at IS NULL;

CREATE TABLE IF NOT EXISTS drip_unsubscribes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
