-- Kişisel Enflasyon Dedektifi: Veritabanı şeması

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  official_group_code TEXT
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  city TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  expense_date DATE NOT NULL
);
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  variant TEXT NOT NULL,
  unit_type TEXT NOT NULL CHECK (unit_type IN ('g', 'ml', 'adet')),
  UNIQUE (user_id, brand, name, variant, unit_type)
);

CREATE TABLE price_records (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  record_date DATE NOT NULL,
  store TEXT,
  price NUMERIC(12, 2) NOT NULL CHECK (price > 0),
  quantity NUMERIC(12, 2) NOT NULL CHECK (quantity > 0)
);