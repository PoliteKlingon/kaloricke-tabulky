import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {
  //@ts-ignore
  const initialValue = localStorage.getItem("auth") ? JSON.parse(window.localStorage.getItem("auth")) : {}

  const [auth, setAuth] = useState(initialValue);
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;