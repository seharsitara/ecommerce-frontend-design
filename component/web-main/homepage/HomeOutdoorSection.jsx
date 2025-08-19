"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function HomeOutdoorSection() {
  const [homeOutdoorProducts, setHomeOutdoorProducts] = useState([]);
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
    fetchHomeProducts();
  }, []);

  const fetchHomeProducts = async () => {
    try {
      setLoading(true);
      
      // First try to fetch products from Home/Outdoor categories
      const { data: homeOutdoorProducts, error: homeOutdoorError } = await supabase
        .from('products')
        .select('*')
        .or('category.ilike.%home%,category.ilike.%outdoor%')
        .order('id', { ascending: false })
        .limit(8);

      if (homeOutdoorError) {
        console.error('Error fetching recommended products:', homeOutdoorError);
        setHomeOutdoorProducts([]);
        return;
      }

      // If none found, fetch from categories table flagged for home
      if (!homeOutdoorProducts || homeOutdoorProducts.length === 0) {
        const { data: categories, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_home', true);

        if (!categoriesError && categories && categories.length > 0) {
          // Fetch products from those categories
          const categoryNames = categories.map(cat => cat.full_path);
          const { data: categoryProducts, error: categoryError } = await supabase
            .from('products')
            .select('*')
            .in('category', categoryNames)
            .order('id', { ascending: false })
            .limit(8);

          if (!categoryError && categoryProducts) {
            const normalized = categoryProducts.map(p => ({
              ...p,
              image_url: typeof p.image_url === 'string' && p.image_url.startsWith('http')
                ? p.image_url
                : (
                  typeof p.image_path === 'string' && p.image_path.startsWith('http')
                    ? p.image_path
                    : (
                      typeof p.image === 'string' && p.image.startsWith('http')
                        ? p.image
                        : (typeof p.thumbnail === 'string' && p.thumbnail.startsWith('http') ? p.thumbnail : '')
                    )
                  )
            }));
            setHomeOutdoorProducts(normalized);
          } else {
            setHomeOutdoorProducts([]);
          }
        } else {
          setHomeOutdoorProducts([]);
        }
      } else {
        const normalized = homeOutdoorProducts.map(p => ({
          ...p,
          image_url: typeof p.image_url === 'string' && p.image_url.startsWith('http')
            ? p.image_url
            : (
              typeof p.image_path === 'string' && p.image_path.startsWith('http')
                ? p.image_path
                : (
                  typeof p.image === 'string' && p.image.startsWith('http')
                    ? p.image
                    : (typeof p.thumbnail === 'string' && p.thumbnail.startsWith('http') ? p.thumbnail : '')
                )
              )
        }));
        setHomeOutdoorProducts(normalized);
      }
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      setHomeOutdoorProducts([]);
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
  const products = homeOutdoorProducts.length > 0 
    ? transformProducts(homeOutdoorProducts)
    : fallbackProducts;

  return (
    <div className="mb-6 mx-12">
      <div className="flex border border-gray-200 rounded-md overflow-hidden">
        {/* Left Section with Background Image, Blur and Overlay */}
        <div className="relative w-[210px] flex-shrink-0 flex">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/electronicSection/e569161444be4cfea24366cb3d27cb335105ed84 (1).jpg')",
            }}
          ></div>
          <div className="absolute inset-0 bg-white opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-2 text-black mt-6 mx-6">Outdoor & Home</h2>
            <button className="text-sm bg-white text-black rounded-md px-3 py-1 w-fit mb-20 mx-6">
              Source Now
            </button>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-6 ">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="border-l border-t border-gray-200 py-4 px-6 flex flex-row justify-center items-center text-center"
              >
                <div className="text-center mb-3">
            {homeOutdoorProducts.length > 0 && product.image.startsWith("http") ? (
              <>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-h-24 object-contain mx-auto"
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
          <div className="w-42 flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm font-semibold text-blue-600">{product.price}</p>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
