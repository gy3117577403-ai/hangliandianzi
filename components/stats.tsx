"use client";

import { AnimatedCounter } from "@/components/animated-counter";
import { MotionInView } from "@/components/motion-in-view";

const stats = [
  {
    end: 100,
    suffix: "%",
    label: "出厂电性能全检拦截",
    color: "text-emerald-400",
  },
  {
    end: 72,
    suffix: "h",
    label: "极速问题响应与打样",
    color: "text-orange-400",
  },
  {
    end: 500,
    suffix: "+",
    label: "复杂工艺攻克经验",
    color: "text-purple-400",
  },
];

export function Stats() {
  return (
    <section id="stats" className="relative z-10 mt-16 px-6 md:px-12">
      <MotionInView>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 md:p-12">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20" />
          <div className="grid grid-cols-1 gap-8 divide-y divide-slate-200 dark:divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="group px-4 text-center">
                <div
                  className={`mb-3 text-4xl font-black tracking-tighter drop-shadow-[0_0_15px_currentColor] md:text-6xl ${stat.color}`}
                >
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionInView>
    </section>
  );
}
