export default function SupplierRequestSection() {
  return (
    <div className="mb-8 bg-blue-700 mx-12 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="text-white p-8">
          <h3 className="text-2xl font-bold mb-4">An easy way to send requests to all suppliers</h3>
          <p className="text-blue-100 text-sm leading-relaxed">Get quotes from multiple suppliers quickly and efficiently. Our platform connects you with verified suppliers worldwide.</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 m-6 p-6 mx-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Send quote to suppliers</h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter item you need?"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <textarea
            className="w-full h-18 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
             placeholder="Type more details"
            ></textarea>
            </div>
            <div>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Quantity</option>
                <option>1-10</option>
                <option>11-50</option>
                <option>51-100</option>
                <option>100+</option>
              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Send inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 