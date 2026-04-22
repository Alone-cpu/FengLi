import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Radar, AlertTriangle, Wrench, CheckCircle2 } from "lucide-react";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import {
  DashboardPage,
  MonitorPage,
  DetectPage,
  RiskPage,
  WorkorderPage,
  ShowcasePage,
} from "@/components/pages";

export default function WindFarmCompetitionFrontend() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const content = useMemo(() => {
    switch (currentPage) {
      case "monitor":
        return <MonitorPage />;
      case "detect":
        return <DetectPage />;
      case "risk":
        return <RiskPage />;
      case "workorder":
        return <WorkorderPage />;
      case "showcase":
        return <ShowcasePage />;
      default:
        return <DashboardPage />;
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 p-5 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[280px_1fr]">
        <div className="min-h-[calc(100vh-3rem)]">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        <div className="space-y-6">
          <TopBar currentPage={currentPage} setCurrentPage={setCurrentPage} />

          <Tabs defaultValue="scene" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 rounded bg-white">
              <TabsTrigger value="scene" className="rounded">场景演示</TabsTrigger>
              <TabsTrigger value="business" className="rounded">业务闭环</TabsTrigger>
              <TabsTrigger value="product" className="rounded">产品包装</TabsTrigger>
            </TabsList>

            <TabsContent value="scene" className="space-y-6">
              {content}
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle>系统业务闭环逻辑</CardTitle>
                  <CardDescription>适合你在比赛中用一页把系统价值讲清楚</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:grid-cols-5">
                    {[
                      ["1. 巡检感知", "无人机采集叶片图像与环境数据", Eye],
                      ["2. 智能识别", "MSDA-Net 检测极小缺陷与异常目标", Radar],
                      ["3. 风险研判", "结合知识库与规则完成自动分级", AlertTriangle],
                      ["4. 派单处置", "自动生成工单并匹配检修资源", Wrench],
                      ["5. 闭环复盘", "维修归档、经验沉淀与模型迭代", CheckCircle2],
                    ].map(([title, desc, Icon]) => (
                      <div key={title} className="border border-slate-200 p-4 rounded-lg">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-slate-950 text-white rounded-lg"><Icon className="h-5 w-5" /></div>
                        <div className="font-medium text-slate-900">{title}</div>
                        <div className="mt-2 text-sm leading-6 text-slate-500">{desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="product" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>比赛答辩可直接强调的卖点</CardTitle>
                    <CardDescription>从"算法"提升到"系统产品"层面</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "不是单点识别模型，而是完整的风电叶片智能运维闭环系统。",
                      "适配晋北山地区域场景，强调复杂地形与真实行业需求。",
                      "具备可视化展示、可解释分析、可执行派单三重能力。",
                      "兼顾科研成果产出与后续产业落地潜力。",
                    ].map((item) => (
                      <div key={item} className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">{item}</div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="rounded-lg">
                  <CardHeader>
                    <CardTitle>后续开发建议</CardTitle>
                    <CardDescription>方便从展示原型过渡到真正可用系统</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "接入真实后端 API：风机列表、缺陷结果、工单数据。",
                      "接入真实图像组件：红外图、框选结果、热力图联动。",
                      "增加登录鉴权、角色权限、报告导出、地图交互。",
                      "比赛前再补一套移动端演示页面，会更完整。",
                    ].map((item) => (
                      <div key={item} className="border border-slate-200 p-4 rounded-lg text-sm text-slate-700">{item}</div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
