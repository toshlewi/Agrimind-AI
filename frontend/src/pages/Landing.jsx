import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LandingHeader from '../components/landing/LandingHeader';
import LandingFooter from '../components/landing/LandingFooter';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <Testimonials />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-agri-green-800 mb-4 font-display">
                How AgriMind AI Works
              </h2>
              <p className="text-xl text-agri-green-600 max-w-3xl mx-auto">
                Transform your farming in three simple steps with our AI-powered platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Input Your Farm Data',
                  description: 'Tell us about your farm location, soil type, and current crops. Our system analyzes your unique farming conditions.',
                  icon: '📊'
                },
                {
                  step: '02',
                  title: 'Get AI Recommendations',
                  description: 'Receive personalized crop suggestions, planting schedules, and yield predictions based on weather patterns and soil data.',
                  icon: '🤖'
                },
                {
                  step: '03',
                  title: 'Optimize & Grow',
                  description: 'Implement our insights to increase yields, reduce costs, and track your progress with real-time analytics.',
                  icon: '📈'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="text-center p-8 bg-agri-green-50 rounded-2xl border border-agri-green-100 hover:border-agri-green-300 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-12 h-12 bg-agri-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-agri-green-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-agri-green-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-agri-green-500 to-agri-green-600">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6 font-display">
                Ready to Transform Your Farming?
              </h2>
              <p className="text-xl text-agri-green-100 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already using AgriMind AI to increase yields, 
                reduce costs, and farm more sustainably.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-agri-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-agri-green-50 transition-colors"
                >
                  <Link to="/signup">
                    Start Free Trial
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-agri-green-600 transition-colors"
                >
                  <Link to="/login">
                    View Dashboard
                  </Link>
                </motion.button>
              </motion.div>
              
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-agri-green-100"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">5,000+</div>
                  <div className="text-sm">Farmers Empowered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">45%</div>
                  <div className="text-sm">Average Yield Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">30%</div>
                  <div className="text-sm">Cost Reduction</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default Landing;