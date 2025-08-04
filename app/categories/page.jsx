"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { name: "Automobiles", active: true },
    { name: "Home & outdoor" },
    { name: "Consumer electronics and gadgets" },
    { name: "Tools, equipment" },
    { name: "Sports and outdoor" },
    { name: "Animal and pets" },
    { name: "Machinery, tools" },
    { name: "Clothes" },
    { name: "More category" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">All Categories</h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="block"
            >
              <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                category.active ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              }`}>
                <div className="text-center">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    category.active ? 'text-blue-700' : 'text-gray-800'
                  }`}>
                    {category.name}
                  </h3>
                  {category.active && (
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Browse through our comprehensive collection of categories to find exactly what you're looking for.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 