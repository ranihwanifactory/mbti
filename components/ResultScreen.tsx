import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MBTIResult, AIAnalysis } from '../types';
import { generatePersonalityAnalysis } from '../services/geminiService';
import { RefreshCw, Share2, BrainCircuit, Activity, Compass, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultScreenProps {
  result: MBTIResult;
  onRetake: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRetake }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchAnalysis = async () => {
      try {
        const data = await generatePersonalityAnalysis(result);
        if (mounted) {
          setAnalysis(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchAnalysis();
    return () => { mounted = false; };
  }, [result]);

  const chartData = [
    { name: 'Extraversion', value: result.scores.E, type: 'E', color: '#818cf8' },
    { name: 'Introversion', value: result.scores.I, type: 'I', color: '#6366f1' },
    { name: 'Sensing', value: result.scores.S, type: 'S', color: '#34d399' },
    { name: 'Intuition', value: result.scores.N, type: 'N', color: '#10b981' },
    { name: 'Thinking', value: result.scores.T, type: 'T', color: '#f472b6' },
    { name: 'Feeling', value: result.scores.F, type: 'F', color: '#ec4899' },
    { name: 'Judging', value: result.scores.J, type: 'J', color: '#fbbf24' },
    { name: 'Perceiving', value: result.scores.P, type: 'P', color: '#f59e0b' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-purple-500 border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-teal-500 border-b-transparent border-l-pink-500 opacity-50"
            animate={{ rotate: -180 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BrainCircuit className="w-8 h-8 text-white/50 animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-light text-white animate-pulse">Consulting the Oracle...</h2>
        <p className="text-slate-400">Gemini is analyzing your dimensional coordinates.</p>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Main Result Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 font-bold text-9xl text-white select-none pointer-events-none group-hover:opacity-20 transition-opacity">
              {result.type}
            </div>
            
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider mb-4 border border-indigo-500/30">
                ARCHETYPE REVEALED
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                {result.type}
              </h1>
              <h2 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-indigo-200 mb-6 font-medium">
                {analysis.title}
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {analysis.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-3 text-emerald-400">
                        <Activity className="w-5 h-5" />
                        <h3 className="font-semibold">Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                        {analysis.strengths.map((s, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-300">
                                <span className="mr-2 text-emerald-500/50">•</span>{s}
                            </li>
                        ))}
                    </ul>
                 </div>
                 
                 <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2 mb-3 text-rose-400">
                        <Compass className="w-5 h-5" />
                        <h3 className="font-semibold">Growth Areas</h3>
                    </div>
                    <ul className="space-y-2">
                        {analysis.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start text-sm text-slate-300">
                                <span className="mr-2 text-rose-500/50">•</span>{w}
                            </li>
                        ))}
                    </ul>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4 text-amber-300">
                    <Target className="w-5 h-5" />
                    <h3 className="font-semibold uppercase tracking-wider text-sm">Career Path</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{analysis.careerPath}</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-purple-300 text-sm font-semibold uppercase tracking-wider mb-1">Spirit Animal</h3>
                    <p className="text-2xl text-white font-serif italic">{analysis.spiritAnimal}</p>
                </div>
                <div className="text-4xl opacity-50">✨</div>
            </div>
          </div>
        </div>

        {/* Sidebar / Stats */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-lg h-full flex flex-col">
              <h3 className="text-white font-medium mb-6">Dimensional Balance</h3>
              <div className="flex-grow min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={90} tick={{fill: '#94a3b8', fontSize: 12}} interval={0} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4 mt-8"
      >
        <button 
            onClick={onRetake}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105"
        >
            <RefreshCw className="w-4 h-4" />
            <span>Retake Test</span>
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105">
            <Share2 className="w-4 h-4" />
            <span>Share Result</span>
        </button>
      </motion.div>
    </div>
  );
};