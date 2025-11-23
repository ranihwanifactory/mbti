import React from 'react';
import { motion } from 'framer-motion';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-900 overflow-hidden">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 opacity-80" />
      
      {/* Animated Orbs */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600 mix-blend-screen filter blur-[100px] opacity-20"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-600 mix-blend-screen filter blur-[120px] opacity-20"
        animate={{ 
          x: [0, -40, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

       <motion.div 
        className="absolute top-[40%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-indigo-600 mix-blend-screen filter blur-[80px] opacity-10"
        animate={{ 
          x: [0, 20, 0],
          y: [0, 20, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};