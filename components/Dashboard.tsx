import React, { useEffect, useState } from 'react';
import { KeywordMetric, TrendDirection } from '../types';
import { fetchTrendingKeywords } from '../services/geminiService';
import { TrendingUp, TrendingDown, Minus, RefreshCw, BarChart2, Activity, Zap, ArrowUpRight, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, YAxis, CartesianGrid } from 'recharts';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<KeywordMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = async () => {
    setLoading(true);
    const keywords = await fetchTrendingKeywords();
    setData(keywords);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
        // Simulate minor live updates
        setData(prev => prev.map(item => ({
            ...item,
            searchVolume: item.searchVolume + Math.floor(Math.random() * 50) - 20
        })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const chartData = data.slice(0, 7).map(d => ({
    name: d.keyword,
    volume: d.searchVolume,
    rank: d.rank
  }));

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      
      {/* Live Ticker Section */}
      <div className="glass-panel rounded-xl p-1 overflow-hidden flex items-center h-12 mb-8">
        <div className="bg-emerald-500/20 px-4 h-full flex items-center justify-center border-r border-emerald-500/30">
            <span className="text-xs font-bold text-emerald-400 whitespace-nowrap flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE RANKING
            </span>
        </div>
        <div className="flex-1 overflow-hidden relative mask-linear-fade">
             <div className="animate-ticker flex items-center gap-8 pl-4">
                 {[...data, ...data].map((item, idx) => (
                     <div key={`${item.keyword}-${idx}`} className="flex items-center gap-2 text-sm text-slate-300 whitespace-nowrap">
                        <span className="font-bold text-slate-500">#{item.rank}</span>
                        <span className="text-white font-medium">{item.keyword}</span>
                        <span className={`text-xs ${item.trend === TrendDirection.UP ? 'text-red-400' : item.trend === TrendDirection.DOWN ? 'text-blue-400' : 'text-slate-500'}`}>
                            {item.trend === TrendDirection.UP ? '▲' : item.trend === TrendDirection.DOWN ? '▼' : '-'}
                            {item.change > 0 && item.change}
                        </span>
                     </div>
                 ))}
             </div>
        </div>
      </div>

      {/* Main Stats Grid (Bento) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Search Volume" 
          value={data.reduce((acc, curr) => acc + curr.searchVolume, 0).toLocaleString()} 
          change="+12.5%"
          isPositive={true}
          icon={<BarChart2 className="text-blue-400" />}
          data={[40, 30, 45, 60, 55, 70, 65]}
          color="#60a5fa"
        />
        <StatCard 
          title="Trending Keywords" 
          value={data.filter(d => d.trend === TrendDirection.UP).length.toString()} 
          change="+3"
          isPositive={true}
          icon={<Zap className="text-yellow-400" />}
          data={[2, 3, 5, 4, 6, 8, 7]}
          color="#facc15"
        />
        <StatCard 
          title="Keyword Volatility" 
          value="High" 
          change="Safe"
          isPositive={true}
          icon={<Activity className="text-red-400" />}
          data={[20, 40, 20, 50, 30, 60, 40]}
          color="#f87171"
        />
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Search className="w-24 h-24 text-emerald-400" />
            </div>
            <div>
                <h3 className="text-slate-400 text-sm font-medium">Quick Insight</h3>
                <p className="text-xl font-bold text-white mt-1 leading-tight">
                    "Health" related keywords are spiking +40% today.
                </p>
            </div>
            <button className="mt-4 text-xs font-semibold text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all">
                Analyze Trend <ArrowUpRight className="w-3 h-3" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border-0 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Traffic Distribution</h2>
              <p className="text-sm text-slate-400">Estimated daily search volume distribution</p>
            </div>
            <button 
                onClick={loadData}
                disabled={loading}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
                <RefreshCw className={`w-4 h-4 text-slate-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.4}/>
                    </linearGradient>
                    <linearGradient id="barGradientBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                      dataKey="name" 
                      stroke="#64748b" 
                      tick={{ fill: '#94a3b8', fontSize: 11 }} 
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                  />
                  <YAxis 
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                          return (
                              <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
                                  <p className="text-white font-bold mb-1">{payload[0].payload.name}</p>
                                  <p className="text-emerald-400 text-sm">Volume: {payload[0].value?.toLocaleString()}</p>
                                  <p className="text-slate-400 text-xs">Rank #{payload[0].payload.rank}</p>
                              </div>
                          );
                          }
                          return null;
                      }}
                  />
                  <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? 'url(#barGradient)' : 'url(#barGradientBlue)'} />
                      ))}
                  </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Ranking List */}
        <div className="glass-card rounded-2xl flex flex-col overflow-hidden border-0">
          <div className="p-6 border-b border-slate-800/50 bg-slate-900/30">
            <h2 className="text-lg font-bold text-white flex items-center justify-between">
                <span>Top Keywords</span>
                <span className="text-xs font-normal text-slate-500 px-2 py-1 bg-slate-800 rounded">Real-time</span>
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
             {loading ? (
                 <div className="p-6 space-y-4">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="h-12 bg-slate-800/50 rounded-lg animate-pulse" />
                    ))}
                 </div>
             ) : (
                 <div className="divide-y divide-slate-800/50">
                    {data.map((item, idx) => (
                        <div key={item.keyword} className="group p-4 flex items-center hover:bg-slate-800/40 transition-all cursor-default">
                            <div className="w-8 flex-shrink-0">
                                <span className={`
                                    w-6 h-6 flex items-center justify-center rounded-md text-xs font-bold
                                    ${idx === 0 ? 'bg-yellow-400 text-yellow-900' : 
                                      idx === 1 ? 'bg-slate-300 text-slate-900' : 
                                      idx === 2 ? 'bg-orange-400 text-orange-900' : 'text-slate-500 bg-slate-800'}
                                `}>
                                    {item.rank}
                                </span>
                            </div>
                            
                            <div className="flex-1 min-w-0 px-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-slate-200 truncate group-hover:text-emerald-400 transition-colors">{item.keyword}</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1">
                                    <div 
                                        className="bg-emerald-500 h-1 rounded-full transition-all duration-1000" 
                                        style={{ width: `${(item.searchVolume / data[0].searchVolume) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="w-16 flex flex-col items-end">
                                <span className="text-xs font-mono text-slate-400">{(item.searchVolume/1000).toFixed(1)}k</span>
                                <div className="flex items-center gap-1 mt-0.5">
                                    {item.trend === TrendDirection.UP ? (
                                         <TrendingUp className="w-3 h-3 text-red-400" /> 
                                    ) : item.trend === TrendDirection.DOWN ? (
                                         <TrendingDown className="w-3 h-3 text-blue-400" />
                                    ) : (
                                        <Minus className="w-3 h-3 text-slate-600" />
                                    )}
                                    <span className={`text-[10px] font-bold ${item.trend === TrendDirection.UP ? 'text-red-400' : item.trend === TrendDirection.DOWN ? 'text-blue-400' : 'text-slate-600'}`}>
                                        {item.change === 0 ? '-' : Math.abs(item.change)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, isPositive, icon, data, color }: any) => (
    <div className="glass-card p-6 rounded-2xl hover:bg-slate-800/40 transition-colors group relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-500">
             {React.cloneElement(icon, { size: 100 })}
        </div>
        <div className="relative z-10 flex justify-between items-start mb-4">
            <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className="p-2 bg-slate-800/80 rounded-lg border border-slate-700/50 text-slate-300">
                {React.cloneElement(icon, { size: 18 })}
            </div>
        </div>
        
        <div className="relative z-10 flex items-end justify-between">
             <span className={`text-xs font-medium px-2 py-0.5 rounded ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {change}
             </span>
             
             {/* Sparkline */}
             <div className="h-8 w-24">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.map((v: number, i: number) => ({ v, i }))}>
                        <defs>
                            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.5}/>
                                <stop offset="100%" stopColor={color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#grad-${title})`} />
                    </AreaChart>
                </ResponsiveContainer>
             </div>
        </div>
    </div>
);