"use client";

import {
  AlertTriangle,
  Award,
  Camera,
  CheckCircle2,
  Edit3,
  ImagePlus,
  Plus,
  Save,
  Target,
  Trash2,
  TrendingUp,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { MotionInView } from "@/components/motion-in-view";
import { useCaseStudyStore } from "@/store/case-study-store";

const placeholderSrc = "/images/case-placeholder.svg";

export function DynamicCaseBoard() {
  const {
    title,
    client,
    background,
    painPoints,
    solutions,
    results,
    image,
    isEditingCase,
    setIsEditingCase,
    setCaseField,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    setImageFromFile,
  } = useCaseStudyStore();

  const displaySrc = image ?? placeholderSrc;

  return (
    <section
      id="full-case-study"
      className="relative overflow-hidden border-y border-slate-200 bg-[#f1f5f9] px-6 py-32 dark:border-white/5 dark:bg-slate-950 md:px-12"
    >
      <div className="absolute top-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <span className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-500">
              <Target className="h-4 w-4" /> Complete Project Case Study
            </span>
            <h2 className="text-4xl font-black text-[#0f172a] dark:text-white md:text-5xl">
              从痛点到闭环：
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                完整落地案例实录
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingCase(!isEditingCase)}
            className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-all ${
              isEditingCase
                ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            }`}
          >
            {isEditingCase ? (
              <>
                <Save className="h-5 w-5" /> 保存并演示
              </>
            ) : (
              <>
                <Edit3 className="h-5 w-5" /> 开启实时编辑模式
              </>
            )}
          </button>
        </div>

        {isEditingCase ? (
          <MotionInView>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900 md:p-12">
              <div className="grid gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                      项目主标题
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) =>
                        setCaseField("title", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-[#0f172a] transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                      客户背景 / 标签
                    </label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e) =>
                        setCaseField("client", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#0f172a] transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                      项目难点 / 背景概述
                    </label>
                    <textarea
                      rows={3}
                      value={background}
                      onChange={(e) =>
                        setCaseField("background", e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[#0f172a] transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-bold uppercase tracking-widest text-red-400">
                        核心技术痛点 (可增删)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem("painPoints")}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" /> 添加
                      </button>
                    </div>
                    <div className="space-y-3">
                      {painPoints.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(
                                "painPoints",
                                idx,
                                e.target.value,
                              )
                            }
                            className="flex-1 rounded-lg border border-red-900/50 bg-red-950/20 px-4 py-2 text-slate-200 focus:border-red-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("painPoints", idx)
                            }
                            className="rounded-lg bg-slate-950 p-2 text-slate-500 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-slate-400">
                      项目实拍图片上传
                    </label>
                    <div className="group relative flex h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 transition-colors hover:border-blue-500">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFromFile(e.target.files?.[0])
                        }
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      />
                      {image ? (
                        <Image
                          src={image}
                          alt="上传预览"
                          fill
                          className="object-cover opacity-50 transition-opacity group-hover:opacity-30"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          unoptimized
                        />
                      ) : null}
                      <Camera className="relative z-0 mb-2 h-10 w-10 text-slate-500 transition-colors group-hover:text-blue-500" />
                      <span className="relative z-0 font-medium text-slate-400 group-hover:text-blue-400">
                        点击或拖拽上传产品/截面图
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-bold uppercase tracking-widest text-blue-400">
                        我们的破局方案 (可增删)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem("solutions")}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" /> 添加
                      </button>
                    </div>
                    <div className="space-y-3">
                      {solutions.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(
                                "solutions",
                                idx,
                                e.target.value,
                              )
                            }
                            className="flex-1 rounded-lg border border-blue-900/50 bg-blue-950/20 px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeArrayItem("solutions", idx)
                            }
                            className="rounded-lg bg-slate-950 p-2 text-slate-500 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-bold uppercase tracking-widest text-emerald-400">
                        最终量产战果 (可增删)
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem("results")}
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" /> 添加
                      </button>
                    </div>
                    <div className="space-y-3">
                      {results.map((item, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(
                                "results",
                                idx,
                                e.target.value,
                              )
                            }
                            className="flex-1 rounded-lg border border-emerald-900/50 bg-emerald-950/20 px-4 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayItem("results", idx)}
                            className="rounded-lg bg-slate-950 p-2 text-slate-500 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionInView>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="relative overflow-hidden border-b border-slate-800 p-8 md:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="mb-4 inline-block rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-400">
                CLIENT: {client}
              </div>
              <h3 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                {title}
              </h3>
              <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-400">
                {background}
              </p>
            </div>

            <div className="grid divide-y divide-slate-800 lg:grid-cols-[1.5fr_1fr] lg:divide-x lg:divide-y-0">
              <div className="bg-slate-900/50 p-8 md:p-12">
                <div className="mb-12">
                  <h4 className="mb-6 flex items-center gap-3 text-xl font-black text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    原发技术痛点
                  </h4>
                  <ul className="space-y-4">
                    {painPoints.map((pt, i) => (
                      <li
                        key={i}
                        className="flex gap-4 rounded-2xl border border-red-900/30 bg-red-950/10 p-4"
                      >
                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-400">
                          {i + 1}
                        </span>
                        <span className="font-medium leading-relaxed text-slate-300">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-6 flex items-center gap-3 text-xl font-black text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                      <Wrench className="h-5 w-5 text-blue-500" />
                    </div>
                    极客破局方案
                  </h4>
                  <ul className="space-y-4">
                    {solutions.map((sol, i) => (
                      <li
                        key={i}
                        className="flex gap-4 rounded-2xl border border-blue-900/30 bg-blue-950/10 p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-500" />
                        <span className="font-medium leading-relaxed text-slate-300">
                          {sol}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col bg-slate-950">
                <div className="relative h-64 overflow-hidden border-b border-slate-800 bg-slate-900">
                  <Image
                    src={displaySrc}
                    alt="项目实景"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority={false}
                  />
                  {!image && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 opacity-30">
                      <ImagePlus className="mb-4 h-16 w-16 text-slate-500" />
                      <span className="text-sm font-bold uppercase tracking-widest text-slate-500">
                        Product Visualization Area
                      </span>
                      <span className="mt-2 text-xs text-slate-600">
                        点击右上方 [编辑模式] 导入实拍图
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>
                <div className="flex-1 p-8 md:p-12">
                  <h4 className="mb-6 flex items-center gap-3 text-xl font-black text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                      <Award className="h-5 w-5 text-emerald-500" />
                    </div>
                    量产交付战果
                  </h4>
                  <div className="space-y-4">
                    {results.map((res, i) => (
                      <div
                        key={i}
                        className="group flex items-center gap-4 rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-5 transition-colors hover:bg-emerald-900/20"
                      >
                        <TrendingUp className="h-6 w-6 text-emerald-500 opacity-70 group-hover:opacity-100" />
                        <span className="font-bold text-emerald-50">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
