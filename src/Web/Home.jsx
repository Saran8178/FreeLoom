import React, { useState } from 'react';


const Home = () => {
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState('');
  const [filteredServices, setFilteredServices] = useState([
    { id: 1, title: 'Build a Website', category: 'Web Development', price: '$100', description: 'Create a fully responsive website.' },
    { id: 2, title: 'Logo Design', category: 'Design', price: '$50', description: 'Professional logo design for your brand.' },
    { id: 3, title: 'SEO Optimization', category: 'Marketing', price: '$80', description: 'Improve your website’s ranking on search engines.' },
    { id: 4, title: 'Mobile App Development', category: 'Mobile Development', price: '$150', description: 'Get your app developed for iOS and Android.' },
  ]);

  const handleSearch = () => {
    const filtered = filteredServices.filter((service) => {
      return (
        (serviceName ? service.title.toLowerCase().includes(serviceName.toLowerCase()) : true) &&
        (category ? service.category.toLowerCase().includes(category.toLowerCase()) : true)
      );
    });
    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Search Bar */}
      <div className="flex justify-center items-center gap-8 mb-8">
        {/* Service Name Input */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="What service are you looking for?"
            className="w-full p-3 pl-12 rounded-md border border-gray-300 shadow-md bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>

        {/* Category Input */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Category (e.g., Web Design)"
            className="w-full p-3 pl-12 rounded-md border border-gray-300 shadow-md bg-[whitesmoke] focus:outline-none focus:ring-2 focus:ring-green-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
        <div className="flex space-x-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold">Web Development</h3>
            <p className="text-sm text-gray-600">Build professional websites and web apps.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold">Design</h3>
            <p className="text-sm text-gray-600">Graphic design, logos, branding, and more.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold">Marketing</h3>
            <p className="text-sm text-gray-600">SEO, digital marketing, and social media.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold">Video Production</h3>
            <p className="text-sm text-gray-600">Video editing, animations, and more.</p>
          </div>
        </div>
      </div>

      {/* Services Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredServices.length > 0 ? (
  filteredServices.map((service) => (
    <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-green-600">{service.title}</h2>
      <p className="text-sm text-gray-600">{service.category}</p>
      <p className="text-sm text-gray-600">{service.description}</p>
      <p className="text-lg font-semibold text-green-600">{service.price}</p>
    </div>
  ))
) : (
  <p className="text-center text-gray-500">No services found. Try adjusting your search.</p>
)}

      </div>
    
    </div>
  );
};

export default Home;
