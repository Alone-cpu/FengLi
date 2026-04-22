import React from "react";
import { Search, Bell, Settings } from "lucide-react";
import { pages } from "@/components/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TopBar({ currentPage, setCurrentPage }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border border-slate-200 bg-white px-5 py-4 rounded-lg">
      <div>
        <div className="text-sm text-slate-500">风电智能运维展示系统</div>
        <div className="text-xl font-semibold text-slate-950">{pages.find((p) => p.key === currentPage)?.label}</div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="搜索风机 / 工单 / 缺陷" className="w-[260px] rounded pl-9" />
        </div>
        <Button variant="outline" size="icon" className="rounded">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
