import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top10 from "./components/Top10";
import AddSong from "./components/AddSong";
import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


reportWebVitals();
