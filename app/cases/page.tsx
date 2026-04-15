"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  CheckCircle2,
  Zap,
  FileCode2,
  Crosshair,
  GitMerge,
  ChevronLeft,
  Wrench,
  FileWarning,
  FileCheck,
  Activity,
  BarChart3,
  Fingerprint,
  Settings,
  UploadCloud,
} from "lucide-react";

// ================= 核心初始数据配置区 =================
const INITIAL_DATA = {
  header: {
    client: "佛山某新能源头部车企",
    title: "高压动力线束全流程 NPI 落地方案",
    subtitle: "从痛点到闭环：突破大截面端子压接与屏蔽剥线工艺极限",
    tags: ["125A+ 大电流", "ISO 19642 规范", "零缺陷交付", "100% FA首件达标"],
  },
  blueprints: [
    { id: 1, title: "整车高压线束拓扑图", code: "DWG-001A", imgSrc: null as string | null },
    { id: 2, title: "大电流连接器选型剖面", code: "CON-125A-X", imgSrc: null as string | null },
    { id: 3, title: "电缆截面与屏蔽层结构", code: "CBL-ISO-19642", imgSrc: null as string | null },
  ],
  problems: [
    {
      id: 1,
      title: "大吨位压接致绝缘层挤压受损",
      imgLabel: "缺陷实拍图 (图四)",
      imgSrc: null as string | null,
      anomaly:
        "原压接模具行程与端子匹配不良，大吨位压接时机械应力溢出，导致邻近绝缘皮受压变形甚至破损，耐压测试存在击穿风险。",
      solution:
        "重构压接参数矩阵，定制高精度压接刀片与防压伤定位治具，严格控制 C/H (压接高度) 与 C/W (压接宽度)，彻底消除机械干涉。",
    },
    {
      id: 2,
      title: "自动剥线致屏蔽网打断",
      imgLabel: "缺陷实拍图 (图五)",
      imgSrc: null as string | null,
      anomaly:
        "原自动剥线机参数设置不合理及刀具磨损，剥除外护套时切断了内部金属屏蔽编织网。",
      solution:
        "全线引入高精度「扫屏蔽机器」，微米级重新标定刀具进刀深度与速度。",
    },
  ],
  sops: [
    {
      id: 1,
      processName: "大截面端子伺服压接工序",
      oldProcess: {
        imgLabel: "原工艺现场记录",
        imgSrc: null as string | null,
        desc: "仅规定了通用压接机台与大致压力，缺乏 C/H (压接高度) 等核心参数的微米级公差限制，高度依赖人工操作对位。",
      },
      newSop: {
        imgLabel: "更新后标准 SOP (作业指导书)",
        imgSrc: null as string | null,
        desc: "写入绝对标准：明确压接高度 (C/H) 公差限制在 ±0.03mm，量化端子拉拔力最低阈值。明确防压伤定位治具的强制使用规范。",
      },
    },
    {
      id: 2,
      processName: "高压线缆护套剥除工序",
      oldProcess: {
        imgLabel: "旧机台参数设定画面",
        imgSrc: null as string | null,
        desc: "使用通用剥线机台，刀片磨损周期无量化追踪，进刀深度无补偿机制。",
      },
      newSop: {
        imgLabel: "更新后标准 SOP (作业指导书)",
        imgSrc: null as string | null,
        desc: "规定必须使用专机专刀，设定进刀深度公差 ±0.05mm。引入首件视觉检测，刀具寿命达 5000 次强制更换。",
      },
    },
  ],
  metrics: [
    { label: "破坏性拉拔力", value: "+35%", desc: "远超行业基准线" },
    { label: "屏蔽层损伤率", value: "0%", desc: "全面实现零断丝" },
    { label: "量产不良退回", value: "0批次", desc: "极高的制程稳定性" },
    { label: "极速打样验证", value: "48h", desc: "业界领先的工程响应" },
  ],
  timeline: [
    { step: "01", title: "需求对接与图纸消化", desc: "锁定电气规格边界，识别早期风险。" },
    { step: "02", title: "连接器与线缆选型确认", desc: "符合125A大电流及ISO车规要求，输出DFM评估。" },
    { step: "03", title: "极速打样与工装定制", desc: "24h输出3D打印测试定位板与定制压接模具。" },
    { step: "04", title: "DV 实验与物理极限测试", desc: "严苛执行温升、耐压、屏蔽效能及孔隙率金相分析。" },
    { step: "05", title: "工艺缺陷拦截与技术破局", desc: "彻底解决端子压接绝缘受损与剥线屏蔽打断工程难题。" },
    { step: "06", title: "SOP 参数固化与防呆升级", desc: "将测试验证的最佳参数100%写入量产作业指导书。" },
    { step: "07", title: "小批试产(PV)与全量交货", desc: "引入导通防呆治具，输出FA首件报告，启动批量生产。" },
  ],
};

