-- Check if sample data exists in the database
-- Run this in your Supabase SQL editor to verify data

-- Check total number of products
SELECT COUNT(*) as total_products FROM products;

-- Check products by category
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY count DESC;

-- Check deals products specifically
SELECT name, price, original_price, category, image_path 
FROM products 
WHERE category IN ('sale', 'deals', 'offers', 'discount', 'promotion')
ORDER BY id DESC;

-- Check if categories table exists and has data
SELECT COUNT(*) as total_categories FROM categories;

-- Check categories table data
SELECT * FROM categories ORDER BY level, name;

-- Check if any products have null categories
SELECT COUNT(*) as null_categories 
FROM products 
WHERE category IS NULL;

-- Show sample of all products
SELECT name, price, category, created_at 
FROM products 
ORDER BY created_at DESC 
LIMIT 10; 