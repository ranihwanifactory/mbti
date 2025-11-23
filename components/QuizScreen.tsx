import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../constants';
import { MBTIResult, DimensionValue } from '../types';
import { ChevronRight } from 'lucide-react';

interface QuizScreenProps {
  onComplete: (result: MBTIResult) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, DimensionValue>>({});
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  const handleAnswer = (value: DimensionValue) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    setDirection(1);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250); // Small delay for visual feedback
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, DimensionValue>) => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    Object.values(finalAnswers).forEach(val => {
      scores[val]++;
    });

    const type = [
      scores.E >= scores.I ? 'E' : 'I',
      scores.S >= scores.N ? 'S' : 'N',
      scores.T >= scores.F ? 'T' : 'F',
      scores.J >= scores.P ? 'J' : 'P'
    ].join('');

    onComplete({ type, scores });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-[80vh] justify-center relative">
      {/* Progress Header */}
      <div className="absolute top-0 w-full flex items-center justify-between text-sm text-slate-400 mb-8 px-4">
        <span>Question {currentQuestionIndex + 1} / {QUESTIONS.length}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      
      <div className="absolute top-8 left-0 w-full h-1 bg-slate-800 rounded-full overflow-hidden mx-4 max-w-[calc(100%-2rem)]">
        <motion.div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Card Container */}
      <div className="relative w-full h-96 flex items-center justify-center perspective-1000">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="w-full"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
               
               <h2 className="text-2xl md:text-3xl font-medium text-white mb-10 text-center leading-snug">
                 {currentQuestion.text}
               </h2>

               <div className="grid gap-4 md:grid-cols-2">
                 {currentQuestion.options.map((option, idx) => (
                   <button
                     key={idx}
                     onClick={() => handleAnswer(option.value)}
                     className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                   >
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-500" />
                     <span className="text-lg text-slate-200 group-hover:text-white transition-colors relative z-10 font-light">
                       {option.text}
                     </span>
                     <ChevronRight className="w-5 h-5 text-white/0 group-hover:text-white/50 absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};