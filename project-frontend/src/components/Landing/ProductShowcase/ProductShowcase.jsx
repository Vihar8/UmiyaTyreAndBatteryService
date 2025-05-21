import React, { useState } from "react";

function ProductShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const products = [
    {
      src: "/assets/tyre1.jpeg",
      title: "Premium Tyres",
      desc: "Durable and versatile tyres for all driving conditions.",
      icon: "🛞"
    },
    {
      src: "/assets/oil1.jpeg",
      title: "Engine Oil",
      desc: "Specially formulated for optimal engine performance.",
      icon: "💧"
    },
    {
      src: "/assets/battery1.jpeg",
      title: "Batteries",
      desc: "Engineered for superior handling and long-lasting power.",
      icon: "🔋"
    },
    {
      src: "/assets/oilfilter.jpg",
      title: "Oil & Air Filters",
      desc: "Ensures optimal engine performance by trapping contaminants.",
      icon: "🔄"
    },
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Title with animated gradient border */}
        <div className="relative mb-12 text-center">
          <h2 className="text-4xl font-bold mt-6 text-gray-800"> Our Products</h2>
        </div>

        {/* Products grid with improved responsive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Product image with zoom effect */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={product.src}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredIndex === index ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              {/* Product content with icon */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl" aria-hidden="true">{product.icon}</span>
                  <h3 className="font-bold text-lg text-gray-800">{product.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductShowcase;