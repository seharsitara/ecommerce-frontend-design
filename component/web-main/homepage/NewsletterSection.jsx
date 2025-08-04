export default function NewsletterSection() {
  return (
    <div className="w-full">
      <div className="bg-gray-200  p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Subscribe to our newsletter</h2>
        <p className="text-gray-600 mb-6 text-sm">Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
} 