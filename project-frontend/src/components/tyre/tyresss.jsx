import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ShoppingCart, ShipWheel  } from 'lucide-react';

const tyreProducts = [
  { id: 1, name: 'Ceat Buland (Auto Rickshaw)', size: '400-8', image: '/assets/ceat3.jpeg', brand: 'Ceat', type: 'Auto' },
  { id: 5, name: 'Ceat Bike Tyre', size: '2.75-18', image: '/assets/ceatbike.jpg', brand: 'Ceat', type: 'Bike' },
  { id: 6, name: 'Ceat Bike Tyre', size: '3.00-18', image: '/assets/ceatbike.jpg', brand: 'Ceat', type: 'Bike' },
  { id: 7, name: 'Ceat Bike Tyre', size: '80/100-18', image: '/assets/ceatbike.jpg', brand: 'Ceat', type: 'Bike' },
  { id: 8, name: 'Ceat Bike Tyre', size: '90/90-18', image: '/assets/ceatbike.jpg', brand: 'Ceat', type: 'Bike' },
  { id: 9, name: 'Ceat Activa Tyre', size: '3.50-10', image: '/assets/activaceat.png', brand: 'Ceat', type: 'Scooter' },
  { id: 10, name: 'Ceat Activa Tyre', size: '90/100-10', image: '/assets/activaceat.png', brand: 'Ceat', type: 'Scooter' },
  { id: 11, name: 'Ceat Activa Tyre', size: '90/90-12', image: '/assets/activaceat.png', brand: 'Ceat', type: 'Scooter' },
  { id: 12, name: 'Ceat Activa Tyre', size: '100/90-12', image: '/assets/activaceat.png', brand: 'Ceat', type: 'Scooter' },
  { id: 29, name: 'Michelin Pilot Street (Bike)', size: '90/90-18', image: '/assets/michelinbike.jpg', brand: 'Michelin', type: 'Bike' },
  { id: 30, name: 'Michelin Pilot Street (Bike)', size: '100/90-18', image: '/assets/michelinbike.jpg', brand: 'Michelin', type: 'Bike' },
  { id: 31, name: 'Michelin Pilot Street (Bike)', size: '110/80-17', image: '/assets/michelinbike.jpg', brand: 'Michelin', type: 'Bike' },
  { id: 32, name: 'Michelin Pilot Street (Bike)', size: '120/70-17', image: '/assets/michelinbike.jpg', brand: 'Michelin', type: 'Bike' },
  { id: 33, name: 'Michelin City Pro (Activa)', size: '90/100-10', image: '/assets/michelinactiva.jpg', brand: 'Michelin', type: 'Scooter' },
  { id: 34, name: 'Michelin City Pro (Activa)', size: '90/90-12', image: '/assets/michelinactiva.jpg', brand: 'Michelin', type: 'Scooter' },
  { id: 35, name: 'Michelin City Pro (Activa)', size: '100/90-12', image: '/assets/michelinactiva.jpg', brand: 'Michelin', type: 'Scooter' },
  { id: 13, name: 'Ceat Car Tyre', size: '145/80 R12', image: '/assets/ceatcar.jpeg', brand: 'Ceat', type: 'Car' },
  { id: 14, name: 'Ceat Car Tyre', size: '155/70 R13', image: '/assets/ceatcar.jpeg', brand: 'Ceat', type: 'Car' },
  { id: 15, name: 'Ceat Car Tyre', size: '165/80 R14', image: '/assets/ceatcar.jpeg', brand: 'Ceat', type: 'Car' },
  { id: 16, name: 'Ceat Car Tyre', size: '185/65 R15', image: '/assets/ceatcar.jpeg', brand: 'Ceat', type: 'Car' },
  { id: 17, name: 'Ceat Tractor front Tyre', size: '6.00 R16', image: '/assets/ceatotr.jpeg', brand: 'Ceat', type: 'Tractor' },
  { id: 18, name: 'Ceat Tractor Front Tyre', size: '8.25 R16', image: '/assets/ceatotr.jpeg', brand: 'Ceat', type: 'Tractor' },
  { id: 19, name: 'Ceat Tractor Tyre', size: '12.4 28', image: '/assets/ceat12.jpeg', brand: 'Ceat', type: 'Tractor' },
  { id: 20, name: 'Ceat Tractor Tyre', size: '13.4 28', image: '/assets/ceat12.jpeg', brand: 'Ceat', type: 'Tractor' },
  { id: 36, name: 'Apollo Alnac 4G', size: '165/80 R14', image: '/assets/apollo.jpeg', brand: 'Apollo', type: 'Car' },
  { id: 37, name: 'Apollo Amazer 4G Life', size: '175/65 R14', image: '/assets/apollo.jpeg', brand: 'Apollo', type: 'Car' },
  { id: 38, name: 'Apollo Aspire 4G', size: '195/55 R16', image: '/assets/apollo.jpeg', brand: 'Apollo', type: 'Car' },
  { id: 39, name: 'Apollo Apterra AT2', size: '235/70 R16', image: '/assets/apollo.jpeg', brand: 'Apollo', type: 'SUV' },
  { id: 40, name: 'Apollo Apterra HT2', size: '215/60 R17', image: '/assets/apollo.jpeg', brand: 'Apollo', type: 'SUV' }
];

const Tyresss = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTyres, setFilteredTyres] = useState(tyreProducts);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    type: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  
  // Extract unique brands and types for filter options
  const brands = [...new Set(tyreProducts.map(product => product.brand))];
  const types = [...new Set(tyreProducts.map(product => product.type))];

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
    let filtered = tyreProducts;
    
    // Apply search
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search) || 
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
    
    setFilteredTyres(filtered);
  };

  // Update filtered tyres when filters change
  useEffect(() => {
    applyFilters(searchTerm, selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
            <ShipWheel className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Premium Tyres Collection</h1>
          </div>
        <p className="text-xl mb-6">Find the perfect tyre for your vehicle from top brands</p>
          
          {/* Search bar in hero section */}
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search by tyre name, size or brand..."
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
            <h2 className="text-2xl font-bold text-gray-800">Our Tyre Products</h2>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Filter size={18} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          )}
          
          {/* Results count */}
          <p className="text-gray-600 mb-4">Showing {filteredTyres.length} products</p>
        </div>
        
        {/* Products grid */}
        {filteredTyres.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredTyres.map(product => (
              <div 
                key={product.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300 hover:shadow-lg"
                onMouseEnter={() => setActiveProduct(product.id)}
                onMouseLeave={() => setActiveProduct(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
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
                  <div className="flex items-center mb-1">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mr-2">
                      {product.type}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 font-mono">{product.size}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tyres found matching your search criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedFilters({ brand: [], type: [] });
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

export default Tyresss;