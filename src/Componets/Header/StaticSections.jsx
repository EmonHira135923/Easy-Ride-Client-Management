import React from "react";
import suvImage from "../../assets/suv.jpeg";
import electricImage from "../../assets/electric.jpeg";
import vanImage from "../../assets/carimage.avif";
import ownerImage from "../../assets/heroimage.avif";

const StaticSections = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Categories Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Top Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* SUV Card */}
            <div className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={suvImage}
                alt="SUV"
                className="h-48 w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">SUVs</h3>
              </div>
            </div>

            {/* Electric Card */}
            <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={electricImage}
                alt="Electric"
                className="h-48 w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Electric
                </h3>
              </div>
            </div>

            {/* Van Card */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={ownerImage}
                alt="Van"
                className="h-48 w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">Vans</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Owner Section */}
        <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-50 rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-2xl transition-shadow duration-300">
          <img
            src={vanImage}
            alt="Owner"
            className="w-50 h-50 rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Featured Owner
            </h2>
            <p className="text-gray-600">
              Meet John Doe, a trusted host with a fleet of SUVs and electric
              vehicles. Known for reliability and excellent customer service.
            </p>
          </div>
        </div>

        {/* About TravelEase Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 bg-white bg-opacity-20 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-black drop-shadow-lg">
            About TravelEase
          </h2>
          <p className="text-gray-600">
            TravelEase is your go-to platform for renting vehicles easily and
            managing your trips effortlessly. Explore various categories, book
            your favorite ride, and enjoy a seamless travel experience.
          </p>
          <p className="text-gray-600">
            Whether you need an SUV, van, or an electric vehicle, TravelEase
            connects you with trusted vehicle owners to make your journey
            smooth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StaticSections;
