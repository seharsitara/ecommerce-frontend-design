-- Create categories table for Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  full_path TEXT NOT NULL UNIQUE,
  parent TEXT,
  icon TEXT DEFAULT '📦',
  is_recommended BOOLEAN DEFAULT FALSE,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent);
CREATE INDEX IF NOT EXISTS idx_categories_level ON categories(level);
CREATE INDEX IF NOT EXISTS idx_categories_recommended ON categories(is_recommended);

-- Add some default categories
INSERT INTO categories (id, name, full_path, parent, icon, is_recommended, level) VALUES
('books', 'Books', 'books', NULL, '📚', FALSE, 1),
('books/fiction', 'Fiction', 'books/fiction', 'books', '📖', FALSE, 2),
('books/non-fiction', 'Non-Fiction', 'books/non-fiction', 'books', '📚', FALSE, 2),
('books/educational', 'Educational', 'books/educational', 'books', '🎓', FALSE, 2),
('clothes', 'Clothes', 'clothes', NULL, '👕', FALSE, 1),
('clothes/men', 'Men', 'clothes/men', 'clothes', '👔', FALSE, 2),
('clothes/women', 'Women', 'clothes/women', 'clothes', '👗', FALSE, 2),
('clothes/kids', 'Kids', 'clothes/kids', 'clothes', '👶', FALSE, 2),
('tech', 'Tech', 'tech', NULL, '💻', FALSE, 1),
('tech/computers', 'Computers', 'tech/computers', 'tech', '💻', FALSE, 2),
('tech/phones', 'Phones', 'tech/phones', 'tech', '📱', FALSE, 2),
('tech/accessories', 'Accessories', 'tech/accessories', 'tech', '🎧', FALSE, 2),
('home', 'Home', 'home', NULL, '🏠', FALSE, 1),
('home/furniture', 'Furniture', 'home/furniture', 'home', '🪑', FALSE, 2),
('home/decor', 'Decor', 'home/decor', 'home', '🖼️', FALSE, 2),
('home/kitchen', 'Kitchen', 'home/kitchen', 'home', '🍳', FALSE, 2),
('recommended', 'Recommended', 'recommended', NULL, '⭐', TRUE, 1),
('featured', 'Featured', 'featured', NULL, '🌟', TRUE, 1),
('trending', 'Trending', 'trending', NULL, '🔥', TRUE, 1),
('new', 'New', 'new', NULL, '🆕', TRUE, 1),
('sale', 'Sale', 'sale', NULL, '🏷️', TRUE, 1)
ON CONFLICT (id) DO NOTHING; 