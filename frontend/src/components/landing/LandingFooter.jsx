import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Case Studies', href: '#case-studies' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#team' },
        { name: 'Careers', href: '#careers' },
        { name: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#blog' },
        { name: 'Documentation', href: '#docs' },
        { name: 'Support', href: '#support' },
        { name: 'Community', href: '#community' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-agri-green-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="xl:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-agri-green-500 rounded-full flex items-center justify-center"
              >
                <Sprout className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold font-display">AgriMind AI</h3>
                <p className="text-agri-green-200">Smart Climate Farming</p>
              </div>
            </div>
            <p className="text-agri-green-300 mb-6 leading-relaxed">
              Empowering farmers with AI-driven insights to increase yields, 
              reduce costs, and farm sustainably. Join the agricultural revolution today.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-agri-green-200">
                <Mail className="w-4 h-4" />
                <span>hello@agrimind.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-agri-green-200">
                <Phone className="w-4 h-4" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3 text-agri-green-200">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="xl:col-span-1"
            >
              <h4 className="font-semibold text-lg mb-6 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-agri-green-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-agri-green-800"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-10 h-10 bg-agri-green-800 rounded-full flex items-center justify-center text-agri-green-300 hover:bg-agri-green-700 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Mail className="w-4 h-4 text-agri-green-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-3 bg-agri-green-800 border border-agri-green-700 rounded-xl focus:ring-2 focus:ring-agri-green-500 focus:border-transparent text-white placeholder-agri-green-400 transition-all duration-300 w-64"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="agri-button bg-agri-green-500 hover:bg-agri-green-400"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-agri-green-800"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-agri-green-400 text-sm">
              © 2024 AgriMind AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-agri-green-400">
              <Link to="/login" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <span>•</span>
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default LandingFooter;