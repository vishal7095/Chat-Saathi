import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    } else {
      history.push("/"); // Redirect to login page if no user info is found
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  // Save user info in localStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("userInfo"); // Remove user info if logged out
    }
  }, [user]);

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    history.push("/"); // Redirect to home or login page
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        logout, // Adding logout function to context
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
