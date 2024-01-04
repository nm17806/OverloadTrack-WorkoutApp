import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let storedUser = localStorage.getItem("user");
  if (storedUser == "undefined") {
    storedUser = null;
  }
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = async (inputs) => {
    const res = await axios.post("api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    try {
      await axios.post("api/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    try {
      const serializedUser = JSON.stringify(currentUser);
      localStorage.setItem("user", serializedUser);
    } catch (error) {
      console.error("Error while storing user data in local storage:", error);
    }
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
