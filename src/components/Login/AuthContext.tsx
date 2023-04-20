import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isLoggedIn: boolean;
  login: (data:any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  login: (data:any) => {},
  logout: () => {},
});

type AuthProviderProps = {
    children: React.ReactNode;
  };

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate()

  const login = (data:any) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem("user", JSON.stringify(data.data.user))
    navigate("/home", {"state": {"user": data.data.user}})
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate("/")
  };

  useEffect(() => {
    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(isLoggedInLocal);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const MemoizedAuthProvider = React.memo(AuthProvider);