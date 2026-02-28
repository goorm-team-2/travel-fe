import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Context에서 관리할 상태와 함수의 타입 정의 (TypeScript)
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Context 객체 생성 (초기값은 null로 설정)
export const AuthContext = createContext<AuthContextType | null>(null);

// 전역 상태를 공급할 Provider 컴포넌트
export function AuthProvider({ children }: { children: ReactNode }) {
  // 인증 상태 (기본값 false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 컴포넌트 마운트 시 로컬 스토리지의 토큰 여부를 확인하여 상태 동기화
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 로직: 스토리지에 토큰을 저장하고 상태를 true로 업데이트
  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setIsLoggedIn(true);
  };

  // 로그아웃 로직: 스토리지에서 토큰을 삭제하고 상태를 false로 업데이트
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}