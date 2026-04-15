"use client";

import { CheckCircle2, Layers, Target } from "lucide-react";
import { useState } from "react";
import { MotionInView } from "@/components/motion-in-view";
import { processSteps } from "@/lib/process-data";

export function Process() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section id="process" className="relative px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <MotionInView direction="up">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              Standard Operating Procedure
            </span>
            <h2 className="mb-6 text-4xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
              十大管控阶段，铸就零容错体系
            </h2>
            <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
        </MotionInView>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="relative lg:w-1/3">
            <div className="absolute bottom-6 left-[23px] top-6 w-0.5 bg-slate-200 dark:bg-slate-800" />
            <div className="relative z-10 flex flex-col gap-3">
              {processSteps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveTab(step.id)}
                  className={`group relative flex items-center gap-4 rounded-2xl p-3.5 text-left transition-all duration-300 ${
                    activeTab === step.id
                      ? "scale-[1.02] border border-slate-200 bg-white shadow-xl dark:border-white/5 dark:bg-slate-800"
                      : "hover:bg-slate-200/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div
                    className={`relative flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      activeTab === step.id
                        ? `bg-gradient-to-br ${step.colorFrom} ${step.colorTo} shadow-lg ${step.shadow}`
                        : "border border-slate-300 bg-slate-100 text-slate-500 group-hover:text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:group-hover:text-slate-300"
                    }`}
                  >
                    {activeTab === step.id && (
                      <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-20 duration-1000" />
                    )}
                    <span
                      className={`text-lg font-black ${activeTab === step.id ? "text-white" : ""}`}
                    >
                      {step.id}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`block text-[15px] font-bold transition-colors duration-300 ${
                        activeTab === step.id
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[500px] items-center lg:w-2/3">
            {processSteps.map((step) => {
              const Icon = step.Icon;
              return (
                <div
                  key={step.id}
                  className={`w-full transition-all duration-500 ${
                    activeTab === step.id
                      ? "relative z-10 translate-y-0 opacity-100"
                      : "pointer-events-none absolute left-0 top-0 z-0 translate-y-8 opacity-0"
                  }`}
                >
                  <div className="group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:p-10">
                    <div
                      className={`absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br ${step.colorFrom} ${step.colorTo} opacity-10 blur-3xl transition-opacity duration-700 group-hover:opacity-20`}
                    />

                    <div className="relative z-10 mb-8 flex items-center gap-6">
                      <div
                        className={`-rotate-6 transform rounded-2xl bg-gradient-to-br p-5 text-white shadow-xl transition-transform duration-500 group-hover:rotate-0 ${step.colorFrom} ${step.colorTo}`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white">
                          {step.title}
                        </h3>
                        <p
                          className={`bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent ${step.colorFrom} ${step.colorTo}`}
                        >
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="relative z-10 mb-10 text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>

                    <div className="relative z-10 space-y-6 rounded-2xl border border-slate-200 bg-slate-50/90 p-8 backdrop-blur-sm dark:border-white/5 dark:bg-slate-950/50">
                      <h4 className="flex items-center gap-3 text-lg font-bold text-[#0f172a] dark:text-white">
                        <Target className="h-5 w-5 text-orange-500" />{" "}
                        核心管控动作
                      </h4>
                      <ul className="space-y-4">
                        {step.points.map((point, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <span className="mt-1 flex-shrink-0 text-orange-400">
                              <CheckCircle2 className="h-5 w-5" />
                            </span>
                            <span className="text-md font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10 mt-8 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-500">
                        <Layers className="h-4 w-4" /> 交付标准物
                      </div>
                      <div className="text-md font-bold text-slate-900 dark:text-white">
                        {step.deliverable}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
