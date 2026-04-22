import React from "react";
import { TrendingUp, Database, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionHeader from "@/components/SectionHeader";
import { defectTypes } from "@/components/mockData";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { colors } from "@/components/mockData";

export default function RiskPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          ["风险评分模型", "结合缺陷位置、面积、置信度、历史演化趋势综合判级", "92 / 100", TrendingUp],
          ["知识库辅助研判", "接入风电运维规范、案例库、维修手册，支持 RAG 检索", "已接入", Database],
          ["闭环决策生成", "自动输出复检、停机、维修优先级与资源调度建议", "自动生成", CheckCircle2],
        ].map(([title, desc, value, Icon]) => (
          <Card key={title} className="rounded-lg">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-slate-950 text-white rounded-lg"><Icon className="h-5 w-5" /></div>
              <div className="text-lg font-semibold text-slate-900">{title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-500">{desc}</div>
              <div className="mt-6 text-3xl font-bold text-blue-700">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <SectionHeader title="缺陷类型分布" desc="帮助说明系统对多类型异常的覆盖能力" />
          </CardHeader>
          <CardContent>
            <div className="h-[320px] bg-slate-50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={defectTypes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {defectTypes.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <SectionHeader title="自动化风险建议" desc="用于比赛现场展示模型不是只识别，而是能给决策" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["A12 风机 · 前缘裂纹", "建议优先停机复核，派发 P1 检修工单，并调取历史影像比较。"],
              ["C19 风机 · 疑似脱胶", "建议高空运维组二次确认，结合风速与振动数据评估结构风险。"],
              ["B07 风机 · 表面侵蚀", "纳入 24 小时复巡计划，暂不影响持续运行。"],
            ].map(([title, desc]) => (
              <div key={title} className="border border-slate-200 p-4 rounded-lg">
                <div className="font-medium text-slate-900">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{desc}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
