import React from "react";
import { useEffect, useState } from "react";
import { Play, BrainCircuit, ShieldCheck, MapPinned, Eye, Route, Radar, AlertTriangle, Wrench, BarChart3 } from "lucide-react";
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
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimateTitle(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-6 rounded-lg">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <div className="space-y-5">
            <div className="mt-5">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 xl:text-5xl">
                <span
                  className={`block text-slate-900 transition-all duration-700 ease-out motion-reduce:transition-none ${
                    animateTitle ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                  }`}
                >
                  面向晋北山区的
                </span>
                <span
                  className={`mt-2 block bg-gradient-to-r from-blue-800 via-sky-700 to-cyan-600 bg-clip-text text-[2.15rem] font-semibold leading-9 text-transparent transition-all duration-700 delay-300 ease-out motion-reduce:transition-none ${
                    animateTitle ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                  }`}
                >
                  山地风电场叶片智能运维一体化系统
                </span>
              </h1>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {kpis.map((item) => (
                <SummaryCard key={item.title} title={item.title} value={item.value} sub={item.sub} Icon={item.icon} />
              ))}
            </div>

            {/* 添加风场健康度图表 */}
            <div className="bg-white border border-slate-200 p-5 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">风场健康度评分</h3>
                  <p className="text-sm text-slate-500">各山地风场实时健康状态监测</p>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={farmHealth} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      formatter={(value) => [`健康度: ${value}分`, '']}
                    />
                    <Bar
                      dataKey="score"
                      fill="#64748b"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    >
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
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

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <SectionHeader title="多智能体能力画像" />
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

        <Card className="rounded-lg">
          <CardHeader>
            <SectionHeader title="运行趋势与闭环效率" action={<Button variant="outline" className="rounded">查看详情</Button>} />
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="h-[320px] bg-slate-50 p-4 rounded-lg">
                <div className="mb-3 text-sm font-medium text-slate-700">周度巡检趋势</div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
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
                    <XAxis dataKey="name" height={40} />
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
                  <LineChart data={weeklyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" height={40} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
