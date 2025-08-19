"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DealsSection() {
  const [dealsProducts, setDealsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // ⏳ Countdown for deals (example: 3 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // add 3 days

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch deals products from Supabase
  useEffect(() => {
    fetchDealsProducts();
  }, []);

  const fetchDealsProducts = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or("category.eq.deals,category.eq.offers,category.eq.discounts,category.eq.sale") // removed trailing comma
        .order("id", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching deals:", error.message);
        setDealsProducts([]);
      } else {
        setDealsProducts(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setDealsProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Transform Supabase products to match UI
  const transformProducts = (products) => {
    return products.map((product) => ({
      id: product.id,
      name: product.name || "Product",
      price: product.price ? `$${product.price}` : "$0",
      image: product.image_path || getProductIcon(product.category || product.name),
      discount: product.discount ? `${product.discount}% OFF` : "No discount",
    }));
  };

  // Get product icon if image is missing
  const getProductIcon = (category) => {
    const iconMap = {
      books: "📚",
      clothes: "👕",
      tech: "💻",
      home: "🏠",
      electronics: "📱",
      fashion: "👗",
      sports: "⚽",
      automotive: "🚗",
      food: "🍽️",
      health: "💊",
      beauty: "💄",
      toys: "🎮",
      shoes: "👟",
      bag: "👜",
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (category?.toLowerCase().includes(key)) return icon;
    }
    return "📦"; // Default icon
  };

  // Final transformed products
  const products = transformProducts(dealsProducts);

  return (
    <div className="my-6 flex items-center border border-gray-200 rounded-md mx-12 bg-white">
      {/* Left Section (Title + Countdown) */}
      <div className="mb-12 mr-12 pl-4">
        <h1 className="font-bold">Deals And Offers</h1>
        <p>Hygiene equipments</p>

        {/* Countdown */}
        <div className="mt-3 flex gap-2 text-xs">
          {["days", "hours", "minutes", "seconds"].map((unit, i) => (
            <div
              key={i}
              className="bg-black text-white px-2 py-2 rounded font-bold"
            >
              {timeLeft[unit].toString().padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Deals Grid) */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading deals...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white px-16 py-5 hover:shadow-md transition-shadow cursor-pointer border-l border-gray-200 truncate"
            >
              <div className="text-center mb-3">
                {product.image.startsWith("http") ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg mx-auto"
                  />
                ) : (
                  <div className="text-5xl">{product.image}</div>
                )}
              </div>
              <h3 className="font-medium text-gray-800 mb-2 text-center text-sm">
                {product.name}
              </h3>
              <p className="text-blue-600 font-semibold text-center mb-1">
                {product.price}
              </p>
              <span className="text-red-500 text-sm font-medium block text-center">
                {product.discount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
