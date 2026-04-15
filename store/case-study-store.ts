"use client";

import { create } from "zustand";

export type CaseStudyFields = {
  title: string;
  client: string;
  background: string;
  painPoints: string[];
  solutions: string[];
  results: string[];
  image: string | null;
};

const initialCase: CaseStudyFields = {
  title: "某头部工业储能高压动力线束NPI全流程落地案",
  client: "行业Top 3储能设备制造商",
  background:
    "设备长期处于复杂工况，承受低频震荡与高压大电流，对线束的机械强度与电气绝缘性要求极度苛刻。",
  painPoints: [
    "线缆绝缘层厚且韧，传统剥线极易刮伤内芯细铜丝，导致高压测试产生电晕隐患。",
    "原图纸常规压接在震动后，拉拔力急剧衰减，接触阻抗超标发热。",
  ],
  solutions: [
    "抛弃常规参数，定制剥线机刀片行程与角度，数百次测试锁定'零伤铜丝'临界点。",
    "前置DFM优化：微调压模具C/H高度释放应力，并首创特制双壁热缩管二次密封防松脱工艺。",
    "引入定制工装与100%高压绝缘全检机制入SOP。",
  ],
  results: [
    "破坏性拉拔力指标反超国标 35%。",
    "48小时极速出具极限验证样品。",
    "爬坡量产后实现 0 批次退回，0 安全客诉。",
  ],
  image: null,
};

type CaseStudyStore = CaseStudyFields & {
  isEditingCase: boolean;
  setIsEditingCase: (v: boolean) => void;
  setCaseField: <K extends keyof CaseStudyFields>(
    key: K,
    value: CaseStudyFields[K],
  ) => void;
  handleArrayChange: (
    field: "painPoints" | "solutions" | "results",
    index: number,
    value: string,
  ) => void;
  addArrayItem: (field: "painPoints" | "solutions" | "results") => void;
  removeArrayItem: (
    field: "painPoints" | "solutions" | "results",
    index: number,
  ) => void;
  setImageFromFile: (file: File | undefined) => void;
};

export const useCaseStudyStore = create<CaseStudyStore>((set, get) => ({
  ...initialCase,
  isEditingCase: false,
  setIsEditingCase: (v) => set({ isEditingCase: v }),
  setCaseField: (key, value) => set({ [key]: value } as Partial<CaseStudyStore>),
  handleArrayChange: (field, index, value) => {
    const cs = get();
    const next = [...cs[field]];
    next[index] = value;
    set({ [field]: next } as Partial<CaseStudyStore>);
  },
  addArrayItem: (field) => {
    const cs = get();
    set({ [field]: [...cs[field], ""] } as Partial<CaseStudyStore>);
  },
  removeArrayItem: (field, index) => {
    const cs = get();
    set({
      [field]: cs[field].filter((_, i) => i !== index),
    } as Partial<CaseStudyStore>);
  },
  setImageFromFile: (file) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    set({ image: imageUrl });
  },
}));