type CaseData = typeof INITIAL_DATA;

// ================= 可编辑文本组件 =================
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
}) => {
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) =>
        onChange(e.currentTarget.innerText)
      }
      className={`cursor-text rounded px-1 -mx-1 outline-none transition-all hover:bg-cyan-500/10 hover:ring-1 hover:ring-cyan-500/50 focus:bg-cyan-900/30 focus:ring-2 focus:ring-cyan-400 ${className}`}
    >
      {value}
    </Tag>
  );
};

// ================= 可导入图片的占位组件 =================
const EditableImage = ({
  src,
  label,
  color = "cyan",
  onUpload,
  className = "",
}: {
  src: string | null;
  label: string;
  color?: "cyan" | "rose" | "emerald";
  onUpload: (url: string) => void;
  className?: string;
}) => {
  const borderColor =
    color === "cyan"
      ? "border-cyan-500/30"
      : color === "rose"
        ? "border-rose-500/30"
        : "border-emerald-500/30";
  const textColor =
    color === "cyan"
      ? "text-cyan-500"
      : color === "rose"
        ? "text-rose-500"
        : "text-emerald-500";
  const viaClass =
    color === "cyan"
      ? "via-cyan-500/10"
      : color === "rose"
        ? "via-rose-500/10"
        : "via-emerald-500/10";

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
  };

  return (
    <label
      className={`group relative block cursor-pointer overflow-hidden border bg-[#030712] ${borderColor} ${className}`}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {src ? (
        <img src={src} alt="uploaded" className="h-full w-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-20" />
          <div
            className={`absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent to-transparent ${viaClass} group-hover:animate-[scan_3s_ease-in-out_infinite]`}
          />
          <div
            className={`absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 ${borderColor}`}
          />
          <div
            className={`absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 ${borderColor}`}
          />
          <div
            className={`absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 ${borderColor}`}
          />
          <div
            className={`absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 ${borderColor}`}
          />

          <div className="z-10 flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <Crosshair className={`h-6 w-6 opacity-50 ${textColor}`} />
            <span
              className={`font-mono text-sm font-bold tracking-widest opacity-80 ${textColor}`}
            >
              {label}
            </span>
          </div>
        </>
      )}

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <UploadCloud className="mb-2 h-8 w-8 text-white" />
        <span className="text-sm font-bold tracking-widest text-white">
          点击导入图片
        </span>
      </div>
    </label>
  );
};

