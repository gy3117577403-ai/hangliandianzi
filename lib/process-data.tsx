import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CheckSquare,
  Factory,
  FileSearch,
  Layers,
  Microscope,
  Settings,
  Target,
  ThumbsUp,
  Wrench,
} from "lucide-react";

export type ProcessStep = {
  id: number;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  description: string;
  points: string[];
  deliverable: string;
  colorFrom: string;
  colorTo: string;
  shadow: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "需求导入与技术初审",
    subtitle: "打破信息差，精准锁定核心诉求",
    Icon: FileSearch,
    description:
      "不盲目接单，第一时间消化您的原始图纸与电气规格书，精准识别高压、大电流环境下的特殊应用边界。",
    points: [
      "消化原始图纸与电气规格书",
      "识别高压、大电流特殊应用场景要求",
      "输出初步的技术可行性评估意见",
    ],
    deliverable: "《项目需求意向书》",
    colorFrom: "from-blue-600",
    colorTo: "to-cyan-500",
    shadow: "shadow-blue-500/30",
  },
  {
    id: 2,
    title: "DFM分析与方案优化",
    subtitle: "把隐患消灭在图纸阶段",
    Icon: Target,
    description:
      "基于多年复杂线束实战经验，我们专注高压线束的特殊受力与绝缘环境，为您深度排查并修复潜在的工艺风险。",
    points: [
      "全面审查绝缘距离、弯折半径与受力点",
      "基于大线经验评估端子选型与模具匹配度",
      "提供成本优化与拉力提升的微调建议",
    ],
    deliverable: "《DFM工程分析报告》",
    colorFrom: "from-indigo-500",
    colorTo: "to-blue-500",
    shadow: "shadow-indigo-500/30",
  },
  {
    id: 3,
    title: "核心物料甄选与验证",
    subtitle: "从源头卡死高压安全底线",
    Icon: Layers,
    description:
      "高压无小事，材料是第一道防线。联合头部供应商，锁定最契合电气特性的车规级/工控级高压线材与插件。",
    points: [
      "筛选验证车规级/工控级特种高压线缆",
      "严格验证端子镀层厚度与抗氧化/接触阻抗性能",
      "执行绝缘材料耐温等级与阻燃(V0级)前置测试",
    ],
    deliverable: "《核心物料BOM表》 & 材质检测证明",
    colorFrom: "from-violet-500",
    colorTo: "to-purple-500",
    shadow: "shadow-violet-500/30",
  },
  {
    id: 4,
    title: "极速打样与工装定制",
    subtitle: "不靠运气，靠参数的极限摸索",
    Icon: Wrench,
    description:
      "高压线打样最怕“大力出奇迹”。遇到绝缘皮厚、易伤铜丝等痛点，我们在极短时间内通过设备调试找到最佳物理解法。",
    points: [
      "抛弃大厂冗长流程，技术骨干当晚驻线试错",
      "定制剥线刀片行程，实现厚绝缘“零伤细铜丝”",
      "定制化精密压接模具与 3D 打印工装测试定位板",
    ],
    deliverable: "实物高精度初版样品 & 工装清单",
    colorFrom: "from-orange-500",
    colorTo: "to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    id: 5,
    title: "全维测试与极限验证",
    subtitle: "超标准内测，挑战物理极限",
    Icon: Microscope,
    description:
      "自我刁难是安全的保证。打样后立刻投入极其严苛的物理与电性能内测，不拿客户的产品当试验品。",
    points: [
      "执行高压/绝缘/导通三合一电性能综合测试",
      "破坏性拉拔力极限摸底与端子截面(孔隙率)金相分析",
    ],
    deliverable: "《FA首件检验报告》 & 截面显微图",
    colorFrom: "from-red-500",
    colorTo: "to-rose-400",
    shadow: "shadow-red-500/30",
  },
  {
    id: 6,
    title: "客户验厂与样品签核",
    subtitle: "透明化展示，建立绝对信任",
    Icon: CheckSquare,
    description:
      "打开大门做线束，邀请客户深入我们的核心制程，从参数确认到设备点检，所见即所得。",
    points: [
      "邀请客户现场观摩核心压接与高压测试工序",
      "全透明开放生产制程记录与品质溯源体系",
      "多方技术会审，确认各项临界安全指标并签字封样",
    ],
    deliverable: "《客户签样单》 & 验厂确认书",
    colorFrom: "from-teal-500",
    colorTo: "to-emerald-400",
    shadow: "shadow-teal-500/30",
  },
  {
    id: 7,
    title: "SOP编制与产线防呆",
    subtitle: "将“经验”写成不可违背的“铁律”",
    Icon: Settings,
    description:
      "防范人为失误是量产的关键。我们将试产中摸索出的最佳工艺参数，100%固化为产线上的防呆指导书。",
    points: [
      "量化压接高度(C/H)与压接宽度(C/W)等工艺参数标准",
      "输出图文并茂的标准作业指导书，彻底消除装配歧义",
      "产线引入导通检测防呆系统，防止错漏穿",
    ],
    deliverable: "《量产SOP/SIP文件》 & 专属防呆治具",
    colorFrom: "from-emerald-500",
    colorTo: "to-green-400",
    shadow: "shadow-emerald-500/30",
  },
  {
    id: 8,
    title: "小批量试产 (NPI)",
    subtitle: "真实量产环境下的压力测试",
    Icon: Activity,
    description:
      "不打无准备之仗。在全面量产前，通过小批量跑线验证人员熟练度、设备稳定性与物料齐套率。",
    points: [
      "按量产标准投入试产批次进行全流程工序跑线",
      "测算并验证实际工时瓶颈(CT)、排位及流线顺畅度",
      "严密收集试产直通率(FPY)数据，微调闭环工艺参数",
    ],
    deliverable: "《试产总结报告》 & 产能爬坡计划",
    colorFrom: "from-cyan-500",
    colorTo: "to-sky-400",
    shadow: "shadow-cyan-500/30",
  },
  {
    id: 9,
    title: "全检量产与追溯赋码",
    subtitle: "死磕安全红线，制程不玩花架子",
    Icon: Factory,
    description:
      "针对高压线“零容错”的特性，采用最务实、最严苛的物理制程管控，每一根线都是安全承载者。",
    points: [
      "每日首件必检(FAI)与核心工序IPQC高频强制抽检",
      "每一根成品线出厂前必过高压、绝缘、导通三大红线测试",
    ],
    deliverable: "《批次出货检验报告(OQC)》 & 唯一追溯码",
    colorFrom: "from-fuchsia-500",
    colorTo: "to-pink-500",
    shadow: "shadow-fuchsia-500/30",
  },
  {
    id: 10,
    title: "售后响应与持续迭代",
    subtitle: "交付不是终点，提供持续技术支持",
    Icon: ThumbsUp,
    description:
      "做大客户的长效伙伴。极速响应您的工程变更与售后需求，不断推动产品的价值重塑与降本增效。",
    points: [
      "售后极速响应矩阵，紧急技术问题即时对接处理",
      "ECN(工程变更)极速对接，协同排期提供新验证样品",
      "定期回顾制程与质量数据，主动提供VAVE工程降本方案",
    ],
    deliverable: "《8D问题解决报告》 & VAVE改良建议",
    colorFrom: "from-amber-600",
    colorTo: "to-orange-500",
    shadow: "shadow-amber-500/30",
  },
];
