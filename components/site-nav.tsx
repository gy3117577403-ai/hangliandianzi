"use client";

import { Moon, Sun, Zap } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { href: "#process", label: "工艺能力" },
  { href: "#quality", label: "解决方案" },
  { href: "/cases", label: "实战案例" },
  { href: "/equipment", label: "智造装备" },
  { href: "#faq", label: "技术文档" },
];

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <nav
      className={`fixed z-50 flex w-full items-center justify-between px-6 py-5 transition-all duration-300 md:px-12 ${
        isScrolled
          ? "border-b border-slate-200/80 bg-white/85 py-3 backdrop-blur-md dark:border-white/10 dark:bg-[#020617]/90"
          : "bg-transparent py-5"
      }`}
    >
      <a href="#" className="flex items-center gap-2.5" aria-label="杭连科技">
        <Zap
          className="h-5 w-5 text-slate-900 dark:text-white"
          strokeWidth={2}
        />
        <span className="text-lg font-bold tracking-widest text-slate-900 dark:text-white">
          杭连科技
        </span>
      </a>
      <div className="flex items-center gap-6 lg:gap-10">
        <div className="hidden items-center gap-10 lg:flex">
          {links.map((item) => {
            const className =
              "text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";
            if (item.href.startsWith("/")) {
              return (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            }
            return (
              <a key={item.href} href={item.href} className={className}>
                {item.label}
              </a>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 shadow-sm transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          aria-label={
            mounted
              ? isDark
                ? "切换为白昼模式"
                : "切换为黑夜模式"
              : "切换明暗主题"
          }
        >
          {mounted ? (
            isDark ? (
              <Sun className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={2} />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
        </button>
      </div>
    </nav>
  );
}
