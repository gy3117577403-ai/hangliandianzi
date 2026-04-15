"use client";

import { Faq } from "@/components/faq";
import { DynamicExhibitionBar } from "@/components/sections/DynamicExhibitionBar";
import HeroWorkshop from "@/components/sections/HeroWorkshop";
import { Process } from "@/components/process";
import { Quality } from "@/components/quality";
import { SiteNav } from "@/components/site-nav";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth bg-[#f1f5f9] text-[#0f172a] selection:bg-cyan-500/30 dark:bg-[#020617] dark:text-slate-100">
      <SiteNav />
      <HeroWorkshop />
      <DynamicExhibitionBar />
      <Stats />
      <Process />
      <Quality />
      <Faq />
    </main>
  );
}
