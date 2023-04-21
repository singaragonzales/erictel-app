import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import {MemoizedAuthProvider} from "./components/Login/AuthContext";

function App() {
  return (
    <MemoizedAuthProvider>
      <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </div>
  </MemoizedAuthProvider>
  );
}

export default App;
