import React from "react";
import { ChevronRight, User, LogOut } from "lucide-react";
import { useAuth } from "@/AuthContext";
import { pages } from "@/components/mockData";

export default function Sidebar({ currentPage, setCurrentPage }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-slate-950 p-4 text-white rounded-lg">
      <div className="mb-6 border border-white/10 bg-white/5 p-4 rounded-lg">
        <div className="mt-2 text-lg font-semibold leading-7">
          山地风电场叶片<br />智能运维一体化系统
        </div>
      </div>

      <div className="space-y-2">
        {pages.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              className={`flex w-full items-center justify-between rounded px-4 py-3 text-left transition ${
                active ? "bg-white text-slate-950" : "bg-transparent text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      

      <div className="mt-auto border border-white/10 bg-white/5 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <User className="h-3 w-3" />
              {user?.name || "未登录"}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {user?.role === "admin" ? "管理员" : user?.role === "operator" ? "运维工程师" : ""}
            </div>
          </div>
          {user && (
            <button
              onClick={logout}
              className="p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white rounded"
              title="退出登录"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mt-2 text-xs text-slate-400">V1.0 Competition UI</div>
      </div>
    </div>
  );
}
