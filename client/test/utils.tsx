import * as React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApplicationRoutes } from "../src/router";
import CacheProvider from "../src/context/cache";

const Wrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <React.StrictMode>
      <CacheProvider>{children}</CacheProvider>
    </React.StrictMode>
  );
};

export const renderRouter = (path = "/", options?: any) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <ApplicationRoutes />
    </MemoryRouter>,
    {
      wrapper: Wrapper,
      ...options,
    }
  );
};

const customRender = (ui: React.ReactNode, options?: any) => {
  return render(<CacheProvider>{ui}</CacheProvider>, options);
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
