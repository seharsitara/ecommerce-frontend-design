-- Check the actual structure of the products table
-- Run this in your Supabase SQL editor

-- Show table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Show sample data to understand the structure
SELECT * FROM products LIMIT 3;

-- Check if we can add the original_price column
-- This will show if the column exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price'; 