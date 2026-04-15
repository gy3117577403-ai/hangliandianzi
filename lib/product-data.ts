/**
 * 展品数据（产品量产成品展示）
 * —— 修改方式：直接编辑下方 productList 数组中的 name / tag / spec / image / desc。
 * —— 图片文件请放在 public/images/products/ 目录；部署到 GitHub Pages（含 basePath）时，
 *     image 需带仓库前缀，例如：/hangliandianzi/images/products/p1.jpg
 */

export interface ProductItem {
  /** 序号，用于列表渲染 key，勿重复 */
  id: number;
  /** 产品名称（展示在卡片主标题） */
  name: string;
  /** 分类或场景标签，简短中文即可 */
  tag: string;
  /** 规格摘要：线径、电压、电流等，按实际填写 */
  spec: string;
  /** 静态资源路径，默认使用 .jpg；若改用 .png 请同步改此处后缀 */
  image: string;
  /** 工艺与场景说明（卡片正文） */
  desc: string;
}

// 请在此处修改图片路径和文字；每条对应一张图，缺图时请先放入同名文件或改路径。
export const productList: ProductItem[] = [
  {
    id: 1,
    name: "大截面高压动力主线束",
    tag: "主回路驱动",
    spec: "耐压 1500V DC // 载流 300A+ // 防护 IP67",
    image: "/hangliandianzi/images/products/p1.jpg",
    desc: "采用高柔性屏蔽硅胶线，两端定制重载金属端子与高精螺栓压接，专为三电系统主回路大电流传输设计，极低温升。",
  },
  {
    id: 2,
    name: "车规级快插高压连接线",
    tag: "标准高压配电",
    spec: "阻燃等级 UL94 V-0 // 屏蔽效能 >70dB",
    image: "/hangliandianzi/images/products/p2.jpg",
    desc: "配备二级锁止结构与高压互锁 (HVIL) 功能，插拔手感顺滑。确保在剧烈振动与颠簸环境下的电气连接绝对安全。",
  },
  {
    id: 3,
    name: "屏蔽型防干扰控制线束",
    tag: "信号与传感",
    spec: "360° 铜网屏蔽 // 信号衰减 < 0.1dB",
    image: "/hangliandianzi/images/products/p3.jpg",
    desc: "专为高频信号与旋变传感器定制，多芯双绞结构设计，彻底隔绝高压系统的电磁干扰 (EMI)，保障信号零失真。",
  },
  {
    id: 4,
    name: "紧凑型直角高压动力线",
    tag: "空间优化方案",
    spec: "90° 弯头设计 // 盐雾测试 480h",
    image: "/hangliandianzi/images/products/p4.jpg",
    desc: "针对狭小装配空间研发的直角屏蔽接头，极大优化电池包或电驱总成的内部走线布局，高密度集成时的完美选择。",
  },
  {
    id: 5,
    name: "全绝缘抗震荡电池模组排",
    tag: "模组连接",
    spec: "多位集成连接 // 耐温 -40℃~125℃",
    image: "/hangliandianzi/images/products/p5.jpg",
    desc: "专为动力电池包 (PACK) 内部定制，高密度排布。极耳采用超声波焊接或高精压接，全绝缘包覆，杜绝热失控风险。",
  },
  {
    id: 6,
    name: "新能源高压辅助配电线束",
    tag: "高压附件配电",
    spec: "多路分支架构 // 绝缘电阻 >500MΩ",
    image: "/hangliandianzi/images/products/p6.jpg",
    desc: "广泛应用于电动压缩机、PTC加热器及 OBC 等高压附件。提供稳定可靠的电力分配网络，耐侯性极佳。",
  },
];

/** @deprecated 请改用 productList，仅为兼容旧引用保留别名 */
export const highVoltageProducts = productList;
