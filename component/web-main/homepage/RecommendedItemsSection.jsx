"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RecommendedItemsSection() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback products if no recommended items found
  const fallbackProducts = [
    {
      name: "Blue Polo Shirt",
      price: "$29",
      image: "👕",
      des: "Soft cotton shirt for summer outings with breathable fabric and elegant color.",
    },
    { name: "Brown Jacket", price: "$89", image: "🧥", des: "Warm winter jacket with waterproof layer." },
    { name: "Blue Shorts", price: "$24", image: "🩳", des: "Lightweight and stylish for everyday wear." },
    { name: "Blue Wallet", price: "$19", image: "👛", des: "Compact and durable with multiple slots." },
    { name: "Blue Backpack", price: "$49", image: "🎒", des: "Spacious backpack perfect for travel and school." },
    { name: "Denim Jeans", price: "$59", image: "👖", des: "Classic fit jeans with stretch fabric." },
    { name: "White Headphones", price: "$79", image: "🎧", des: "Noise cancelling with long battery life." },
    { name: "Smartwatch", price: "$199", image: "⌚", des: "Track fitness, messages, and more." },
    { name: "Clay Pot", price: "$15", image: "🏺", des: "Handcrafted pot for home decor or planting." },
    { name: "Electric Kettle", price: "$39", image: "🫖", des: "Quick boil kettle with auto shut-off." },
  ];

  // Fetch recommended products from Supabase
  useEffect(() => {
    fetchRecommendedProducts();
  }, []);

  const fetchRecommendedProducts = async () => {
    try {
      setLoading(true);
      
      // First try to fetch products from recommended categories
      const { data: recommendedProducts, error: recommendedError } = await supabase
        .from('products')
        .select('*')
        .or('category.eq.recommended,category.eq.featured,category.eq.trending,category.eq.new,category.eq.sale')
        .order('id', { ascending: false })
        .limit(10);

      if (recommendedError) {
        console.error('Error fetching recommended products:', recommendedError);
        setRecommendedProducts([]);
        return;
      }

      // If no recommended products found, fetch from categories table
      if (!recommendedProducts || recommendedProducts.length === 0) {
        const { data: categories, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_recommended', true);

        if (!categoriesError && categories && categories.length > 0) {
          // Fetch products from recommended categories
          const categoryNames = categories.map(cat => cat.full_path);
          const { data: categoryProducts, error: categoryError } = await supabase
            .from('products')
            .select('*')
            .in('category', categoryNames)
            .order('id', { ascending: false })
            .limit(10);

          if (!categoryError && categoryProducts) {
            setRecommendedProducts(categoryProducts);
          } else {
            setRecommendedProducts([]);
          }
        } else {
          setRecommendedProducts([]);
        }
      } else {
        setRecommendedProducts(recommendedProducts);
      }
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      setRecommendedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Transform Supabase products to match the display format
  const transformProducts = (products) => {
    return products.map(product => ({
      name: product.name || "Product",
      price: product.price ? `$${product.price}` : "$0",
      image: product.image_path || getProductIcon(product.category || product.name),
      des: product.description || "No description available.",
      category: product.category || "Unknown",
      id: product.id
    }));
  };

  // Get product icon based on category or name
  const getProductIcon = (category) => {
    const iconMap = {
      'books': '📚',
      'clothes': '👕',
      'tech': '💻',
      'home': '🏠',
      'electronics': '📱',
      'fashion': '👗',
      'sports': '⚽',
      'automotive': '🚗',
      'food': '🍽️',
      'health': '💊',
      'beauty': '💄',
      'toys': '🎮',
      'shirt': '👕',
      'jacket': '🧥',
      'shorts': '🩳',
      'wallet': '👛',
      'backpack': '🎒',
      'jeans': '👖',
      'headphones': '🎧',
      'watch': '⌚',
      'pot': '🏺',
      'kettle': '🫖',
      'phone': '📱',
      'laptop': '💻',
      'camera': '📷',
      'book': '📚',
      'shoes': '👟',
      'bag': '👜',
      'hat': '🧢',
      'glasses': '👓'
    };

    // Check for exact match first
    if (iconMap[category]) {
      return iconMap[category];
    }

    // Check for partial matches
    for (const [key, icon] of Object.entries(iconMap)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return icon;
      }
    }

    return '📦'; // Default icon
  };

  // Use transformed recommended products or fallback
  const products = recommendedProducts.length > 0 
    ? transformProducts(recommendedProducts)
    : fallbackProducts;

  return (
  <div className="mb-8 mx-6 px-6">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">
      {recommendedProducts.length > 0 ? "Recommended Items" : "Featured Products"}
    </h2>

    {loading && (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading recommended items...</span>
      </div>
    )}

    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border p-4 border-gray-200 hover:shadow-md transition-shadow flex flex-col"
        >
          {/* Image or emoji */}
          <div className="text-center mb-3">
            {recommendedProducts.length > 0 && product.image.startsWith("http") ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-34 object-contain mx-auto"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <div className="text-4xl hidden">{getProductIcon(product.category)}</div>
              </>
            ) : (
              <div className="text-4xl">{product.image}</div>
            )}
          </div>

          {/* Price */}
          <p className="text-blue-600 font-semibold pl-1 text-sm">{product.price}</p>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2 break-words">
            {product.des}
          </p>
        </div>
      ))}
    </div>

    {!loading && recommendedProducts.length === 0 && (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">
          No recommended items found. Add products to recommended categories in the admin dashboard.
        </p>
      </div>
    )}
  </div>
);
}