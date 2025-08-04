"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DealsSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [dealsProducts, setDealsProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback deals if no deals found
  const fallbackDeals = [
    { name: "Smartwatch", price: "$16.20", discount: "-12%", image: "⌚" },
    { name: "Laptop", price: "$299.99", discount: "-20%", image: "💻" },
    { name: "GoPro Camera", price: "$199.99", discount: "-15%", image: "📷" },
    { name: "Headphones", price: "$89.99", discount: "-25%", image: "🎧" },
    { name: "Canon Camera", price: "$399.99", discount: "-30%", image: "📸" },
    { name: "Wireless Earbuds", price: "$59.99", discount: "-40%", image: "🎵" }
  ];

  useEffect(() => {
    // Set the target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch deals and offers from Supabase
  useEffect(() => {
    fetchDealsFromSupabase();
  }, []);

  const fetchDealsFromSupabase = async () => {
    try {
      setLoading(true);
      console.log('Fetching deals from Supabase...');
      
      // First, let's check if we can connect to Supabase at all
      const { data: allProducts, error: testError } = await supabase
        .from('products')
        .select('*')
        .limit(5);

      if (testError) {
        console.error('Connection test failed:', testError);
        setDealsProducts([]);
        return;
      }

      console.log('Connection successful. All products found:', allProducts);

      // Now fetch products from deals categories with proper syntax
      const { data: dealsProducts, error } = await supabase
        .from('products')
        .select('*')
        .in('category', ['sale', 'deals', 'offers', 'discount', 'promotion'])
        .order('id', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching deals:', error);
        // Try alternative query
        const { data: altDeals, error: altError } = await supabase
          .from('products')
          .select('*')
          .or('category.eq.sale,category.eq.deals,category.eq.offers,category.eq.discount,category.eq.promotion')
          .order('id', { ascending: false })
          .limit(6);

        if (altError) {
          console.error('Alternative query also failed:', altError);
          setDealsProducts([]);
          return;
        }

        console.log('Alternative query successful:', altDeals);
        setDealsProducts(altDeals || []);
      } else {
        console.log('Deals products fetched:', dealsProducts);
        setDealsProducts(dealsProducts || []);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      setDealsProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Transform Supabase products to match the display format
  const transformDeals = (products) => {
    console.log('Transforming products:', products);
    return products.map(product => ({
      name: product.name || "Product",
      price: product.price ? `$${product.price}` : "$0.00",
      discount: calculateDiscount(product.price, product.original_price),
      image: product.image_path || getProductIcon(product.category || product.name),
      category: product.category || "Unknown",
      id: product.id
    }));
  };

  // Calculate discount percentage
  const calculateDiscount = (currentPrice, originalPrice) => {
    if (!originalPrice || !currentPrice) {
      // If no original price, create a fake discount for demo
      const fakeDiscount = Math.floor(Math.random() * 30) + 10; // 10-40% discount
      return `-${fakeDiscount}%`;
    }
    
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    return `-${discount}%`;
  };

  // Get product icon based on category or name
  const getProductIcon = (category) => {
    const iconMap = {
      'electronics': '📱',
      'tech': '💻',
      'clothes': '👕',
      'shoes': '👟',
      'watch': '⌚',
      'headphones': '🎧',
      'camera': '📷',
      'laptop': '💻',
      'phone': '📱',
      'tablet': '📱',
      'gaming': '🎮',
      'sports': '⚽',
      'home': '🏠',
      'kitchen': '🍳',
      'beauty': '💄',
      'health': '💊',
      'books': '📚',
      'toys': '🎮',
      'automotive': '🚗',
      'fashion': '👗',
      'accessories': '👜',
      'jewelry': '💍',
      'bags': '👜',
      'sunglasses': '👓',
      'perfume': '🌸',
      'skincare': '🧴',
      'makeup': '💄',
      'fitness': '🏋️',
      'outdoor': '🏕️',
      'travel': '✈️',
      'office': '📝',
      'art': '🎨',
      'music': '🎵',
      'pet': '🐕',
      'garden': '🌱',
      'tools': '🔧',
      'furniture': '🪑',
      'lighting': '💡',
      'storage': '📦',
      'bathroom': '🚿',
      'bedroom': '🛏️',
      'living': '🛋️',
      'dining': '🍽️',
      'baby': '👶',
      'kids': '🧒',
      'men': '👔',
      'women': '👗',
      'unisex': '👤'
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

  // Use transformed deals products or fallback
  const deals = dealsProducts.length > 0 
    ? transformDeals(dealsProducts)
    : fallbackDeals;

  const discountBadges = ['-12%', '-20%', '-40%', '-15%', '-25%'];

  return (
    <div className="my-6 flex items-center border border-gray-200 rounded-md mx-12 bg-white">
     <div className=" mb-12 mr-12 pl-4 ">
      <h1 className="font-bold ">Deals And Offers</h1>
      <p>Hygiene equipments</p>
      
      {/* Countdown Timer */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="bg-black text-white px-2 py-2 rounded text-xs font-bold">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <span className="text-xs text-gray-500 self-center"></span>
          <div className="bg-black text-white px-2 py-2 rounded text-xs font-bold">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <span className="text-xs text-gray-500 self-center"></span>
          <div className="bg-black text-white px-2 py-2 rounded text-xs font-bold">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <span className="text-xs text-gray-500 self-center"></span>
          <div className="bg-black text-white px-2 py-2 rounded text-xs font-bold">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <span className="text-xs text-gray-500 self-center"></span>
        </div>
      </div>

     </div>
     {/*<div className="flex space-x-2 mb-6">
        {discountBadges.map((discount, index) => (
          <div key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
            {discount}
          </div>
        ))}
      </div>*/}
      
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading deals...</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {deals.map((product, index) => (
          <div key={index} className="bg-white px-10 py-5 hover:shadow-md transition-shadow cursor-pointer border-l border-gray-200 truncate">
            {dealsProducts.length > 0 ? (
              // Display Supabase product with image
              <div className="text-center mb-3">
                {product.image.startsWith('http') ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : (
                  <div className="text-5xl">{product.image}</div>
                )}
                {product.image.startsWith('http') && (
                  <div className="text-5xl hidden">{getProductIcon(product.category)}</div>
                )}
              </div>
            ) : (
              // Display fallback product with emoji
              <div className="text-5xl mb-3 text-center">{product.image}</div>
            )}
            
            <h3 className="font-medium text-gray-800 mb-2 text-center text-sm">{product.name}</h3>
            <p className="text-blue-600 font-semibold text-center mb-1">{product.price}</p>
            <span className="text-red-500 text-sm font-medium block text-center">{product.discount}</span>
          </div>
        ))}
      </div>

    {/*  {dealsProducts.length === 0 && !loading && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            No deals found. Add products to sale, deals, or offers categories in the admin dashboard.
          </p>
        </div>
      )}*/}
    </div>
  );
} 