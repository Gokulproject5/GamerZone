CREATE TABLE games (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  genre TEXT,
  price NUMERIC,
  discount NUMERIC,
  "finalPrice" NUMERIC, 
  quantity INT DEFAULT 1,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
