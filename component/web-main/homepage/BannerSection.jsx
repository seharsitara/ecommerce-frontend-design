export default function BannerSection() {
  return (
    <div className="lg:col-span-6">
      <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg shadow-md p-8 text-white relative overflow-hidden h-64">
        <div className="relative z-10 h-full flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Latest trending Electronic items</h2>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors w-fit">
            Learn more
          </button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-3 opacity-30">
          <div className="w-20 h-20 bg-white rounded-lg shadow-lg"></div>
          <div className="w-20 h-20 bg-white rounded-lg shadow-lg"></div>
          <div className="w-20 h-20 bg-white rounded-lg shadow-lg"></div>
        </div>
      </div>
    </div>
  );
} 