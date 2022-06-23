import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";

import CacheProvider from "./context/cache";
import NotificationProvider from "./context/notification";

import "./styles/index.css";

const element = document.getElementById("root");

if (!element) {
  throw new Error("Root element does not exist");
}

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <CacheProvider>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </CacheProvider>
  </React.StrictMode>
);
