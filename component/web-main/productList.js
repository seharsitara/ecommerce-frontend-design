"use client";

import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/component/context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState(new Set());
  const { addToCart } = useCart();

  // Helper function to get valid image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path, try to construct a valid URL
    // For now, return a placeholder
    return '/placeholder-image.jpg';
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Starting to fetch products...');
        console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'exists' : 'missing');
        
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
        
        console.log('Supabase client created, fetching products...');
        const { data, error } = await supabase.from("products").select("*");
        
        console.log('Query result:', { data, error });
        
        if (error) {
          setError(error.message);
          console.error('Supabase error:', error);
        } else {
          setProducts(data || []);
          console.log('Products loaded:', data);
        }
      } catch (err) {
        setError('Failed to load products: ' + err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => new Set([...prev, product.id]));
    
    // Remove the check mark after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error loading products: {error}</p>
        <p className="text-sm mt-2">Check your browser console for more details.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-8">No products found. Try uploading some products from the admin panel!</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
            <div className="h-48 w-full bg-gray-200 rounded mb-3 flex items-center justify-center">
              {product.image_path ? (
                <img
                  src={getImageUrl(product.image_path)}
                  alt={product.name}
                  className="h-full w-full object-cover rounded"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="hidden h-full w-full items-center justify-center text-gray-500">
                No Image
              </div>
            </div>
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="mt-1 font-semibold text-blue-600">${product.price}</p>
            <p className="text-xs text-gray-500">Size: {product.size}</p>
            <p className="text-xs text-gray-500 mb-3">Category: {product.category}</p>
            
            <button
              onClick={() => handleAddToCart(product)}
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                addedItems.has(product.id)
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {addedItems.has(product.id) ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
