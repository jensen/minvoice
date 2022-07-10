import { server } from "../src/services/mocks/server";
import "whatwg-fetch";

beforeAll(() => {
  return server.listen();
});

afterEach(() => {
  localStorage.clear();
  return server.resetHandlers();
});

afterAll(() => server.close());
