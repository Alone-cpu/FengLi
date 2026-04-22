import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionHeader from "@/components/SectionHeader";
import { architecture } from "@/components/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShowcasePage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          ["比赛展示亮点", "大屏驾驶舱 + 智能决策闭环，视觉冲击力强，适合路演与答辩。", "展示友好"],
          ["科研转化亮点", "兼顾论文、专利、软著、实地验证，形成完整项目包装逻辑。", "转化清晰"],
          ["持续扩展能力", "后续可对接真实后端、无人机平台、数据库与大模型知识库。", "可持续迭代"],
        ].map(([title, desc, tag]) => (
          <Card key={title} className="rounded-lg">
            <CardContent className="p-6">
              <Badge className="rounded-full bg-slate-950 text-white hover:bg-slate-950">{tag}</Badge>
              <div className="mt-4 text-lg font-semibold text-slate-900">{title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-500">{desc}</div>
              <Button variant="outline" className="mt-6 rounded">生成展示文案</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="系统技术架构" desc="方便你在比赛 PPT 和答辩里直接讲技术路线" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-5">
            {architecture.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="border border-slate-200 p-4 rounded-lg">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center bg-slate-950 text-white rounded-lg"><Icon className="h-5 w-5" /></div>
                  <div className="font-medium text-slate-900">{item.name}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
