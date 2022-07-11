import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";

import { server } from "../src/services/mocks/server";

beforeAll(() => {
  return server.listen();
});

afterEach(() => {
  localStorage.clear();
  return server.resetHandlers();
});

afterAll(() => server.close());
