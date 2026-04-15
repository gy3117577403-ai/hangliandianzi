"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ChevronLeft,
  Cpu,
  Layers,
  Settings,
  ShieldCheck,
  UploadCloud,
  Zap,
} from "lucide-react";
import Link from "next/link";

const INITIAL_DATA = {
  header: {
    title: "智造装备中心",
    subtitle: "EQUIPMENT COMMAND CENTER",
    description:
      "全链路车规级数字孪生工厂。从物理裁切到电性能验证，以微米级精度重塑高压动力线束量产标准。",
  },
  equipments: [
    {
      id: "EQ-01",
      name: "高压线自动裁线剥皮机",
      icon: "Layers",
      imgSrc: null as string | null,
      specs: "切断长度公差 ±0.2mm // 剥皮精度微米级",
      desc: "全自动伺服驱动，实现多层同轴线缆高精度剥皮，彻底杜绝内层绝缘皮与线芯的物理划伤。",
    },
    {
      id: "EQ-02",
      name: "大吨位高压端子压接机",
      icon: "Settings",
      imgSrc: null as string | null,
      specs: "15T-30T 伺服控制 // C/H 精度 ±0.03mm",
      desc: "专配定制模具，大电流端子冷压成型。集成压力曲线实时监控（CFM），机械应力分布完美闭环。",
    },
    {
      id: "EQ-03",
      name: "高精度自动扫屏蔽机",
      icon: "Cpu",
      imgSrc: null as string | null,
      specs: "处理频率 50Hz // 360° 均匀翻折",
      desc: "自动化打散并翻折屏蔽层编织网，杜绝手工挑丝造成的断丝隐患，保障 EMC 电磁屏蔽效能。",
    },
    {
      id: "EQ-04",
      name: "瞬态绝缘测试仪",
      icon: "ShieldCheck",
      imgSrc: null as string | null,
      specs: "DC 1000V+ // 精度 1MΩ",
      desc: "瞬态高压注流，精准捕捉极其微小的漏电流隐患，确保线束绝缘阻抗远超行业基准红线。",
    },
    {
      id: "EQ-05",
      name: "极限耐压测试仪",
      icon: "Zap",
      imgSrc: null as string | null,
      specs: "AC 5000V 阈值 // 漏电流 5mA 报警",
      desc: "模拟极端工况下的电涌冲击，100% 拦截击穿、闪络等致命缺陷，死守高压安全底线。",
    },
    {
      id: "EQ-06",
      name: "多回路导通测试仪",
      icon: "Activity",
      imgSrc: null as string | null,
      specs: "毫秒级响应 // 多点阵防呆侦测",
      desc: "点对点物理逻辑验证，通过治具防呆矩阵，100% 杜绝线序反接、错穿与虚接事故。",
    },
  ],
};

type EquipmentData = typeof INITIAL_DATA;

const EditableText = ({
  value,
  onChange,
  as: Tag = "span",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  as?: React.ElementType;
  className?: string;
}) => (
  <Tag
    contentEditable
    suppressContentEditableWarning
    onBlur={(e: React.FocusEvent<HTMLElement>) =>
      onChange(e.currentTarget.innerText.replace(/\n+/g, " ").trim())
    }
    className={`cursor-text rounded px-1 -mx-1 outline-none transition-all hover:bg-cyan-500/10 hover:ring-1 hover:ring-cyan-500/50 focus:bg-cyan-900/30 focus:ring-2 focus:ring-cyan-400 ${className}`}
  >
    {value}
  </Tag>
);

const EditableImage = ({
  src,
  label,
  onUpload,
  className = "",
}: {
  src: string | null;
  label: string;
  onUpload: (url: string) => void;
  className?: string;
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") onUpload(result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  return (
    <label
      className={`group relative block cursor-pointer overflow-hidden border border-cyan-900/50 bg-[#030712] ${className}`}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {src ? (
        <img src={src} alt="equipment" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-center opacity-40 transition-opacity group-hover:opacity-100">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
          <UploadCloud className="relative z-10 h-8 w-8 text-cyan-500" />
          <span className="relative z-10 font-mono text-xs tracking-widest text-cyan-500">
            {label}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-safe:animate-pulse" />
    </label>
  );
};

export default function EquipmentPage() {
  const [data, setData] = useState<EquipmentData>(INITIAL_DATA);

  const updateEq = (i: number, f: keyof EquipmentData["equipments"][number], v: string | null) => {
    setData((prev) => {
      const next = prev.equipments.map((row, idx) =>
        idx === i ? { ...row, [f]: v } : row,
      );
      return { ...prev, equipments: next };
    });
  };

  const getIcon = (n: string) => {
    if (n === "Layers")
      return <Layers className="h-5 w-5 shrink-0 text-cyan-400" />;
    if (n === "Settings")
      return <Settings className="h-5 w-5 shrink-0 text-amber-500" />;
    if (n === "Cpu") return <Cpu className="h-5 w-5 shrink-0 text-indigo-400" />;
    if (n === "ShieldCheck")
      return <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />;
    if (n === "Zap") return <Zap className="h-5 w-5 shrink-0 text-rose-500" />;
    return <Activity className="h-5 w-5 shrink-0 text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-[#020617] pb-32 text-slate-200 selection:bg-cyan-500/30">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 motion-safe:animate-[equip-scan_6s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.06), transparent)",
        }}
      />

      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/80 bg-[#020617]/90 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 font-black uppercase tracking-widest text-cyan-400">
          <Zap className="h-5 w-5 fill-cyan-400" /> 杭连科技
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" /> 返回主页
        </Link>
      </nav>

      <main className="relative z-10 mx-auto mt-20 max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-20 text-center"
        >
          <EditableText
            value={data.header.subtitle}
            onChange={(v) =>
              setData((prev) => ({
                ...prev,
                header: { ...prev.header, subtitle: v },
              }))
            }
            className="mb-4 block font-mono text-xs tracking-widest text-cyan-500"
          />
          <EditableText
            as="h1"
            value={data.header.title}
            onChange={(v) =>
              setData((prev) => ({
                ...prev,
                header: { ...prev.header, title: v },
              }))
            }
            className="mb-6 block text-5xl font-black text-white lg:text-7xl"
          />
          <EditableText
            as="p"
            value={data.header.description}
            onChange={(v) =>
              setData((prev) => ({
                ...prev,
                header: { ...prev.header, description: v },
              }))
            }
            className="mx-auto block max-w-2xl text-slate-400"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.equipments.map((eq, i) => (
            <motion.div
              key={eq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 transition-all hover:border-cyan-500/40"
            >
              <EditableImage
                src={eq.imgSrc}
                label={`导入图片 // ${eq.id}`}
                onUpload={(url) => updateEq(i, "imgSrc", url)}
                className="h-56 w-full"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  {getIcon(eq.icon)}
                  <EditableText
                    as="h3"
                    value={eq.name}
                    onChange={(v) => updateEq(i, "name", v)}
                    className="text-lg font-bold"
                  />
                </div>
                <div className="mb-4 rounded border border-cyan-900/30 bg-slate-950 p-3">
                  <EditableText
                    value={eq.specs}
                    onChange={(v) => updateEq(i, "specs", v)}
                    className="block font-mono text-xs text-cyan-400"
                  />
                </div>
                <EditableText
                  as="p"
                  value={eq.desc}
                  onChange={(v) => updateEq(i, "desc", v)}
                  className="block text-sm text-slate-400"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
