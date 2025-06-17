// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!cookies.token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch("https://todo-app-backend-95cy.onrender.com/verify", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          setUsername(data.user);
        } else {
          removeCookie("token");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Verification error:", err);
        removeCookie("token");
        setIsAuthenticated(false);
      }
    };

    verify();
  }, [cookies.token]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated, 
      username, 
      setUsername, 
      removeCookie,
      setCookie 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
