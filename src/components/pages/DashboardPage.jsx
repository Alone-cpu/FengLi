import React from "react";
import { Play, BrainCircuit, ShieldCheck, MapPinned, Eye, Route, Radar, AlertTriangle, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import SectionHeader from "@/components/SectionHeader";
import {
  kpis,
  weeklyTrend,
  farmHealth,
  agentAbility,
} from "@/components/mockData";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as ReRadar,
  BarChart,
  Bar,
} from "recharts";

function SummaryCard({ title, value, sub, Icon }) {
  return (
    <div className="border border-slate-200 bg-white p-4 rounded-lg hover:border-slate-300 transition-colors">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-slate-500">{title}</span>
        <div className="rounded bg-slate-100 p-2">
          <Icon className="h-4 w-4 text-slate-700" />
        </div>
      </div>
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-6 rounded-lg">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <div className="space-y-5">
            <Badge className="rounded-full bg-blue-600 px-4 py-1 text-white hover:bg-blue-600">比赛展示版 · 项目路演首页</Badge>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 xl:text-5xl">
                面向晋北山区的山地风电场
                <span className="block text-blue-700">叶片智能运维一体化系统</span>
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
                以多智能体协同系统为核心，联动路径规划、红外极小缺陷识别、风险评估与运维派单，完成从巡检感知到维修决策的全链路闭环，突出"能看见、能判断、能处置、能展示"的比赛型产品能力。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded bg-slate-950 px-5"><Play className="mr-2 h-4 w-4" />开始演示</Button>
              <Button variant="outline" className="rounded px-5">查看技术架构</Button>
              <Button variant="outline" className="rounded px-5">导出答辩报告</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {kpis.map((item) => (
                <SummaryCard key={item.title} title={item.title} value={item.value} sub={item.sub} Icon={item.icon} />
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-5 text-white rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">系统状态概览</p>
                <h2 className="mt-1 text-2xl font-semibold">今日智能巡检总览</h2>
              </div>
              <Badge className="rounded-full bg-emerald-500 text-white hover:bg-emerald-500">系统在线</Badge>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-slate-300"><BrainCircuit className="h-4 w-4" />中枢调度智能体</div>
                <div className="mt-3 text-3xl font-bold">97.2%</div>
                <p className="mt-1 text-xs text-slate-400">任务协同成功率</p>
                <Progress value={97} className="mt-4 h-2 bg-white/20" />
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck className="h-4 w-4" />闭环处置效率</div>
                <div className="mt-3 text-3xl font-bold">4.6h</div>
                <p className="mt-1 text-xs text-slate-400">平均响应时间</p>
                <Progress value={82} className="mt-4 h-2 bg-white/20" />
              </div>
            </div>

            <div className="mt-5 bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="mb-4 flex items-center gap-2 text-sm text-slate-300"><MapPinned className="h-4 w-4" />晋北山地区域风场概览</div>
              <div className="grid min-h-[240px] grid-cols-3 gap-3 p-4 bg-slate-800 rounded-lg">
                {[...Array(12)].map((_, idx) => (
                  <div key={idx} className={`border border-white/10 p-3 rounded ${idx % 5 === 0 ? "bg-red-400/20" : idx % 4 === 0 ? "bg-amber-300/20" : "bg-emerald-400/20"}`}>
                    <div className="text-xs text-white/70">风机 {idx + 1}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      {idx % 5 === 0 ? "高风险" : idx % 4 === 0 ? "待复核" : "正常"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <SectionHeader title="运行趋势与闭环效率" desc="展示识别、告警与工单闭环的动态变化" action={<Button variant="outline" className="rounded">查看详情</Button>} />
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="h-[320px] bg-slate-50 p-4 rounded-lg">
                <div className="mb-3 text-sm font-medium text-slate-700">周度巡检趋势</div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrend}>
                    <defs>
                      <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.32} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
                      </linearGradient>
                      <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.32} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="defect" stroke="#2563eb" fill="url(#blueFill)" strokeWidth={2.5} />
                    <Area type="monotone" dataKey="close" stroke="#14b8a6" fill="url(#tealFill)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[320px] bg-slate-50 p-4 rounded-lg">
                <div className="mb-3 text-sm font-medium text-slate-700">高风险告警变化</div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <SectionHeader title="多智能体能力画像" desc="突出项目智能协同与产品化优势" />
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="h-[250px] bg-slate-50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={agentAbility}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <ReRadar dataKey="value" stroke="#1d4ed8" fill="#1d4ed8" fillOpacity={0.35} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-3">
              {[
                ["路径规划智能体", "复杂山地航线优化与避障", Route],
                ["缺陷检测智能体", "MSDA-Net 红外极小缺陷识别", Radar],
                ["风险评估智能体", "缺陷等级判定与事故概率评估", AlertTriangle],
                ["运维决策智能体", "自动工单与维修建议生成", Wrench],
              ].map(([title, desc, Icon]) => (
                <div key={title} className="flex items-start gap-3 border border-slate-200 p-4 rounded-lg">
                  <div className="bg-slate-100 p-2 rounded"><Icon className="h-4 w-4 text-slate-700" /></div>
                  <div>
                    <div className="font-medium text-slate-900">{title}</div>
                    <div className="text-sm text-slate-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
