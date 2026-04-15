/**
 * 展品数据（产品量产成品展示）
 * —— 修改方式：直接编辑下方 productList 数组中的 name / tag / spec / image。
 * —— 图片文件请放在 public/images/products/ 目录；image 路径中的文件名与后缀（.jpg / .png 等）
 *     必须与磁盘上的实际文件完全一致，否则页面会无法加载图片。
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
}

// 请在此处修改图片路径和文字；每条对应一张图，缺图时请先放入同名文件或改路径。
export const productList: ProductItem[] = [
  {
    id: 1,
    name: "储能高压软铜排线束",
    tag: "储能系列",
    spec: "120mm² / 2000V DC",
    image: "/images/products/p1.jpg",
  },
  {
    id: 2,
    name: "车规级特种动力连接器",
    tag: "车载动力",
    spec: "IP68 / 800A",
    image: "/images/products/p2.jpg",
  },
  {
    id: 3,
    name: "工控超挠性大电流缆",
    tag: "工控自动化",
    spec: "50mm² / 125A",
    image: "/images/products/p3.jpg",
  },
  {
    id: 4,
    name: "双壁热缩防松脱密封线束",
    tag: "安全关键件",
    spec: "无微裂 / 全检出货",
    image: "/images/products/p4.jpg",
  },
  {
    id: 5,
    name: "全绝缘抗震荡电池模组排",
    tag: "模组连接",
    spec: "按项目图纸定制",
    image: "/images/products/p5.jpg",
  },
  {
    id: 6,
    name: "医疗级耐高电压硅胶线",
    tag: "医疗与特种",
    spec: "10kV DC / 50A",
    image: "/images/products/p6.jpg",
  },
];

/** @deprecated 请改用 productList，仅为兼容旧引用保留别名 */
export const highVoltageProducts = productList;
