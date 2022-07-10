import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useParams,
} from "react-router-dom";

import Layout from "./components/Layout";

import CreateEntry from "./pages/modals/CreateEntry";

const Summary = React.lazy(() => import("./pages/summary"));
const Time = React.lazy(() => import("./pages/time"));
const Invoices = React.lazy(() => import("./pages/invoices"));
const Reports = React.lazy(() => import("./pages/reports"));
const Settings = React.lazy(() => import("./pages/settings"));

import { useFetchClients, useFetchProjects } from "./hooks/useFetch";

const TimePageRedirect = () => {
  const params = useParams();

  if (params.scale === undefined) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return <Navigate to={`day/${year}/${month}/${day}`} />;
  }

  return <Outlet />;
};

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Summary />} />
        <Route path="time" element={<TimePageRedirect />}>
          <Route path=":scale/:year/:month/:day/*" element={<Time />}>
            <Route path="new" element={<CreateEntry />} />
            <Route path="edit/:id" element={<CreateEntry />} />
          </Route>
        </Route>
        <Route path="invoices" element={<Invoices />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default function Router() {
  return (
    <BrowserRouter>
      <ApplicationRoutes />
    </BrowserRouter>
  );
}
