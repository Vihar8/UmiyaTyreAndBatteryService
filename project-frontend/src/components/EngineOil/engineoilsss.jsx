import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ShoppingCart, Droplet } from 'lucide-react';

// Enhanced oil products data with brand and viscosity information
const oilProducts = [
  { id: 1, name: 'Shell 10W-30 Semi Synthetic', type: 'Activa', image: '/assets/800.png', brand: 'Shell', viscosity: '10W-30', category: 'Semi Synthetic' },
  { id: 2, name: 'Shell 10W-30 Premium Mineral', type: 'Activa', image: '/assets/800y.jpeg', brand: 'Shell', viscosity: '10W-30', category: 'Mineral' },
  { id: 3, name: 'Shell 5W-40 Fully Synthetic', type: 'Car', image: '/assets/540.jpeg', brand: 'Shell', viscosity: '5W-40', category: 'Fully Synthetic' },
  { id: 4, name: 'Shell 10W-40 HX7 Synthetic', type: 'Car', image: '/assets/1040c.jpeg', brand: 'Shell', viscosity: '10W-40', category: 'Synthetic' },
  { id: 5, name: 'Shell 5W-40 Fully Synthetic', type: 'Car', image: '/assets/540cs.jpeg', brand: 'Shell', viscosity: '5W-40', category: 'Fully Synthetic' },
  { id: 6, name: 'Shell 15W-40 Premium Mineral', type: 'Car', image: '/assets/1540cm.jpeg', brand: 'Shell', viscosity: '15W-40', category: 'Mineral' },
  { id: 7, name: 'Shell 5W-30 TAXI Synthetic Technology', type: 'Car', image: '/assets/530taxi.jpeg', brand: 'Shell', viscosity: '5W-30', category: 'Synthetic' },
  { id: 8, name: 'Shell 5W-30 Fully Synthetic', type: 'Car', image: '/assets/530cn.jpeg', brand: 'Shell', viscosity: '5W-30', category: 'Fully Synthetic' },
  { id: 9, name: 'Shell Advance 10W-40 AX7', type: 'Bike', image: '/assets/1040s.jpeg', brand: 'Shell', viscosity: '10W-40', category: 'Synthetic' },
  { id: 10, name: 'Shell Advance 10W-30 AX5', type: 'Bike', image: '/assets/1030pm.webp', brand: 'Shell', viscosity: '10W-30', category: 'Semi Synthetic' },
  { id: 11, name: 'Shell Advance 20W-40 AX3', type: 'Bike', image: '/assets/2040.webp', brand: 'Shell', viscosity: '20W-40', category: 'Mineral' },
  { id: 12, name: 'Shell Rimula R4 15W-40', type: 'Truck', image: '/assets/r4shell.webp', brand: 'Shell', viscosity: '15W-40', category: 'Mineral' },
  { id: 13, name: 'Castrol Scooter 10W-30 Synthetic', type: 'Activa', image: '/assets/castrolcom.jpeg', brand: 'Castrol', viscosity: '10W-30', category: 'Synthetic' },
  { id: 14, name: 'Castrol Edge 5W-40', type: 'Car', image: '/assets/cased.jpg', brand: 'Castrol', viscosity: '5W-40', category: 'Fully Synthetic' },
  { id: 15, name: 'Repsol Moto Sintetico 10W-40', type: 'Bike', image: '/assets/repsolmoto.jpg', brand: 'Repsol', viscosity: '10W-40', category: 'Synthetic' },
  { id: 16, name: 'Repsol Elite 5W-30', type: 'Car', image: '/assets/repsol-elite.jpeg', brand: 'Repsol', viscosity: '5W-30', category: 'Fully Synthetic' },
];

const EngineOils = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOils, setFilteredOils] = useState(oilProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    type: [],
    category: [],
    viscosity: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  
  // Extract unique filter options
  const brands = [...new Set(oilProducts.map(product => product.brand))];
  const types = [...new Set(oilProducts.map(product => product.type))];
  const categories = [...new Set(oilProducts.map(product => product.category))];
  const viscosities = [...new Set(oilProducts.map(product => product.viscosity))];

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
    let filtered = oilProducts;
    
    // Apply search
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search) || 
        product.type.toLowerCase().includes(search) ||
        product.viscosity.toLowerCase().includes(search)
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
    
    // Apply viscosity filter
    if (filters.viscosity.length > 0) {
      filtered = filtered.filter(product => filters.viscosity.includes(product.viscosity));
    }
    
    setFilteredOils(filtered);
  };

  // Update filtered oils when filters change
  useEffect(() => {
    applyFilters(searchTerm, selectedFilters);
  }, [selectedFilters]);

  // Get color based on oil category
  const getCategoryColor = (category) => {
    switch(category) {
      case 'Fully Synthetic': return 'bg-blue-600';
      case 'Synthetic': return 'bg-blue-500';
      case 'Semi Synthetic': return 'bg-green-500';
      case 'Mineral': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with oil-themed gradient */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Premium Engine Oils</h1>
          </div>
          <p className="text-xl mb-6">Quality lubricants for optimal engine performance and longevity</p>
          
          {/* Search bar in hero section */}
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search by oil name, type or viscosity..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white text-gray-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filter section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Engine Oil Products</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
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
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
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
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Oil category filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Oil Type</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleFilter('category', category)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.category.includes(category)
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Viscosity filters */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Viscosity</h3>
                <div className="flex flex-wrap gap-2">
                  {viscosities.map(viscosity => (
                    <button
                      key={viscosity}
                      onClick={() => toggleFilter('viscosity', viscosity)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedFilters.viscosity.includes(viscosity)
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {viscosity}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Results count */}
          <p className="text-gray-600 mb-4">Showing {filteredOils.length} products</p>
        </div>
        
        {/* Products grid */}
        {filteredOils.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredOils.map(product => (
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
                    <button className="m-3 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:bg-amber-700 transition">
                      <ShoppingCart size={16} />
                      Enquire Now
                    </button>
                  </div>
                  <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                    {product.viscosity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No oils found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilters({ brand: [], type: [], category: [], viscosity: [] });
              }}
              className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineOils;