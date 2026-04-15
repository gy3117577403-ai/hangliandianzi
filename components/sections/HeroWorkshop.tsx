"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "next-themes";
import { Scissors, Hammer, ShieldCheck, Activity, Fingerprint } from "lucide-react";

// 车间工位硬核数据
const stations = [
  {
    id: 0,
    name: "全自动剥线机组",
    icon: Scissors,
    x: 20, y: 30, 
    params: [
      { label: "剥线剥头精度", value: "±0.05 mm" },
      { label: "线芯损伤率检测", value: "0.00 %" }
    ]
  },
  {
    id: 1,
    name: "大吨位伺服压接",
    icon: Hammer,
    x: 60, y: 20,
    params: [
      { label: "端子实时压接力", value: "125.4 KN" },
      { label: "金相剖面孔隙率", value: "< 1.2 %" }
    ]
  },
  {
    id: 2,
    name: "高压总成与热缩",
    icon: ShieldCheck,
    x: 80, y: 65, 
    params: [
      { label: "双壁管热熔温度", value: "185 °C" },
      { label: "双重密封气密性", value: "IP68 PASS" }
    ]
  },
  {
    id: 3,
    name: "终端电性能全检",
    icon: Activity,
    x: 35, y: 75,
    params: [
      { label: "绝缘耐压峰值", value: "3500 V" },
      { label: "出厂综合判定", value: "SYSTEM OK", isSuccess: true }
    ]
  }
];

// 生成随机条形图
const generateRandomBars = () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10);

// --- 极客组件：数据解码打字机特效 ---
const DecryptText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(prev => prev.split('').map((letter, index) => {
        if(index < iteration) return text[index];
        return chars[Math.floor(Math.random() * 42)];
      }).join(''));
      
      if(iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3; 
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
};

const SSR_SAFE_TRACK_STROKE = "rgba(30, 41, 59, 0.9)";

export default function App() {
  const [activeStation, setActiveStation] = useState(0);
  const [progress, setProgress] = useState(0);
  const [chartData, setChartData] = useState(generateRandomBars());
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const trackStroke = mounted
    ? isLight
      ? "rgba(15, 23, 42, 0.14)"
      : "rgba(30, 41, 59, 0.9)"
    : SSR_SAFE_TRACK_STROKE;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cycleDuration = 4500; // 停留4.5秒，展示所有神仙特效
    const interval = setInterval(() => {
      setActiveStation((prev) => (prev + 1) % stations.length);
      setProgress(0); 
      setChartData(generateRandomBars()); 
    }, cycleDuration);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + (100 / (cycleDuration / 50)), 100));
    }, 50);

    const chartInterval = setInterval(() => {
      setChartData(generateRandomBars());
    }, 150); // 更高频的跳动

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearInterval(chartInterval);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f1f5f9] p-6 font-sans selection:bg-cyan-500/30 dark:bg-[#020617] md:p-12">
      
      {/* 1. 全息投影背景系统 */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-screen"></div>
      
      {/* 雷达扫描器 (Radar Sweep) - 绝对的视觉杀手锏 */}
      <div className="pointer-events-none absolute left-3/4 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-40">
        <div
          className="absolute inset-0 rounded-full bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_20%,transparent_100%)] dark:bg-[linear-gradient(to_right,#0ea5e915_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e915_1px,transparent_1px)]"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-r-2 border-cyan-500 bg-[conic-gradient(from_0deg,transparent_0_280deg,rgba(34,211,238,0.12)_360deg)] dark:border-cyan-400 dark:bg-[conic-gradient(from_0deg,transparent_0_280deg,rgba(34,211,238,0.15)_360deg)]"
        />
        {/* 雷达中心点 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"></div>
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-600/20 dark:border-cyan-500/10" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-600/15 dark:border-cyan-500/10" />
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center">
        
        {/* ================= 左侧：军工级排版 ================= */}
        <div className="relative space-y-10 lg:col-span-5">
          <h1 className="relative text-5xl font-black leading-[1.05] tracking-tighter text-[#0f172a] dark:text-white lg:text-7xl">
            <span className="mb-2 block bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent drop-shadow-none dark:from-white dark:via-slate-100 dark:to-slate-400 dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              高可靠性
              <br />
              动力线束。
            </span>
            <span className="mt-4 block text-4xl font-medium text-slate-600 dark:text-slate-500 lg:text-5xl">
              从工程图纸，
              <br />
              到车规级量产。
            </span>
          </h1>

          <div className="flex flex-col gap-5 border-t border-slate-200 pt-6 dark:border-slate-800/80">
            {['100% 出厂绝缘电测', '72h 极限打样验证'].map((tag, i) => (
              <div key={i} className="group flex cursor-default items-center gap-4 text-sm font-bold tracking-wide text-slate-600 dark:text-slate-400">
                <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-none border border-slate-300 bg-slate-200/80 transition-colors group-hover:border-cyan-500 dark:border-slate-700 dark:bg-slate-900">
                  <div className="h-2 w-2 bg-cyan-600/40 transition-all group-hover:bg-cyan-400 dark:bg-cyan-500/30" />
                  {/* 悬停时的扫描线 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-0 group-hover:opacity-50"
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <span className="transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-200">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 右侧：战术指挥中心沙盘 ================= */}
        <div className="group relative h-[620px] rounded-2xl p-1 lg:col-span-7">
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-2xl backdrop-blur-3xl dark:border-slate-700/50 dark:bg-[#020617]/95 dark:shadow-[0_0_100px_rgba(6,182,212,0.05)]">
            {/* 角落高精度锁定框 (十字准星) */}
            <div className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-cyan-600/70 dark:border-cyan-500/80" />
            <div className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-cyan-600/70 dark:border-cyan-500/80" />
            <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-cyan-600/70 dark:border-cyan-500/80" />
            <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-cyan-600/70 dark:border-cyan-500/80" />
          </div>

          {/* 状态栏 */}
          <div className="absolute left-8 right-8 top-6 z-20 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <Fingerprint className="h-4 w-4 text-cyan-600/70 dark:text-cyan-500/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400">
                Tactical_Map // Live
              </span>
            </div>
            <span className="rounded bg-cyan-500/15 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
              SEQ_{String(activeStation + 1).padStart(2, '0')} / {String(stations.length).padStart(2, '0')}
            </span>
          </div>

          {/* 产线坐标系区域 */}
          <div className="absolute inset-0 mt-16">
            
            {/* 2. 高能粒子轨迹流 (Particle Flow) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.6))' }}>
              {/* 底层暗光轨道 */}
              <motion.path
                d="M 20% 30% L 60% 20% L 80% 65% L 35% 75% Z"
                fill="none"
                stroke={trackStroke}
                strokeWidth="2"
              />
              
              {/* 主高亮激光线 */}
              <motion.path
                d="M 20% 30% L 60% 20% L 80% 65% L 35% 75% Z"
                fill="none"
                stroke="url(#cyanGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (activeStation + 1) / stations.length }}
                transition={{ duration: 0.8, ease: "circOut" }}
              />

              {/* 循环流动的能量粒子 */}
              <motion.path
                d="M 20% 30% L 60% 20% L 80% 65% L 35% 75% Z"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeDasharray="1 30" // 制造粒子感
                animate={{ strokeDashoffset: [0, -31] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />

              <defs>
                <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" /> 
                  <stop offset="50%" stopColor="#22d3ee" /> 
                  <stop offset="100%" stopColor="#818cf8" /> 
                </linearGradient>
              </defs>
            </svg>

            {/* 3. 极客反应堆节点渲染 */}
            {stations.map((station, idx) => {
              const isActive = activeStation === idx;
              const isPast = activeStation > idx;
              const Icon = station.icon;
              const isRightSide = station.x > 50;

              return (
                <div 
                  key={station.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${station.x}%`, top: `${station.y}%`, zIndex: isActive ? 50 : 10 }}
                >
                  <div className="relative flex items-center justify-center">
                    
                    {/* 空间震荡波 (Shockwave) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          key={`shockwave-${station.id}`}
                          initial={{ scale: 0.5, opacity: 0.8, borderWidth: '2px' }}
                          animate={{ scale: 3.5, opacity: 0, borderWidth: '0px' }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                          className="absolute w-16 h-16 rounded-full border-cyan-400 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* 节点机械外环 */}
                    <div className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-700 ${
                      isActive ? 'scale-110' : 'opacity-50 scale-100'
                    }`}>
                      {isActive && (
                        <>
                          {/* 复杂的反向齿轮 */}
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-12px] rounded-full border-2 border-dashed border-cyan-500/30"
                          />
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-4px] rounded-full border-4 border-transparent border-t-cyan-400/80 border-b-cyan-400/30"
                          />
                          {/* 强聚光 */}
                          <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
                        </>
                      )}

                      {/* 内部主控核心 */}
                      <div
                        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 ${
                          isActive
                            ? "border border-cyan-400 bg-slate-900 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.45)] dark:bg-[#000]"
                            : isPast
                              ? "border border-slate-300 bg-slate-200 text-slate-600 dark:border-slate-700 dark:bg-[#020617] dark:text-slate-500"
                              : "border border-slate-200 bg-slate-100/90 text-slate-500 dark:border-slate-800 dark:bg-[#020617]/50 dark:text-slate-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* 4. 终极全息面板 (HUD with Decryption) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, x: isRightSide ? 30 : -30, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: isRightSide ? -40 : 40, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`absolute top-1/2 -translate-y-1/2 ${isRightSide ? 'right-full mr-2' : 'left-full ml-2'} w-[320px] pointer-events-none`}
                      >
                        <div className="relative overflow-hidden border border-slate-200 bg-white/80 p-6 shadow-2xl backdrop-blur-3xl dark:border-cyan-900/60 dark:bg-[#020617]/95 dark:shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:10px_10px] dark:bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)]" />

                          <div className="absolute bottom-0 right-0 top-0 w-1.5 bg-slate-200 dark:bg-slate-900">
                            <motion.div 
                              animate={{ y: ['0%', '400%', '0%'] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-full h-1/4 bg-cyan-500"
                            />
                          </div>

                          <div className="relative z-10 pr-2">
                            {/* 标题栏 */}
                            <div className="mb-5 flex items-center justify-between border-b border-cyan-200/80 pb-3 dark:border-cyan-900/80">
                              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                                <DecryptText text={station.name} />
                              </h4>
                              <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-sm animate-pulse"></div>
                                <div className="w-1.5 h-1.5 bg-cyan-400/30 rounded-sm"></div>
                                <div className="w-1.5 h-1.5 bg-cyan-400/30 rounded-sm"></div>
                              </div>
                            </div>
                            
                            {/* 核心解码数据 */}
                            <div className="space-y-5">
                              {station.params.map((param, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-600">
                                    {param.label}
                                  </span>
                                  <div className="flex items-end justify-between">
                                    <span
                                      className={`font-mono text-2xl font-black tracking-tight ${
                                        param.isSuccess
                                          ? "text-emerald-700 drop-shadow-none dark:text-emerald-400 dark:drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]"
                                          : "text-slate-900 drop-shadow-none dark:text-slate-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                      }`}
                                    >
                                      {/* 赋予参数乱码解码特效 */}
                                      <DecryptText text={param.value} />
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* 高频刷新频段图 */}
                            <div className="mt-6 flex items-end gap-[2px] h-8 opacity-70">
                              {chartData.map((height, i) => (
                                <motion.div 
                                  key={i}
                                  animate={{ height: `${height}%` }}
                                  transition={{ duration: 0.15 }}
                                  className={`flex-1 rounded-t-[1px] ${i % 3 === 0 ? 'bg-cyan-400' : 'bg-cyan-800'}`}
                                />
                              ))}
                            </div>

                            {/* 精密加载光条 */}
                            <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-500" style={{ width: `${progress}%` }}>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-1 bg-white shadow-[0_0_15px_#22d3ee]"></div>
                            </div>
                          </div>
                        </div>

                        {/* 结构连接导轨 */}
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isRightSide ? '-right-8' : '-left-8'} w-8 h-[2px] bg-cyan-600/80 shadow-[0_0_8px_#0891b2]`}>
                          <div className={`absolute top-1/2 -translate-y-1/2 ${isRightSide ? 'left-0' : 'right-0'} w-2 h-2 bg-white rounded-full`}></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}