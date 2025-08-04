-- Add sample deals and offers data to Supabase products table (Fixed version)
-- Run this in your Supabase SQL editor

-- First, add the original_price column if it doesn't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS original_price NUMERIC(10, 2);

-- Sample deals products with sale, deals, offers, discount, and promotion categories
INSERT INTO products (name, description, price, original_price, category, image_path, size, created_at) VALUES
-- Sale Category
('iPhone 14 Pro', 'Latest iPhone with advanced camera system and A16 chip', 899.99, 1099.99, 'sale', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', 'M', NOW()),
('Samsung Galaxy S23', 'Premium Android smartphone with 5G capability', 699.99, 899.99, 'sale', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', 'L', NOW()),
('MacBook Air M2', 'Lightweight laptop with powerful M2 processor', 999.99, 1299.99, 'sale', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop', 'XL', NOW()),

-- Deals Category
('Nike Air Max 270', 'Comfortable running shoes with Air Max technology', 89.99, 129.99, 'deals', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', 'M,L,XL', NOW()),
('Sony WH-1000XM4', 'Noise-cancelling wireless headphones', 249.99, 349.99, 'deals', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 'One Size', NOW()),
('Canon EOS R6', 'Full-frame mirrorless camera with 4K video', 1899.99, 2499.99, 'deals', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', 'Standard', NOW()),

-- Offers Category
('Apple Watch Series 8', 'Smartwatch with health monitoring features', 299.99, 399.99, 'offers', 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop', 'S,M,L', NOW()),
('Dyson V15 Detect', 'Cordless vacuum with laser technology', 399.99, 599.99, 'offers', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 'One Size', NOW()),
('PlayStation 5', 'Next-gen gaming console with DualSense controller', 449.99, 499.99, 'offers', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop', 'Standard', NOW()),

-- Discount Category
('Adidas Ultraboost 22', 'Premium running shoes with Boost technology', 129.99, 179.99, 'discount', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', 'M,L,XL', NOW()),
('Bose QuietComfort 45', 'Premium noise-cancelling headphones', 199.99, 329.99, 'discount', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop', 'One Size', NOW()),
('GoPro Hero 11 Black', 'Action camera with 5.3K video recording', 299.99, 399.99, 'discount', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', 'Standard', NOW()),

-- Promotion Category
('iPad Air 5th Gen', 'Powerful tablet with M1 chip and Apple Pencil support', 549.99, 699.99, 'promotion', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', 'Standard', NOW()),
('Samsung 65" QLED TV', '4K Smart TV with Quantum Dot technology', 899.99, 1299.99, 'promotion', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop', '65 inch', NOW()),
('Nike Tech Fleece', 'Comfortable athletic wear for everyday use', 59.99, 89.99, 'promotion', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', 'S,M,L,XL', NOW())

ON CONFLICT (id) DO NOTHING; 