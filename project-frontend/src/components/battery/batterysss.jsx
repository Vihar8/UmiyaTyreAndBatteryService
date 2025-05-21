import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ShoppingCart, Battery } from 'lucide-react';

// Enhanced battery products data
const batteryProducts = [
  { id: 1, name: 'Amaron Activa Battery', brand: 'Amaron', type: 'Bike', category: 'Maintenance Free', size: 'BT4LB', image: '/assets/4lb.webp' },
  { id: 2, name: 'Amaron Activa Battery', brand: 'Amaron', type: 'Bike', category: 'Maintenance Free', size: 'BTZ5LB', image: '/assets/5lb.webp' },
  { id: 3, name: 'Amaron Bike Battery', brand: 'Amaron', type: 'Bike', category: 'Standard', size: 'BTZ4LB', image: '/assets/4lb.webp' },
  { id: 4, name: 'Amaron Bike Battery', brand: 'Amaron', type: 'Bike', category: 'Standard', size: 'BTZ5LB', image: '/assets/5lb.webp' },
  { id: 5, name: 'Amaron Car Battery', brand: 'Amaron', type: 'Car', category: 'Premium', size: 'Din 55 FLO', image: '/assets/din55.jpeg' },
  { id: 6, name: 'Amaron Flo Car Battery', brand: 'Amaron', type: 'Car', category: 'Premium', size: '200Ah', image: '/assets/acar.png' },
  { id: 7, name: 'Amaron Go Car Battery', brand: 'Amaron', type: 'Car', category: 'Standard', size: '200Ah', image: '/assets/acargo.png' },
  { id: 8, name: 'Amaron Elito Car Battery', brand: 'Amaron', type: 'Car', category: 'Tubular', size: '200Ah', image: '/assets/aelito.jpeg' },
  { id: 9, name: 'Exide Activa Battery', brand: 'Exide', type: 'Bike', category: 'Maintenance Free', size: 'BTZ4LB', image: '/assets/4lbe.jpeg' },
  { id: 10, name: 'Exide Activa Battery', brand: 'Exide', type: 'Bike', category: 'Maintenance Free', size: 'BTZ5LB', image: '/assets/5lbe.webp' },
  { id: 11, name: 'Exide Bike Battery', brand: 'Exide', type: 'Bike', category: 'Standard', size: 'BTZ4LB', image: '/assets/4lbe.jpeg' },
  { id: 12, name: 'Exide Bike Battery', brand: 'Exide', type: 'Bike', category: 'Standard', size: 'BTZ5LB', image: '/assets/5lb.webp' },
  { id: 13, name: 'Exide Car Battery', brand: 'Exide', type: 'Car', category: 'Premium', size: '200Ah', image: '/assets/ecar.jpeg' },
];

const BatteryListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBatteries, setFilteredBatteries] = useState(batteryProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    type: [],
    category: [],
    size: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  
  // Extract unique filter options
  const brands = [...new Set(batteryProducts.map(product => product.brand))];
  const types = [...new Set(batteryProducts.map(product => product.type))];
  const categories = [...new Set(batteryProducts.map(product => product.category))];
  const sizes = [...new Set(batteryProducts.map(product => product.size))];

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    applyFilters(value, selectedFilters);
  };

  // Toggle filter selection
  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => {
      const updatedFilters = { ...prev };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      return updatedFilters;
    });
  };

  // Apply both search and filters
  const applyFilters = (search, filters) => {
    let filtered = batteryProducts;
    
    // Apply search
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search) || 
        product.type.toLowerCase().includes(search) ||
        product.size.toLowerCase().includes(search)
      );
    }
    
    // Apply brand filter
    if (filters.brand.length > 0) {
      filtered = filtered.filter(product => filters.brand.includes(product.brand));
    }
    
    // Apply type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter(product => filters.type.includes(product.type));
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => filters.category.includes(product.category));
    }
    
    // Apply size filter
    if (filters.size.length > 0) {
      filtered = filtered.filter(product => filters.size.includes(product.size));
    }
    
    setFilteredBatteries(filtered);
  };

  // Update filtered batteries when filters change
  useEffect(() => {
    applyFilters(searchTerm, selectedFilters);
  }, [selectedFilters]);

  // Get color based on battery category
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Premium': return 'bg-blue-600';
      case 'Maintenance Free': return 'bg-green-600';
      case 'Standard': return 'bg-amber-500';
      case 'Tubular': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with battery-themed gradient */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Battery className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Premium Batteries</h1>
          </div>
          <p className="text-xl mb-6">High-quality batteries for cars, bikes, and more</p>
          
          {/* Search bar in hero section */}
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search by battery name, type or size..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white text-gray-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filter section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Battery Products</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 transition"
            >
              <Filter size={18} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brand filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => toggleFilter('brand', brand)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.brand.includes(brand)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Type filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Vehicle Type</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFilter('type', type)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.type.includes(type)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Battery category filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Battery Type</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleFilter('category', category)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.category.includes(category)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleFilter('size', size)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.size.includes(size)
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Results count */}
          <p className="text-gray-600 mb-4">Showing {filteredBatteries.length} products</p>
        </div>
        
        {/* Products grid */}
        {filteredBatteries.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredBatteries.map(product => (
              <div 
                key={product.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300 hover:shadow-lg"
                onMouseEnter={() => setActiveProduct(product.id)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end transition-opacity duration-300 ${activeProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="m-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700 transition">
                      <ShoppingCart size={16} />
                      Enquire Now
                    </button>
                  </div>
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.brand}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${getCategoryColor(product.category)} text-white text-xs px-2 py-0.5 rounded`}>
                      {product.category}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                      {product.type}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm font-mono bg-gray-50 inline-block px-2 py-0.5 rounded border border-gray-200">
                    {product.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No batteries found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilters({ brand: [], type: [], category: [], size: [] });
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatteryListing;