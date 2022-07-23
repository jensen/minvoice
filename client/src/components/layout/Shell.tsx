import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NotificationProvider from "../../context/notification";

import Navigation from "./Navigation";
import Header from "./Header";

import Loading from "../shared/Loading";

export default function Main() {
  return (
    <NotificationProvider>
      <main className="layout__container">
        <header className="layout__header">
          <Header />
        </header>
        <aside className="layout__sidebar">
          <Navigation />
        </aside>
        <section className="layout__content">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </NotificationProvider>
  );
}
