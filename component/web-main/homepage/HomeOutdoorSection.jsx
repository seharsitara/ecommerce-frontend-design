export default function HomeOutdoorSection() {
  const products = [
    { name: "Sofa", price: "$299", image: "🛋️" },
    { name: "Chair", price: "$89", image: "🪑" },
    { name: "Lamp", price: "$45", image: "💡" },
    { name: "Kitchen Mixer", price: "$129", image: "🥄" },
    { name: "Blender", price: "$79", image: "🍹" },
    { name: "Plant", price: "$25", image: "🌱" },
    { name: "Coffee Maker", price: "$149", image: "☕" },
    { name: "Smartwatch", price: "$199", image: "⌚" },
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
                "url('/electronicSection/e569161444be4cfea24366cb3d27cb335105ed84 (1).jpg')",
            }}
          ></div>

          {/* White overlay */}
          <div className="absolute inset-0 bg-white opacity-30"></div>

          {/* Content on top */}
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-2 text-black mt-6 mx-6">Outdoor & Home</h2>
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
