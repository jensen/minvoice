import { load } from "./main";
import { act, waitForElementToBeRemoved, screen } from "../test/utils";

describe("initialization", () => {
  it("should require a valid root element", async () => {
    expect(() => load(null)).toThrowError("Root element does not exist");
  });

  it("should ", async () => {
    const rootElement: HTMLDivElement = document.createElement("div");
    document.body.appendChild(rootElement);

    act(() => {
      load(rootElement);
    });

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId("loading-indicator")
    );

    expect(
      screen.getByRole("heading", { name: /summary/i })
    ).toBeInTheDocument();
  });
});
