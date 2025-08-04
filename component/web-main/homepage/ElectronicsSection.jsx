export default function ElectronicsSection() {
  const products = [
    { name: "Smartwatch", price: "$199", image: "⌚" },
    { name: "Camera", price: "$399", image: "📷" },
    { name: "Gaming Set", price: "$299", image: "🎮" },
    { name: "Laptop & PC", price: "$899", image: "💻" },
    { name: "Headphones", price: "$89", image: "🎧" },
    { name: "Smartphones", price: "$699", image: "📱" },
    { name: "Electric Kettle", price: "$49", image: "🫖" },
    { name: "Electric Kettle", price: "$49", image: "🫖" }
  ];

 return (
    <div className="mb-6 mx-12">
      <div className="flex border border-gray-200 rounded-md overflow-hidden">

        {/* Left Section with Background Image, Blur and Overlay */}
        <div className="relative w-[210px] flex-shrink-0 flex">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/electronicSection/2899a4374c8412945ece65003461e7d1b12857d0.png')",
            }}
          ></div>

          {/* White overlay */}
          <div className="absolute inset-0 bg-white opacity-30"></div>

          {/* Content on top */}
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-2 text-black mt-6 mx-6">Consumer electronics and gadgets</h2>
            <button className="text-sm bg-white text-black rounded-md px-3 py-1 w-fit mb-20 mx-6">
              Source Now
            </button>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full">
          {products.map((product, index) => (
            <div
              key={index}
              className="border-l border-t border-gray-200 p-4 flex flex-col justify-center items-center text-center"
            >
              <div className="text-3xl mb-2">{product.image}</div>
              <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
              <p className="text-sm font-semibold text-blue-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