// ================= 主页面组件 =================
export default function CaseStudyPage() {
  const [data, setData] = useState<CaseData>(INITIAL_DATA);

  const updateData = (
    section: keyof CaseData,
    index: number | null,
    field: string,
    value: string,
    subSection: "oldProcess" | "newSop" | null = null,
  ) => {
    setData((prev) => {
      const copy = structuredClone(prev);
      if (subSection && section === "sops" && typeof index === "number") {
        const sop = copy.sops[index];
        if (subSection === "oldProcess") {
          (sop.oldProcess as Record<string, string | null>)[field] = value;
        } else {
          (sop.newSop as Record<string, string | null>)[field] = value;
        }
      } else if (typeof index === "number") {
        const arr = copy[section] as unknown as Record<string, unknown>[];
        (arr[index] as Record<string, unknown>)[field] = value;
      } else if (section === "header") {
        (copy.header as Record<string, unknown>)[field] = value;
      }
      return copy;
    });
  };

  const updateTag = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        tags: prev.header.tags.map((t, i) => (i === index ? value : t)),
      },
    }));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] pb-32 font-sans text-slate-200 selection:bg-cyan-500/30">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/80 bg-[#020617]/90 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-2 font-black uppercase tracking-widest text-cyan-400">
          <Zap className="h-5 w-5 fill-cyan-400" /> 杭连科技
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden animate-pulse rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-xs text-emerald-400 sm:block">
            EDIT_MODE_ACTIVE // 点击文本或图片框修改内容
          </span>
          <a
            href="/"
            className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> 案例中心
          </a>
        </div>
      </nav>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-screen" />
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-[600px] w-[800px] rounded-full bg-cyan-900/10 blur-[150px]" />

      <main className="relative z-10 mx-auto mt-16 max-w-7xl space-y-32 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pl-6 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1.5 before:bg-gradient-to-b before:from-cyan-400 before:to-indigo-600 lg:pl-10"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 sm:text-xs">
              <Fingerprint className="h-3.5 w-3.5" /> CONFIDENTIAL CASE
            </span>
            <EditableText
              as="span"
              value={data.header.client}
              onChange={(v) => updateData("header", null, "client", v)}
              className="text-sm font-bold tracking-wide text-slate-400"
            />
          </div>
          <EditableText
            as="h1"
            value={data.header.title}
            onChange={(v) => updateData("header", null, "title", v)}
            className="mb-4 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          />
          <EditableText
            as="p"
            value={data.header.subtitle}
            onChange={(v) => updateData("header", null, "subtitle", v)}
            className="mb-8 block max-w-3xl text-lg font-medium text-slate-400"
          />
          <div className="flex flex-wrap gap-3">
            {data.header.tags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-slate-700/80 bg-[#0f172a]/80 px-4 py-2 text-xs font-bold text-slate-300 shadow-sm backdrop-blur-sm"
              >
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                <EditableText value={tag} onChange={(v) => updateTag(i, v)} />
              </div>
            ))}
          </div>
        </motion.div>

        <section>
          <div className="mb-10 flex items-center gap-4 border-b border-slate-800/80 pb-5">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-2">
              <FileCode2 className="h-6 w-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-black tracking-wide text-white">
              工程图纸与先期选型
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {data.blueprints.map((bp, index) => (
              <motion.div
                key={bp.id}
                className="overflow-hidden border border-slate-800 bg-slate-900/40 p-2 shadow-xl transition-all hover:border-cyan-500/50"
              >
                <EditableImage
                  src={bp.imgSrc}
                  label={`点击导入图纸 0${bp.id}`}
                  onUpload={(url) =>
                    updateData("blueprints", index, "imgSrc", url)
                  }
                  className="h-48 w-full rounded-sm sm:h-60"
                />
                <div className="mt-2 flex items-center justify-between border border-slate-800/50 bg-slate-950/80 p-5">
                  <EditableText
                    as="h3"
                    value={bp.title}
                    onChange={(v) =>
                      updateData("blueprints", index, "title", v)
                    }
                    className="text-sm font-bold text-slate-200"
                  />
                  <EditableText
                    as="span"
                    value={bp.code}
                    onChange={(v) =>
                      updateData("blueprints", index, "code", v)
                    }
                    className="font-mono text-[10px] text-cyan-500/70"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-10 flex items-center gap-4 border-b border-slate-800/80 pb-5">
            <div className="rounded-lg border border-rose-900/50 bg-rose-950/30 p-2">
              <ShieldAlert className="h-6 w-6 text-rose-500" />
            </div>
            <h2 className="text-2xl font-black tracking-wide text-white">
              核心工艺痛点与破局策略
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {data.problems.map((prob, index) => (
              <div
                key={prob.id}
                className="relative overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900/80 to-[#020617] p-6 sm:p-8"
              >
                <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-white">
                  <Wrench className="h-5 w-5 shrink-0 text-amber-500" />
                  <EditableText
                    value={prob.title}
                    onChange={(v) =>
                      updateData("problems", index, "title", v)
                    }
                    className="flex-1"
                  />
                </h3>

                <div className="space-y-6">
                  <EditableImage
                    src={prob.imgSrc}
                    label={prob.imgLabel}
                    color="rose"
                    onUpload={(url) =>
                      updateData("problems", index, "imgSrc", url)
                    }
                    className="h-40 w-full rounded"
                  />

                  <div className="space-y-5">
                    <div className="rounded-r border-l-2 border-rose-500 bg-rose-950/10 p-4 shadow-inner">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-rose-400">
                        Anomaly / 异常追踪
                      </span>
                      <EditableText
                        as="p"
                        value={prob.anomaly}
                        onChange={(v) =>
                          updateData("problems", index, "anomaly", v)
                        }
                        className="block text-sm font-medium leading-relaxed text-slate-300"
                      />
                    </div>
                    <div className="rounded-r border-l-2 border-cyan-400 bg-cyan-950/10 p-4 shadow-inner">
                      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-cyan-400">
                        Strategy / 极客方案
                      </span>
                      <EditableText
                        as="p"
                        value={prob.solution}
                        onChange={(v) =>
                          updateData("problems", index, "solution", v)
                        }
                        className="block text-sm font-medium leading-relaxed text-cyan-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-10 flex items-center gap-4 border-b border-slate-800/80 pb-5">
            <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 p-2">
              <FileCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black tracking-wide text-white">
              后期工艺 SOP 标准化固化
            </h2>
            <span className="ml-auto hidden items-center gap-1.5 border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-xs text-slate-500 sm:inline-flex">
              <GitMerge className="h-3.5 w-3.5 shrink-0" aria-hidden />
              BEFORE VS AFTER
            </span>
          </div>

          <div className="space-y-12">
            {data.sops.map((sop, index) => (
              <div
                key={sop.id}
                className="overflow-hidden rounded-xl border border-slate-800/80 bg-[#0b1120] shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 py-4">
                  <h3 className="flex w-full items-center gap-2 text-lg font-bold text-slate-100">
                    <Settings className="h-4 w-4 shrink-0 text-slate-400" />
                    工序节点：
                    <EditableText
                      value={sop.processName}
                      onChange={(v) =>
                        updateData("sops", index, "processName", v)
                      }
                      className="flex-1"
                    />
                  </h3>
                </div>

                <div className="grid grid-cols-1 divide-y divide-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0">
                  <div className="relative p-6 sm:p-8">
                    <div className="absolute right-0 top-0 rounded-bl-lg bg-rose-500/10 px-4 py-1 text-[10px] font-black tracking-widest text-rose-400">
                      BEFORE
                    </div>
                    <h4 className="mb-4 flex items-center gap-2 font-bold text-rose-400">
                      <FileWarning className="h-4 w-4" /> 原工艺状态
                    </h4>

                    <EditableImage
                      src={sop.oldProcess.imgSrc}
                      label={sop.oldProcess.imgLabel}
                      color="rose"
                      onUpload={(url) =>
                        updateData(
                          "sops",
                          index,
                          "imgSrc",
                          url,
                          "oldProcess",
                        )
                      }
                      className="mb-6 h-48 w-full rounded-md"
                    />

                    <div className="rounded-md border border-rose-900/20 bg-rose-950/10 p-4">
                      <EditableText
                        as="p"
                        value={sop.oldProcess.desc}
                        onChange={(v) =>
                          updateData(
                            "sops",
                            index,
                            "desc",
                            v,
                            "oldProcess",
                          )
                        }
                        className="block text-sm leading-relaxed text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="relative bg-emerald-950/5 p-6 sm:p-8">
                    <div className="absolute right-0 top-0 rounded-bl-lg bg-emerald-500/10 px-4 py-1 text-[10px] font-black tracking-widest text-emerald-400">
                      AFTER (SOP FIXED)
                    </div>
                    <h4 className="mb-4 flex items-center gap-2 font-bold text-emerald-400">
                      <FileCheck className="h-4 w-4" /> 优化后量产 SOP
                    </h4>

                    <EditableImage
                      src={sop.newSop.imgSrc}
                      label={sop.newSop.imgLabel}
                      color="emerald"
                      onUpload={(url) =>
                        updateData("sops", index, "imgSrc", url, "newSop")
                      }
                      className="mb-6 h-48 w-full rounded-md"
                    />

                    <div className="rounded-md border border-emerald-900/30 bg-emerald-950/20 p-4 shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]">
                      <EditableText
                        as="p"
                        value={sop.newSop.desc}
                        onChange={(v) =>
                          updateData("sops", index, "desc", v, "newSop")
                        }
                        className="block text-sm leading-relaxed text-emerald-100/80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-emerald-900/20 mix-blend-overlay" />
          <div className="relative z-10 mb-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-black text-white">
                <BarChart3 className="h-6 w-6 text-cyan-400" />
                量产交付成效数据
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                工艺迭代后的最终物理验证与客户反馈
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold tracking-wider text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                PROJECT STATUS: PASSED
              </span>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {data.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-700/50 bg-[#020617]/60 p-6 text-center shadow-lg backdrop-blur-md"
              >
                <EditableText
                  as="div"
                  value={metric.value}
                  onChange={(v) => updateData("metrics", i, "value", v)}
                  className="mb-2 block w-full bg-gradient-to-br from-cyan-300 to-cyan-600 bg-clip-text text-3xl font-black text-transparent drop-shadow-[0_0_10px_rgba(34,211,238,0.2)] sm:text-4xl"
                />
                <EditableText
                  as="div"
                  value={metric.label}
                  onChange={(v) => updateData("metrics", i, "label", v)}
                  className="mb-1 block w-full text-sm font-bold text-slate-200"
                />
                <EditableText
                  as="div"
                  value={metric.desc}
                  onChange={(v) => updateData("metrics", i, "desc", v)}
                  className="block w-full text-[10px] text-slate-500"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-12 flex items-center gap-4 border-b border-slate-800/80 pb-5">
            <div className="rounded-lg border border-indigo-900/50 bg-indigo-950/30 p-2">
              <Activity className="h-6 w-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-black tracking-wide text-white">
              项目全周期甘特图复盘
            </h2>
          </div>

          <div className="relative ml-4 space-y-12 border-l-2 border-slate-800 py-4 sm:ml-8">
            {data.timeline.map((item, index) => (
              <div key={index} className="group relative pl-8 sm:pl-12">
                <div className="absolute bottom-[-3rem] left-[-2px] top-0 z-0 w-[2px] origin-top scale-y-0 bg-indigo-500/50 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                <div className="absolute -left-[9px] top-1.5 z-10 h-4 w-4 rounded-full border-2 border-slate-600 bg-[#020617] transition-all duration-300 group-hover:border-indigo-400 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]" />

                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <span className="inline-block rounded-sm border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold tracking-widest text-indigo-400">
                    PHASE 0{index + 1}
                  </span>
                  <EditableText
                    as="h4"
                    value={item.title}
                    onChange={(v) =>
                      updateData("timeline", index, "title", v)
                    }
                    className="block text-lg font-bold text-slate-100"
                  />
                </div>
                <div className="rounded-md border border-slate-800/50 bg-slate-900/30 p-4">
                  <EditableText
                    as="p"
                    value={item.desc}
                    onChange={(v) =>
                      updateData("timeline", index, "desc", v)
                    }
                    className="block max-w-3xl text-sm leading-relaxed text-slate-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
