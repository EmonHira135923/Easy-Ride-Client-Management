import React from "react";
import {
  Facebook,
  Linkedin,
  Github,
  Mail,
  Twitter,
  MapPin,
  Phone,
  Send,
  Car,
  Shield,
  Heart,
} from "lucide-react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Vehicles", path: "/allvehicles" },
    { name: "Add Vehicle", path: "/add-vehicles" },
    { name: "My Vehicles", path: "/my-vehicles" },
    { name: "My Bookings", path: "/my-booking" },
  ];

  const supportLinks = [
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "FAQ", path: "/faq" },
    { name: "Support Center", path: "/support" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/Emon1359",
      color: "hover:text-blue-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/emon135923",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/hira_bd",
      color: "hover:text-sky-400",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/EmonHira135923",
      color: "hover:text-gray-400",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:emonhossainhira231@gmail.com",
      color: "hover:text-red-400",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TravelEase
              </span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Your trusted partner for seamless vehicle rentals and trip
              management. Experience travel made simple and efficient.
            </p>

            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Verified & Secure Platform</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              Stay Connected
            </h3>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">+8801817516654</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">emonhossainhira231@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-gray-300 text-sm mb-3">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-300 text-sm mb-3">Follow us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-200 ${social.color} hover:bg-gray-700`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-400 text-sm text-center lg:text-left">
            <p>© {currentYear} TravelEase. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by Emon Hossain Hira</span>
          </div>

          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <span>Version 2.0.0</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>Secure SSL</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-4 right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
    </footer>
  );
};

export default Footer;
