// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessions, setSessions] = useState(null);
  const [activeUser, setActiveUser] = useState(null);


  const logout = () => {
    let sessionsData = sessions;
    if (activeUser && confirm("Logging Out... \nDo you want to delete all messages as well?\n(This action cannot be undone)")) {
        localStorage.removeItem("messages_"+activeUser.replace(/\s/g, ''));
    }
    if(sessionsData){
        if(activeUser in sessionsData) {
            delete sessionsData[activeUser];
        }
        if(Object.keys(sessionsData).length == 0){
          localStorage.removeItem("activeSession");
          setActiveUser(null);
          setIsAuthenticated(false);
          setSessions({});
          return;
        }
        localStorage.setItem("activeSession",Object.keys(sessionsData)[0]);
      setSessions(sessionsData);
      setActiveUser(Object.keys(sessionsData)[0]);
      setIsAuthenticated(true);
    }
  }

  const switchAccount = (username) => {
    localStorage.setItem("activeSession",username);
    setActiveUser(username);
  }

  const login = (user, jwt) => {
    let sessionsData = sessions;
    if(sessionsData){
        sessionsData[user?.username] = {
            jwt: jwt,
            user: user
        }
        localStorage.setItem("sessions",JSON.stringify(sessionsData))
    }else{
        localStorage.setItem("sessions",JSON.stringify({[user?.username]: {
            jwt: jwt,
            user: user
        }}))
    }
    localStorage.setItem("activeSession",user.username)
    setSessions(sessionsData);
    setActiveUser(user.username);
    setIsAuthenticated(true);
  }

  useEffect(() => {
    // Check if user is already logged in and parse user data

    const activeUser = localStorage.getItem("activeSession");
    const sessions = JSON.parse(localStorage.getItem("sessions"));
    const parsedUserData = sessions && sessions[activeUser];

   
    console.log("User data from localStorage:", parsedUserData);

    if (parsedUserData?.user && parsedUserData?.jwt) {
      setIsAuthenticated(true);
      setSessions(sessions);
      setActiveUser(activeUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated,logout,switchAccount,login,activeUser,sessions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};