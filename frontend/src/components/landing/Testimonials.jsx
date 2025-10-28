import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Kimani',
      farm: 'Green Valley Farm',
      location: 'Nakuru, Kenya',
      image: '👩‍🌾',
      text: 'AgriMind AI helped me increase my maize yield by 45% while reducing water usage. The crop recommendations are incredibly accurate!',
      rating: 5
    },
    {
      name: 'James Omondi',
      farm: 'Oasis Farm',
      location: 'Machakos, Kenya',
      image: '👨‍🌾',
      text: 'The yield prediction feature saved me from planting during a drought season. This platform is a game-changer for African farmers.',
      rating: 5
    },
    {
      name: 'Grace Wambui',
      farm: 'Sunrise Farm',
      location: 'Kiambu, Kenya',
      image: '👩‍🌾',
      text: 'As a small-scale farmer, the sustainability insights helped me reduce fertilizer costs by 30% while maintaining soil health.',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-agri-green-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-agri-green-800 mb-4 font-display">
            Trusted by Farmers
          </h2>
          <p className="text-xl text-agri-green-600">
            See how AgriMind AI is transforming farms across Africa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-agri-green-100 relative"
            >
              <Quote className="w-8 h-8 text-agri-green-200 absolute top-6 right-6" />
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold text-agri-green-800">{testimonial.name}</h4>
                  <p className="text-sm text-agri-green-600">{testimonial.farm}</p>
                  <p className="text-xs text-agri-green-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-agri-gold text-agri-gold" />
                ))}
              </div>

              <p className="text-agri-green-700 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;