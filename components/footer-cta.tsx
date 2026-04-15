"use client";

import { ArrowRight, ThumbsUp } from "lucide-react";
import { MotionInView } from "@/components/motion-in-view";

const FORMSPREE_ACTION = "https://formspree.io/f/YOUR_FORM_ID";

export function FooterCta() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 px-6 py-32 text-center dark:border-white/10 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-full max-w-4xl -translate-x-1/2 bg-orange-500/20 blur-[150px]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <MotionInView>
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
              <ThumbsUp className="h-10 w-10 text-orange-500" />
            </div>
          </div>
          <h2 className="mb-8 text-4xl font-black leading-tight tracking-tight text-[#0f172a] dark:text-white md:text-6xl">
            带着图纸来，
            <br />
            让
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              实测数据
            </span>
            替我们说话。
          </h2>
          <p className="mb-12 text-xl font-medium text-slate-600 dark:text-slate-400">
            抛开繁文缛节，开启高效的工程技术对话。
          </p>

          <form
            action={FORMSPREE_ACTION}
            method="POST"
            className="mx-auto max-w-lg space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="company"
                className="mb-1 block text-sm font-bold text-slate-600 dark:text-slate-400"
              >
                公司 / 稱呼
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="例：某某科技｜王工"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#0f172a] placeholder:text-slate-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-bold text-slate-600 dark:text-slate-400"
              >
                聯絡信箱
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#0f172a] placeholder:text-slate-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-bold text-slate-600 dark:text-slate-400"
              >
                需求摘要（選填）
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="預計時程、線束規格、樣品數量等"
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#0f172a] placeholder:text-slate-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-600"
              />
            </div>
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
            <button
              type="submit"
              className="group relative mt-4 w-full overflow-hidden rounded-full bg-orange-500 px-12 py-5 text-lg font-black text-white shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] sm:w-auto"
            >
              <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative flex items-center justify-center gap-3">
                提交預約實地考察與打樣
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
            <p className="pt-2 text-center text-xs text-slate-500 dark:text-slate-500">
              請將上方 action 替換為 Formspree 提供的表單 ID。
            </p>
          </form>
        </MotionInView>
      </div>
    </footer>
  );
}
