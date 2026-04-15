"use client";

import { motion } from "framer-motion";
import { Gauge, Image as ImageIcon, Tag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { productList } from "@/lib/product-data";

const AUTO_MS = 3500;
const spring = { type: "spring" as const, stiffness: 300, damping: 30 };

/** 环形最短相对偏移，用于无限循环视觉 */
function circularOffset(index: number, active: number, len: number): number {
  let d = index - active;
  const half = len / 2;
  if (d > half) d -= len;
  if (d < -half) d += len;
  return d;
}

function SafeProductImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-slate-500">
        <ImageIcon className="h-14 w-14 opacity-60" strokeWidth={1.25} />
        <span className="text-center text-sm font-medium text-slate-500">
          暂无实景图
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full max-h-full max-w-full object-contain object-center text-transparent"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function DynamicExhibitionBar() {
  const n = productList.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);

  const goTo = useCallback((i: number) => {
    setActiveIndex(((i % n) + n) % n);
  }, [n]);

  return (
    <section
      aria-label="核心量产成品展示"
      className="relative z-10 overflow-hidden px-0 py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent opacity-60" />

      <div className="mx-auto mb-12 max-w-4xl px-6 text-center md:mb-14 md:px-12">
        <h2 className="mb-4 text-4xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-5xl">
          核心量产成品展示
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
          深耕行业多年，提供高可靠性的线束与连接器定制方案
        </p>
      </div>

      <div
        className="relative mx-auto w-full max-w-7xl px-4 md:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative mx-auto h-[min(640px,90vh)] w-full max-w-6xl perspective-[1600px]"
          style={{ perspective: "1600px" }}
        >
          {productList.map((item, index) => {
            const offset = circularOffset(index, activeIndex, n);
            const abs = Math.abs(offset);
            const isCenter = offset === 0;
            const isSide = abs === 1;

            const xMotion: string | number =
              offset === 0 ? 0 : `${offset * 110}%`;

            const scale = isCenter ? 1 : isSide ? 0.85 : 0.6;
            const opacity = isCenter ? 1 : isSide ? 0.6 : 0;
            const zIndex = isCenter ? 50 : isSide ? 40 : 0;
            const y = isCenter ? 0 : isSide ? 20 : 32;
            const centerGlow =
              "0 0 50px rgba(249,115,22,0.3), 0 0 80px rgba(59,130,246,0.18), 0 24px 64px rgba(0,0,0,0.55)";
            const sideGlow = "0 20px 56px -24px rgba(0,0,0,0.6)";

            return (
              <motion.div
                key={item.id}
                className={`absolute left-1/2 top-1/2 w-[min(90vw,450px)] max-w-[450px] -translate-x-1/2 -translate-y-1/2 ${
                  isSide ? "cursor-pointer" : isCenter ? "cursor-default" : "pointer-events-none"
                }`}
                initial={false}
                animate={{
                  x: xMotion,
                  y,
                  scale,
                  opacity,
                  zIndex,
                  rotateY: isCenter ? 0 : isSide ? (offset > 0 ? -7 : 7) : 0,
                  filter: isCenter ? "blur(0px)" : "blur(4px)",
                  boxShadow: isCenter ? centerGlow : sideGlow,
                }}
                transition={spring}
                onClick={() => {
                  if (isSide) goTo(index);
                }}
              >
                <div
                  className="relative flex h-[520px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* 仅 C 位：内部橙/蓝 inset 微光与底部氛围 */}
                  {isCenter && (
                    <>
                      <div
                        className="pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-inset ring-orange-500/25"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-px z-10 rounded-[22px] bg-gradient-to-br from-orange-500/[0.08] via-transparent to-blue-500/[0.06]"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-10 rounded-3xl shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),inset_0_-12px_32px_-8px_rgba(59,130,246,0.12)]"
                        aria-hidden
                      />
                    </>
                  )}
                  {!isCenter && (
                    <div
                      className="pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-inset ring-white/[0.08]"
                      aria-hidden
                    />
                  )}

                  {/* 上图下文：约 3/4 高度给完整展示图（contain），1/4 给文案 */}
                  <div className="relative h-3/4 min-h-0 w-full shrink-0 border-b border-slate-200 dark:border-white/[0.06]">
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-950">
                      <SafeProductImage src={item.image} alt={item.name} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-200/90 via-transparent to-transparent dark:from-slate-950/80" />
                      <div className="absolute left-4 top-4 z-20 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/85 dark:text-slate-100">
                        <Tag className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                        <span className="truncate">{item.tag}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-1/4 min-h-0 flex-col justify-center gap-1.5 px-5 py-4 md:px-6">
                    <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#0f172a] dark:text-white md:text-lg">
                      {item.name}
                    </h3>
                    <div className="flex items-start gap-2 text-[11px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 md:text-xs">
                      <Gauge className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
                      <span className="line-clamp-2">{item.spec}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {productList.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`切换到 ${item.name}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-slate-400 hover:bg-slate-500 dark:bg-slate-600"
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[480px] w-[min(100%,1200px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
    </section>
  );
}
