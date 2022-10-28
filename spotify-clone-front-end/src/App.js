import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddSong from "./components/AddSong";
import Login from "./components/Login";
import Top10 from "./components/Top10";
export const UserContext = createContext({});

export default function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    // console.log(loggedInUser);
    setUser(loggedInUser);

  }, []);
  console.log(user, "jj");
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path={`${user == null ? "/" : "Login"}`} element={<Login />} />
          <Route path={`${user !== "" ? "/" : "Top10"}`} element={<Top10 />} />
          <Route path={"addSong"} element={<AddSong />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
