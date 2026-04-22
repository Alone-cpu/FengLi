import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// 模拟用户数据 - 后续可替换为后端 API 调用
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', name: '系统管理员', role: 'admin' },
  { username: 'operator', password: 'op123', name: '运维工程师', role: 'operator' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查 localStorage 中是否有持久化的登录状态
  useEffect(() => {
    const storedUser = localStorage.getItem('wf_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('wf_auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username, password) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // 不存储密码到状态
      const userWithoutPassword = {
        name: foundUser.name,
        role: foundUser.role,
        username: foundUser.username,
      };
      setUser(userWithoutPassword);
      localStorage.setItem('wf_auth_user', JSON.stringify(userWithoutPassword));
      return { success: true, message: '登录成功' };
    } else {
      return { success: false, message: '用户名或密码错误' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('wf_auth_user');
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context;
}

export default AuthContext;