import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Send,
  Paperclip,
  Mic,
  RefreshCw,
  SlidersHorizontal,
  ShieldCheck,
  Wand2,
  MessageSquare,
  Zap,
  Database,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// AI API 配置
const API_KEY = "93fcf2c8-beb5-4e3a-bdf4-0b2a8825bbef";
const API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
const MODEL_ID = "ep-20260214184108-xq9gp";

const agents = [
  { name: "调度智能体", desc: "协调多任务并行", status: "online", icon: Zap },
  { name: "检测智能体", desc: "MSDA-Net 缺陷识别", status: "online", icon: Bot },
  { name: "风险智能体", desc: "等级判定与评估", status: "online", icon: ShieldCheck },
  { name: "运维智能体", desc: "工单与维修建议", status: "online", icon: Wand2 },
];

const quickPrompts = [
  "帮我分析 A12 风机叶片的裂纹风险",
  "生成今天的巡检摘要",
  "根据历史案例给出维修建议",
  "把缺陷结果整理成答辩话术",
];

// 系统提示词，定义智能体的角色和能力
const SYSTEM_PROMPT = `你是面向晋北山地风电场的叶片智能运维助手。你具备以下能力：

1. **风场巡检分析**：理解无人机巡检数据，分析风机叶片状态
2. **缺陷识别解读**：解读 MSDA-Net 检测结果，包括裂纹、脱胶、积冰、侵蚀等
3. **风险等级评估**：根据缺陷类型、面积、位置等因素评估风险
4. **运维建议生成**：提供专业的维修建议和工单优先级建议

请基于风电运维专业知识，回答用户问题。如果涉及到具体的缺陷数据（如 A12 风机），请结合项目中的专业术语进行回复。`;

export default function AgentPage() {
  const [conversations, setConversations] = useState([
    {
      role: "assistant",
      title: "智能体调度中枢",
      content: "已接入风场巡检、缺陷识别、风险评估与工单系统。你可以直接描述目标，我会帮你完成分析、总结和行动建议。",
      isInitial: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 调用豆包 API
  const callAI = async (userMessage) => {
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_ID,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...conversations.filter(c => !c.isInitial).map(c => ({
              role: c.role,
              content: c.content,
            })),
            { role: "user", content: userMessage },
          ],
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "抱歉，暂无回复。";

      return assistantMessage;
    } catch (error) {
      console.error("AI 调用错误:", error);
      return `请求失败: ${error.message}。请检查网络连接或 API 配置。`;
    } finally {
      setIsLoading(false);
    }
  };

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // 添加用户消息
    setConversations((prev) => [
      ...prev,
      { role: "user", title: "我", content: userMessage },
    ]);

    // 调用 AI 并获取回复
    const aiResponse = await callAI(userMessage);

    // 添加 AI 回复
    setConversations((prev) => [
      ...prev,
      { role: "assistant", title: "智能体调度中枢", content: aiResponse },
    ]);
  };

  // 按 Enter 发送
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 新建对话
  const handleNewChat = () => {
    setConversations([
      {
        role: "assistant",
        title: "智能体调度中枢",
        content: "已接入风场巡检、缺陷识别、风险评估与工单系统。你可以直接描述目标，我会帮你完成分析、总结和行动建议。",
        isInitial: true,
      },
    ]);
  };

  // 清空对话
  const handleClear = () => {
    setConversations([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* 左侧对话区域 */}
        <Card className="overflow-hidden rounded-lg border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">AI 智能对话</div>
                <div className="mt-0.5 text-lg font-semibold text-slate-900">面向风电运维的多智能体助手</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {conversations.length > 1 && (
                <Button
                  variant="outline"
                  onClick={handleClear}
                  className="rounded-xl border-slate-200 text-slate-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  清空
                </Button>
              )}
              <Button
                onClick={handleNewChat}
                className="h-9 px-4 rounded-xl bg-slate-800 text-white hover:bg-slate-700 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                新建对话
              </Button>
            </div>
          </div>

          {/* 消息列表 - 可滚动区域 */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-6 py-6 max-h-[calc(100vh-380px)] min-h-[300px]">
            {conversations.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl rounded-2xl px-5 py-4 shadow-sm ${
                    message.role === "user"
                      ? "bg-slate-800 text-white"
                      : "border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide opacity-70">
                    {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-white/70" />}
                    {message.title}
                  </div>
                  <div className="text-sm leading-6 whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}

            {/* 加载状态 */}
            {isLoading && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">正在分析...</span>
                </div>
              </div>
            )}

            {/* 空状态提示 */}
            {conversations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <Bot className="h-12 w-12 mb-4 text-slate-300" />
                <p className="text-sm">开始对话吧，我可以帮你分析风电运维问题</p>
              </div>
            )}
          </div>

          {/* 固定输入区域 */}
          <div className="border-t border-slate-200 bg-white p-5">
            {/* 快捷提示按钮 */}
            <div className="mb-4 flex flex-wrap gap-2">
              {quickPrompts.map((item) => (
                <button
                  key={item}
                  onClick={() => setInputValue(item)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 transition-all hover:border-slate-400 hover:bg-slate-100 hover:text-slate-800"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* 输入框 */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200 transition-all">
              <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题，例如：请根据 A12 缺陷结果生成一段答辩用总结..."
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                disabled={isLoading}
              />
              <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                <Mic className="h-4 w-4" />
              </button>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="rounded-xl bg-slate-800 p-2.5 text-white transition-colors hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* 右侧智能体列表 */}
        <Card className="rounded-lg border-slate-200 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-slate-700" />
              <CardTitle className="text-lg">智能体中心</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all hover:border-slate-400 hover:bg-slate-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-white">
                  <agent.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-900">{agent.name}</div>
                  <div className="text-xs text-slate-500 truncate">{agent.desc}</div>
                </div>
                <div className="flex h-2 w-2 rounded-full bg-emerald-500" />
              </div>
            ))}

            <div className="mt-6 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium">知识库</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>运维规则</span>
                  <span className="text-white">120+ 条</span>
                </div>
                <div className="flex justify-between">
                  <span>历史案例</span>
                  <span className="text-white">89 项</span>
                </div>
                <div className="flex justify-between">
                  <span>维修经验</span>
                  <span className="text-white">56 篇</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}