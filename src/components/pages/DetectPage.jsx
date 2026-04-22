import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";
import { defects, levelBadge } from "@/components/mockData";

export default function DetectPage() {
  const [selected, setSelected] = useState(defects[0]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="缺陷识别中心" desc="展示模型识别结果、置信度与缺陷描述信息" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {defects.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`border p-4 rounded-lg text-left transition ${
                  selected.id === item.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-semibold text-slate-900">{item.id}</div>
                  <Badge className={`rounded-full text-white ${levelBadge(item.level)}`}>{item.level}风险</Badge>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <div>{item.turbine} · {item.blade}</div>
                  <div>{item.type}</div>
                  <div>置信度 {item.confidence}%</div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardHeader>
          <SectionHeader title="识别详情与可视化预览" desc="后续可接入真实图像、热力图和检测框结果" />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex h-[230px] items-center justify-center border-2 border-dashed border-slate-300 bg-slate-100 rounded-lg">
            <div className="text-center">
              <Eye className="mx-auto h-10 w-10 text-slate-500" />
              <div className="mt-3 text-sm font-medium text-slate-700">缺陷图像展示区域</div>
              <div className="mt-1 text-xs text-slate-500">可接入红外图、可见光图、检测框与 Grad-CAM 热力图</div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["缺陷编号", selected.id],
              ["叶片位置", `${selected.turbine} · ${selected.blade}`],
              ["缺陷类型", selected.type],
              ["缺陷面积", selected.area],
              ["识别置信度", `${selected.confidence}%`],
              ["处理状态", selected.status],
            ].map(([k, v]) => (
              <div key={k} className="bg-slate-50 p-4 rounded-lg">
                <div className="text-xs text-slate-500">{k}</div>
                <div className="mt-1 font-medium text-slate-900">{v}</div>
              </div>
            ))}
          </div>
          <div className="border border-slate-200 p-4 rounded-lg text-sm leading-7 text-slate-600">{selected.desc}</div>
        </CardContent>
      </Card>
    </div>
  );
}
