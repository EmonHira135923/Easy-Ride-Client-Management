import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  Shield,
  Award,
  Car,
  Zap,
  CheckCircle,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { FaVaadin } from "react-icons/fa";
import suvImage from "../../assets/suv.jpeg";
import electricImage from "../../assets/electric.jpeg";
import vanImage from "../../assets/carimage.avif";
import ownerImage from "../../assets/heroimage.avif";

const StaticSections = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const categories = [
    {
      name: "SUVs",
      image: suvImage,
      icon: Car,
      description:
        "Spacious and powerful vehicles for family trips and adventures",
      features: ["7+ Seaters", "All-Terrain", "Family Friendly"],
      color: "from-purple-500 to-blue-500",
      bgColor: "from-purple-50 to-blue-50",
      textColor: "text-purple-700",
    },
    {
      name: "Electric",
      image: electricImage,
      icon: Zap,
      description: "Eco-friendly electric vehicles with modern technology",
      features: ["Zero Emissions", "Cost Efficient", "Fast Charging"],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700",
    },
    {
      name: "Vans",
      image: vanImage,
      icon: FaVaadin,
      description: "Perfect for group travel and cargo transportation",
      features: ["12+ Seaters", "Extra Storage", "Comfort Ride"],
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      textColor: "text-orange-700",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "4.9/5", label: "Rating", icon: Star },
    { number: "500+", label: "Vehicles", icon: Car },
    { number: "50+", label: "Cities", icon: MapPin },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Categories Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Popular Choices
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4">
              Explore Top Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated vehicle categories designed for
              every travel need
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${category.bgColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50`}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className={`text-2xl font-bold ${category.textColor} mb-3`}
                    >
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full mt-6 py-3 bg-gradient-to-r ${category.color} text-white rounded-xl font-semibold hover:shadow-lg transform group-hover:scale-105 transition-all duration-300`}
                    >
                      Explore {category.name}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured Owner Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Image Section */}
              <div className="lg:w-2/5 relative">
                <img
                  src={ownerImage}
                  alt="Featured Owner"
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20" />

                {/* Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-gray-900">
                      Top Host
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold text-lg">
                    Verified Partner
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Meet John Doe
                </h2>

                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  A trusted host with a fleet of premium SUVs and electric
                  vehicles. Known for exceptional reliability and outstanding
                  customer service. John maintains a perfect 5-star rating with
                  over 500 completed trips.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/90">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                    <span className="font-semibold">5.0 Rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Car className="w-5 h-5" />
                    <span className="font-semibold">15 Vehicles</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">500+ Trips</span>
                  </div>
                </div>

                <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                  View All Vehicles
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About TravelEase Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Trusted Platform
              </span>

              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent mb-6">
                Why Choose TravelEase?
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                TravelEase revolutionizes vehicle rentals by connecting you with
                trusted owners and providing a seamless booking experience. From
                family SUVs to eco-friendly electric vehicles, we ensure your
                journey is comfortable, reliable, and memorable.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Wide Selection
                  </h3>
                  <p className="text-gray-600">
                    Choose from 500+ vehicles across multiple categories
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Verified Owners
                  </h3>
                  <p className="text-gray-600">
                    All hosts are thoroughly verified for your safety
                  </p>
                </div>

                <div className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Instant Booking
                  </h3>
                  <p className="text-gray-600">
                    Book your preferred vehicle in just few clicks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StaticSections;
