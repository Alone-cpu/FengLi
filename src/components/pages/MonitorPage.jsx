import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { farmHealth, timeline } from "@/components/mockData";

export default function MonitorPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="风场健康度总览" desc="支持按风场查看整体运行状态与巡检负载" action={<Button variant="outline" className="rounded">切换风场</Button>} />
        </CardHeader>
        <CardContent>
          <div className="h-[360px] bg-slate-50 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={farmHealth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-12} textAnchor="end" height={60} />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#0f172a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="实时事件流" desc="模拟比赛演示时的动态调度与告警日志" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.time + item.title} className="flex gap-3 border border-slate-200 p-4 rounded-lg">
                <div className="min-w-[54px] text-sm font-semibold text-blue-700">{item.time}</div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-slate-900">{item.title}</div>
                  <div className="text-xs text-slate-500">系统自动记录，可用于答辩时展示闭环流程可追踪性。</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
