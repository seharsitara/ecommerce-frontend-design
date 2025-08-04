-- Add deals and offers categories to the categories table
-- Run this in your Supabase SQL editor

INSERT INTO categories (id, name, full_path, parent, icon, is_recommended, level) VALUES
-- Deals and Offers Categories
('sale', 'Sale', 'sale', NULL, '🏷️', TRUE, 1),
('deals', 'Deals', 'deals', NULL, '🔥', TRUE, 1),
('offers', 'Offers', 'offers', NULL, '⭐', TRUE, 1),
('discount', 'Discount', 'discount', NULL, '💰', TRUE, 1),
('promotion', 'Promotion', 'promotion', NULL, '🎉', TRUE, 1),

-- Subcategories for better organization
('sale/electronics', 'Electronics Sale', 'sale/electronics', 'sale', '📱', TRUE, 2),
('sale/fashion', 'Fashion Sale', 'sale/fashion', 'sale', '👕', TRUE, 2),
('deals/tech', 'Tech Deals', 'deals/tech', 'deals', '💻', TRUE, 2),
('deals/home', 'Home Deals', 'deals/home', 'deals', '🏠', TRUE, 2),
('offers/limited', 'Limited Offers', 'offers/limited', 'offers', '⏰', TRUE, 2),
('discount/clearance', 'Clearance', 'discount/clearance', 'discount', '🧹', TRUE, 2),
('promotion/flash', 'Flash Promotions', 'promotion/flash', 'promotion', '⚡', TRUE, 2)

ON CONFLICT (id) DO NOTHING; 