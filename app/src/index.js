import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./Style/style.css"
import {BrowserRouter } from "react-router-dom"
import {AuthContextProvider} from "./Component/Context/AuthContext"
import  {ChatContextProvider} from "./Component/Context/ChatContext"
import { ActiveContextProvider } from "./Component/Context/ActiveContext";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
    <BrowserRouter>
    <AuthContextProvider>
      <ChatContextProvider>
      <ActiveContextProvider>
        <React.StrictMode>
    <App />
    </React.StrictMode>
    </ActiveContextProvider>
    </ChatContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
   
  );