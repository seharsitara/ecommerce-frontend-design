export default function RightBoxesSection() {
  return (
    <div className="lg:col-span-3 space-y-4">
      {/* Login/Join Box */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
            <span className="text-gray-500 text-xl">👤</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hi, will get started</p>
            <p className="font-semibold text-gray-800">Let's start</p>
          </div>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm">
            Join now
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors text-sm">
            Log in
          </button>
        </div>
      </div>

      {/* Offer Box */}
      <div className="bg-orange-500 text-white rounded-lg shadow-sm p-4">
        <p className="font-semibold text-sm">Get 125 $ off with a new supplier</p>
      </div>

      {/* Assistance Box */}
      <div className="bg-blue-50 text-blue-800 rounded-lg shadow-sm border border-blue-200 p-4">
        <p className="font-semibold text-sm">Send quotes with expert assistance</p>
      </div>
    </div>
  );
} 