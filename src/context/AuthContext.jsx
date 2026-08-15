
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState( sessionStorage.getItem("token") || "");
    const [user, setUser] = useState( sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null);

    const login = (authToken,userFetched) =>{
      setToken(authToken);
      setUser( userFetched );
      sessionStorage.setItem( "token",authToken );
      sessionStorage.setItem( "user",JSON.stringify(userFetched) );
    }

    const logout = ()=>{
      sessionStorage.removeItem( "token" );
      setToken('');
      setUser( null );
      sessionStorage.removeItem( "user" );
    }

    return (
      <AuthContext value={ {token, login, logout, user} }>
          {children}
      </AuthContext>
   );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider.');
  }
  
  return context;
}
