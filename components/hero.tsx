"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const DOMAIN_TABS = ["储能系统", "车载动力", "特种工控"] as const;
type DomainTab = (typeof DOMAIN_TABS)[number];

type Hotspot = { label: string; className: string };

const SHOWCASE: Record<
  DomainTab,
  { src: string; alt: string; hotspots: Hotspot[] }
> = {
  储能系统: {
    src: "/images/products/p2.svg",
    alt: "储能系统线束产品",
    hotspots: [
      {
        label: "[ ↗ 2000V DC 耐压 ]",
        className: "right-3 top-[10%] md:right-4",
      },
      {
        label: "[ ↘ 零微裂纹冷压 ]",
        className: "right-3 bottom-[12%] md:right-4",
      },
      {
        label: "[ · 镀银端子阵列 ]",
        className: "left-3 top-1/2 -translate-y-1/2",
      },
    ],
  },
  车载动力: {
    src: "/images/products/p3.svg",
    alt: "车载动力线束产品",
    hotspots: [
      {
        label: "[ ↖ IP68 双壁密封 ]",
        className: "left-3 top-[10%] md:left-4",
      },
      {
        label: "[ ↘ 800A 持续过载 ]",
        className: "right-3 bottom-[12%] md:right-4",
      },
    ],
  },
  特种工控: {
    src: "/images/products/p4.svg",
    alt: "特种工控线束产品",
    hotspots: [
      {
        label: "[ ↗ 亿次级抗弯折 ]",
        className: "right-3 top-[10%] md:right-4",
      },
      {
        label: "[ ↙ 360° EMI 屏蔽 ]",
        className: "left-3 bottom-[12%] md:left-4",
      },
    ],
  },
};

function ProductShowcase() {
  const [active, setActive] = useState<DomainTab>("储能系统");
  const scene = SHOWCASE[active];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-md">
      <div className="mb-5 flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
            Product Showcase
          </p>
          <p className="mt-1 text-sm font-semibold tracking-tight text-slate-200">
            实体产品透视展台
          </p>
        </div>
      </div>
      <div className="flex w-full min-h-0 gap-0">
        <div className="flex w-1/3 shrink-0 flex-col border-r border-slate-800 pr-4">
          {DOMAIN_TABS.map((tab) => {
            const isOn = active === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`relative py-2.5 text-left text-xs font-medium transition-colors ${
                  isOn ? "text-white" : "text-slate-600 hover:text-slate-400"
                }`}
              >
                {isOn && (
                  <span
                    className="absolute left-0 top-1/2 h-7 w-px -translate-y-1/2 bg-white"
                    aria-hidden
                  />
                )}
                <span className="block pl-2.5">{tab}</span>
              </button>
            );
          })}
        </div>
        <div className="min-w-0 flex-1 pl-4">
          <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={scene.src}
                  alt={scene.alt}
                  className="h-full w-full object-contain"
                />
                {scene.hotspots.map((spot) => (
                  <span
                    key={`${active}-${spot.label}`}
                    className={`pointer-events-none absolute ${spot.className} bg-slate-950/80 px-3 py-1.5 text-xs text-slate-300 shadow-xl backdrop-blur border border-slate-700 rounded-full`}
                  >
                    {spot.label}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden px-6 pt-28 md:px-12 md:pt-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div
          className="absolute left-[8%] top-[18%] h-[240px] w-[240px] rounded-full bg-blue-600/10 opacity-20 blur-[64px]"
          aria-hidden
        />
        <div
          className="absolute bottom-[20%] right-[6%] h-[260px] w-[260px] rounded-full bg-slate-600/10 opacity-20 blur-[72px]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto grid min-w-0 max-w-7xl grid-cols-1 gap-8 pb-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pb-0">
        <div className="min-w-0 text-left lg:col-span-7">
          <h1 className="text-5xl font-black leading-tight tracking-tighter break-keep text-white lg:text-6xl xl:text-7xl">
            <span className="mb-2 block text-white">
              高可靠性动力线束。
            </span>
            <span className="block text-slate-500">
              从工程图纸，到车规级量产。
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-4">
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              [ 100% 出厂电测 ]
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              [ 48h 极速打样 ]
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              [ 0 批量退回 ]
            </span>
          </div>

          <div className="mt-10">
            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-2 border border-white bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              立即联系工程团队
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <ProductShowcase />
        </div>
      </div>
    </header>
  );
}
