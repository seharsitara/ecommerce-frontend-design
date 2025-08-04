"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage({ params }) {
  const { slug } = params;
  
  // Convert slug back to readable category name
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Sample products for each category
  const getCategoryProducts = (category) => {
    const products = {
      'automobiles': [
        { name: "Car Accessories", price: "$29.99", image: "🚗" },
        { name: "Motorcycle Parts", price: "$45.99", image: "🏍️" },
        { name: "Bike Components", price: "$15.99", image: "🚲" },
        { name: "Auto Tools", price: "$89.99", image: "🔧" },
        { name: "Car Electronics", price: "$199.99", image: "📱" },
        { name: "Vehicle Maintenance", price: "$34.99", image: "🛠️" }
      ],
      'home-outdoor': [
        { name: "Garden Tools", price: "$24.99", image: "🌱" },
        { name: "Outdoor Furniture", price: "$299.99", image: "🪑" },
        { name: "BBQ Equipment", price: "$149.99", image: "🔥" },
        { name: "Plant Pots", price: "$12.99", image: "🪴" },
        { name: "Outdoor Lighting", price: "$39.99", image: "💡" },
        { name: "Patio Decor", price: "$19.99", image: "🏡" }
      ],
      'consumer-electronics-and-gadgets': [
        { name: "Smartphones", price: "$599.99", image: "📱" },
        { name: "Laptops", price: "$899.99", image: "💻" },
        { name: "Headphones", price: "$89.99", image: "🎧" },
        { name: "Smart Watches", price: "$199.99", image: "⌚" },
        { name: "Tablets", price: "$399.99", image: "📱" },
        { name: "Gaming Consoles", price: "$299.99", image: "🎮" }
      ],
      'tools-equipment': [
        { name: "Power Tools", price: "$129.99", image: "🔧" },
        { name: "Hand Tools", price: "$24.99", image: "🔨" },
        { name: "Measuring Tools", price: "$19.99", image: "📏" },
        { name: "Safety Equipment", price: "$34.99", image: "🛡️" },
        { name: "Tool Storage", price: "$49.99", image: "📦" },
        { name: "Workbenches", price: "$199.99", image: "🪑" }
      ],
      'sports-and-outdoor': [
        { name: "Fitness Equipment", price: "$199.99", image: "🏋️" },
        { name: "Camping Gear", price: "$89.99", image: "⛺" },
        { name: "Hiking Boots", price: "$79.99", image: "🥾" },
        { name: "Sports Balls", price: "$29.99", image: "⚽" },
        { name: "Yoga Mats", price: "$24.99", image: "🧘" },
        { name: "Bicycles", price: "$299.99", image: "🚲" }
      ],
      'animal-and-pets': [
        { name: "Pet Food", price: "$24.99", image: "🐕" },
        { name: "Pet Toys", price: "$12.99", image: "🎾" },
        { name: "Pet Beds", price: "$39.99", image: "🛏️" },
        { name: "Pet Carriers", price: "$29.99", image: "🎒" },
        { name: "Pet Grooming", price: "$19.99", image: "✂️" },
        { name: "Pet Health", price: "$34.99", image: "💊" }
      ],
      'machinery-tools': [
        { name: "Industrial Machines", price: "$1299.99", image: "🏭" },
        { name: "CNC Equipment", price: "$2999.99", image: "⚙️" },
        { name: "Welding Tools", price: "$199.99", image: "🔥" },
        { name: "Heavy Equipment", price: "$4999.99", image: "🚜" },
        { name: "Machine Parts", price: "$89.99", image: "🔩" },
        { name: "Industrial Safety", price: "$149.99", image: "🛡️" }
      ],
      'clothes': [
        { name: "Men's Clothing", price: "$49.99", image: "👔" },
        { name: "Women's Fashion", price: "$39.99", image: "👗" },
        { name: "Kids Apparel", price: "$24.99", image: "👶" },
        { name: "Sports Wear", price: "$34.99", image: "🏃" },
        { name: "Accessories", price: "$19.99", image: "👜" },
        { name: "Footwear", price: "$79.99", image: "👟" }
      ],
      'more-category': [
        { name: "Books & Media", price: "$14.99", image: "📚" },
        { name: "Art Supplies", price: "$24.99", image: "🎨" },
        { name: "Musical Instruments", price: "$199.99", image: "🎸" },
        { name: "Kitchen Appliances", price: "$89.99", image: "🍳" },
        { name: "Home Decor", price: "$29.99", image: "🏠" },
        { name: "Office Supplies", price: "$19.99", image: "📝" }
      ]
    };
    
    return products[category] || products['more-category'];
  };

  const products = getCategoryProducts(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/categories"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-4xl mb-4">{product.image}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-blue-600 font-bold text-xl">{product.price}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Explore our {categoryName.toLowerCase()} collection for the best deals and quality products.
          </p>
          <Link 
            href="/categories"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
} 