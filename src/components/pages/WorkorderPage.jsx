import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";
import { workOrders } from "@/components/mockData";

export default function WorkorderPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.9fr]">
      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="智能运维任务列表" desc="体现从异常发现到工单流转的完整业务链路" action={<Button className="rounded bg-slate-950">新建工单</Button>} />
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden border border-slate-200 rounded-lg">
            <div className="grid grid-cols-5 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">
              <div>工单编号</div>
              <div>风机编号</div>
              <div>优先级</div>
              <div>执行团队</div>
              <div>状态</div>
            </div>
            {workOrders.map((item) => (
              <div key={item.id} className="grid grid-cols-5 items-center border-t border-slate-200 px-4 py-4 text-sm">
                <div className="font-medium text-slate-900">{item.id}</div>
                <div className="text-slate-600">{item.turbine}</div>
                <div>
                  <Badge
                    className={`rounded-full text-white ${
                      item.priority === "P1" ? "bg-red-500 hover:bg-red-500" : item.priority === "P2" ? "bg-amber-500 hover:bg-amber-500" : "bg-emerald-500 hover:bg-emerald-500"
                    }`}
                  >
                    {item.priority}
                  </Badge>
                </div>
                <div className="text-slate-600">{item.team}</div>
                <div className="text-slate-600">{item.state}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="派单策略说明" desc="答辩时可直接讲解系统如何提高运维效率" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            ["优先级规则", "依据风险等级、天气窗口、设备位置与历史损伤趋势自动排序。"],
            ["班组推荐", "结合工种能力、当前位置、空闲状态与响应时效进行智能匹配。"],
            ["闭环记录", "从接单、出发、到场、维修、复核到归档，全流程自动留痕。"],
          ].map(([title, desc]) => (
            <div key={title} className="bg-slate-50 p-4 rounded-lg">
              <div className="font-medium text-slate-900">{title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-500">{desc}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
