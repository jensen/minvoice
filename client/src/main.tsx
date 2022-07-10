import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Router from "./router";

import CacheProvider from "./context/cache";
import NotificationProvider from "./context/notification";

import "./styles/index.css";

export const load = (element: HTMLDivElement | null) => {
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
};

if (document.getElementById("root")) {
  load(document.getElementById("root") as HTMLDivElement);
}
