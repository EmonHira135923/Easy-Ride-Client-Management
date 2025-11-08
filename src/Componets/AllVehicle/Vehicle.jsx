import React from "react";

const Vehicle = () => {
  return (
    <section className="bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Latest Vehicles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Vehicle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Vehicle Name 1
              </h3>
              <p className="text-gray-500 mb-2">SUV</p>
              <p className="text-purple-600 font-bold text-xl mb-4">$200/day</p>
              <button className="w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Vehicle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Vehicle Name 2
              </h3>
              <p className="text-gray-500 mb-2">Sedan</p>
              <p className="text-purple-600 font-bold text-xl mb-4">$150/day</p>
              <button className="w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="h-56 w-full overflow-hidden">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Vehicle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Vehicle Name 3
              </h3>
              <p className="text-gray-500 mb-2">Coupe</p>
              <p className="text-purple-600 font-bold text-xl mb-4">$180/day</p>
              <button className="w-full py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vehicle;
