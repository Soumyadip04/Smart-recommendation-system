import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const GettingStarted = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="text-center mt-12 p-8 bg-gradient-to-r from-purple-800/30 to-blue-800/30 backdrop-blur-sm rounded-xl border border-purple-500/30"
  >
    <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
    <h3 className="text-2xl font-bold text-white mb-2">Start Rating Movies!</h3>
    <p className="text-gray-300 max-w-md mx-auto">
      Rate a few movies above to get personalized recommendations based on your taste. 
      The more you rate, the better our suggestions become!
    </p>
  </motion.div>
);

export default GettingStarted;