import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模拟网络延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(username, password);
    if (!result.success) {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Logo 和标题区域 */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4"
          >
            <Wind className="w-8 h-8 text-blue-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">
            山地风电场叶片智能运维系统
          </h1>
          <p className="text-slate-400 text-sm">
            请登录以继续访问系统
          </p>
        </div>

        {/* 登录卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white rounded-[28px] shadow-2xl p-8"
        >
          <div className="space-y-6">
            {/* 用户名输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                用户名
              </label>
              <Input
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-12"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-400" />
                密码
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-12 pr-10"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-sm bg-red-50 rounded-xl px-4 py-2"
              >
                {error}
              </motion.div>
            )}

            {/* 登录按钮 */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !username || !password}
              className="w-full h-12 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-medium text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                '登录系统'
              )}
            </Button>

            {/* 提示信息 */}
            <div className="text-xs text-slate-400 text-center space-y-1 pt-2">
              <p>测试账号: admin / admin123</p>
              <p>测试账号: operator / op123</p>
            </div>
          </div>
        </motion.div>

        {/* 底部装饰文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center text-slate-500 text-xs mt-8"
        >
          风电智能运维比赛展示系统 · V1.0
        </motion.p>
      </motion.div>
    </div>
  );
}
