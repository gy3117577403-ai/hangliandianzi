"use client";

import { Activity, Microscope, ShieldCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MotionInView } from "@/components/motion-in-view";

type QualityItem = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  iconWrap: string;
  tagClass: string;
};

const items: QualityItem[] = [
  {
    Icon: Zap,
    title: "耐高压冲击 (Hipot)",
    desc: "超高电压电弧、电晕、击穿拦截测试。",
    tag: "100% 全检拦截",
    iconWrap:
      "border-blue-500/20 bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgb(59,130,246)]",
    tagClass: "text-blue-400 group-hover:border-blue-500/50",
  },
  {
    Icon: ShieldCheck,
    title: "绝缘阻抗测试",
    desc: "高精度直流电压检测极细微绝缘损伤。",
    tag: "100% 全检拦截",
    iconWrap:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgb(16,185,129)]",
    tagClass: "text-emerald-400 group-hover:border-emerald-500/50",
  },
  {
    Icon: Activity,
    title: "破坏性拉拔力",
    desc: "高精度拉力机模拟极端拉扯机械极限。",
    tag: "首件必检 / 高频巡检",
    iconWrap:
      "border-red-500/20 bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgb(239,68,68)]",
    tagClass: "text-red-400 group-hover:border-red-500/50",
  },
  {
    Icon: Microscope,
    title: "显微截面分析",
    desc: "切开压接部位，分子级验证内部孔隙率。",
    tag: "首件定标标准",
    iconWrap:
      "border-purple-500/20 bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_30px_rgb(168,85,247)]",
    tagClass: "text-purple-400 group-hover:border-purple-500/50",
  },
];

export function Quality() {
  return (
    <section id="quality" className="bg-slate-100 px-6 py-32 dark:bg-slate-900 md:px-12">
      <div className="mx-auto max-w-6xl">
        <MotionInView>
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-black text-[#0f172a] dark:text-white md:text-5xl">
              拒绝空谈，用物理测试捍卫安全
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600 dark:text-slate-400">
              高压线束的“零容错”不仅靠经验，更靠硬核的设备检测。我们的四大核心指标直接对标国际工程标准。
            </p>
          </div>
        </MotionInView>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => {
            const Icon = item.Icon;
            return (
              <MotionInView key={item.title} delay={idx * 150} direction="up">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-3 dark:border-slate-800 dark:bg-slate-950">
                  <div className="relative z-10">
                    <div
                      className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 ${item.iconWrap}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#0f172a] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mb-6 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                  <div className="relative z-10">
                    <span
                      className={`inline-block rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black uppercase tracking-widest transition-colors dark:border-slate-700 dark:bg-slate-900 ${item.tagClass}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
