"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { MotionInView } from "@/components/motion-in-view";
import { faqs } from "@/lib/faq-data";

export function Faq() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="relative bg-slate-100 px-6 py-32 dark:bg-slate-950 md:px-12">
      <div className="mx-auto max-w-4xl">
        <MotionInView>
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-4 shadow-lg dark:border-white/5 dark:bg-slate-900">
              <HelpCircle className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-black text-[#0f172a] dark:text-white md:text-4xl">
              打消您对“小厂”的所有疑虑
            </h2>
          </div>
        </MotionInView>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <MotionInView key={faq.id} delay={idx * 100}>
              <div
                className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                  activeFaq === faq.id
                    ? "border-orange-500/50 bg-orange-500/5 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
                    : "border-slate-200 bg-white/90 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveFaq(activeFaq === faq.id ? null : faq.id)
                  }
                  className="group flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none"
                >
                  <span
                    className={`text-lg font-bold ${
                      activeFaq === faq.id
                        ? "text-orange-500 dark:text-orange-400"
                        : "text-slate-800 transition-colors group-hover:text-slate-950 dark:text-slate-200 dark:group-hover:text-white"
                    }`}
                  >
                    <span className="mr-4 font-black text-slate-400 dark:text-slate-600">
                      Q{faq.id}
                    </span>{" "}
                    {faq.question}
                  </span>
                  <div
                    className={`rounded-full border p-2 transition-all duration-300 ${
                      activeFaq === faq.id
                        ? "rotate-180 border-orange-500 bg-orange-500 text-white"
                        : "border-slate-300 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-800 dark:border-white/10 dark:group-hover:border-slate-500 dark:group-hover:text-white"
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div
                  className={`overflow-hidden px-8 transition-all duration-500 ease-in-out ${
                    activeFaq === faq.id
                      ? "max-h-96 pb-8 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="border-t border-slate-200 pt-4 text-lg font-medium leading-relaxed text-slate-600 dark:border-white/5 dark:text-slate-400">
                    <span className="mr-3 font-black text-orange-500">A.</span>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
