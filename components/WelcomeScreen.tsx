import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-200 tracking-wide uppercase">AI 기반 성격 분석</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-6 pb-2 leading-tight">
          당신의 진정한 <br /> 자아를 발견하세요
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mx-auto keep-all">
          Gemini AI가 분석하는 심층적인 MBTI 검사로 내면을 탐험해보세요. 숨겨진 강점과 당신만의 특별한 통찰력을 찾아드립니다.
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onClick={onStart}
        className="group relative flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-shadow duration-300"
      >
        <span>검사 시작하기</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>
    </div>
  );
};