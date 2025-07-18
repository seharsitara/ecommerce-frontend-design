"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function AdminPage() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('tech');
  const [size, setSize] = useState('M');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleUpload = async () => {
    if (!file || !name || !price || !category || !size) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { error: productUploadError } = await supabase.storage
      .from('products')
      .upload(`${category}/${fileName}`, file);

    const { error: categoryUploadError } = await supabase.storage
      .from(category)
      .upload(fileName, file);

    if (productUploadError || categoryUploadError) {
      alert(
        'Image upload failed: ' +
        (productUploadError?.message || categoryUploadError?.message)
      );
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from('products')
      .getPublicUrl(`${category}/${fileName}`);
    const image_url = urlData?.publicUrl;

    if (!image_url) {
      alert('Failed to get image URL');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/admin-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: Number(price), category, size, image_url }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert('Product save failed: ' + result.error);
    } else {
      alert('✅ Product uploaded!');
      setFile(null);
      setImageUrl('');
      setName('');
      setPrice('');
      setCategory('tech');
      setSize('M');
    }

    setLoading(false);
  };

  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Admin</h1>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Upload Product</h2>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="tech">Tech</option>
            <option value="books">Books</option>
            <option value="clothes">Clothes</option>
            <option value="interior">Interior</option>
            <option value="deploy">Deploy</option>
          </select>

          

          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />


<select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setFile(f);
              if (f) setImageUrl(URL.createObjectURL(f));
            }}
          />
          

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded border"
            />
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Uploading...' : 'Upload Product'}
          </button>
        </div>
      </main>
    </div>
  );
}
