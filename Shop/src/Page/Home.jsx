import React from "react";
import {
  ShoppingBag,
  TrendingUp,
  Shield,
  Truck,
  Star,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: "Smart Watch Ultra",
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      rating: 4.9,
      reviews: 189,
    },
    {
      id: 3,
      name: "Leather Backpack",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Minimalist Sneakers",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      rating: 4.6,
      reviews: 312,
    },
  ];

  const categories = [
    { name: "Electronics", icon: "📱", color: "from-blue-500 to-blue-600" },
    { name: "Fashion", icon: "👔", color: "from-purple-500 to-purple-600" },
    { name: "Home & Living", icon: "🏠", color: "from-green-500 to-green-600" },
    { name: "Sports", icon: "⚽", color: "from-orange-500 to-orange-600" },
    { name: "Beauty", icon: "💄", color: "from-pink-500 to-pink-600" },
    { name: "Books", icon: "📚", color: "from-yellow-500 to-yellow-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to <span className="text-yellow-300">Shopverse</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-indigo-100">
              Discover premium quality products from trusted brands, with
              exclusive discounts and lightning-fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition transform hover:scale-105 flex items-center justify-center shadow-md">
                Shop Now <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
                View Deals
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop"
              alt="Shopping"
              className="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Truck className="w-8 h-8 text-indigo-600" />,
              title: "Free Shipping",
              desc: "On orders over $50",
              bg: "bg-indigo-100",
            },
            {
              icon: <Shield className="w-8 h-8 text-green-600" />,
              title: "Secure Payment",
              desc: "100% safe and protected",
              bg: "bg-green-100",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
              title: "Best Prices",
              desc: "Guaranteed low prices",
              bg: "bg-purple-100",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-2xl hover:shadow-xl transition-all bg-gradient-to-br from-gray-50 to-white"
            >
              <div
                className={`${feature.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg`}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Products</h2>
            <a
              href="#"
              className="text-indigo-600 font-semibold flex items-center hover:text-indigo-700"
            >
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      ${product.price}
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg mb-8 text-indigo-100">
            Subscribe for updates, exclusive offers, and new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white"
            />
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-indigo-50 transition transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
