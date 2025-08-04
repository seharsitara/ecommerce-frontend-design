export default function CategoriesSection() {
  const categories = [
    { name: "Automobiles", active: true },
    { name: "Home & outdoor" },
    { name: "Consumer electronics and gadgets" },
    { name: "Tools, equipment" },
    { name: "Sports and outdoor" },
    { name: "Animal and pets" },
    { name: "Machinery, tools" },
    { name: "More category" }
  ];

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
        <div className="space-y-1">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-2 rounded-md cursor-pointer transition-colors text-sm ${
                category.active 
                  ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200' 
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 