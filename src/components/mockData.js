import {
  Activity,
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  ClipboardList,
  FileText,
  Layers3,
  Radar,
  Route,
  Send,
  Wind,
  Cpu,
  Database,
  Bot,
  Eye,
  CheckCircle2,
  Wrench,
  TrendingUp,
} from "lucide-react";

export const pages = [
  { key: "dashboard", label: "总览驾驶舱", icon: Layers3 },
  { key: "monitor", label: "实时监控", icon: Activity },
  { key: "detect", label: "缺陷识别", icon: Radar },
  { key: "risk", label: "风险评估", icon: AlertTriangle },
  { key: "workorder", label: "运维派单", icon: ClipboardList },
  { key: "agent", label: "智能体", icon: Bot },
];

export const kpis = [
  { title: "在运机组", value: "128", sub: "覆盖 6 个山地风场", icon: Wind },
  { title: "今日巡检架次", value: "24", sub: "已完成 18 架次", icon: Route },
  { title: "识别异常", value: "37", sub: "极小缺陷 21 项", icon: Radar },
  { title: "高风险任务", value: "05", sub: "待优先处置", icon: AlertTriangle },
];

export const weeklyTrend = [
  { name: "周一", defect: 12, close: 9, risk: 7 },
  { name: "周二", defect: 16, close: 13, risk: 8 },
  { name: "周三", defect: 14, close: 12, risk: 6 },
  { name: "周四", defect: 20, close: 15, risk: 11 },
  { name: "周五", defect: 17, close: 16, risk: 9 },
  { name: "周六", defect: 22, close: 18, risk: 13 },
  { name: "周日", defect: 19, close: 17, risk: 10 },
];

export const farmHealth = [
  { name: "宁武风场", score: 91 },
  { name: "右玉风场", score: 85 },
  { name: "神池风场", score: 88 },
  { name: "偏关风场", score: 79 },
  { name: "五寨风场", score: 93 },
  { name: "静乐风场", score: 82 },
];

export const defectTypes = [
  { name: "裂纹", value: 32 },
  { name: "脱胶", value: 21 },
  { name: "积冰", value: 18 },
  { name: "侵蚀", value: 16 },
  { name: "污染", value: 13 },
];

export const agentAbility = [
  { subject: "规划效率", value: 90 },
  { subject: "检测精度", value: 94 },
  { subject: "风险评估", value: 88 },
  { subject: "调度协同", value: 91 },
  { subject: "闭环响应", value: 86 },
  { subject: "知识检索", value: 89 },
];

export const defects = [
  {
    id: "D-001",
    turbine: "A12",
    blade: "2号叶片",
    type: "前缘裂纹",
    level: "高",
    confidence: 96,
    area: "13.4 cm²",
    status: "待派单",
    desc: "裂纹位于叶片前缘中段，疑似处于快速扩展期。",
  },
  {
    id: "D-002",
    turbine: "B07",
    blade: "1号叶片",
    type: "表面侵蚀",
    level: "中",
    confidence: 91,
    area: "8.7 cm²",
    status: "处理中",
    desc: "涂层磨损区域明显，建议结合风速历史进行复核。",
  },
  {
    id: "D-003",
    turbine: "C19",
    blade: "3号叶片",
    type: "疑似脱胶",
    level: "高",
    confidence: 93,
    area: "11.2 cm²",
    status: "待复核",
    desc: "边界纹理异常，存在结构完整性下降风险。",
  },
  {
    id: "D-004",
    turbine: "D03",
    blade: "2号叶片",
    type: "积冰残留",
    level: "低",
    confidence: 87,
    area: "6.1 cm²",
    status: "已闭环",
    desc: "当前影响有限，建议纳入后续巡检观察清单。",
  },
];

export const workOrders = [
  { id: "WO-2301", turbine: "A12", priority: "P1", team: "检修一组", eta: "2h", state: "待接单" },
  { id: "WO-2302", turbine: "C19", priority: "P1", team: "高空运维组", eta: "3h", state: "已派发" },
  { id: "WO-2303", turbine: "B07", priority: "P2", team: "无人机复核组", eta: "6h", state: "处理中" },
  { id: "WO-2304", turbine: "D03", priority: "P3", team: "常规巡检组", eta: "24h", state: "已完成" },
];

export const timeline = [
  { time: "08:40", title: "无人机起飞并加载山区航线", type: "planning" },
  { time: "09:05", title: "MSDA-Net 检测到 A12 风机叶片极小裂纹", type: "detect" },
  { time: "09:08", title: "风险评估智能体判定为高风险缺陷", type: "risk" },
  { time: "09:10", title: "运维决策智能体生成优先停机与抢修建议", type: "decision" },
  { time: "09:14", title: "系统自动派发 P1 工单并通知检修组", type: "work" },
];

export const architecture = [
  { name: "数据感知层", desc: "红外图像、可见光巡检、风机状态与气象数据接入", icon: Eye },
  { name: "AI 模型层", desc: "MSDA-Net 极小缺陷检测 + PAL 轻量化迭代训练", icon: Cpu },
  { name: "智能体协同层", desc: "调度智能体统筹路径规划、检测、研判与决策", icon: Bot },
  { name: "知识库层", desc: "RAG 检索运维规范、历史案例、维修经验与场站规则", icon: Database },
  { name: "业务应用层", desc: "监控展示、风险预警、派单闭环、成果报告导出", icon: Send },
];

export const colors = ["#0f172a", "#1d4ed8", "#14b8a6", "#f59e0b", "#ef4444"];

export function levelBadge(level) {
  if (level === "高") return "bg-red-500 hover:bg-red-500";
  if (level === "中") return "bg-amber-500 hover:bg-amber-500";
  return "bg-emerald-500 hover:bg-emerald-500";
}
