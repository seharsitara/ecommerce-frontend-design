"use client";

import { useState, useEffect } from "react";
import { Upload, Image, FileText, Settings, Users, Package, BarChart3, Plus, Trash2, Edit, Eye, FolderOpen, Star, ChevronDown, ChevronRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageCategory, setImageCategory] = useState("products");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [imageDescription, setImageDescription] = useState("");
  const [imagePrice, setImagePrice] = useState("");
  const [selectedBucket, setSelectedBucket] = useState("products");

  // Categories management state
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("📦");
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryStats, setCategoryStats] = useState({});
  const [selectedParentCategory, setSelectedParentCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isRecommended, setIsRecommended] = useState(false);

  // Available buckets
  const buckets = [
    { id: "products", name: "Products", icon: Package },
    { id: "clothes", name: "Clothes", icon: Image },
    { id: "interior", name: "Interior", icon: Image },
    { id: "tech", name: "Tech", icon: Image },
    { id: "avatar", name: "Avatar", icon: Users },
    { id: "books", name: "Books", icon: FileText }
  ];

  // Available sizes
  const sizeOptions = [
    { id: "xs", label: "XS", value: "Extra Small" },
    { id: "s", label: "S", value: "Small" },
    { id: "m", label: "M", value: "Medium" },
    { id: "l", label: "L", value: "Large" },
    { id: "xl", label: "XL", value: "Extra Large" },
    { id: "xxl", label: "XXL", value: "2XL" },
    { id: "custom", label: "Custom", value: "Custom Size" }
  ];

  // Dashboard stats
  const stats = [
    { title: "Total Images", value: uploadedImages.length, icon: Image, color: "text-blue-600" },
    { title: "Buckets", value: buckets.length.toString(), icon: Package, color: "text-green-600" },
    { title: "Categories", value: categories.length.toString(), icon: FolderOpen, color: "text-purple-600" },
    { title: "Analytics", value: "Active", icon: BarChart3, color: "text-orange-600" }
  ];

  // Fetch uploaded images on component mount
  useEffect(() => {
    fetchUploadedImages();
    fetchCategories();
  }, [selectedBucket]);

  // Add new category
  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    const fullCategoryPath = selectedParentCategory 
      ? `${selectedParentCategory}/${newCategoryName}`
      : newCategoryName;

    // Check if category already exists
    if (categories.find(cat => cat.fullPath.toLowerCase() === fullCategoryPath.toLowerCase())) {
      alert('Category already exists');
      return;
    }

    const newCategory = {
      id: fullCategoryPath,
      name: newCategoryName,
      fullPath: fullCategoryPath,
      parent: selectedParentCategory || null,
      icon: newCategoryIcon,
      productCount: 0,
      isRecommended: isRecommended,
      level: selectedParentCategory ? selectedParentCategory.split('/').length + 1 : 1
    };

    // Save category to database
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{
          id: fullCategoryPath,
          name: newCategoryName,
          full_path: fullCategoryPath,
          parent: selectedParentCategory || null,
          icon: newCategoryIcon,
          is_recommended: isRecommended,
          level: selectedParentCategory ? selectedParentCategory.split('/').length + 1 : 1
        }]);

      if (error) {
        console.error('Error saving category:', error);
        // If categories table doesn't exist, just add to local state
        if (error.code === '42P01') { // Table doesn't exist
          console.log('Categories table not found, using local state only');
        } else {
          alert('Error saving category: ' + error.message);
          return;
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      // Continue with local state if database save fails
    }

    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName("");
    setNewCategoryIcon("📦");
    setSelectedParentCategory("");
    setIsRecommended(false);
  };

  // Edit category
  const editCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryIcon(category.icon);
    setSelectedParentCategory(category.parent || "");
    setIsRecommended(category.isRecommended);
  };

  // Save edited category
  const saveEditedCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }

    const newFullPath = selectedParentCategory 
      ? `${selectedParentCategory}/${newCategoryName}`
      : newCategoryName;

    // Update category in database
    try {
      const { error } = await supabase
        .from('categories')
        .update({
          name: newCategoryName,
          full_path: newFullPath,
          parent: selectedParentCategory || null,
          icon: newCategoryIcon,
          is_recommended: isRecommended,
          level: selectedParentCategory ? selectedParentCategory.split('/').length + 1 : 1
        })
        .eq('id', editingCategory.id);

      if (error) {
        console.error('Error updating category:', error);
        if (error.code !== '42P01') { // Ignore if table doesn't exist
          alert('Error updating category: ' + error.message);
          return;
        }
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }

    setCategories(prev => prev.map(cat => 
      cat.id === editingCategory.id 
        ? { 
            ...cat, 
            name: newCategoryName, 
            icon: newCategoryIcon,
            fullPath: newFullPath,
            parent: selectedParentCategory || null,
            isRecommended: isRecommended,
            level: selectedParentCategory ? selectedParentCategory.split('/').length + 1 : 1
          }
        : cat
    ));

    setEditingCategory(null);
    setNewCategoryName("");
    setNewCategoryIcon("📦");
    setSelectedParentCategory("");
    setIsRecommended(false);
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    if (confirm(`Are you sure you want to delete the category "${categoryId}"? This will affect all products in this category.`)) {
      // Check if category has products
      const { data: products, error } = await supabase
        .from('products')
        .select('id')
        .eq('category', categoryId);

      if (error) {
        console.error('Error checking category products:', error);
        return;
      }

      if (products && products.length > 0) {
        alert(`Cannot delete category "${categoryId}" because it has ${products.length} products. Please move or delete the products first.`);
        return;
      }

      // Check if category has child categories
      const hasChildren = categories.some(cat => cat.parent === categoryId);
      if (hasChildren) {
        alert(`Cannot delete category "${categoryId}" because it has subcategories. Please delete subcategories first.`);
        return;
      }

      // Delete from database
      try {
        const { error: deleteError } = await supabase
          .from('categories')
          .delete()
          .eq('id', categoryId);

        if (deleteError) {
          console.error('Error deleting category:', deleteError);
          if (deleteError.code !== '42P01') { // Ignore if table doesn't exist
            alert('Error deleting category: ' + deleteError.message);
            return;
          }
        }
      } catch (error) {
        console.error('Error deleting category:', error);
      }

      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  // Toggle category selection
  const toggleCategorySelection = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Select all categories
  const selectAllCategories = () => {
    setSelectedCategories(categories.map(cat => cat.id));
  };

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedCategories([]);
  };

  // Render category tree
  const renderCategoryTree = (categories, level = 0) => {
    return categories.map(category => {
      const children = getChildCategories(category.fullPath);
      const isExpanded = expandedCategories.has(category.id);
      const isSelected = selectedCategories.includes(category.id);

      return (
        <div key={category.id} className={`${level > 0 ? 'ml-6' : ''}`}>
          <div className={`flex items-center justify-between p-3 rounded-lg border ${
            isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
          } mb-2`}>
            <div className="flex items-center space-x-3">
              {children.length > 0 && (
                <button
                  onClick={() => toggleCategoryExpansion(category.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
              <span className="text-xl">{category.icon}</span>
              <div>
                <h4 className="font-medium text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-500">{category.productCount} products</p>
                {category.isRecommended && (
                  <span className="inline-flex items-center text-xs text-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Recommended
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleCategorySelection(category.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <button
                onClick={() => editCategory(category)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit category"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {isExpanded && children.length > 0 && (
            <div className="ml-4">
              {renderCategoryTree(children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  // Get icon for category
  const getCategoryIcon = (category) => {
    const iconMap = {
      'books': '📚',
      'products': '📦',
      'clothes': '👕',
      'interior': '🏠',
      'tech': '💻',
      'avatar': '👤',
      'electronics': '📱',
      'fashion': '👗',
      'home': '🏡',
      'sports': '⚽',
      'automotive': '🚗',
      'food': '🍽️',
      'health': '💊',
      'beauty': '💄',
      'toys': '🎮',
      'books/fiction': '📖',
      'books/non-fiction': '📚',
      'books/educational': '🎓',
      'clothes/men': '👔',
      'clothes/women': '👗',
      'clothes/kids': '👶',
      'tech/computers': '💻',
      'tech/phones': '📱',
      'tech/accessories': '🎧',
      'home/furniture': '🪑',
      'home/decor': '🖼️',
      'home/kitchen': '🍳',
      'recommended': '⭐',
      'featured': '🌟',
      'trending': '🔥',
      'new': '🆕',
      'sale': '🏷️'
    };
    
    // Check for exact match first
    if (iconMap[category]) {
      return iconMap[category];
    }
    
    // Check for partial matches
    for (const [key, icon] of Object.entries(iconMap)) {
      if (category.includes(key)) {
        return icon;
      }
    }
    
    return '📦';
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Get child categories
  const getChildCategories = (parentPath) => {
    return categories.filter(cat => cat.parent === parentPath);
  };

  // Get root categories
  const getRootCategories = () => {
    return categories.filter(cat => !cat.parent);
  };

  const fetchUploadedImages = async () => {
    try {
      // Fetch from products table
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      // Transform products data to match our display format
      const imagesWithUrls = products.map((product) => ({
        id: product.id,
        name: product.name,
        url: product.image_path,
        size: 0, // File size not stored in products table
        created_at: product.created_at || new Date().toISOString(),
        category: product.category || selectedBucket,
        imageSizes: product.size ? product.size.split(',') : [],
        description: product.description || '',
        price: product.price ? `$${product.price}` : '',
        bucket: selectedBucket
      }));

      setUploadedImages(imagesWithUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageName(file.name.split('.')[0]); // Set default name from filename
    }
  };

  const handleSizeChange = (sizeId) => {
    setSelectedSizes(prev => {
      if (prev.includes(sizeId)) {
        return prev.filter(id => id !== sizeId);
      } else {
        return [...prev, sizeId];
      }
    });
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    if (!imageName.trim()) {
      alert('Please enter an image name');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${imageName || 'image'}.${fileExt}`;

      // Upload to selected Supabase bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(selectedBucket)
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        alert('Upload failed: ' + uploadError.message);
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(selectedBucket)
        .getPublicUrl(fileName);

      // Prepare data for products table
      const productData = {
        name: imageName,
        description: imageDescription,
        size: selectedSizes.join(','), // Convert array to comma-separated string
        price: imagePrice ? parseFloat(imagePrice.replace(/[^0-9.]/g, '')) : null,
        category: imageCategory,
        image_path: urlData.publicUrl
      };

      // Insert into products table
      const { data: insertData, error: insertError } = await supabase
        .from('products')
        .insert([productData])
        .select();

      if (insertError) {
        console.error('Database insert error:', insertError);
        alert('Failed to save product data: ' + insertError.message);
        return;
      }

      // Add to uploaded images list
      const newImage = {
        id: insertData[0].id,
        name: fileName,
        url: urlData.publicUrl,
        size: selectedFile.size,
        created_at: new Date().toISOString(),
        category: imageCategory,
        imageSizes: selectedSizes,
        description: imageDescription,
        price: imagePrice,
        bucket: selectedBucket
      };

      setUploadedImages(prev => [newImage, ...prev]);

      // Reset form
      setSelectedFile(null);
      setImageName("");
      setImageCategory(selectedBucket);
      setSelectedSizes([]);
      setImageDescription("");
      setImagePrice("");
      setUploadProgress(100);

      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);

      alert('Product uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
      setIsUploading(false);
    }
  };

  const deleteImage = async (imageName) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        // Find the product in the database
        const { data: products, error: fetchError } = await supabase
          .from('products')
          .select('id, image_path')
          .eq('name', imageName.split('.')[0]); // Remove file extension

        if (fetchError) {
          console.error('Error fetching product:', fetchError);
          alert('Delete failed: ' + fetchError.message);
          return;
        }

        if (products.length === 0) {
          alert('Product not found in database');
          return;
        }

        const product = products[0];

        // Delete from storage
        const fileName = imageName;
        const { error: storageError } = await supabase.storage
          .from(selectedBucket)
          .remove([fileName]);

        if (storageError) {
          console.error('Storage delete error:', storageError);
          // Continue with database deletion even if storage deletion fails
        }

        // Delete from products table
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', product.id);

        if (deleteError) {
          console.error('Database delete error:', deleteError);
          alert('Delete failed: ' + deleteError.message);
          return;
        }

        setUploadedImages(prev => prev.filter(img => img.name !== imageName));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Delete failed: ' + error.message);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Fetch categories from database and products table
  const fetchCategories = async () => {
    try {
      // First try to fetch from categories table
      let categoriesFromDB = [];
      try {
        const { data: dbCategories, error } = await supabase
          .from('categories')
          .select('*')
          .order('level', { ascending: true });

        if (!error && dbCategories) {
          categoriesFromDB = dbCategories.map(cat => ({
            id: cat.id,
            name: cat.name,
            fullPath: cat.full_path,
            parent: cat.parent,
            icon: cat.icon,
            productCount: 0,
            isRecommended: cat.is_recommended,
            level: cat.level
          }));
        }
      } catch (error) {
        console.log('Categories table not found, using products table only');
      }

      // Also fetch categories from products table
      const { data: products, error } = await supabase
        .from('products')
        .select('category');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      // Get unique categories and count products in each
      const categoryCounts = {};
      const uniqueCategories = new Set();

      products.forEach(product => {
        if (product.category) {
          uniqueCategories.add(product.category);
          categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
        }
      });

      // Create hierarchical category structure from products
      const categoriesFromProducts = Array.from(uniqueCategories).map(category => {
        const parts = category.split('/');
        return {
          id: category,
          name: parts[parts.length - 1],
          fullPath: category,
          parent: parts.length > 1 ? parts.slice(0, -1).join('/') : null,
          icon: getCategoryIcon(category),
          productCount: categoryCounts[category] || 0,
          isRecommended: category.includes('recommended') || category.includes('featured'),
          level: parts.length - 1
        };
      });

      // Merge categories from database and products
      const allCategories = [...categoriesFromDB];
      
      // Add categories from products that don't exist in DB
      categoriesFromProducts.forEach(prodCat => {
        const exists = allCategories.find(dbCat => dbCat.id === prodCat.id);
        if (!exists) {
          allCategories.push(prodCat);
        } else {
          // Update product count
          exists.productCount = prodCat.productCount;
        }
      });

      setCategories(allCategories);
      setCategoryStats(categoryCounts);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your products and content</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4 inline mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "upload", name: "Upload Products", icon: Upload },
                { id: "gallery", name: "Product Gallery", icon: Image },
                { id: "categories", name: "Categories", icon: FolderOpen },
                { id: "analytics", name: "Analytics", icon: BarChart3 },
                { id: "settings", name: "Settings", icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "upload" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Upload New Product</h3>
                  
                  {/* Bucket Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Bucket</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {buckets.map((bucket) => (
                        <button
                          key={bucket.id}
                          onClick={() => {
                            setSelectedBucket(bucket.id);
                            setImageCategory(bucket.id);
                          }}
                          className={`p-3 rounded-lg border-2 text-center transition-colors ${
                            selectedBucket === bucket.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <bucket.icon className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-sm font-medium">{bucket.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Choose File
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Uploading to: <span className="font-medium">{selectedBucket}</span> bucket
                    </p>
                  </div>

                  {selectedFile && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                          <p className="text-xs text-blue-600">Bucket: {selectedBucket}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upload Form */}
                  {selectedFile && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                          <input
                            type="text"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            value={imageCategory}
                            onChange={(e) => setImageCategory(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.fullPath}>
                                {category.icon} {category.fullPath} ({category.productCount} products)
                              </option>
                            ))}
                            {categories.length === 0 && buckets.map((bucket) => (
                              <option key={bucket.id} value={bucket.id}>
                                {bucket.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                          <div className="grid grid-cols-3 gap-2">
                            {sizeOptions.map((size) => (
                              <label key={size.id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedSizes.includes(size.id)}
                                  onChange={() => handleSizeChange(size.id)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{size.label}</span>
                              </label>
                            ))}
                          </div>
                          {selectedSizes.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Selected: {selectedSizes.map(id => sizeOptions.find(s => s.id === id)?.label).join(', ')}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Price</label>
                          <input
                            type="text"
                            value={imagePrice}
                            onChange={(e) => setImagePrice(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., 29.99, 0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={imageDescription}
                          onChange={(e) => setImageDescription(e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter product description..."
                        />
                      </div>

                      <button
                        onClick={uploadImage}
                        disabled={isUploading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isUploading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading... {uploadProgress}%
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Upload className="w-4 h-4 mr-2" />
                            Save Product to Database
                          </div>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "gallery" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Product Gallery</h3>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Filter by bucket:</label>
                    <select
                      value={selectedBucket}
                      onChange={(e) => setSelectedBucket(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {buckets.map((bucket) => (
                        <option key={bucket.id} value={bucket.id}>
                          {bucket.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{image.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">ID: {image.id}</p>
                        <p className="text-xs text-blue-600 font-medium">Bucket: {image.bucket}</p>
                        <p className="text-xs text-gray-500">{image.category}</p>
                        {image.imageSizes && image.imageSizes.length > 0 && (
                          <p className="text-xs text-gray-500">
                            Sizes: {image.imageSizes.map(id => sizeOptions.find(s => s.id === id)?.label).join(', ')}
                          </p>
                        )}
                        {image.price && (
                          <p className="text-xs text-green-600 font-medium">Price: {image.price}</p>
                        )}
                        {image.description && (
                          <p className="text-xs text-gray-600 mt-1 truncate">{image.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 text-sm">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteImage(image.name)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Manage Categories</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={selectAllCategories}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Select All
                    </button>
                    <button
                      onClick={clearAllSelections}
                      className="px-3 py-1 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        setEditingCategory(null);
                        setNewCategoryName("");
                        setNewCategoryIcon("📦");
                        setSelectedParentCategory("");
                        setIsRecommended(false);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </button>
                  </div>
                </div>

                {/* Add/Edit Category Form */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-md font-medium text-gray-900 mb-3">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter category name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                      <select
                        value={selectedParentCategory}
                        onChange={(e) => setSelectedParentCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">No Parent (Root Category)</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.fullPath}>
                            {category.fullPath}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <select
                        value={newCategoryIcon}
                        onChange={(e) => setNewCategoryIcon(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="📦">📦 Products</option>
                        <option value="📚">📚 Books</option>
                        <option value="👕">👕 Clothes</option>
                        <option value="🏠">🏠 Interior</option>
                        <option value="💻">💻 Tech</option>
                        <option value="👤">👤 Avatar</option>
                        <option value="🎨">🎨 Art</option>
                        <option value="🏃">🏃 Sports</option>
                        <option value="🍽️">🍽️ Food</option>
                        <option value="🚗">🚗 Automotive</option>
                        <option value="⭐">⭐ Recommended</option>
                        <option value="🌟">🌟 Featured</option>
                        <option value="🔥">🔥 Trending</option>
                        <option value="🆕">🆕 New</option>
                        <option value="🏷️">🏷️ Sale</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isRecommended}
                          onChange={(e) => setIsRecommended(e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Recommended</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    {editingCategory ? (
                      <>
                        <button
                          onClick={saveEditedCategory}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditingCategory(null);
                            setNewCategoryName("");
                            setNewCategoryIcon("📦");
                            setSelectedParentCategory("");
                            setIsRecommended(false);
                          }}
                          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={addCategory}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add Category
                      </button>
                    )}
                  </div>
                </div>

                {/* Selected Categories Summary */}
                {selectedCategories.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Selected Categories ({selectedCategories.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map(categoryId => {
                        const category = categories.find(cat => cat.id === categoryId);
                        return category ? (
                          <span key={categoryId} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            <span className="mr-1">{category.icon}</span>
                            {category.fullPath}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Categories Tree */}
                <div className="space-y-2">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Category Hierarchy</h4>
                  {renderCategoryTree(getRootCategories())}
                </div>

                {categories.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No categories found. Add your first category above.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}