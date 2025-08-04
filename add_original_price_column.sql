-- Add original_price column to products table
-- Run this in your Supabase SQL editor

-- Add the original_price column
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS original_price NUMERIC(10, 2);

-- Update existing products to have original_price (set to price + 20% for demo)
UPDATE products 
SET original_price = price * 1.2 
WHERE original_price IS NULL;

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'original_price'; 